'use client';

import React from 'react';

const PrintButton = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="mt-4 px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 print-hidden"
    >
      Распечатать
    </button>
  );
};

export default PrintButton;
