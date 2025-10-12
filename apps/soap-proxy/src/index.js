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

app.use(cors());
app.use(bodyParser.json());

let soapClient;
let soapClientAttempts = 0;
const SOAP_CLIENT_RETRY_MS = Number(process.env.SOAP_CLIENT_RETRY_MS || 2000);
const SOAP_CLIENT_MAX_RETRIES = process.env.SOAP_CLIENT_MAX_RETRIES
  ? Number(process.env.SOAP_CLIENT_MAX_RETRIES)
  : 0; // 0 => unlimited retries

const scheduleSoapClientRetry = () => {
  if (SOAP_CLIENT_MAX_RETRIES && soapClientAttempts >= SOAP_CLIENT_MAX_RETRIES) {
    console.error("Maximum SOAP client initialization attempts reached. Exiting.");
    process.exit(1);
  }

  setTimeout(initializeSoapClient, SOAP_CLIENT_RETRY_MS);
};

const initializeSoapClient = () => {
  soapClientAttempts += 1;
  console.log(`Initializing SOAP client (attempt ${soapClientAttempts})...`);

  soap.createClient(WSDL_URL, (err, client) => {
    if (err) {
      const reason = err?.message || err;
      console.error("Error creating SOAP client:", reason);
      scheduleSoapClientRetry();
      return;
    }

    soapClient = client;
    console.log("SOAP client initialized successfully.");
  });
};

// Educational implementation for TP1: initialize the SOAP client used by the REST proxy.
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
  res.status(200).json({ ok: true, soapClientReady: !!soapClient, service: "soap-proxy" });
});

// Generic handler for arithmetic operations
const extractFaultMessage = (fault) => {
  if (!fault) {
    return "SOAP operation failed";
  }

  if (typeof fault === "string") {
    const textMatch = fault.match(/<soap:Text>([^<]+)<\/soap:Text>/i);
    if (textMatch) {
      return textMatch[1].trim();
    }
    return fault.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  }

  if (fault.body) {
    return extractFaultMessage(fault.body);
  }

  if (fault.message) {
    return fault.message;
  }

  return "SOAP operation failed";
};

const mapFaultToStatusCode = (fault) => {
  const code = fault?.code;
  if (code === "Client.DivisionByZero" || code === "Client.ValidationError") {
    return 400;
  }

  const message = extractFaultMessage(fault);
  if (/division by zero/i.test(message) || /must be a finite number/i.test(message)) {
    return 400;
  }

  return 500;
};

const handleSoapOperation = (operation) => async (req, res) => {
  const { a, b } = req.body;

  if (typeof a !== "number" || typeof b !== "number") {
    return res.status(400).json({ error: "Invalid input: 'a' and 'b' must be numbers." });
  }

  try {
    const fn = soapClient[operation];
    if (typeof fn !== "function") {
      return res.status(500).json({ error: `Unknown SOAP operation: ${operation}` });
    }

    fn({ a, b }, (faultOrErr, result) => {
      if (faultOrErr) {
        const faultMessage = extractFaultMessage(faultOrErr);
        console.error(`SOAP Fault/Error for ${operation}:`, faultOrErr.body || faultOrErr);
        const statusCode = mapFaultToStatusCode(faultOrErr);
        return res.status(statusCode).json({ error: faultMessage });
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
  console.log("=== UAlg - LESTI 2025/26 ===");
  console.log("SOAP Service Project (Marcelo Santos - a79433)");
  console.log(`SOAP Proxy server listening at http://localhost:${PORT}`);
});
