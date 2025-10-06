import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: text("is_admin").default('false'),
});

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // 'african-prints', 'suits', 'traditional', 'ready-made'
  type: text("type").notNull(), // 'custom' or 'ready'
  priceKES: integer("price_kes").notNull(),
  images: text("images").array().notNull().default(sql`'{}'`),
  availableSizes: text("available_sizes").array().default(sql`'{}'`),
  fabricOptions: text("fabric_options").array().default(sql`'{}'`),
  inStock: integer("in_stock").default(0),
  featured: text("featured").default('false'),
  createdAt: timestamp("created_at").defaultNow(),
});

export const customOrders = pgTable("custom_orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  garmentType: text("garment_type").notNull(),
  fabricPreference: text("fabric_preference").notNull(),
  measurements: jsonb("measurements").notNull(), // { chest, waist, hip, etc. }
  specialRequirements: text("special_requirements"),
  status: text("status").notNull().default('pending'), // 'pending', 'in-progress', 'completed'
  estimatedPrice: integer("estimated_price"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
});

export const updateProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
}).partial();

export const insertCustomOrderSchema = createInsertSchema(customOrders).omit({
  id: true,
  createdAt: true,
  status: true,
  estimatedPrice: true,
});

export const updateCustomOrderSchema = z.object({
  status: z.enum(['pending', 'in-progress', 'completed']).optional(),
  estimatedPrice: z.number().int().positive().optional(),
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type UpdateProduct = z.infer<typeof updateProductSchema>;
export type CustomOrder = typeof customOrders.$inferSelect;
export type InsertCustomOrder = z.infer<typeof insertCustomOrderSchema>;
export type UpdateCustomOrder = z.infer<typeof updateCustomOrderSchema>;
export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
