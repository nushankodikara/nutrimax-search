import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const users = sqliteTable('users', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const dieteryLogs = sqliteTable('dietery_logs', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: integer('user_id').references(() => users.id).notNull(),
    foodName: text('food_name').notNull(),
    brandName: text('brand_name'),
    servingSize: integer('serving_size').notNull(),
    servingSizeUnit: text('serving_size_unit').notNull(),
    energy: integer('energy').notNull(),
    energyUnit: text('energy_unit').notNull(),
    proteins: integer('proteins').notNull(),
    proteinsUnit: text('proteins_unit').notNull(),
    carbs: integer('carbs').notNull(),
    carbsUnit: text('carbs_unit').notNull(),
    fats: integer('fats').notNull(),
    fatsUnit: text('fats_unit').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export type User = typeof users.$inferSelect;