# UAlg-SOAP-TP1WEB

## Universidade do Algarve
### Curso: LESTI (Licenciatura em Engenharia de Sistemas e Tecnologias de Informação)
### Unidade Curricular: Desenvolvimento de Aplicações Web 2025/26
### 1º Trabalho Prático — Implementação de Serviço SOAP em Node.js
### Autor: Marcelo Santos (a79433)

---

## 📝 Project Description

This project, developed for the "Desenvolvimento de Aplicações Web" course at UAlg, is the first practical assignment focusing on the implementation of a SOAP (Simple Object Access Protocol) service using Node.js. It demonstrates a basic arithmetic calculator service exposed via SOAP, consumed by both a command-line SOAP client and a RESTful proxy, which in turn is used by a modern web frontend.

The primary learning objectives include:
*   Understanding and implementing SOAP services in Node.js.
*   Creating a WSDL (Web Services Description Language) for a SOAP service.
*   Developing a SOAP client to interact with the service.
*   Building a RESTful API proxy to expose SOAP functionality over HTTP/JSON.
*   Integrating a React-based frontend to consume the RESTful proxy.
*   Working with a Turborepo monorepo structure for managing multiple applications and shared packages.

## 🏛️ Architecture

The project is structured as a Turborepo monorepo, comprising several interconnected applications and shared packages:

1.  **`apps/soap-server`**:
    *   **Role**: Implements the core arithmetic SOAP service (add, subtract, multiply, divide).
    *   **Technology**: Node.js, `soap` library.
    *   **Exposes**: A SOAP endpoint at `http://localhost:3000/wsdl` with its WSDL definition.

2.  **`apps/soap-client`**:
    *   **Role**: A command-line interface (CLI) application to directly consume the SOAP service.
    *   **Technology**: Node.js, `soap` library.
    *   **Usage**: Allows performing arithmetic operations from the terminal.

3.  **`apps/soap-proxy`**:
    *   **Role**: Acts as a bridge, exposing the SOAP service's arithmetic operations as a RESTful API.
    *   **Technology**: Node.js, Express.js, `soap` library, `cors`, `body-parser`.
    *   **Exposes**: REST endpoints (e.g., `/add`, `/subtract`) at `http://localhost:3001` that internally call the SOAP server.

4.  **`apps/frontend`**:
    *   **Role**: A modern web application providing a user-friendly interface for the arithmetic calculator.
    *   **Technology**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui.
    *   **Consumes**: The RESTful API exposed by `apps/soap-proxy`.
    *   **Accessible at**: `http://localhost:32100` (during development).

5.  **`packages/shared-wsdl`**:
    *   **Role**: Contains the WSDL definition file (`arithmetic.wsdl`) for the SOAP service.
    *   **Benefit**: Centralizes the WSDL, making it easily shareable across the monorepo.

6.  **`packages/shared-validators`**:
    *   **Role**: Provides common validation utilities (e.g., `ensureNumber`) used by the SOAP service.
    *   **Benefit**: Promotes code reuse and consistency in input validation.

```
+-------------------+       +-------------------+       +-------------------+       +-------------------+
|   apps/frontend   | <---> |   apps/soap-proxy | <---> |   apps/soap-server| <---> | shared/validators |
| (React UI)        |       | (REST to SOAP)    |       | (SOAP Service)    |       |                   |
+-------------------+       +-------------------+       +-------------------+       +-------------------+
                                      ^                           ^
                                      |                           |
                                      +---------------------------+
                                      |                           |
                                      v                           v
                                +-------------------+       +-------------------+
                                |   apps/soap-client|       | shared/wsdl       |
                                | (CLI SOAP Client) |       |                   |
                                +-------------------+       +-------------------+
```

## 🚀 Installation

This project uses `pnpm` as its package manager. Ensure you have Node.js (LTS version recommended) and pnpm installed.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/marcelo-m7/UAlg-SOAP-TP1WEB.git
    cd UAlg-SOAP-TP1WEB
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

## ▶️ Running the Project

To run the full application, you need to start the SOAP server, the SOAP proxy, and the frontend application.

