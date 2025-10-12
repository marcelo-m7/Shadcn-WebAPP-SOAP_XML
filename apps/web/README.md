# Frontend académico — SOAP Calculator

**Universidade do Algarve — LESTI 2025/26**  
**UC Desenvolvimento de Aplicações Web**  
**1º Trabalho Prático · Marcelo Santos (a79433)**

## ✨ Visão geral
Esta aplicação Vite + React fornece uma interface moderna para apresentar o projeto "SOAP Calculator". A página destaca o contexto académico, descreve a arquitetura do monorepositório e integra uma calculadora que consome o proxy REST (`apps/soap-proxy`).

## ▶️ Como executar
```bash
pnpm --filter web dev
```

A aplicação ficará disponível em `http://localhost:5173`. Certifique-se de que o proxy REST (`pnpm --filter soap-proxy dev`) e o servidor SOAP (`pnpm --filter soap-server dev`) estão a correr para que a calculadora exiba resultados em tempo real.

## 🌙 Funcionalidades
- Hero section com identidade visual UAlg e links rápidos para WSDL e landing page do servidor SOAP.
- Cartões com resumo dos componentes, tecnologias e comandos principais.
- Calculadora académica que comunica com o proxy REST (`http://localhost:3001`).
- Comparação visual entre pedido SOAP e pedido REST.
- Declaração académica sobre o objetivo educativo do trabalho.
- Alternância de tema claro/escuro alinhada com o branding da Universidade do Algarve.

## 🔧 Configuração do proxy
Por omissão, o frontend espera que o proxy REST esteja acessível em `http://localhost:3001`. Caso utilize outra porta ou servidor, defina a variável `VITE_SOAP_PROXY_URL`:

```bash
VITE_SOAP_PROXY_URL="https://exemplo.com/soap-proxy" pnpm --filter web dev
```

## 📸 Sugestões de apresentação
- Capture imagens do hero e da calculadora com ambos os temas para anexar ao relatório.
- Demonstre uma operação (por exemplo, Soma 7 + 5) com a consola de rede a mostrar o request REST.
- Inclua no relatório o link para o repositório GitHub e para a landing page (`http://localhost:3000/`).

Bom estudo e boa entrega! 🎓
