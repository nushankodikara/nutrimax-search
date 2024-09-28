import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

const client = createClient({ url: process.env.DB_URL as string, authToken: process.env.DB_AUTH_TOKEN as string });
export const db = drizzle(client);

// const result = await db.select().from(users).all()
