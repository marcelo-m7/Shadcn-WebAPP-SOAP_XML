/**
 * Universidade do Algarve - LESTI 2025/26
 * UC: Desenvolvimento de Aplicações Web
 * 1º Trabalho Prático: Implementação de Serviço SOAP em Node.js
 * Autor: Marcelo Santos (a79433)
 */

// Educational implementation for TP1: command-line interface to test SOAP operations.
import soap from "soap";

const [,, op, aStr, bStr] = process.argv;
if (!op || aStr === undefined || bStr === undefined) {
  console.log("Usage: node cli <add|subtract|multiply|divide> <a> <b>");
  console.log("Example: node cli add 7 5");
  process.exit(1);
}

const A = Number(aStr);
const B = Number(bStr);
const WSDL_URL = process.env.WSDL_URL || "http://localhost:3000/wsdl?wsdl";

soap.createClient(WSDL_URL, (err, client) => {
  if (err) {
    console.error("Error creating SOAP client:", err);
    process.exit(1);
  }
  const fn = client[op];
  if (typeof fn !== "function") {
    console.error(`Unknown operation: ${op}`);
    process.exit(1);
  }

  fn({ a: A, b: B }, (faultOrErr, result, rawResponse, soapHeader, rawRequest) => {
    if (faultOrErr) {
      console.error("SOAP Fault/Error:", faultOrErr.body || faultOrErr);
    } else {
      console.log("=== UAlg SOAP TP1 Client ===");
      console.log("Raw Request XML:\n", rawRequest);
      console.log("\nRaw Response XML:\n", rawResponse);
      console.log("\nResult:", result);
    }
  });
});
