/**
 * Universidade do Algarve - LESTI 2025/26
 * UC: Desenvolvimento de Aplicações Web
 * 1º Trabalho Prático: Implementação de Serviço SOAP em Node.js
 * Autor: Marcelo Santos (a79433)
 */

import { ensureNumber } from "@shared/validators";

export const serviceDefinition = {
  ArithmeticService: {
    ArithmeticPort: {
      // Educational implementation for TP1 — soma dois operandos
      add({ a, b }) {
        const A = ensureNumber(a, "a");
        const B = ensureNumber(b, "b");
        return { result: A + B };
      },
      // Educational implementation for TP1 — subtrai operandos
      subtract({ a, b }) {
        const A = ensureNumber(a, "a");
        const B = ensureNumber(b, "b");
        return { result: A - B };
      },
      // Educational implementation for TP1 — multiplica operandos
      multiply({ a, b }) {
        const A = ensureNumber(a, "a");
        const B = ensureNumber(b, "b");
        return { result: A * B };
      },
      // Educational implementation for TP1 — divide operandos com validação académica
      divide({ a, b }) {
        const A = ensureNumber(a, "a");
        const B = ensureNumber(b, "b");
        if (B === 0) {
          const err = new Error("Division by zero is not allowed");
          err.code = "Client.DivisionByZero";
          throw err;
        }
        return { result: A / B };
      }
    }
  }
};