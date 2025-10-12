/**
 * Universidade do Algarve - LESTI 2025/26
 * UC: Desenvolvimento de Aplicações Web
 * 1º Trabalho Prático: Implementação de Serviço SOAP em Node.js
 * Autor: Marcelo Santos (a79433)
 */

import http from "http";
import { readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import soap from "soap";
import { loadArithmeticWSDL } from "@shared/wsdl";
import { serviceDefinition } from "./service.js";

const PORT = process.env.PORT || 3000;
const WSDL_PATH = "/wsdl";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PUBLIC_DIR = join(__dirname, "..", "public");
const LANDING_PAGE_PATH = join(PUBLIC_DIR, "index.html");

let cachedLandingPage;

async function loadLandingPage() {
  if (cachedLandingPage) {
    return cachedLandingPage;
  }
  cachedLandingPage = await readFile(LANDING_PAGE_PATH, "utf8");
  return cachedLandingPage;
}

const server = http.createServer(async (req, res) => {
  // Educational implementation for TP1 — serve status and landing page
  if (req.url === "/" || req.url === "/index.html") {
    try {
      const html = await loadLandingPage();
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(html);
    } catch (error) {
      console.error("Erro ao carregar a landing page académica:", error);
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Não foi possível carregar a página informativa do TP1.");
    }
    return;
  }

  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Rota não encontrada neste serviço SOAP académico.");
});

server.listen(PORT, () => {
  console.log("=== UAlg - LESTI 2025/26 ===");
  console.log("SOAP Service Project (Marcelo Santos - a79433)");
  console.log("----------------------------------------------");
  console.log(`SOAP server disponível em http://localhost:${PORT}`);
  console.log(`WSDL académico em http://localhost:${PORT}${WSDL_PATH}?wsdl`);
});

soap.listen(server, WSDL_PATH, serviceDefinition, loadArithmeticWSDL());
