const PROXY_BASE_URL = import.meta.env.VITE_SOAP_PROXY_URL || 'http://localhost:3001';

export async function performOperation(operation: string, a: number, b: number): Promise<number> {
  try {
    const response = await fetch(`${PROXY_BASE_URL}/${operation}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ a, b }),
    });

    const rawBody = await response.text();

    if (!response.ok) {
      let parsedError: unknown;
      try {
        parsedError = JSON.parse(rawBody);
      } catch {
        parsedError = rawBody;
      }

      const errorMessage =
        typeof parsedError === 'string'
          ? parsedError
          : typeof parsedError === 'object' && parsedError !== null && 'error' in parsedError
            ? String(parsedError.error)
            : undefined;

      throw new Error(errorMessage?.trim() || `HTTP error! status: ${response.status}`);
    }

    let data: unknown;
    try {
      data = JSON.parse(rawBody);
    } catch (parseError) {
      console.error(`Failed to parse JSON response for ${operation}:`, parseError);
      throw new Error('Received an invalid response from the server.');
    }

    if (typeof data !== 'object' || data === null || !('result' in data)) {
      throw new Error('Unexpected response format from the server.');
    }

    const result = (data as { result: unknown }).result;

    if (typeof result !== 'number' || Number.isNaN(result)) {
      throw new Error('Received an invalid calculation result from the server.');
    }

    return result;
  } catch (error) {
    console.error(`Error performing ${operation}:`, error);
    throw error;
  }
}