import dotenv from "dotenv";

const environment = process.env.NODE_ENV;
const pathDotenvFile = environment == null ? ".env": `.env.${environment}`;

/**
 * @description Loader environment variables of .env file
 */
dotenv.config({ path: pathDotenvFile });