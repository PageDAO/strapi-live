module.exports = ({ env }) => ({
    "firebase-auth": {
        enabled: true,
        config:{ FIREBASE_JSON_ENCRYPTION_KEY:"encryptMe" }
    },
  });
  