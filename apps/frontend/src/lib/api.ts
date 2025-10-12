const PROXY_BASE_URL = import.meta.env.VITE_SOAP_PROXY_URL || "http://localhost:3001";

type Operation = "add" | "subtract" | "multiply" | "divide";

const buildOperationUrl = (operation: Operation) => `${PROXY_BASE_URL.replace(/\/$/, "")}/${operation}`;

export async function performOperation(operation: Operation, a: number, b: number): Promise<number> {
  try {
    const response = await fetch(buildOperationUrl(operation), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ a, b }),
    });

    const rawPayload = await response.text();
    let payload: any = null;

    if (rawPayload) {
      try {
        payload = JSON.parse(rawPayload);
      } catch (parseError) {
        console.error("Failed to parse JSON payload from SOAP proxy:", parseError);
      }
    }

    if (!response.ok) {
      const message = payload?.error || response.statusText || `HTTP error! status: ${response.status}`;
      throw new Error(message);
    }

    if (!payload || typeof payload.result !== "number" || Number.isNaN(payload.result)) {
      throw new Error("Invalid response received from SOAP proxy.");
    }

    return payload.result;
  } catch (error) {
    console.error(`Error performing ${operation}:`, error);
    throw error;
  }
}

export type { Operation };