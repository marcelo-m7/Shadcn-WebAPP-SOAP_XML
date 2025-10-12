# Frontend Académico — SOAP Calculator

Esta pasta documenta a página de apresentação servida diretamente pelo **soap-server**.

## 📍 Localização
- Ficheiro principal: [`apps/soap-server/public/index.html`](../soap-server/public/index.html)
- Exemplos XML: [`apps/soap-server/public/examples/`](../soap-server/public/examples)

## ▶️ Como visualizar
1. Instale as dependências de toda a monorepo:
   ```bash
   pnpm install
   ```
2. Arranque o servidor SOAP em modo desenvolvimento:
   ```bash
   pnpm --filter soap-server dev
   ```
3. Abra o navegador em [http://localhost:3000](http://localhost:3000) ou utilize o atalho:
   ```bash
   pnpm --filter soap-server open:frontend
   ```

A página apresenta o contexto académico do trabalho, ligações úteis e um comutador de tema claro/escuro.
