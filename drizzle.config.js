import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

dotenv.config({ path: '.env.local' }); // Explicitly load .env.local

console.log("Database URL:", process.env.DATABASE_URL); // Debugging output

export default defineConfig({
  schema: './utils/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL, // Ensure this is loaded correctly
  },
});
