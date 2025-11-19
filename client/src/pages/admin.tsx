import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ShieldCheck, LogOut, PlusCircle, Loader2, Trash2 } from "lucide-react";
import type { Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const TOKEN_STORAGE_KEY = "azani_admin_token";

const productCategories = [
  { label: "Women's Tops", value: "womens-tops" },
  { label: "Women's Blazers", value: "womens-blazers" },
  { label: "Women's Skirts", value: "womens-skirts" },
  { label: "Women's Short Dresses", value: "womens-short-dresses" },
  { label: "Women's Maxi Dresses", value: "womens-maxi-dresses" },
  { label: "Men's Shirts", value: "mens-shirts" },
  { label: "Men's Bomber Jackets", value: "mens-bomber-jackets" },
  { label: "Kids Boys", value: "kids-boys" },
  { label: "Kids Girls", value: "kids-girls" },
  { label: "Ankara Bags", value: "ankara-bags" },
];

const defaultFormState = {
  name: "",
  description: "",
  category: productCategories[0]?.value ?? "",
  type: "ready",
  priceKES: "",
  imageUrl: "",
  sizes: "",
  fabricOptions: "",
  inStock: "",
  featured: false,
};

const readToken = () =>
  typeof window === "undefined"
    ? ""
    : window.localStorage.getItem(TOKEN_STORAGE_KEY) ?? "";

export default function AdminDashboard() {
  const [token, setToken] = useState<string>(() => readToken());
  const [form, setForm] = useState(() => ({ ...defaultFormState }));
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const isAuthed = Boolean(token);

  const persistToken = (value: string) => {
    if (typeof window !== "undefined") {
      if (value) {
        window.localStorage.setItem(TOKEN_STORAGE_KEY, value);
      } else {
        window.localStorage.removeItem(TOKEN_STORAGE_KEY);
      }
    }
  };

  const handleLogout = () => {
    setToken("");
    persistToken("");
    queryClient.removeQueries({ queryKey: ["admin-products"] });
    queryClient.removeQueries({ queryKey: ["admin-analytics"] });
  };

  const handleUnauthorized = () => {
    toast({
      title: "Session expired",
      description: "Please sign in again to continue.",
      variant: "destructive",
    });
    handleLogout();
  };

  const fetchAdmin = async <T,>(path: string): Promise<T> => {
    const res = await fetch(path, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 401) {
      handleUnauthorized();
      throw new Error("Unauthorized");
    }

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to load data");
    }

    return res.json() as Promise<T>;
  };

  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useQuery<Product[]>({
    queryKey: ["admin-products", token],
    queryFn: () => fetchAdmin<Product[]>("/api/admin/products"),
    enabled: isAuthed,
  });

  const { data: analytics } = useQuery({
    queryKey: ["admin-analytics", token],
    queryFn: () =>
      fetchAdmin<{
        totalProducts: number;
        totalOrders: number;
        pendingOrders: number;
        inProgressOrders: number;
        completedOrders: number;
        totalContacts: number;
      }>("/api/admin/analytics"),
    enabled: isAuthed,
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Invalid credentials");
      }

      return (await res.json()) as { token: string };
    },
    onSuccess: (data) => {
      setToken(data.token);
      persistToken(data.token);
      toast({
        title: "Welcome back",
        description: "You're now signed in as admin.",
      });
    },
    onError: () => {
      toast({
        title: "Login failed",
        description: "Double-check your details and retry.",
        variant: "destructive",
      });
    },
  });

  const createProductMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        category: form.category,
        type: form.type,
        priceKES: Number(form.priceKES),
        images: form.imageUrl ? [form.imageUrl.trim()] : [],
        availableSizes: form.sizes
          ? form.sizes.split(",").map((entry) => entry.trim()).filter(Boolean)
          : undefined,
        fabricOptions: form.fabricOptions
          ? form.fabricOptions
              .split(",")
              .map((entry) => entry.trim())
              .filter(Boolean)
          : undefined,
        inStock: form.inStock ? Number(form.inStock) : undefined,
        featured: form.featured ? "true" : "false",
      };

      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.status === 401) {
        handleUnauthorized();
        throw new Error("Unauthorized");
      }

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to create product");
      }

      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Product added",
        description: "Your product is now live in the catalog.",
      });
      setForm({ ...defaultFormState });
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
    },
    onError: (error) => {
      toast({
        title: "Could not save product",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (productId: string) => {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        handleUnauthorized();
        throw new Error("Unauthorized");
      }

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to delete product");
      }

      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Product removed",
        description: "The item was removed from the catalog.",
      });
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
    },
    onError: (error) => {
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const target = event.target;
    const { name, value } = target;

    const nextValue =
      target instanceof HTMLInputElement && target.type === "checkbox"
        ? target.checked
        : value;

    setForm((prev) => ({
      ...prev,
      [name]: nextValue,
    }));
  };

  const productsSummary = useMemo(() => {
    if (!products) return null;
    const totalInventory = products.reduce(
      (sum, product) => sum + (product.inStock ?? 0),
      0,
    );
    const featured = products.filter((product) => product.featured === "true");

    return { totalInventory, featuredCount: featured.length };
  }, [products]);

  if (!isAuthed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-muted to-background px-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center space-y-3">
            <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <CardTitle>Admin Console</CardTitle>
            <CardDescription>
              Sign in with the demo admin credentials to manage the catalog.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const username = formData.get("username")?.toString() ?? "";
                const password = formData.get("password")?.toString() ?? "";
                loginMutation.mutate({ username, password });
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="admin"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.4em] text-primary/70">
              Admin
            </p>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground">
              Catalog Dashboard
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Curate what shoppers see, track orders, and keep your drop fresh —
              all from one lightweight console.
            </p>
          </div>
          <Button variant="outline" className="w-full sm:w-auto" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>

        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Products Live</CardDescription>
                <CardTitle className="text-3xl">
                  {analytics.totalProducts}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Custom Orders</CardDescription>
                <CardTitle className="text-3xl">
                  {analytics.totalOrders}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Active Leads</CardDescription>
                <CardTitle className="text-3xl">
                  {analytics.totalContacts}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Pending Orders</CardDescription>
                <CardTitle className="text-3xl">
                  {analytics.pendingOrders}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        )}

        <Tabs defaultValue="products" className="space-y-8">
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="analytics">Order Health</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
              <Card className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Live Products</CardTitle>
                      <CardDescription>
                        {products?.length ?? 0} items in the storefront
                      </CardDescription>
                    </div>
                    {productsSummary && (
                      <Badge variant="outline">
                        {productsSummary.featuredCount} featured ·{" "}
                        {productsSummary.totalInventory} pcs in stock
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {productsLoading ? (
                    <div className="py-12 text-center text-muted-foreground">
                      Fetching catalog...
                    </div>
                  ) : productsError ? (
                    <div className="py-12 text-center text-destructive">
                      Unable to load products.
                    </div>
                  ) : products && products.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Price (KES)</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {products.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="font-medium">
                                  {product.name}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {product.type === "ready"
                                    ? "Ready to wear"
                                    : "Custom"}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="capitalize">
                              {product.category.replace(/-/g, " ")}
                            </TableCell>
                            <TableCell>
                              {product.priceKES?.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive"
                                onClick={() =>
                                  deleteProductMutation.mutate(product.id)
                                }
                                disabled={deleteProductMutation.isPending}
                              >
                                {deleteProductMutation.isPending ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash2 className="h-4 w-4" />
                                )}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="py-12 text-center text-muted-foreground">
                      No products yet. Add your first item on the right.
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PlusCircle className="h-5 w-5 text-primary" />
                    New Product
                  </CardTitle>
                  <CardDescription>
                    Drop a fresh item into the storefront.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    className="space-y-4"
                    onSubmit={(event) => {
                      event.preventDefault();
                      createProductMutation.mutate();
                    }}
                  >
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <select
                        id="category"
                        name="category"
                        value={form.category}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        {productCategories.map((category) => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="type">Type</Label>
                        <select
                          id="type"
                          name="type"
                          value={form.type}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                          <option value="ready">Ready to wear</option>
                          <option value="custom">Custom</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="priceKES">Price (KES)</Label>
                        <Input
                          id="priceKES"
                          name="priceKES"
                          type="number"
                          min="0"
                          value={form.priceKES}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="imageUrl">Hero Image URL</Label>
                      <Input
                        id="imageUrl"
                        name="imageUrl"
                        type="url"
                        placeholder="https://"
                        value={form.imageUrl}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sizes">
                        Sizes (comma separated e.g. S,M,L)
                      </Label>
                      <Input
                        id="sizes"
                        name="sizes"
                        value={form.sizes}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fabricOptions">
                        Fabrics (comma separated)
                      </Label>
                      <Input
                        id="fabricOptions"
                        name="fabricOptions"
                        value={form.fabricOptions}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="inStock">Stock</Label>
                        <Input
                          id="inStock"
                          name="inStock"
                          type="number"
                          min="0"
                          value={form.inStock}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="flex items-center gap-2 pt-6">
                        <input
                          id="featured"
                          name="featured"
                          type="checkbox"
                          checked={form.featured}
                          onChange={handleInputChange}
                          className="h-4 w-4 rounded border border-input"
                        />
                        <Label htmlFor="featured" className="text-sm">
                          Feature this product
                        </Label>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={createProductMutation.isPending}
                    >
                      {createProductMutation.isPending && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Publish Product
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            {analytics ? (
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Pipeline</CardTitle>
                    <CardDescription>
                      Status of all custom work in progress.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Pending</p>
                      <p className="text-3xl font-semibold">
                        {analytics.pendingOrders}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">In Progress</p>
                      <p className="text-3xl font-semibold">
                        {analytics.inProgressOrders}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Completed</p>
                      <p className="text-3xl font-semibold">
                        {analytics.completedOrders}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Leads & Contacts</CardTitle>
                    <CardDescription>
                      Conversations waiting for a response.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Contacts</p>
                      <p className="text-3xl font-semibold">
                        {analytics.totalContacts}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Total Inquiries
                      </p>
                      <p className="text-3xl font-semibold">
                        {analytics.totalOrders + analytics.totalContacts}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-12">
                Analytics will appear once we fetch the latest numbers.
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

