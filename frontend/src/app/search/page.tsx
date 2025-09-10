'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import strapi from '@/lib/strapi';

// Определим типы для результатов поиска
interface SearchResult {
  id: number;
  title: string;
  slug: string;
  __component: 'api::page.page' | 'api::news.news' | 'api::category.category';
}

const SearchResults = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (query) {
            const fetchResults = async () => {
                setLoading(true);
                try {
                    // !! Важно: этот эндпоинт /api/search нужно будет создать в Strapi
                    const response = await strapi.get('/api/search', { params: { q: query } });
                    setResults(response.data);
                } catch (error) {
                    console.error('Ошибка при выполнении поиска:', error);
                    setResults([]);
                }
                setLoading(false);
            };
            fetchResults();
        }
    }, [query]);

    const getLink = (item: SearchResult) => {
        switch (item.__component) {
            case 'api::page.page':
                return `/${item.slug}`;
            case 'api::news.news':
                return `/news/${item.slug}`;
            case 'api::category.category':
                 // Для категорий может понадобиться другая логика, например /categories/[slug]
                return `/${item.slug}`;
            default:
                return '#';
        }
    };

    if (loading) {
        return <p>Идет поиск...</p>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Результаты поиска по запросу: &quot;{query}&quot;</h1>
            {results.length > 0 ? (
                <ul>
                    {results.map(item => (
                        <li key={`${item.__component}-${item.id}`} className="mb-2">
                            <Link href={getLink(item)}>
                                <span className="text-blue-600 hover:underline">{item.title}</span>
                            </Link>
                            <span className="text-gray-500 ml-2">({item.__component.split('.')[1]})</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Ничего не найдено.</p>
            )}
        </div>
    );
};


const SearchPage = () => {
    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <SearchResults />
        </Suspense>
    )
}

export default SearchPage;
