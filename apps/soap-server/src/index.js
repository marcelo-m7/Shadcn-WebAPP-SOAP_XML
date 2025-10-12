/**
 * Universidade do Algarve - LESTI 2025/26
 * UC: Desenvolvimento de Aplicações Web
 * 1º Trabalho Prático: Implementação de Serviço SOAP em Node.js
 * Autor: Marcelo Santos (a79433)
 */
import http from "http";
import soap from "soap";
import { loadArithmeticWSDL } from "@shared/wsdl";
import { serviceDefinition } from "./service.js";

const PORT = process.env.PORT || 3000;
const WSDL_PATH = "/wsdl";

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true }));
  }
});

server.listen(PORT, () => {
  console.log(`
=== UAlg - LESTI 2025/26 ===
SOAP Service Project (Marcelo Santos - a79433)
`);
  console.log(`SOAP server listening at http://localhost:${PORT}`);
  console.log(`WSDL at http://localhost:${PORT}${WSDL_PATH}?wsdl`);
});

soap.listen(server, WSDL_PATH, serviceDefinition, loadArithmeticWSDL());