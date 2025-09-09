import React from 'react';
import TreeMenu from '@/app/components/TreeMenu';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-100 p-4">
      <nav>
        <h2 className="text-lg font-bold mb-2">Категории</h2>
        <TreeMenu />
      </nav>
    </aside>
  );
};

export default Sidebar;
