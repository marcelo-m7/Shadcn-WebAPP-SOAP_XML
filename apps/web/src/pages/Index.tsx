/**
 * Universidade do Algarve - LESTI 2025/26
 * UC: Desenvolvimento de Aplicações Web
 * 1º Trabalho Prático: Implementação de Serviço SOAP em Node.js
 * Autor: Marcelo Santos (a79433)
 */

import React from "react";
import Calculator from "../components/Calculator";

const IndexPage: React.FC = () => {
  return (
    <div className="relative pb-16">
      <div className="absolute inset-x-0 top-0 -z-10 h-[320px] bg-gradient-to-br from-ualg-blue/90 via-ualg-green/70 to-ualg-blue/90 dark:from-ualg-night dark:via-ualg-blue dark:to-ualg-night" />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <section className="text-center text-white mb-16">
          <p className="uppercase tracking-[0.4em] text-sm font-semibold text-ualg-gold/90">Universidade do Algarve · LESTI 2025/26</p>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold leading-tight">
            SOAP Calculator · Marcelo Santos (a79433)
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-base sm:text-lg text-white/90">
            1º Trabalho Prático da unidade curricular <strong>Desenvolvimento de Aplicações Web</strong> — implementação
            integral de um serviço SOAP em Node.js com cliente CLI, proxy REST e interface de apresentação académica.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a className="inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/30" href="http://localhost:3000/wsdl?wsdl">
              Ver WSDL
            </a>
            <a className="inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/30" href="https://github.com/marcelo-m7/UAlg-SOAP-TP1WEB" target="_blank" rel="noreferrer">
              Repositório GitHub
            </a>
            <a className="inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/30" href="http://localhost:3000/">
              Landing Page Servidor
            </a>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3 mb-16">
          <article className="rounded-3xl bg-white/90 dark:bg-slate-900/80 shadow-xl ring-1 ring-black/5 dark:ring-white/10 p-6">
            <h2 className="text-xl font-semibold text-ualg-blue dark:text-ualg-gold">Componentes</h2>
            <ul className="mt-4 space-y-2 text-sm text-ualg-ink/80 dark:text-ualg-snow/80">
              <li>• Servidor SOAP com WSDL académico e landing page institucional.</li>
              <li>• Cliente CLI para rápida validação de operações.</li>
              <li>• Proxy REST Express para consumo por aplicações modernas.</li>
              <li>• Interface React com modo escuro e calculadora integrada.</li>
            </ul>
          </article>
          <article className="rounded-3xl bg-white/90 dark:bg-slate-900/80 shadow-xl ring-1 ring-black/5 dark:ring-white/10 p-6">
            <h2 className="text-xl font-semibold text-ualg-blue dark:text-ualg-gold">Tecnologias</h2>
            <ul className="mt-4 space-y-2 text-sm text-ualg-ink/80 dark:text-ualg-snow/80">
              <li>• Node.js LTS + pnpm + Turborepo.</li>
              <li>• Biblioteca <code>soap</code> para publicação do serviço.</li>
              <li>• Express e Fetch API para o proxy REST.</li>
              <li>• Vite, React e Tailwind CSS para o frontend académico.</li>
            </ul>
          </article>
          <article className="rounded-3xl bg-white/90 dark:bg-slate-900/80 shadow-xl ring-1 ring-black/5 dark:ring-white/10 p-6">
            <h2 className="text-xl font-semibold text-ualg-blue dark:text-ualg-gold">Execução</h2>
            <ul className="mt-4 space-y-2 text-sm text-ualg-ink/80 dark:text-ualg-snow/80">
              <li><code>pnpm --filter soap-server dev</code> — Inicia servidor SOAP.</li>
              <li><code>pnpm --filter soap-proxy dev</code> — Disponibiliza endpoints REST.</li>
              <li><code>pnpm --filter soap-client start add 7 5</code> — Invoca operação SOAP.</li>
              <li><code>pnpm --filter web dev</code> — Executa este frontend.</li>
            </ul>
          </article>
        </section>

        <section className="grid gap-8 lg:grid-cols-2 items-start">
          <div className="rounded-3xl bg-white/90 dark:bg-slate-900/80 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 p-8">
            <h2 className="text-2xl font-semibold text-ualg-blue dark:text-ualg-gold">Calculadora SOAP (via Proxy REST)</h2>
            <p className="mt-3 text-sm text-ualg-ink/80 dark:text-ualg-snow/70">
              As operações abaixo comunicam com o proxy REST (<code>http://localhost:3001</code>) que, por sua vez,
              encaminha os pedidos para o serviço SOAP académico.
            </p>
            <div className="mt-6">
              <Calculator />
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-3xl bg-white/90 dark:bg-slate-900/80 shadow-xl ring-1 ring-black/5 dark:ring-white/10 p-8">
              <h2 className="text-2xl font-semibold text-ualg-blue dark:text-ualg-gold">SOAP vs REST</h2>
              <div className="mt-4 grid gap-4">
                <div>
                  <h3 className="text-lg font-semibold">Envelope SOAP</h3>
                  <pre className="mt-2 text-sm overflow-x-auto rounded-2xl bg-ualg-blue/10 dark:bg-ualg-blue/30 p-4 text-left text-ualg-ink dark:text-ualg-snow"><code>{`<soap:Envelope>
  <soap:Body>
    <add>
      <a>7</a>
      <b>5</b>
    </add>
  </soap:Body>
</soap:Envelope>`}</code></pre>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Pedido REST</h3>
                  <pre className="mt-2 text-sm overflow-x-auto rounded-2xl bg-ualg-green/10 dark:bg-ualg-green/20 p-4 text-left text-ualg-ink dark:text-ualg-snow"><code>{`POST http://localhost:3001/add
Content-Type: application/json
{
  "a": 7,
  "b": 5
}`}</code></pre>
                </div>
              </div>
            </div>
            <div className="rounded-3xl bg-white/90 dark:bg-slate-900/80 shadow-xl ring-1 ring-black/5 dark:ring-white/10 p-8">
              <h2 className="text-2xl font-semibold text-ualg-blue dark:text-ualg-gold">Declaração académica</h2>
              <p className="mt-3 text-sm text-ualg-ink/80 dark:text-ualg-snow/70">
                Projeto desenvolvido por <strong>Marcelo Santos (a79433)</strong> no âmbito da UC Desenvolvimento de Aplicações
                Web 2025/26 da Universidade do Algarve. Todo o código tem fins estritamente educativos e demonstra o domínio de
                protocolos SOAP aplicados a serviços web modernos.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default IndexPage;
