import React, { useState } from "react";
import { performOperation, type Operation } from "../lib/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { toast } from "sonner";

const OPERATIONS: Operation[] = ["add", "subtract", "multiply", "divide"];

const OPERATION_LABELS: Record<Operation, { idle: string; loading: string }> = {
  add: { idle: "Add", loading: "Adding..." },
  subtract: { idle: "Subtract", loading: "Subtracting..." },
  multiply: { idle: "Multiply", loading: "Multiplying..." },
  divide: { idle: "Divide", loading: "Dividing..." },
};

const Calculator: React.FC = () => {
  const [numberA, setNumberA] = useState<string>("");
  const [numberB, setNumberB] = useState<string>("");
  const [result, setResult] = useState<number | string | null>(null);
  const [loadingOperation, setLoadingOperation] = useState<Operation | null>(null);

  const handleOperation = async (operation: Operation) => {
    setLoadingOperation(operation);
    setResult(null);

    const a = Number.parseFloat(numberA);
    const b = Number.parseFloat(numberB);

    if (!Number.isFinite(a) || !Number.isFinite(b)) {
      toast.error("Please enter valid numbers for both inputs.");
      setLoadingOperation(null);
      return;
    }

    try {
      const operationResult = await performOperation(operation, a, b);
      setResult(operationResult);
      toast.success(`Operation successful! Result: ${operationResult}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "An unexpected error occurred.";
      setResult("Error");
      toast.error(message);
    } finally {
      setLoadingOperation(null);
    }
  };

  const handleClear = () => {
    setNumberA("");
    setNumberB("");
    setResult(null);
    setLoadingOperation(null);
    toast.info("Calculator cleared.");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">SOAP Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="numberA">Number A</Label>
          <Input
            type="number"
            id="numberA"
            placeholder="Enter first number"
            value={numberA}
            onChange={(e) => setNumberA(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="numberB">Number B</Label>
          <Input
            type="number"
            id="numberB"
            placeholder="Enter second number"
            value={numberB}
            onChange={(e) => setNumberB(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {OPERATIONS.map((operation) => (
            <Button
              key={operation}
              onClick={() => handleOperation(operation)}
              disabled={loadingOperation !== null}
            >
              {loadingOperation === operation
                ? OPERATION_LABELS[operation].loading
                : OPERATION_LABELS[operation].idle}
            </Button>
          ))}
        </div>
        <Button onClick={handleClear} variant="outline" className="w-full mt-2" disabled={loadingOperation !== null}>
          Clear
        </Button>
        {result !== null && (
          <div className="text-center text-2xl font-bold mt-4">
            Result: <span className={result === "Error" ? "text-red-500" : "text-green-500"}>{result}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground text-center justify-center">
        Powered by SOAP proxy
      </CardFooter>
    </Card>
  );
};

export default Calculator;