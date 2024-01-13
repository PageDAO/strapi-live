module.exports = ({ env }) => ({
  apiToken: {
    salt: env('API_TOKEN_SALT', 'FoyWy6bBVqj3qvafVUxzeQ=='),
  },
  auth: {
    secret: env("ADMIN_JWT_SECRET", "b466455d-1488-461b-9d58-1940910d8373"),
  },
});
