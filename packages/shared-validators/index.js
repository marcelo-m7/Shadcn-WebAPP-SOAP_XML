export function ensureNumber(value, name) {
  const num = Number(value);
  if (!Number.isFinite(num)) {
    const err = new Error(`"${name}" must be a finite number`);
    err.code = "Client.ValidationError";
    throw err;
  }
  return num;
}