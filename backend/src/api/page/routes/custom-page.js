'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/pages/:id/pdf',
      handler: 'page.generatePdf',
      config: {
        // Мы можем добавить политики для проверки прав доступа, если нужно
        policies: [],
      },
    },
  ],
};
