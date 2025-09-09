import React from 'react';
import Link from 'next/link';
import strapi from '@/lib/strapi';

// Определим типы для данных
interface StrapiDataItem<T> {
  id: number;
  attributes: T;
}

interface News {
  title: string;
  slug: string;
  publishedDate: string;
}

// Компонент главной страницы
const HomePage = async () => {
  // Получаем новости
  const getNews = async (): Promise<StrapiDataItem<News>[]> => {
    try {
      const response = await strapi.get('/api/news', {
        params: {
          sort: 'publishedDate:desc',
          pagination: { limit: 5 }, // Ограничимся 5 последними новостями
        },
      });
      return response.data.data;
    } catch (error) {
      console.error('Ошибка при загрузке новостей:', error);
      return [];
    }
  };

  const news = await getNews();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Главная страница</h1>

      <section>
        <h2 className="text-2xl font-bold mb-3">Последние новости</h2>
        {news.length > 0 ? (
          <ul>
            {news.map((item) => (
              <li key={item.id} className="mb-2">
                <Link href={`/news/${item.attributes.slug}`}>
                  <span className="text-blue-600 hover:underline">
                    {item.attributes.title}
                  </span>
                </Link>
                <span className="text-gray-500 ml-2">
                  {new Date(item.attributes.publishedDate).toLocaleDateString('ru-RU')}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>Новостей пока нет.</p>
        )}
      </section>
    </div>
  );
};

export default HomePage;
