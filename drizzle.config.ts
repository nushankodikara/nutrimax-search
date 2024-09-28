import type { Config } from "drizzle-kit";

export default {
    dialect: "sqlite",
    schema: "./src/lib/db/schema.ts",
    out: "./drizzle",
    driver: "turso",
    dbCredentials: {
        url: process.env.DB_URL || "",
        authToken: process.env.DB_AUTH_TOKEN || "",
    },
    verbose: true,
    strict: true,
} satisfies Config;
