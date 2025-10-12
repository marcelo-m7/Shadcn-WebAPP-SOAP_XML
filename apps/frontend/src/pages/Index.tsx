import React from 'react';
import Calculator from '../components/Calculator';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card';
import { Separator } from '../components/ui/separator'; // Assuming Separator exists or creating it

const IndexPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      <Card className="w-full max-w-2xl mx-auto mb-8">
        <CardHeader className="text-center">
          <h1 className="text-3xl font-bold mb-2">SOAP Calculator — UAlg LESTI 2025/26</h1>
          <CardTitle className="text-xl font-semibold">Marcelo Santos (a79433)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-lg">
            Este projeto foi desenvolvido como parte do 1º Trabalho Prático da Unidade Curricular de
            **Desenvolvimento de Aplicações Web** do curso de **LESTI** na **Universidade do Algarve** para o ano letivo 2025/26.
          </p>
          <p>
            O objetivo é implementar um serviço SOAP em Node.js, um cliente SOAP e um proxy RESTful para interagir com o serviço.
            A aplicação frontend abaixo demonstra a funcionalidade de uma calculadora aritmética básica através do proxy REST.
          </p>
          <Separator />
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-4">
            <a
              href="http://localhost:3000/wsdl?wsdl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              WSDL Endpoint (http://localhost:3000/wsdl?wsdl)
            </a>
            <a
              href="https://github.com/marcelo-m7/UAlg-SOAP-TP1WEB"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              GitHub Repository
            </a>
          </div>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground text-center justify-center">
          <img src="https://www.ualg.pt/sites/default/files/ualg_logo_horizontal_cor_0.png" alt="UAlg Logo" className="h-8 mr-2" />
          Universidade do Algarve — LESTI 2025/26
        </CardFooter>
      </Card>
      <Calculator />
    </div>
  );
};

export default IndexPage;