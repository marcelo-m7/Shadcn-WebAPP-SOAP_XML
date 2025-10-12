/**
 * Universidade do Algarve - LESTI 2025/26
 * UC: Desenvolvimento de Aplicações Web
 * 1º Trabalho Prático: Implementação de Serviço SOAP em Node.js
 * Autor: Marcelo Santos (a79433)
 */
import { ensureNumber } from "@shared/validators";

// Educational implementation for TP1: Arithmetic SOAP service operations
export const serviceDefinition = {
  ArithmeticService: {
    ArithmeticPort: {
      add({ a, b }) {
        const A = ensureNumber(a, "a");
        const B = ensureNumber(b, "b");
        return { result: A + B };
      },
      subtract({ a, b }) {
        const A = ensureNumber(a, "a");
        const B = ensureNumber(b, "b");
        return { result: A - B };
      },
      multiply({ a, b }) {
        const A = ensureNumber(a, "a");
        const B = ensureNumber(b, "b");
        return { result: A * B };
      },
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