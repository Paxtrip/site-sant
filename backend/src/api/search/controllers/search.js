'use strict';

/**
 * A set of functions called "actions" for `search` api.
 */

module.exports = {
  index: async (ctx, next) => {
    const { q } = ctx.query;

    if (!q) {
      return ctx.badRequest('Параметр `q` является обязательным');
    }

    try {
      // Ищем страницы
      const pages = await strapi.entityService.findMany('api::page.page', {
        filters: {
          $or: [
            { title: { $containsi: q } },
            { content: { $containsi: q } },
          ],
        },
        fields: ['title', 'slug'],
      });

      // Ищем новости
      const news = await strapi.entityService.findMany('api::news.news', {
        filters: {
          $or: [
            { title: { $containsi: q } },
            { content: { $containsi: q } },
          ],
        },
        fields: ['title', 'slug'],
      });

      // Ищем категории
      const categories = await strapi.entityService.findMany('api::category.category', {
        filters: {
          title: { $containsi: q },
        },
        fields: ['title', 'slug'],
      });

      // Добавляем __component для идентификации на фронте
      const formattedPages = pages.map(item => ({ ...item, __component: 'api::page.page' }));
      const formattedNews = news.map(item => ({ ...item, __component: 'api::news.news' }));
      const formattedCategories = categories.map(item => ({ ...item, __component: 'api::category.category' }));

      // Объединяем результаты
      const results = [...formattedPages, ...formattedNews, ...formattedCategories];

      return results;
    } catch (err) {
      ctx.body = err;
    }
  },
};
