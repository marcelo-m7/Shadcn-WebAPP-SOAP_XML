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

// Initialize SOAP client
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
        console.error(`SOAP Fault/Error for ${operation}:`, faultOrErr.body || faultOrErr);
        const statusCode = faultOrErr.code === "Client.DivisionByZero" || faultOrErr.code === "Client.ValidationError" ? 400 : 500;
        return res.status(statusCode).json({ error: faultOrErr.body || faultOrErr.message || "SOAP operation failed" });
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
  console.log("SOAP REST Proxy (Marcelo Santos - a79433)");
  console.log("----------------------------------------");
  console.log(`SOAP Proxy server listening at http://localhost:${PORT}`);
});