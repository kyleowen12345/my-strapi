// config/middlewares.js
module.exports = [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  "strapi::cors",

  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
  // {
  //   name: "jwt-validation",
  //   // Make sure to point to the correct handler (path)
  //   config: {
  //     handler: require("../src/middlewares/jwt-validation"),
  //   },
  // },
];
