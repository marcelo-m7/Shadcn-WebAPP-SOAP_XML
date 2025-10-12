import React from 'react';
import { Routes, Route } from 'react-router-dom';
import IndexPage from './pages/Index.tsx';
import ThemeToggle from './components/ThemeToggle.tsx';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 relative">
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        {/* Add other routes here */}
      </Routes>
    </div>
  );
}

export default App;