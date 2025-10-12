import React from 'react';
import Calculator from '../components/Calculator';

const IndexPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Calculator />
    </div>
  );
};

export default IndexPage;