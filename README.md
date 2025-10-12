# UAlg-SOAP-TP1WEB

## Universidade do Algarve
- **Curso:** LESTI (Licenciatura em Engenharia de Sistemas e Tecnologias de Informação)
- **Unidade Curricular:** Desenvolvimento de Aplicações Web 2025/26
- **1º Trabalho Prático:** Implementação de Serviço SOAP em Node.js
- **Autor:** Marcelo Santos (a79433)

---

## 🎯 Objetivo do Projeto
Este repositório contém a solução do 1º Trabalho Prático da UC Desenvolvimento de Aplicações Web. O foco é construir uma **calculadora SOAP** em Node.js, demonstrando competências na definição de WSDL, implementação de serviços, criação de clientes e exposição de um proxy REST que consome o serviço SOAP.

O projeto segue uma estrutura Turborepo com múltiplas aplicações e pacotes partilhados para reforçar a reutilização de código e a organização modular.

---

## 🧱 Arquitetura
A monorepo encontra-se organizada da seguinte forma:

```text
apps/
├─ soap-server/      # Servidor SOAP em Node.js (também serve a landing page académica)
├─ soap-client/      # Cliente CLI para testar as operações diretamente por SOAP
├─ soap-proxy/       # Proxy REST -> SOAP, simplificando integrações modernas
└─ web/              # Interface React/Tailwind (opcional para exploração adicional)

packages/
├─ shared-wsdl/      # Definição WSDL partilhada entre todos os componentes
└─ shared-validators/# Utilitários de validação para inputs SOAP
```

### Diagrama de Fluxo (texto)
1. **Cliente** (CLI ou aplicações externas) consome o serviço SOAP exposto em `http://localhost:3000/wsdl`.
2. **Proxy REST** escuta em `http://localhost:3001` e traduz pedidos REST (`POST /add`, `POST /divide`, …) para invocações SOAP.
3. **Pacotes Partilhados** disponibilizam o WSDL e validadores reutilizados por todas as aplicações.
4. **Landing page** académica é servida pelo `soap-server` em `http://localhost:3000/` para apresentar o contexto do trabalho prático.

---

## 🛠️ Tecnologias Principais
- Node.js (ESM)
- Biblioteca [`soap`](https://www.npmjs.com/package/soap)
- Express.js + CORS + Body Parser (proxy REST)
- Turborepo + pnpm para gestão monorepo
- HTML/CSS vanilla para a página de apresentação

---

## 🚀 Como Executar
### Pré-requisitos
- Node.js LTS (>= 20.x recomendado)
- pnpm `>= 9`

### Instalação Geral
```bash
pnpm install
```

### Comandos Importantes
```bash
# Arrancar o servidor SOAP (porta 3000)
pnpm --filter soap-server dev

# Executar o cliente SOAP em modo CLI
pnpm --filter soap-client start add 7 5

# Lançar o proxy REST (porta 3001)
pnpm --filter soap-proxy dev
```

A página de apresentação está disponível em [http://localhost:3000](http://localhost:3000) logo após o arranque do servidor SOAP. Caso pretenda abrir o browser diretamente:

```bash
pnpm --filter soap-server open:frontend
```

---

## 🌐 Endpoints & Exemplos
### SOAP (WSDL)
- `http://localhost:3000/wsdl?wsdl` – definição do serviço SOAP.

#### Exemplo de pedido `add`
```xml
<!-- apps/soap-server/public/examples/add-request.xml -->
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://www.example.com/arithmetic">
  <soapenv:Header/>
  <soapenv:Body>
    <tns:addRequest>
      <tns:a>7</tns:a>
      <tns:b>5</tns:b>
    </tns:addRequest>
  </soapenv:Body>
</soapenv:Envelope>
```

#### Exemplo de resposta `add`
```xml
<!-- apps/soap-server/public/examples/add-response.xml -->
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://www.example.com/arithmetic">
  <soapenv:Header/>
  <soapenv:Body>
    <tns:addResponse>
      <tns:result>12</tns:result>
    </tns:addResponse>
  </soapenv:Body>
</soapenv:Envelope>
```

#### Fault `divide` (divisão por zero)
```xml
<!-- apps/soap-server/public/examples/divide-fault.xml -->
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
  <soapenv:Body>
    <soapenv:Fault>
      <faultcode>soap:Client.DivisionByZero</faultcode>
      <faultstring>Division by zero is not allowed</faultstring>
    </soapenv:Fault>
  </soapenv:Body>
</soapenv:Envelope>
```

### REST Proxy
- `POST http://localhost:3001/add` – body: `{ "a": 7, "b": 5 }`
- `POST http://localhost:3001/divide` – body: `{ "a": 10, "b": 2 }`

O proxy devolve sempre JSON com `{ "result": number }` ou mensagens de erro formatadas.

---

## 🖥️ Landing Page Académica
O ficheiro [`apps/soap-server/public/index.html`](apps/soap-server/public/index.html) apresenta:
- Identidade visual da Universidade do Algarve (logo, cores e informações da UC).
- Explicação do contexto académico e dos objetivos do trabalho.
- Ligações para o WSDL, repositório e exemplos XML.
- Interruptor de tema (claro/escuro) com persistência local.

Para visualizar basta aceder a `http://localhost:3000/` após executar `pnpm --filter soap-server dev`.

---

## 📚 Documentação Complementar
- [`packages/shared-wsdl/arithmetic.wsdl`](packages/shared-wsdl/arithmetic.wsdl) – definição formal do serviço.
- [`packages/shared-validators/index.js`](packages/shared-validators/index.js) – validações partilhadas entre servidor e proxy.
- [`apps/frontend/README.md`](apps/frontend/README.md) – guia rápido para a página de apresentação.

---

## ⚠️ Declaração Académica
Este projeto foi desenvolvido exclusivamente para fins educativos no âmbito da UC **Desenvolvimento de Aplicações Web** (UAlg – LESTI 2025/26). Todo o código, documentação e interface refletem o trabalho individual de **Marcelo Santos (a79433)**.

---

## 📦 Sugestão de Entrega
Para submissão formal do trabalho prático:
1. Atualize o repositório no GitHub com as últimas alterações.
2. Gere um ficheiro `.zip` contendo toda a monorepo ou utilize uma Release no GitHub.
3. Inclua no relatório de entrega instruções para executar `pnpm install` e `pnpm --filter soap-server dev`.

Bom estudo e boas integrações SOAP! 🧮
