import { type User, type InsertUser, type Product, type InsertProduct, type UpdateProduct, type CustomOrder, type InsertCustomOrder, type UpdateCustomOrder, type Contact, type InsertContact } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, updates: UpdateProduct): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;
  
  getCustomOrders(): Promise<CustomOrder[]>;
  getCustomOrder(id: string): Promise<CustomOrder | undefined>;
  createCustomOrder(order: InsertCustomOrder): Promise<CustomOrder>;
  updateCustomOrder(id: string, updates: UpdateCustomOrder): Promise<CustomOrder | undefined>;
  
  getContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
  
  getAnalytics(): Promise<{
    totalProducts: number;
    totalOrders: number;
    pendingOrders: number;
    inProgressOrders: number;
    completedOrders: number;
    totalContacts: number;
  }>;
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
      // Women's Tops
      {
        name: "Ankara Print Blouse",
        description: "Vibrant African print blouse with modern cut",
        category: "womens-tops",
        type: "ready",
        priceKES: 6500,
        images: ["https://images.unsplash.com/photo-1594633313593-bab3997b60db?w=800"],
        availableSizes: ["S", "M", "L", "XL"],
        fabricOptions: ["Ankara Cotton"],
        inStock: 12,
        featured: "true"
      },
      {
        name: "Kitenge Wrap Top",
        description: "Elegant wrap-style top with traditional patterns",
        category: "womens-tops",
        type: "ready",
        priceKES: 7200,
        images: ["https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=800"],
        availableSizes: ["S", "M", "L"],
        fabricOptions: ["Kitenge Silk Blend"],
        inStock: 8,
        featured: "false"
      },
      {
        name: "Off-Shoulder African Print Top",
        description: "Trendy off-shoulder design with bold prints",
        category: "womens-tops",
        type: "ready",
        priceKES: 5800,
        images: ["https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=800"],
        availableSizes: ["M", "L", "XL"],
        fabricOptions: ["Ankara Cotton"],
        inStock: 10,
        featured: "false"
      },
      // Women's Blazers
      {
        name: "Ankara Print Blazer",
        description: "Professional blazer with vibrant African prints",
        category: "womens-blazers",
        type: "ready",
        priceKES: 18500,
        images: ["https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800"],
        availableSizes: ["S", "M", "L"],
        fabricOptions: ["Cotton Blend"],
        inStock: 5,
        featured: "true"
      },
      {
        name: "Executive Kitenge Jacket",
        description: "Sophisticated tailored jacket with traditional patterns",
        category: "womens-blazers",
        type: "ready",
        priceKES: 21000,
        images: ["https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800"],
        availableSizes: ["S", "M", "L", "XL"],
        fabricOptions: ["Wool Kitenge Blend"],
        inStock: 4,
        featured: "true"
      },
      // Women's Skirts
      {
        name: "Ankara Pencil Skirt",
        description: "Classic pencil cut with stunning African prints",
        category: "womens-skirts",
        type: "ready",
        priceKES: 8900,
        images: ["https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800"],
        availableSizes: ["S", "M", "L", "XL"],
        fabricOptions: ["Ankara Cotton"],
        inStock: 15,
        featured: "true"
      },
      {
        name: "Kitenge A-Line Skirt",
        description: "Flowing A-line silhouette with traditional motifs",
        category: "womens-skirts",
        type: "ready",
        priceKES: 9500,
        images: ["https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800"],
        availableSizes: ["M", "L", "XL"],
        fabricOptions: ["Kitenge Cotton"],
        inStock: 10,
        featured: "false"
      },
      // Women's Short Dresses
      {
        name: "Ankara Fit & Flare Dress",
        description: "Playful short dress with vibrant African prints",
        category: "womens-short-dresses",
        type: "ready",
        priceKES: 12500,
        images: ["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800"],
        availableSizes: ["S", "M", "L"],
        fabricOptions: ["Ankara Cotton"],
        inStock: 8,
        featured: "true"
      },
      {
        name: "Kitenge Wrap Dress",
        description: "Versatile wrap dress with traditional patterns",
        category: "womens-short-dresses",
        type: "ready",
        priceKES: 11800,
        images: ["https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=800"],
        availableSizes: ["S", "M", "L", "XL"],
        fabricOptions: ["Kitenge Silk Blend"],
        inStock: 12,
        featured: "false"
      },
      {
        name: "African Print Shift Dress",
        description: "Contemporary shift dress with bold prints",
        category: "womens-short-dresses",
        type: "ready",
        priceKES: 10500,
        images: ["https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800"],
        availableSizes: ["M", "L", "XL"],
        fabricOptions: ["Ankara Cotton"],
        inStock: 9,
        featured: "false"
      },
      // Women's Maxi Dresses
      {
        name: "Ankara Maxi Gown",
        description: "Elegant floor-length gown with African prints",
        category: "womens-maxi-dresses",
        type: "ready",
        priceKES: 16500,
        images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800"],
        availableSizes: ["S", "M", "L", "XL"],
        fabricOptions: ["Ankara Silk"],
        inStock: 6,
        featured: "true"
      },
      {
        name: "Kitenge Empire Dress",
        description: "Flowing empire waist maxi with traditional motifs",
        category: "womens-maxi-dresses",
        type: "ready",
        priceKES: 15200,
        images: ["https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800"],
        availableSizes: ["S", "M", "L"],
        fabricOptions: ["Kitenge Cotton"],
        inStock: 7,
        featured: "true"
      },
      // Men's Shirts
      {
        name: "Ankara Print Shirt",
        description: "Bold African print shirt for the modern man",
        category: "mens-shirts",
        type: "ready",
        priceKES: 7800,
        images: ["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800"],
        availableSizes: ["M", "L", "XL", "XXL"],
        fabricOptions: ["Ankara Cotton"],
        inStock: 14,
        featured: "true"
      },
      {
        name: "Kitenge Button-Down Shirt",
        description: "Classic button-down with traditional patterns",
        category: "mens-shirts",
        type: "ready",
        priceKES: 8500,
        images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800"],
        availableSizes: ["M", "L", "XL"],
        fabricOptions: ["Kitenge Cotton"],
        inStock: 11,
        featured: "true"
      },
      {
        name: "African Print Casual Shirt",
        description: "Relaxed fit shirt with vibrant African motifs",
        category: "mens-shirts",
        type: "ready",
        priceKES: 6900,
        images: ["https://images.unsplash.com/photo-1598032895397-b9d14ab20d97?w=800"],
        availableSizes: ["L", "XL", "XXL"],
        fabricOptions: ["Ankara Cotton"],
        inStock: 13,
        featured: "false"
      },
      // Men's Bomber Jackets
      {
        name: "Ankara Bomber Jacket",
        description: "Contemporary bomber with African print accents",
        category: "mens-bomber-jackets",
        type: "ready",
        priceKES: 19500,
        images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800"],
        availableSizes: ["M", "L", "XL"],
        fabricOptions: ["Ankara Polyester Blend"],
        inStock: 6,
        featured: "true"
      },
      {
        name: "Kitenge Varsity Jacket",
        description: "Sporty varsity style with traditional prints",
        category: "mens-bomber-jackets",
        type: "ready",
        priceKES: 21000,
        images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800"],
        availableSizes: ["L", "XL", "XXL"],
        fabricOptions: ["Kitenge Cotton Blend"],
        inStock: 5,
        featured: "true"
      },
      // Kids - Boys
      {
        name: "Boys Ankara Shirt Set",
        description: "Matching shirt and shorts with vibrant prints",
        category: "kids-boys",
        type: "ready",
        priceKES: 5500,
        images: ["https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800"],
        availableSizes: ["4-6Y", "7-9Y", "10-12Y"],
        fabricOptions: ["Ankara Cotton"],
        inStock: 10,
        featured: "true"
      },
      {
        name: "Boys Kitenge Casual Outfit",
        description: "Comfortable casual wear with traditional patterns",
        category: "kids-boys",
        type: "ready",
        priceKES: 4800,
        images: ["https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800"],
        availableSizes: ["4-6Y", "7-9Y", "10-12Y"],
        fabricOptions: ["Kitenge Cotton"],
        inStock: 12,
        featured: "false"
      },
      // Kids - Girls
      {
        name: "Girls Ankara Dress",
        description: "Adorable dress with colorful African prints",
        category: "kids-girls",
        type: "ready",
        priceKES: 5200,
        images: ["https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800"],
        availableSizes: ["4-6Y", "7-9Y", "10-12Y"],
        fabricOptions: ["Ankara Cotton"],
        inStock: 11,
        featured: "true"
      },
      {
        name: "Girls Kitenge Skirt Set",
        description: "Matching top and skirt with traditional motifs",
        category: "kids-girls",
        type: "ready",
        priceKES: 4900,
        images: ["https://images.unsplash.com/photo-1560859251-d2315a4d6de8?w=800"],
        availableSizes: ["4-6Y", "7-9Y", "10-12Y"],
        fabricOptions: ["Kitenge Cotton"],
        inStock: 9,
        featured: "false"
      },
      {
        name: "Girls African Print Party Dress",
        description: "Special occasion dress with elegant prints",
        category: "kids-girls",
        type: "ready",
        priceKES: 6200,
        images: ["https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=800"],
        availableSizes: ["4-6Y", "7-9Y", "10-12Y"],
        fabricOptions: ["Ankara Silk Blend"],
        inStock: 8,
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
    const user: User = { ...insertUser, id, isAdmin: 'false' };
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

  async updateProduct(id: string, updates: UpdateProduct): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;
    
    const updatedProduct: Product = { ...product, ...updates };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.products.delete(id);
  }

  async updateCustomOrder(id: string, updates: UpdateCustomOrder): Promise<CustomOrder | undefined> {
    const order = this.customOrders.get(id);
    if (!order) return undefined;
    
    const updatedOrder: CustomOrder = { ...order, ...updates };
    this.customOrders.set(id, updatedOrder);
    return updatedOrder;
  }

  async getAnalytics(): Promise<{
    totalProducts: number;
    totalOrders: number;
    pendingOrders: number;
    inProgressOrders: number;
    completedOrders: number;
    totalContacts: number;
  }> {
    const orders = Array.from(this.customOrders.values());
    return {
      totalProducts: this.products.size,
      totalOrders: this.customOrders.size,
      pendingOrders: orders.filter(o => o.status === 'pending').length,
      inProgressOrders: orders.filter(o => o.status === 'in-progress').length,
      completedOrders: orders.filter(o => o.status === 'completed').length,
      totalContacts: this.contacts.size,
    };
  }
}

export const storage = new MemStorage();
