import { neon, neonConfig } from "@neondatabase/serverless";
import "dotenv/config"; // Load environment variables
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Enable connection pooling for NeonDB
neonConfig.fetchConnectionCache = true;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set! Check your .env.local file.");
}

const sql = neon(process.env.DATABASE_URL); // Use Neon HTTP Client
export const db = drizzle(sql, { schema });
