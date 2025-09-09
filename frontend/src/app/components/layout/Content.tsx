import React from 'react';

type ContentProps = {
  children: React.ReactNode;
};

const Content: React.FC<ContentProps> = ({ children }) => {
  // Основной контейнер для контента с белым фоном и скруглениями
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm min-h-full">
      {children}
    </div>
  );
};

export default Content;