1.  **Start the SOAP Server:**
    This will run the core SOAP service.
    ```bash
    pnpm --filter soap-server dev
    ```
    The server will be listening on `http://localhost:3000`. The WSDL can be accessed at `http://localhost:3000/wsdl?wsdl`.

2.  **Start the SOAP Proxy:**
    This will run the RESTful proxy that translates HTTP requests to SOAP calls.
    ```bash
    pnpm --filter soap-proxy dev
    ```
    The proxy will be listening on `http://localhost:3001`.

3.  **Start the Frontend Application:**
    This will launch the React web interface.
    ```bash
    pnpm --filter frontend dev
    ```
    The frontend will be available at `http://localhost:32100`.

4.  **Open Frontend in Browser:**
    ```bash
pnpm open:frontend
```
This command will automatically open `http://localhost:32100` in your default web browser.

### 🐳 Running with Docker

A production-like stack (SOAP server, REST proxy and built frontend) can be started with Docker Compose:

```bash
docker compose up --build
```

This will expose the following ports on your machine:

| Service        | Container Port | Host Port | Notes |
| -------------- | -------------- | --------- | ----- |
| SOAP Server    | 3000           | 3000      | WSDL available at `http://localhost:3000/wsdl?wsdl` |
| SOAP REST Proxy| 3001           | 3001      | Health endpoint at `http://localhost:3001/health` |
| Frontend (Nginx)| 80            | 32100     | Accessible at `http://localhost:32100` |

The proxy container keeps retrying to connect to the SOAP server until it becomes available. You can override retry behaviour with the environment variables `SOAP_CLIENT_MAX_RETRIES` (set to `-1` for infinite retries) and `SOAP_CLIENT_RETRY_DELAY_MS` (delay in milliseconds between attempts).

## 🧪 Testing with SOAP Client (CLI)

You can test the SOAP service directly using the command-line client:

```bash
# Example: Add 7 and 5
pnpm --filter soap-client start add 7 5

# Example: Subtract 10 from 20
pnpm --filter soap-client start subtract 20 10

# Example: Multiply 3 by 4
pnpm --filter soap-client start multiply 3 4

# Example: Divide 100 by 25
pnpm --filter soap-client start divide 100 25

# Example: Division by zero (will result in an error)
pnpm --filter soap-client start divide 10 0
```

## 🌐 Testing with REST Proxy (cURL Examples)

You can interact with the REST proxy using `curl` or any API client:

**Add:**
```bash
curl -X POST -H "Content-Type: application/json" -d '{"a": 15, "b": 7}' http://localhost:3001/add
# Expected Output: {"result":22}
```

**Subtract:**
```bash
curl -X POST -H "Content-Type: application/json" -d '{"a": 30, "b": 12}' http://localhost:3001/subtract
# Expected Output: {"result":18}
```

**Multiply:**
```bash
curl -X POST -H "Content-Type: application/json" -d '{"a": 6, "b": 8}' http://localhost:3001/multiply
# Expected Output: {"result":48}
```

**Divide:**
```bash
curl -X POST -H "Content-Type: application/json" -d '{"a": 50, "b": 5}' http://localhost:3001/divide
# Expected Output: {"result":10}
```

**Division by Zero (Error Handling):**
```bash
curl -X POST -H "Content-Type: application/json" -d '{"a": 10, "b": 0}' http://localhost:3001/divide
# Expected Output: {"error":"Division by zero is not allowed"} (with HTTP status 400)
```

## 📦 Optional: Deployment

This project can be deployed to various platforms. Here are some suggestions:

*   **GitHub Pages**: Suitable for deploying the `apps/frontend` static site. You would need to configure GitHub Actions to build the frontend and deploy the `dist` folder.
*   **Coolify / Render / Vercel**: For deploying the Node.js backend services (`soap-server`, `soap-proxy`) and potentially the frontend.

## ⚠️ Academic Disclaimer

This project was developed by Marcelo Santos (a79433) as part of the "Desenvolvimento de Aplicações Web 2025/26" course at the Universidade do Algarve, LESTI, for educational purposes. It serves as the 1º Trabalho Prático and demonstrates the implementation of SOAP services and related concepts.