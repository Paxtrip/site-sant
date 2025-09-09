'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   */
  async bootstrap({ strapi }) {
    // Функция-помощник для выдачи прав
    const grantPublicPermission = async (action) => {
        const publicRole = await strapi.query('plugin::users-permissions.role').findOne({ where: { type: 'public' } });

        if (!publicRole) {
            console.error('Could not find the public role. Make sure the users-permissions plugin is installed.');
            return;
        }

        const permission = await strapi.query('plugin::users-permissions.permission').findOne({
            where: {
                action: action,
                role: publicRole.id
            }
        });

        if (!permission) {
            await strapi.query('plugin::users-permissions.permission').create({
                data: {
                    action: action,
                    role: publicRole.id
                }
            });
            console.log(`Successfully granted public access to ${action}.`);
        } else {
            console.log(`Public access to ${action} is already granted.`);
        }
    };

    // Выдаем права для поиска и генерации PDF
    try {
        await grantPublicPermission('api::search.search.index');
        await grantPublicPermission('api::page.page.generatePdf');
    } catch (error) {
        console.error('Error during permission bootstrapping:', error);
    }
  },
};
