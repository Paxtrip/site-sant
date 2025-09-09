'use strict';

/**
 * page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const puppeteer = require('puppeteer');

module.exports = createCoreController('api::page.page', ({ strapi }) =>  ({

  // Расширяем стандартный контроллер, добавляя новый метод
  async generatePdf(ctx) {
    const { id } = ctx.params;

    // 1. Находим страницу по ID
    const page = await strapi.entityService.findOne('api::page.page', id);

    if (!page) {
      return ctx.notFound('Страница не найдена');
    }

    try {
      // 2. Запускаем Puppeteer
      const browser = await puppeteer.launch({
        // В Docker может потребоваться опция --no-sandbox
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      const browserPage = await browser.newPage();

      // 3. Создаем HTML-контент для PDF
      // (можно вынести в отдельный шаблон)
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>${page.title}</title>
            <style>
              body { font-family: sans-serif; font-size: 14px; }
              h1 { font-size: 24px; border-bottom: 1px solid #ccc; padding-bottom: 10px; }
            </style>
          </head>
          <body>
            <h1>${page.title}</h1>
            <div>${page.content}</div>
          </body>
        </html>
      `;

      await browserPage.setContent(htmlContent, { waitUntil: 'networkidle0' });

      // 4. Генерируем PDF
      const pdfBuffer = await browserPage.pdf({ format: 'A4' });

      await browser.close();

      // 5. Отправляем PDF в ответе
      ctx.set('Content-Type', 'application/pdf');
      ctx.set('Content-Disposition', `attachment; filename="${page.slug || page.id}.pdf"`);
      ctx.send(pdfBuffer);

    } catch (error) {
      console.error('Ошибка при генерации PDF:', error);
      ctx.internalServerError('Не удалось сгенерировать PDF', { error: error.message });
    }
  }
}));
