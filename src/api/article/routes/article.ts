export default {
  routes: [
    {
      method: "GET",
      path: "/findarticles", // Custom endpoint for all articles
      handler: "api::article.article.findarticles", // Points to the custom controller method
      config: {
        //   auth: false, // Set to true if authentication is required
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/findarticle/:id", // Custom endpoint for a single article
      handler: "api::article.article.findarticle", // Points to the custom controller method
      config: {
        //   auth: false, // Set to true if authentication is required
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/deletearticle/:id", // Custom endpoint for a single article
      handler: "api::article.article.deletearticle", // Points to the custom controller method
      config: {
        //   auth: false, // Set to true if authentication is required
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/createarticle",
      handler: "api::article.article.createarticle",
      config: {
        // auth: false, // or true if authentication is required
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/updatearticle/:id",
      handler: "api::article.article.updatearticle",
      config: {
        // auth: false, // or true if authentication is required
        policies: [],
        middlewares: [],
      },
    },
  ],
};

// import { factories } from "@strapi/strapi";

// export default factories.createCoreRouter("api::article.article");
