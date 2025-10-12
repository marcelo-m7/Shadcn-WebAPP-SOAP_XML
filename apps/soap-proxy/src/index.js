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

const isFiniteNumber = (value) => typeof value === "number" && Number.isFinite(value);

const extractSoapErrorMessage = (faultOrErr) => {
  if (!faultOrErr) {
    return "SOAP operation failed";
  }

  if (typeof faultOrErr.body === "string") {
    const textMatch = faultOrErr.body.match(/<soap:Text>([^<]+)<\/soap:Text>/i);
    if (textMatch && textMatch[1]) {
      return textMatch[1].trim();
    }
    return faultOrErr.body.replace(/<[^>]*>/g, " ").trim() || "SOAP operation failed";
  }

  if (faultOrErr.root?.Envelope?.Body?.Fault?.Reason?.Text?._) {
    return String(faultOrErr.root.Envelope.Body.Fault.Reason.Text._).trim();
  }

  if (faultOrErr.message) {
    return faultOrErr.message;
  }

  return "SOAP operation failed";
};

const isClientSideSoapError = (faultOrErr, message) => {
  if (!faultOrErr) {
    return false;
  }

  const lowerMessage = message.toLowerCase();
  if (faultOrErr.code && typeof faultOrErr.code === "string") {
    return faultOrErr.code.startsWith("Client.");
  }
  return lowerMessage.includes("division by zero") || lowerMessage.includes("must be a finite number");
};

// Initialize SOAP client for the proxy (Educational implementation for TP1)
soap.createClient(WSDL_URL, (err, client) => {
  if (err) {
    console.error("Error creating SOAP client:", err);
    process.exit(1);
  }
  soapClient = client;
  console.log("SOAP client initialized successfully.");
});

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

  if (!isFiniteNumber(a) || !isFiniteNumber(b)) {
    return res.status(400).json({ error: "Invalid input: 'a' and 'b' must be finite numbers." });
  }

  try {
    const callOperation = soapClient?.[`${operation}Async`];

    if (typeof callOperation !== "function") {
      console.error(`Attempted to call unknown SOAP operation: ${operation}`);
      return res.status(500).json({ error: `Unknown SOAP operation: ${operation}` });
    }

    const [result] = await callOperation({ a, b });
    return res.json(result);
  } catch (faultOrErr) {
    const message = extractSoapErrorMessage(faultOrErr);
    const statusCode = isClientSideSoapError(faultOrErr, message) ? 400 : 502;
    console.error(`SOAP Fault/Error for ${operation}:`, message, faultOrErr?.body ? `\nSOAP Body: ${faultOrErr.body}` : "");
    return res.status(statusCode).json({ error: message });
  }
};

app.post("/add", handleSoapOperation("add"));
app.post("/subtract", handleSoapOperation("subtract"));
app.post("/multiply", handleSoapOperation("multiply"));
app.post("/divide", handleSoapOperation("divide"));

app.listen(PORT, () => {
  console.log(`SOAP Proxy server listening at http://localhost:${PORT}`);
});