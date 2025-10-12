/**
 * Universidade do Algarve - LESTI 2025/26
 * UC: Desenvolvimento de Aplicações Web
 * 1º Trabalho Prático: Implementação de Serviço SOAP em Node.js
 * Autor: Marcelo Santos (a79433)
 */

// Educational implementation for TP1: exposes the SOAP calculator and a branded landing page.
import http from "http";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import soap from "soap";
import { loadArithmeticWSDL } from "@shared/wsdl";
import { serviceDefinition } from "./service.js";

const PORT = process.env.PORT || 3000;
const WSDL_PATH = "/wsdl";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const LANDING_PAGE_PATH = join(__dirname, "../public/index.html");

let landingPageHtml = "";
try {
  landingPageHtml = readFileSync(LANDING_PAGE_PATH, "utf8");
} catch (error) {
  console.warn("Landing page not found. The SOAP service will still operate.");
}

const server = http.createServer((req, res) => {
  if (req.method === "GET" && (req.url === "/" || req.url === "/index.html")) {
    if (landingPageHtml) {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(landingPageHtml);
    } else {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Landing page not available.");
    }
    return;
  }

  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true, service: "SOAP Calculator", author: "Marcelo Santos" }));
  }
});

server.listen(PORT, () => {
  console.log("\n=== UAlg - LESTI 2025/26 ===");
  console.log("SOAP Service Project (Marcelo Santos - a79433)");
  console.log("--------------------------------------------");
  console.log(`SOAP server listening at http://localhost:${PORT}`);
  console.log(`WSDL available at http://localhost:${PORT}${WSDL_PATH}?wsdl`);
  if (landingPageHtml) {
    console.log(`Landing page ready at http://localhost:${PORT}/`);
  }
  console.log("");
});

soap.listen(server, WSDL_PATH, serviceDefinition, loadArithmeticWSDL());
