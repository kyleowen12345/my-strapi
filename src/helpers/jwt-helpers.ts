import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Helper function to validate JWT token
export const validateJwtToken = (token: string) => {
  try {
    // Access the JWT secret from environment variables
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error(
        "JWT secret is not defined in the environment variables."
      );
    }

    // Verify the token
    const decoded = jwt.verify(token, secretKey);
    return decoded; // Return the decoded payload if the token is valid
  } catch (error) {
    return null; // Return null if the token is invalid or an error occurs
  }
};
