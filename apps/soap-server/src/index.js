/**
 * Universidade do Algarve - LESTI 2025/26
 * UC: Desenvolvimento de Aplicações Web
 * 1º Trabalho Prático: Implementação de Serviço SOAP em Node.js
 * Autor: Marcelo Santos (a79433)
 */

import http from "http";
import { existsSync, readFileSync, statSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import soap from "soap";
import { loadArithmeticWSDL } from "@shared/wsdl";
import { serviceDefinition } from "./service.js";

const PORT = process.env.PORT || 3000;
const WSDL_PATH = "/wsdl";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PUBLIC_DIR = join(__dirname, "../public");

let landingPageHtml = "";
try {
  // Educational implementation for TP1: preload the contextual landing page.
  landingPageHtml = readFileSync(join(PUBLIC_DIR, "index.html"), "utf8");
} catch (error) {
  console.error("Failed to load landing page HTML:", error);
}

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml"
};

const getMime = (filePath) => {
  const ext = filePath.slice(filePath.lastIndexOf("."));
  return mimeTypes[ext] || "application/octet-stream";
};

const server = http.createServer((req, res) => {
  const { pathname } = new URL(req.url, `http://localhost:${PORT}`);

  if (pathname === "/" || pathname === "/index.html") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(landingPageHtml || "<h1>SOAP Calculator</h1><p>Landing page unavailable.</p>");
    return;
  }

  if (pathname === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true, service: "soap-server" }));
    return;
  }

  const safeRelativePath = pathname.replace(/^\/+/, "");
  if (safeRelativePath.includes("..")) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Invalid path" }));
    return;
  }
  const requestedFile = join(PUBLIC_DIR, safeRelativePath);
  if (requestedFile.startsWith(PUBLIC_DIR) && existsSync(requestedFile) && statSync(requestedFile).isFile()) {
    res.writeHead(200, { "Content-Type": getMime(requestedFile) });
    res.end(readFileSync(requestedFile));
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not Found" }));
});

server.listen(PORT, () => {
  console.log("=== UAlg - LESTI 2025/26 ===");
  console.log("SOAP Service Project (Marcelo Santos - a79433)");
  console.log(`SOAP server listening at http://localhost:${PORT}`);
  console.log(`WSDL at http://localhost:${PORT}${WSDL_PATH}?wsdl`);
});

soap.listen(server, WSDL_PATH, serviceDefinition, loadArithmeticWSDL());
