import { factories } from "@strapi/strapi";
import { validateJwtToken } from "../../../helpers/jwt-helpers";

export default factories.createCoreController(
  "api::article.article",
  ({ strapi }) => ({
    async findarticles(ctx) {
      // Custom check for JWT token (attached to ctx.state.user by the middleware)

      const token = ctx.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header
      const user = validateJwtToken(token);

      if (!user) {
        ctx.throw(401, "Unauthorized");
      }

      try {
        const articles = await strapi.entityService.findMany(
          "api::article.article",
          {
            populate: {
              cover: true,
              category: true,
              author: {
                populate: ["avatar"],
              },
            },
          }
        );
        ctx.body = articles;
      } catch (error) {
        console.error(error); // Log the error for debugging
        ctx.throw(500, "An error occurred while fetching populated articles");
      }
    },

    async findarticle(ctx) {
      const { id } = ctx.params;

      const token = ctx.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header
      const user = validateJwtToken(token);

      if (!user) {
        ctx.throw(401, "Unauthorized");
      }

      try {
        const article = await strapi.entityService.findOne(
          "api::article.article",
          id,
          {
            populate: {
              cover: true,
              category: true,
              author: {
                populate: ["avatar"],
              },
            },
          }
        );

        if (!article) {
          return ctx.notFound("Article not found");
        }

        ctx.body = article;
      } catch (error) {
        console.error(error); // Log the error for debugging
        ctx.throw(
          500,
          "An error occurred while fetching the populated article"
        );
      }
    },

    async deletearticle(ctx) {
      const { id } = ctx.params;

      const token = ctx.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header
      const user = validateJwtToken(token);

      if (!user) {
        ctx.throw(401, "Unauthorized");
      }

      try {
        // Use findOne to find the article by documentId
        const article = await strapi.entityService.findOne(
          "api::article.article",
          id,
          {
            populate: {
              cover: true,
              author: {
                populate: ["avatar"],
              },
            },
          }
        );

        if (!article) {
          return ctx.notFound("Article not found");
        }

        // Use delete to remove the article
        await strapi.entityService.delete("api::article.article", article.id);

        ctx.body = { message: "Article successfully deleted" };
      } catch (error) {
        console.error(error); // Log the error for debugging
        ctx.throw(500, "An error occurred while deleting the article");
      }
    },

    async createarticle(ctx) {
      const token = ctx.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header
      const user = validateJwtToken(token);

      if (!user) {
        ctx.throw(401, "Unauthorized");
      }
      try {
        // Access form data (text fields)
        const { title, description, slug, authorId, categoryId } =
          ctx.request.body;

        // Ensure the required fields are present
        if (!title || !description || !slug || !authorId || !categoryId) {
          return ctx.badRequest(
            "Missing required fields: title, description, slug, authorId, or categoryId"
          );
        }

        // Ensure the slug is unique
        const existingArticleWithSlug = await strapi.entityService.findMany(
          "api::article.article",
          { filters: { slug } }
        );

        if (existingArticleWithSlug.length > 0) {
          return ctx.badRequest("Slug must be unique");
        }

        // Check if the author and category exist
        const authorExists = await strapi.entityService.findOne(
          "api::author.author",
          authorId
        );
        const categoryExists = await strapi.entityService.findOne(
          "api::category.category",
          categoryId
        );

        if (!authorExists) {
          return ctx.badRequest("Author does not exist");
        }

        if (!categoryExists) {
          return ctx.badRequest("Category does not exist");
        }

        // Use the ID of the default cover image if no cover image is uploaded

        // Create the article with the data and default cover image
        const newArticle = await strapi.entityService.create(
          "api::article.article",
          {
            data: {
              title,
              description,
              slug,

              author: authorExists.id, // Author ID
              category: categoryExists.id, // Category ID
            },
          }
        );

        // Return the created article
        ctx.body = newArticle;
      } catch (error) {
        console.error(error); // Log the error for debugging
        ctx.throw(500, "An error occurred while creating the article");
      }
    },

    async updatearticle(ctx) {
      const { id } = ctx.params;

      const token = ctx.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header
      const user = validateJwtToken(token);

      if (!user) {
        ctx.throw(401, "Unauthorized");
      }

      // Fetch the article to be updated
      const article = await strapi.entityService.findOne(
        "api::article.article",
        id,
        {
          populate: ["cover", "author", "category"],
        }
      );

      if (!article) {
        return ctx.notFound("Article not found");
      }

      // Extract data from the request (from form data or JSON body)
      const { title, description, slug, authorId, categoryId } =
        ctx.request.body;

      // Check if required fields are provided
      if (!title || !description || !slug || !authorId || !categoryId) {
        return ctx.badRequest("Missing required fields");
      }

      // Update article data
      const updatedArticle = await strapi.entityService.update(
        "api::article.article",
        id,
        {
          data: {
            title,
            description,
            slug,
            author: { id: authorId },
            category: { id: categoryId },
          },
        }
      );

      // Return the updated article data
      ctx.body = updatedArticle;
    },
  })
);
