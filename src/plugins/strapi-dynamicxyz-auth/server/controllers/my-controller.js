'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('strapi-dynamicxyz-auth')
      .service('myService')
      .getWelcomeMessage();
  },
});
