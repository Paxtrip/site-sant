"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Search = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Поиск по сайту..."
        className="px-2 py-1 border rounded-l-md text-black"
      />
      <button
        type="submit"
        className="px-3 py-1 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
      >
        Найти
      </button>
    </form>
  );
};

export default Search;
