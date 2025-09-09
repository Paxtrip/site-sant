import React from 'react';

type ContentProps = {
  children: React.ReactNode;
};

const Content: React.FC<ContentProps> = ({ children }) => {
  return (
    <main className="flex-1 p-4">
      {children}
    </main>
  );
};

export default Content;
