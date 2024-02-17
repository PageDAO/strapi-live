module.exports = () => ({
    /* ...

    "dynamicxyz-auth": {
        enabled: true,
        config:{ DYNAMICXYZ_JSON_ENCRYPTION_KEY:"encryptMe" }
    },

    */
    'strapi-dynamicxyz-auth': {
        enabled: true,
        resolve: './src/plugins/strapi-dynamicxyz-auth',
        config: { DYNAMICXYZ_JSON_ENCRYPTION_KEY:
          `-----BEGIN PUBLIC KEY-----
        MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA7HSlCX+GegZP5+K6Pu/p
        oWB9S1g4qOZNtsTuqlCSHK0FsuO1h/ii2cZoi5fdqq6tyVXkj8ByWy7QGcOLbL7m
        kclFGM3Qg3eBVMtcYbr5w5bzE1lRdmmEv4ka1iuyzkaNeFjQV+MbqmBrUZnpFTwG
        uxDJ7OBh+bf9KIM3MT1EuCsjRGdnvz92Qk+lsxREligGjLE1JhifnC3UTrOl7cws
        nJdg6SkD5k1c90FbuR3lQqn7b6obJOyUk0DI0ZUfl5zeG83C5ZDFO5LNthIodHVq
        mvfBtqw67PsmYpRCotfwN9NhdstinmwPxWhbEyjXOKweTnTcAVT3soWSNVmAmceo
        +Pdq56541cZB1gqGHBhGOLhxqJYvfKkmyuqm/M+64tSNAqLwIAnpNx3+4JTtc7aV
        IKZUzJNyOGG4bgf4OGSM0hkPXyKyh/kzdRjlXPHDPyH/mn1vaHVJtgh8LqNbyDez
        tYb88N7tq2CKTtw/VysIpQAhclbEXzODHI5KMltruZxYJSkSHHMLjhRGvwGQ6YNv
        Sdtc72teGcEnCDfX2Bl/aDJpjj26+QlhdcRfxXYG9wKb9/GNRaq0EKg8NpYsiR9W
        nDKpVjrVIpzX55m6MveUePIb3KZclbqwZmDzB7N4vBc7IRbE+frArhNNCq1kV5/X
        v1VCgVgxC0/XftQjCemPUVsCAwEAAQ==
        -----END PUBLIC KEY-----
        ` }
      },
});
