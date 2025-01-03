// ./config/plugins.js

export default ({ env }) => ({
  "users-permissions": {
    config: {
      jwt: {
        expiresIn: "1d", // Expiration time for the token
      },
    },
  },
  auth: {
    secret: env("JWT_SECRET", "your-secret-key"), // Set the JWT secret in the auth configuration
  },
});
