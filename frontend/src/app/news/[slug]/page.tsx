import React from 'react';
import { notFound } from 'next/navigation';
import strapi from '@/lib/strapi';
import PrintButton from '@/app/components/PrintButton'; // Импортируем кнопку

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

// Компонент страницы новости
const NewsPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  // Загружаем новость по slug
  const getNewsItem = async (): Promise<StrapiDataItem<News> | null> => {
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
      console.error(`Ошибка при загрузке новости "${slug}":`, error);
      return null;
    }
  };

  const newsItem = await getNewsItem();

  // Если новость не найдена, показываем 404
  if (!newsItem) {
    return notFound();
  }

  const { title, content, publishedDate } = newsItem.attributes;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-gray-500 mb-4">
        Опубликовано: {new Date(publishedDate).toLocaleDateString('ru-RU')}
      </p>
      <div
        className="prose lg:prose-xl"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <PrintButton />
    </div>
  );
};

export default NewsPage;
