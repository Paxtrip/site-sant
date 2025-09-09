'use client';

import React from 'react';
import Link from 'next/link';
import Search from '@/app/components/Search';

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-gray-800">
          <Link href="/">Портал Знаний</Link>
        </div>
        {/* Поиск в шапке будет виден только на маленьких экранах */}
        <div className="md:hidden">
          <Search />
        </div>
      </div>
    </header>
  );
};

export default Header;
