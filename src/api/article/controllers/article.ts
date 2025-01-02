import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::article.article",
  ({ strapi }) => ({
    async find(ctx) {
      try {
        // Fetch articles with relationships populated
        const articles = await strapi.entityService.findMany(
          "api::article.article",
          {
            populate: {
              cover: true, // Populate cover relationship
              author: {
                populate: ["avatar"], // Populate author and nested avatar
              },
            },
          }
        );

        ctx.body = articles;
      } catch (error) {
        ctx.throw(500, "An error occurred while fetching articles");
      }
    },

    async findOne(ctx) {
      const { id } = ctx.params;

      try {
        // Fetch a single article by ID with relationships populated
        const article = await strapi.entityService.findOne(
          "api::article.article",
          id,
          {
            populate: {
              cover: true, // Populate cover relationship
              author: {
                populate: ["avatar"], // Populate author and nested avatar
              },
            },
          }
        );

        if (!article) {
          return ctx.notFound("Article not found");
        }

        ctx.body = article;
      } catch (error) {
        ctx.throw(500, "An error occurred while fetching the article");
      }
    },
  })
);
