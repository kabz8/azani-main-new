import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CurrencyProvider } from "@/hooks/use-currency";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import Home from "@/pages/home";
import CustomOrders from "@/pages/custom-orders";
import ReadyShop from "@/pages/ready-shop";
import Shop from "@/pages/shop";
import Products from "@/pages/products";
import AdminDashboard from "@/pages/admin";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/custom-orders" component={CustomOrders} />
      <Route path="/ready-shop" component={ReadyShop} />
      <Route path="/products" component={Products} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/shop/:gender/:category" component={Shop} />
      <Route path="/shop/ankara-bags" component={Shop} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CurrencyProvider>
        <TooltipProvider>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1 pt-24 lg:pt-28">
              <Router />
            </main>
            <Footer />
            <WhatsAppFloat />
          </div>
          <Toaster />
        </TooltipProvider>
      </CurrencyProvider>
    </QueryClientProvider>
  );
}

export default App;
