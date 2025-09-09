'use client';

import React from 'react';
import Link from 'next/link';
import Search from '@/app/components/Search';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-bold">
        <Link href="/">Портал Знаний</Link>
      </div>
      <div className="flex items-center">
        <Search />
      </div>
    </header>
  );
};

export default Header;
