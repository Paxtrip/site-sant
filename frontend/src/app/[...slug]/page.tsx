import React from 'react';
import { notFound } from 'next/navigation';
import strapi from '@/lib/strapi';

// Определим типы для данных
interface StrapiDataItem<T> {
  id: number;
  attributes: T;
}

interface Page {
  title: string;
  content: string;
}

// Эта функция будет генерировать статические пути во время сборки
// export async function generateStaticParams() { ... }

// Основной компонент страницы
const DynamicPage = async ({ params }: { params: { slug: string[] } }) => {
  const slug = params.slug.join('/');

  // Пытаемся найти страницу по slug
  const findPage = async (): Promise<StrapiDataItem<Page> | null> => {
    try {
      const response = await strapi.get('/api/pages', {
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
      console.error('Ошибка при поиске страницы:', error);
      return null;
    }
  };

  const page = await findPage();

  // Если страница не найдена, показываем 404
  if (!page) {
    return notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{page.attributes.title}</h1>
      <div
        className="prose lg:prose-xl"
        dangerouslySetInnerHTML={{ __html: page.attributes.content }}
      />
    </div>
  );
};

export default DynamicPage;
