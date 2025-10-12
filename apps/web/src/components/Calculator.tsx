/**
 * Universidade do Algarve - LESTI 2025/26
 * UC: Desenvolvimento de Aplicações Web
 * 1º Trabalho Prático: Implementação de Serviço SOAP em Node.js
 * Autor: Marcelo Santos (a79433)
 */

import React, { useState } from "react";
import { performOperation } from "../lib/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { toast } from "sonner";

const Calculator: React.FC = () => {
  const [numberA, setNumberA] = useState<string>("");
  const [numberB, setNumberB] = useState<string>("");
  const [result, setResult] = useState<number | string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleOperation = async (operation: string) => {
    setLoading(true);
    setResult(null); // Educational implementation for TP1: limpar resultado antes de nova invocação.
    try {
      const a = parseFloat(numberA);
      const b = parseFloat(numberB);

      if (Number.isNaN(a) || Number.isNaN(b)) {
        toast.error("Introduza valores numéricos válidos para A e B.");
        return;
      }

      const res = await performOperation(operation, a, b);
      setResult(res);
      toast.success(`Operação ${operation} concluída com sucesso! Resultado: ${res}`);
    } catch (error: any) {
      setResult("Erro");
      toast.error(error?.message || "Ocorreu um erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setNumberA("");
    setNumberB("");
    setResult(null);
    setLoading(false);
    toast.info("Calculadora limpa para nova demonstração.");
  };

  return (
    <Card className="w-full max-w-md mx-auto border-ualg-blue/20 dark:border-ualg-green/30">
      <CardHeader>
        <CardTitle className="text-center text-ualg-blue dark:text-ualg-gold">
          Calculadora Académica (SOAP via REST)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="numberA">Número A</Label>
          <Input
            type="number"
            id="numberA"
            placeholder="Introduza o primeiro valor"
            value={numberA}
            onChange={(event) => setNumberA(event.target.value)}
            className="w-full"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="numberB">Número B</Label>
          <Input
            type="number"
            id="numberB"
            placeholder="Introduza o segundo valor"
            value={numberB}
            onChange={(event) => setNumberB(event.target.value)}
            className="w-full"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={() => handleOperation("add")} disabled={loading}>
            {loading ? "A calcular..." : "Somar"}
          </Button>
          <Button onClick={() => handleOperation("subtract")} disabled={loading}>
            {loading ? "A calcular..." : "Subtrair"}
          </Button>
          <Button onClick={() => handleOperation("multiply")} disabled={loading}>
            {loading ? "A calcular..." : "Multiplicar"}
          </Button>
          <Button onClick={() => handleOperation("divide")} disabled={loading}>
            {loading ? "A calcular..." : "Dividir"}
          </Button>
        </div>
        <Button onClick={handleClear} variant="outline" className="w-full mt-2" disabled={loading}>
          Limpar campos
        </Button>
        {result !== null && (
          <div className="text-center text-2xl font-bold mt-4">
            Resultado: <span className={result === "Erro" ? "text-red-500" : "text-ualg-green"}>{result}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground text-center justify-center flex-col space-y-1">
        <span>Proxy REST: http://localhost:3001</span>
        <span>WSDL: http://localhost:3000/wsdl?wsdl</span>
      </CardFooter>
    </Card>
  );
};

export default Calculator;
