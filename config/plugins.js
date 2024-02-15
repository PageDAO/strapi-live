module.exports = () => ({
    /* ...

    "dynamicxyz-auth": {
        enabled: true,
        config:{ DYNAMICXYZ_JSON_ENCRYPTION_KEY:"encryptMe" }
    },

    */
    'strapi-dynamicxyz-auth': {
        enabled: true,
        resolve: './src/plugins/strapi-dynamicxyz-auth'
      },
});