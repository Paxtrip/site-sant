'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // Добавляем разрешение для публичного доступа к нашему API поиска
    const publicRole = await strapi.query('plugin::users-permissions.role').findOne({ where: { type: 'public' } });

    if (publicRole) {
      // Находим права доступа, связанные с этой ролью
      let permissions = publicRole.permissions;

      // Проверяем, существует ли уже такое разрешение
      const searchPermission = permissions.find(
        p => p.action === 'api::search.search.index'
      );

      if (!searchPermission) {
        // Если разрешения нет, создаем и добавляем его
        const newPermission = await strapi.query('plugin::users-permissions.permission').create({
          data: {
            action: 'api::search.search.index',
            role: publicRole.id
          }
        });

        console.log('Successfully granted public access to the search API.');
      } else {
        console.log('Public access to the search API is already granted.');
      }
    } else {
        console.error('Could not find the public role. Make sure the users-permissions plugin is installed.');
    }
  },
};
