import soap from "soap";

const [,, op, aStr, bStr] = process.argv;
if (!op || aStr === undefined || bStr === undefined) {
  console.log("Usage: node cli <add|subtract|multiply|divide> <a> <b>");
  process.exit(1);
}
const A = Number(aStr), B = Number(bStr);
const WSDL_URL = process.env.WSDL_URL || "http://localhost:3000/wsdl?wsdl";

soap.createClient(WSDL_URL, (err, client) => {
  if (err) {
    console.error("Error creating SOAP client:", err);
    process.exit(1);
  }
  const fn = client[op];
  if (typeof fn !== "function") {
    console.error(`Unknown operation: ${op}`);
    process.exit(1);
  }
  fn({ a: A, b: B }, (faultOrErr, result, rawResponse, soapHeader, rawRequest) => {
    if (faultOrErr) {
      console.error("SOAP Fault/Error:", faultOrErr.body || faultOrErr);
    } else {
      console.log("Raw Request XML:\n", rawRequest);
      console.log("\nRaw Response XML:\n", rawResponse);
      console.log("\nResult:", result);
    }
  });
});