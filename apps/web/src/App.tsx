/**
 * Universidade do Algarve - LESTI 2025/26
 * UC: Desenvolvimento de Aplicações Web
 * 1º Trabalho Prático: Implementação de Serviço SOAP em Node.js
 * Autor: Marcelo Santos (a79433)
 */

import React from "react";
import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/Index.tsx";
import ThemeToggle from "./components/ThemeToggle.tsx";

function App() {
  return (
    <div className="min-h-screen bg-ualg-light dark:bg-ualg-night text-ualg-ink dark:text-ualg-snow relative">
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<IndexPage />} />
      </Routes>
    </div>
  );
}

export default App;
