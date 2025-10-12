import type { FC } from 'react';
import { useState } from 'react';
import { performOperation } from '../lib/api';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Label } from './ui/label';
import { toast } from 'sonner';

const Calculator: FC = () => {
  const [numberA, setNumberA] = useState<string>('');
  const [numberB, setNumberB] = useState<string>('');
  const [result, setResult] = useState<number | string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleOperation = async (operation: string) => {
    setLoading(true);
    setResult(null); // Clear previous result when a new operation starts
    try {
      const a = parseFloat(numberA);
      const b = parseFloat(numberB);

      if (isNaN(a) || isNaN(b)) {
        toast.error('Please enter valid numbers for both inputs.');
        return;
      }

      const res = await performOperation(operation, a, b);
      setResult(res);
      toast.success(`Operation successful! Result: ${res}`);
    } catch (error: unknown) {
      setResult('Error');
      const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setNumberA('');
    setNumberB('');
    setResult(null);
    setLoading(false);
    toast.info('Calculator cleared.');
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
          <Button onClick={() => handleOperation('add')} disabled={loading}>
            {loading && result === null ? 'Adding...' : 'Add'}
          </Button>
          <Button onClick={() => handleOperation('subtract')} disabled={loading}>
            {loading && result === null ? 'Subtracting...' : 'Subtract'}
          </Button>
          <Button onClick={() => handleOperation('multiply')} disabled={loading}>
            {loading && result === null ? 'Multiplying...' : 'Multiply'}
          </Button>
          <Button onClick={() => handleOperation('divide')} disabled={loading}>
            {loading && result === null ? 'Dividing...' : 'Divide'}
          </Button>
        </div>
        <Button onClick={handleClear} variant="outline" className="w-full mt-2" disabled={loading}>
          Clear
        </Button>
        {result !== null && (
          <div className="text-center text-2xl font-bold mt-4">
            Result: <span className={result === 'Error' ? 'text-red-500' : 'text-green-500'}>{result}</span>
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