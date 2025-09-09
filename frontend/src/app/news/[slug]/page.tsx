import React from 'react';
import { notFound } from 'next/navigation';
import strapi from '@/lib/strapi';

// Определим типы для данных
interface StrapiDataItem<T> {
  id: number;
  attributes: T;
}

interface News {
  title: string;
  content: string;
  publishedDate: string;
}

// Основной компонент страницы новости
const NewsPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  // Пытаемся найти новость по slug
  const findNews = async (): Promise<StrapiDataItem<News> | null> => {
    try {
      const response = await strapi.get('/api/news', {
        params: {
          filters: { slug: { $eq: slug } },
          populate: '*',
        },
      });

      if (response.data.data.length > 0) {
        return response.data.data[0];
      }
      return null;
    } catch (error) {
      console.error('Ошибка при поиске новости:', error);
      return null;
    }
  };

  const news = await findNews();

  // Если новость не найдена, показываем 404
  if (!news) {
    return notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{news.attributes.title}</h1>
      <p className="text-gray-500 mb-4">
        {new Date(news.attributes.publishedDate).toLocaleDateString('ru-RU')}
      </p>
      <div
        className="prose lg:prose-xl"
        dangerouslySetInnerHTML={{ __html: news.attributes.content }}
      />
    </div>
  );
};

export default NewsPage;
