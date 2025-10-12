/**
 * Universidade do Algarve - LESTI 2025/26
 * UC: Desenvolvimento de Aplicações Web
 * 1º Trabalho Prático: Implementação de Serviço SOAP em Node.js
 * Autor: Marcelo Santos (a79433)
 */

// Educational implementation for TP1: ensures that SOAP payload values are valid numbers.
export function ensureNumber(value, name) {
  const num = Number(value);
  if (!Number.isFinite(num)) {
    const err = new Error(`"${name}" must be a finite number`);
    err.code = "Client.ValidationError";
    throw err;
  }
  return num;
}
