'use strict';

/**
 * release-config router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::release-config.release-config');
