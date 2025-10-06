import { type User, type InsertUser, type Product, type InsertProduct, type CustomOrder, type InsertCustomOrder, type Contact, type InsertContact } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  getCustomOrders(): Promise<CustomOrder[]>;
  getCustomOrder(id: string): Promise<CustomOrder | undefined>;
  createCustomOrder(order: InsertCustomOrder): Promise<CustomOrder>;
  
  getContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;
  private customOrders: Map<string, CustomOrder>;
  private contacts: Map<string, Contact>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.customOrders = new Map();
    this.contacts = new Map();
    
    // Initialize with sample products
    this.initializeProducts();
  }

  private initializeProducts() {
    const sampleProducts: Omit<Product, 'id' | 'createdAt'>[] = [
      {
        name: "Ankara Midi Dress",
        description: "Traditional print, modern silhouette",
        category: "african-prints",
        type: "ready",
        priceKES: 15500,
        images: ["product1"],
        availableSizes: ["S", "M", "L"],
        fabricOptions: ["Ankara Cotton"],
        inStock: 5,
        featured: "true"
      },
      {
        name: "Kitenge Shirt",
        description: "Casual elegance for any occasion",
        category: "african-prints",
        type: "ready",
        priceKES: 8900,
        images: ["product2"],
        availableSizes: ["M", "L", "XL"],
        fabricOptions: ["Kitenge Cotton"],
        inStock: 8,
        featured: "true"
      },
      {
        name: "Executive Blazer",
        description: "Professional with African flair",
        category: "suits",
        type: "ready",
        priceKES: 22000,
        images: ["product3"],
        availableSizes: ["S", "M", "L"],
        fabricOptions: ["Wool Blend"],
        inStock: 3,
        featured: "true"
      },
      {
        name: "Traditional Set",
        description: "Cultural heritage meets modern design",
        category: "traditional",
        type: "ready",
        priceKES: 18500,
        images: ["product4"],
        availableSizes: ["S", "M", "L"],
        fabricOptions: ["Traditional Cotton"],
        inStock: 4,
        featured: "true"
      }
    ];

    sampleProducts.forEach(product => {
      const id = randomUUID();
      const fullProduct: Product = {
        ...product,
        id,
        createdAt: new Date()
      };
      this.products.set(id, fullProduct);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.category === category
    );
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { 
      ...insertProduct, 
      id, 
      createdAt: new Date(),
      images: insertProduct.images || [],
      availableSizes: insertProduct.availableSizes || null,
      fabricOptions: insertProduct.fabricOptions || null,
      inStock: insertProduct.inStock || null,
      featured: insertProduct.featured || null
    };
    this.products.set(id, product);
    return product;
  }

  async getCustomOrders(): Promise<CustomOrder[]> {
    return Array.from(this.customOrders.values());
  }

  async getCustomOrder(id: string): Promise<CustomOrder | undefined> {
    return this.customOrders.get(id);
  }

  async createCustomOrder(insertOrder: InsertCustomOrder): Promise<CustomOrder> {
    const id = randomUUID();
    const order: CustomOrder = { 
      ...insertOrder, 
      id, 
      status: 'pending',
      estimatedPrice: null,
      createdAt: new Date(),
      specialRequirements: insertOrder.specialRequirements || null
    };
    this.customOrders.set(id, order);
    return order;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date() 
    };
    this.contacts.set(id, contact);
    return contact;
  }
}

export const storage = new MemStorage();
