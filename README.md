# Universidade do Algarve
**Curso:** LESTI (Licenciatura em Engenharia de Sistemas e Tecnologias de Informação)  
**Unidade Curricular:** Desenvolvimento de Aplicações Web 2025/26  
**1º Trabalho Prático — Implementação de Serviço SOAP em Node.js**  
**Autor:** Marcelo Santos (a79433)

---

## 📘 Sobre o projeto
Este repositório reúne o trabalho prático nº 1 da UC Desenvolvimento de Aplicações Web. O objetivo consiste na construção de um serviço SOAP de calculadora aritmética em Node.js, acompanhado por um cliente de linha de comandos, um proxy REST e uma landing page de apresentação académica. Todos os componentes foram personalizados para refletir a identidade do estudante Marcelo Santos (a79433) e a marca da Universidade do Algarve.

### 🎯 Objetivos pedagógicos
- Compreender a estruturação de um serviço SOAP com WSDL próprio em Node.js.
- Validar dados de entrada e comunicar Faults adequados em cenários de erro.
- Reutilizar o serviço através de diferentes consumidores: CLI, proxy REST e frontend.
- Documentar, versionar e apresentar o trabalho segundo boas práticas profissionais.

---

## 🧱 Arquitetura do monorepositório
```
UAlg-SOAP-TP1WEB
├── apps
│   ├── soap-server     # Serviço SOAP + landing page institucional
│   ├── soap-client     # Cliente CLI para invocar operações SOAP
│   ├── soap-proxy      # Proxy Express que expõe endpoints REST/JSON
│   └── web             # Interface web (Vite + React) para apresentação e testes
├── packages
│   ├── shared-wsdl     # WSDL reutilizável carregado pelo servidor SOAP
│   └── shared-validators # Validadores de dados partilhados (ex: ensureNumber)
├── examples            # Exemplos de pedidos SOAP para cada operação
└── README.md           # Documento académico e guia de execução
```

### Fluxo de comunicação
1. **SOAP Server (`apps/soap-server`)** expõe o WSDL (`/wsdl?wsdl`) e as operações `add`, `subtract`, `multiply`, `divide`.
2. **SOAP Client (`apps/soap-client`)** consome o WSDL diretamente através de `soap.createClient` para automatizar pedidos.
3. **SOAP Proxy (`apps/soap-proxy`)** cria endpoints REST (`POST /add`, etc.) que convertem pedidos JSON em chamadas SOAP.
4. **Frontend (`apps/web` ou landing page `/`)** apresenta o contexto académico, permite testar operações e liga para os restantes componentes.

---

## 🚀 Como executar
Antes de iniciar qualquer serviço, instale as dependências com [Node.js LTS](https://nodejs.org/en/about/releases/) e [pnpm](https://pnpm.io/):

```bash
pnpm install
```

### Servidor SOAP + landing page
```bash
pnpm --filter soap-server dev
```
- Interface académica disponível em: http://localhost:3000/
- WSDL disponível em: http://localhost:3000/wsdl?wsdl

### Cliente SOAP (CLI)
```bash
pnpm --filter soap-client start add 7 5
```
- Resultado esperado: `12`
- Consulte a pasta [`examples/`](examples) para XML prontos a usar em Postman/SoapUI.

### Proxy REST
```bash
pnpm --filter soap-proxy dev
```
- Endpoint de exemplo: `POST http://localhost:3001/add` com corpo `{"a":7,"b":5}`.

### Frontend React (apps/web)
```bash
pnpm --filter web dev
```
- A interface destaca o contexto da UAlg, explica a arquitetura e permite aceder ao proxy REST.

### Atalhos úteis
```bash
pnpm --filter soap-server open:frontend  # Abre a landing page institucional (macOS)
```

---

## 🧪 Exemplos de mensagens SOAP
| Operação | Ficheiro | Conteúdo resumido |
|----------|----------|-------------------|
| Soma     | [`examples/add-request.xml`](examples/add-request.xml) | Envelope SOAP com `add` de `7` + `5` |
| Subtração| [`examples/subtract-request.xml`](examples/subtract-request.xml) | Envelope SOAP com `subtract` de `10` - `3` |
| Multiplicação| [`examples/multiply-request.xml`](examples/multiply-request.xml) | Envelope SOAP com `multiply` de `4` × `6` |
| Divisão  | [`examples/divide-request.xml`](examples/divide-request.xml) | Envelope SOAP com `divide` de `20` ÷ `4` |

---

## 🖥️ Interface de apresentação
A landing page disponível em `/` inclui:
- Cabeçalho institucional com logótipo UAlg, identificação do autor e curso.
- Guia rápido de execução com ligações diretas para o WSDL e repositório GitHub.
- Exemplos de chamadas SOAP e REST lado a lado.
- Objetivos de aprendizagem destacados e alternância de tema claro/escuro.

A aplicação React (`apps/web`) complementa esta experiência com componentes interativos, uma calculadora ligada ao proxy REST e indicações para demonstrações em aula.

---

## 📁 Estrutura de documentação adicional
- [`apps/web/README.md`](apps/web/README.md) — Manual específico da interface web/React.
- [`apps/soap-server/public/index.html`](apps/soap-server/public/index.html) — Landing page servida diretamente pelo servidor SOAP.
- [`packages/shared-wsdl/arithmetic.wsdl`](packages/shared-wsdl/arithmetic.wsdl) — Especificação WSDL anotada com o cabeçalho académico.

---

## 📜 Declaração académica
> Este projeto foi desenvolvido no âmbito da unidade curricular **Desenvolvimento de Aplicações Web 2025/26** do curso **LESTI** da Universidade do Algarve. Todo o código e documentação têm fins exclusivamente educativos e refletem o trabalho individual do estudante **Marcelo Santos (a79433)**.

---

## 📦 Sugestões de entrega
- Criar uma _release_ GitHub com o tag `tp1-v1.0` contendo o relatório PDF (se aplicável) e este código fonte.
- Exportar o repositório para `.zip` e submeter na plataforma institucional, garantindo a inclusão da pasta `examples/` para facilitar testes.
- Incluir no relatório capturas de ecrã da landing page e das execuções CLI/REST.

Bom desenvolvimento! 💻
