/**
 * Universidade do Algarve - LESTI 2025/26
 * UC: Desenvolvimento de Aplicações Web
 * 1º Trabalho Prático: Implementação de Serviço SOAP em Node.js
 * Autor: Marcelo Santos (a79433)
 */
import express from "express";
import soap from "soap";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3001;
const WSDL_URL = process.env.WSDL_URL || "http://localhost:3000/wsdl?wsdl";

const parsedRetryDelay = Number(process.env.SOAP_CLIENT_RETRY_DELAY_MS);
const RETRY_DELAY_MS = Number.isFinite(parsedRetryDelay) && parsedRetryDelay > 0 ? parsedRetryDelay : 2000;

const parsedMaxRetries = Number(process.env.SOAP_CLIENT_MAX_RETRIES);
const unlimitedRetries = parsedMaxRetries === -1;
const MAX_RETRIES =
  Number.isFinite(parsedMaxRetries) && parsedMaxRetries >= 0 ? parsedMaxRetries : unlimitedRetries ? Infinity : 30;

app.use(cors());
app.use(bodyParser.json());

let soapClient;

const createSoapClient = (wsdlUrl) =>
  new Promise((resolve, reject) => {
    soap.createClient(wsdlUrl, (err, client) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(client);
    });
  });

const sanitizeSoapMessage = (value) => {
  if (typeof value !== "string") {
    return "SOAP operation failed";
  }

  const trimmed = value.trim();
  if (!trimmed.includes(":")) {
    return trimmed;
  }

  const segments = trimmed.split(":").map((segment) => segment.trim()).filter(Boolean);
  if (segments.length === 0) {
    return "SOAP operation failed";
  }

  const lastSegment = segments[segments.length - 1];
  if (/^error$/i.test(lastSegment) && segments.length >= 2) {
    return segments[segments.length - 2];
  }

  return lastSegment;
};

async function initializeSoapClient(attempt = 0) {
  try {
    soapClient = await createSoapClient(WSDL_URL);
    console.log("SOAP client initialized successfully.");
  } catch (error) {
    const nextAttempt = attempt + 1;
    const shouldRetry = Number.isFinite(MAX_RETRIES) ? nextAttempt <= MAX_RETRIES : true;
    const totalAttemptsLabel = Number.isFinite(MAX_RETRIES) ? MAX_RETRIES + 1 : "∞";
    const message = error?.message || error;
    if (shouldRetry) {
      console.warn(
        `Error creating SOAP client (attempt ${nextAttempt}/${totalAttemptsLabel}). Retrying in ${RETRY_DELAY_MS}ms...`,
        message,
      );
      setTimeout(() => initializeSoapClient(nextAttempt), RETRY_DELAY_MS);
    } else {
      console.error("Failed to initialize SOAP client after multiple attempts:", message);
      process.exit(1);
    }
  }
}

initializeSoapClient();

// Middleware to ensure SOAP client is ready
app.use((req, res, next) => {
  if (!soapClient) {
    return res.status(503).json({ error: "SOAP client not initialized. Server starting up." });
  }
  next();
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ ok: true, soapClientReady: !!soapClient });
});

// Generic handler for arithmetic operations
const handleSoapOperation = (operation) => async (req, res) => {
  const { a, b } = req.body;

  const parsedA = Number(a);
  const parsedB = Number(b);

  if (!Number.isFinite(parsedA) || !Number.isFinite(parsedB)) {
    return res.status(400).json({ error: "Invalid input: 'a' and 'b' must be valid numbers." });
  }

  const extractFaultMessage = (faultOrErr) => {
    if (!faultOrErr) {
      return "SOAP operation failed";
    }

    if (typeof faultOrErr === "string") {
      return sanitizeSoapMessage(faultOrErr);
    }

    if (faultOrErr?.root?.Envelope?.Body?.Fault?.faultstring) {
      return sanitizeSoapMessage(faultOrErr.root.Envelope.Body.Fault.faultstring);
    }

    if (faultOrErr?.message) {
      return sanitizeSoapMessage(faultOrErr.message);
    }

    if (faultOrErr?.body && typeof faultOrErr.body === "string") {
      return sanitizeSoapMessage(faultOrErr.body);
    }

    return "SOAP operation failed";
  };

  try {
    const fn = soapClient[operation];
    if (typeof fn !== "function") {
      return res.status(500).json({ error: `Unknown SOAP operation: ${operation}` });
    }

    fn({ a: parsedA, b: parsedB }, (faultOrErr, result) => {
      if (faultOrErr) {
        const message = extractFaultMessage(faultOrErr);
        console.error(`SOAP Fault/Error for ${operation}:`, message);
        const normalizedMessage = message.toLowerCase();
        const faultCode =
          faultOrErr?.code ||
          faultOrErr?.root?.Envelope?.Body?.Fault?.faultcode ||
          (normalizedMessage.includes("division by zero") || normalizedMessage.includes("validation")
            ? "ClientError"
            : undefined);

        const isClientFault = typeof faultCode === "string" && /^client/i.test(faultCode);
        const statusCode = isClientFault ? 400 : 500;
        return res.status(statusCode).json({ error: message });
      }
      res.json(result);
    });
  } catch (error) {
    console.error(`Unexpected error during ${operation}:`, error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

app.post("/add", handleSoapOperation("add"));
app.post("/subtract", handleSoapOperation("subtract"));
app.post("/multiply", handleSoapOperation("multiply"));
app.post("/divide", handleSoapOperation("divide"));

app.listen(PORT, () => {
  console.log(`SOAP Proxy server listening at http://localhost:${PORT}`);
});