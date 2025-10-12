/**
 * Universidade do Algarve - LESTI 2025/26
 * UC: Desenvolvimento de Aplicações Web
 * 1º Trabalho Prático: Implementação de Serviço SOAP em Node.js
 * Autor: Marcelo Santos (a79433)
 */

const PROXY_BASE_URL = import.meta.env.VITE_SOAP_PROXY_URL || "http://localhost:3001";

export async function performOperation(operation: string, a: number, b: number): Promise<number> {
  try {
    const response = await fetch(`${PROXY_BASE_URL}/${operation}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ a, b }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error(`Error performing ${operation}:`, error);
    throw error;
  }
}
