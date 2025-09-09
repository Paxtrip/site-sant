import React from 'react';
import TreeMenu from '@/app/components/TreeMenu';
import Search from '@/app/components/Search'; // Добавим поиск в сайдбар

const Sidebar = () => {
  return (
    <div>
      {/* Поиск в верхней части сайдбара */}
      <div className="mb-6">
        <Search />
      </div>
      
      {/* Меню категорий */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
          Навигация
        </h2>
        <TreeMenu />
      </div>
    </div>
  );
};

export default Sidebar;
