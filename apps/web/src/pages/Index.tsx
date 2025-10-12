import React from 'react';

const IndexPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to your Dyad React App!</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        This is your starting page. Let's build something amazing!
      </p>
    </div>
  );
};

export default IndexPage;