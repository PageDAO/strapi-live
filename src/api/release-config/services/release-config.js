'use strict';

/**
 * release-config service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::release-config.release-config');
