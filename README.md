# Universidade do Algarve
**Curso:** LESTI (Licenciatura em Engenharia de Sistemas e Tecnologias de Informação)  \
**Unidade Curricular:** Desenvolvimento de Aplicações Web 2025/26  \
**1º Trabalho Prático — Implementação de Serviço SOAP em Node.js**  \
**Autor:** Marcelo Santos (a79433)

---

## 🎯 Objetivo do Trabalho
Este repositório apresenta uma calculadora aritmética construída com o protocolo SOAP, desenvolvida para fins académicos no âmbito do 1º Trabalho Prático da UC Desenvolvimento de Aplicações Web. O projeto demonstra como expor operações básicas (soma, subtração, multiplicação e divisão) através de um serviço SOAP em Node.js, complementado por um cliente CLI, um proxy REST e uma landing page de apresentação.

> **Nota Académica:** Todo o código, documentação e interface foram personalizados para identificar Marcelo Santos (a79433) como autor do trabalho e contextualizar o projeto na Universidade do Algarve.

## 🧱 Estrutura & Arquitetura
```
apps/
├─ soap-server/        → Servidor SOAP + landing page académica
├─ soap-client/        → Cliente CLI para invocação direta do WSDL
├─ soap-proxy/         → Proxy REST → SOAP (JSON ↔️ XML)
├─ frontend/           → Documentação da landing page servida pelo SOAP server
└─ web/                → Protótipo original (Vite) mantido para referência
packages/
├─ shared-wsdl/        → Distribui o ficheiro WSDL partilhado
└─ shared-validators/  → Validadores reutilizáveis (garantia de tipos numéricos)
examples/              → Exemplos de requests/respostas SOAP em XML
```

### Visão textual da arquitetura
1. **SOAP Server (`apps/soap-server`)**
   - Expõe o WSDL em `/wsdl?wsdl`.
   - Processa operações aritméticas através do `serviceDefinition`.
   - Serve a landing page académica em `/` com informações do trabalho.
2. **SOAP Client (`apps/soap-client`)**
   - Ferramenta de linha de comando para testar rapidamente o serviço.
   - Escreve os pedidos e respostas XML completos para análise didática.
3. **REST Proxy (`apps/soap-proxy`)**
   - Tradução HTTP JSON → SOAP XML, permitindo integrações modernas.
   - Endpoints `POST /add`, `/subtract`, `/multiply`, `/divide`.
4. **Shared Packages (`packages/*`)**
   - Centralizam o WSDL e a validação de dados numéricos para garantir coerência.

## 🚀 Requisitos & Configuração Inicial
- **Node.js:** versão LTS (>= 18.x).
- **pnpm:** versão 9 ou superior (`corepack enable pnpm`).

```bash
# Instalar dependências
pnpm install
```

## 🧪 Execução e Testes
| Componente | Comando | Descrição |
| --- | --- | --- |
| Servidor SOAP | `pnpm --filter soap-server dev` | Arranca o servidor com reload automático (nodemon). |
| Servidor SOAP (prod) | `pnpm --filter soap-server start` | Executa o servidor em modo simples. |
| Abrir landing page | `pnpm --filter soap-server open:frontend` | Abre `http://localhost:3000` (macOS/Linux com comando `open`). |
| Cliente CLI | `pnpm --filter soap-client start add 7 5` | Invoca a operação `add` via SOAP. |
| Proxy REST | `pnpm --filter soap-proxy dev` | Inicia o servidor Express que delega em SOAP. |
| Proxy REST (prod) | `pnpm --filter soap-proxy start` | Executa o proxy em modo simples. |

> ⚠️ Se estiver num ambiente sem o comando `open`, basta aceder manualmente a [http://localhost:3000](http://localhost:3000) depois de arrancar o `soap-server`.

## 📡 Interações SOAP e REST
### Endpoints SOAP
- **WSDL:** `http://localhost:3000/wsdl?wsdl`
- **Serviço:** `ArithmeticService`
- **Porta:** `ArithmeticPort`

#### Request XML (operação `multiply`)
```xml
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <multiply>
      <a>9</a>
      <b>4</b>
    </multiply>
  </soap:Body>
</soap:Envelope>
```

#### Response XML
```xml
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <multiplyResponse>
      <result>36</result>
    </multiplyResponse>
  </soap:Body>
</soap:Envelope>
```

### Endpoints REST (Proxy)
| Método | Caminho | Corpo JSON | Descrição |
| --- | --- | --- | --- |
| POST | `/add` | `{ "a": 7, "b": 5 }` | Soma `a + b` |
| POST | `/subtract` | `{ "a": 9, "b": 3 }` | Subtrai `a - b` |
| POST | `/multiply` | `{ "a": 6, "b": 6 }` | Multiplica `a * b` |
| POST | `/divide` | `{ "a": 12, "b": 4 }` | Divide `a / b` (com validação de divisão por zero) |

## 🖥️ Landing Page Académica
- **URL:** [http://localhost:3000](http://localhost:3000)
- **Título:** “SOAP Calculator — UAlg LESTI 2025/26 — Marcelo Santos (a79433)”
- **Funcionalidades:**
  - Explica o contexto académico do trabalho.
  - Disponibiliza links úteis (WSDL, GitHub, exemplos XML).
  - Inclui modo claro/escuro e identidade visual UAlg.

Screenshot sugerido: após arrancar o servidor `soap-server`, abrir a página inicial para validação visual (opcional anexar no relatório final).

## 📁 Exemplos XML
A pasta [`examples/`](./examples) contém requests SOAP de cada operação:
- `add-request.xml`
- `subtract-request.xml`
- `multiply-request.xml`
- `divide-request.xml`

Estes ficheiros podem ser importados diretamente em ferramentas como SoapUI ou Insomnia para fins de demonstração.

## 📦 Deploy (Opcional)
- **GitHub Pages / Coolify / Render:** basta expor o `soap-server` com Node.js 18+.
- **Variáveis de ambiente:**
  - `PORT` — altera a porta do servidor SOAP (por defeito `3000`).
  - `WSDL_URL` — pode ser definido nos clientes (`soap-client` e `soap-proxy`) para apontar para deploy remoto.

## 📝 Declaração
> Este projeto foi desenvolvido como parte da unidade curricular Desenvolvimento de Aplicações Web do curso LESTI (Universidade do Algarve), ano letivo 2025/26. O código e a documentação têm finalidade exclusivamente educativa e demonstrativa.

---

### 📦 Sugestão de Entrega
1. Confirmar que os testes locais foram executados (`pnpm --filter soap-server start`, etc.).
2. Gerar um `.zip` do repositório (`git archive --format zip HEAD -o UAlg-SOAP-TP1WEB.zip`) **ou** publicar num repositório GitHub privado/público.
3. Anexar o link/ficheiro na plataforma de avaliação da UC juntamente com o relatório escrito.

Bom trabalho! 💻📚
