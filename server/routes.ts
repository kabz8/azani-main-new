import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCustomOrderSchema, insertContactSchema, insertProductSchema, updateProductSchema, updateCustomOrderSchema } from "@shared/schema";
import { z } from "zod";

// Simple admin middleware - in production, use proper session management
const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== 'Bearer admin-token') {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Products endpoints
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const products = await storage.getProductsByCategory(category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products by category" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Custom orders endpoints
  app.post("/api/custom-orders", async (req, res) => {
    try {
      const validatedData = insertCustomOrderSchema.parse(req.body);
      const order = await storage.createCustomOrder(validatedData);
      res.status(201).json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid order data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create custom order" });
    }
  });

  app.get("/api/custom-orders", async (req, res) => {
    try {
      const orders = await storage.getCustomOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch custom orders" });
    }
  });

  // Contact form endpoint
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json(contact);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid contact data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  // Currency conversion endpoint
  app.get("/api/exchange-rate", async (req, res) => {
    try {
      // In a real application, fetch from a currency API
      // For now, using a fixed rate
      const rate = 150; // 1 USD = 150 KES (approximate)
      res.json({ usdToKes: rate, kesToUsd: 1 / rate });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch exchange rate" });
    }
  });

  // Admin Authentication - Simple token-based auth for demo
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Simple hardcoded admin check - in production, use proper auth
      if (username === "admin" && password === "admin123") {
        res.json({ 
          token: "admin-token",
          user: { username: "admin", isAdmin: true }
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Admin session check
  app.get("/api/admin/session", adminMiddleware, async (req, res) => {
    res.json({ 
      user: { username: "admin", isAdmin: true }
    });
  });

  // Admin Products Management
  app.get("/api/admin/products", adminMiddleware, async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.post("/api/admin/products", adminMiddleware, async (req, res) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedData);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create product" });
    }
  });

  app.patch("/api/admin/products/:id", adminMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = updateProductSchema.parse(req.body);
      const product = await storage.updateProduct(id, validatedData);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update product" });
    }
  });

  app.delete("/api/admin/products/:id", adminMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteProduct(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete product" });
    }
  });

  // Admin Custom Orders Management
  app.get("/api/admin/orders", adminMiddleware, async (req, res) => {
    try {
      const orders = await storage.getCustomOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  app.patch("/api/admin/orders/:id", adminMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = updateCustomOrderSchema.parse(req.body);
      const order = await storage.updateCustomOrder(id, validatedData);
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      res.json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid order data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update order" });
    }
  });

  // Admin Contacts
  app.get("/api/admin/contacts", adminMiddleware, async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  // Admin Analytics
  app.get("/api/admin/analytics", adminMiddleware, async (req, res) => {
    try {
      const analytics = await storage.getAnalytics();
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
