import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight, Sparkles, Globe, Award, Users, ShoppingBag } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import type { Product } from "@shared/schema";
import heroImage from "@assets/WhatsApp Image 2025-09-06 at 23.36.35 (1)_1759747415275.jpeg";

export default function Home() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const featuredProducts = products?.filter(p => p.featured === 'true').slice(0, 3) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-lg font-medium text-muted-foreground">Crafting your experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Completely Redesigned */}
      <section className="relative min-h-screen flex items-center luxury-gradient overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-primary/5"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column - Content */}
            <div className="space-y-12 fade-in-up">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full shadow-lg backdrop-blur-sm border border-white/20">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Authentic African Couture</span>
                </div>
                
                <h1 className="text-6xl lg:text-8xl font-serif font-bold leading-none luxury-text" data-testid="text-hero-title">
                  <span className="block text-foreground">Azani Africa</span>
                  <span className="block text-gradient">Nairobi</span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-xl font-light" data-testid="text-hero-description">
                  Where traditional African artistry meets contemporary luxury. Each piece tells a story of heritage, crafted with precision in the heart of Kenya.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Link href="/custom-orders">
                  <Button size="lg" className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg shadow-xl luxury-hover" data-testid="button-hero-custom">
                    Start Custom Order
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/ready-shop">
                  <Button variant="outline" size="lg" className="group border-2 border-foreground/20 hover:border-primary text-foreground hover:text-primary px-8 py-4 rounded-xl font-semibold text-lg backdrop-blur-sm bg-white/60 luxury-hover" data-testid="button-hero-collections">
                    View Collections
                    <ShoppingBag className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                  </Button>
                </Link>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-foreground/10">
                <div className="text-center space-y-2">
                  <div className="text-3xl lg:text-4xl font-bold text-primary" data-testid="text-stat-pieces">500+</div>
                  <div className="text-sm text-muted-foreground font-medium">Custom Pieces</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl lg:text-4xl font-bold text-primary" data-testid="text-stat-countries">50+</div>
                  <div className="text-sm text-muted-foreground font-medium">Countries</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl lg:text-4xl font-bold text-primary" data-testid="text-stat-experience">15+</div>
                  <div className="text-sm text-muted-foreground font-medium">Years</div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Hero Image */}
            <div className="relative">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
                <img
                  src={heroImage}
                  alt="Elegant African fashion model in traditional wear"
                  className="relative rounded-3xl shadow-2xl w-full h-auto object-cover luxury-hover"
                  data-testid="img-hero-model"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections - Luxurious Layout */}
      <section className="py-32 bg-card" data-testid="section-featured">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Signature Collection</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-serif font-bold text-foreground luxury-text" data-testid="text-featured-title">
              Featured Pieces
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light" data-testid="text-featured-description">
              Discover our carefully curated signature styles that embody the essence of African luxury fashion
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="fade-in-up" style={{ '--stagger': index } as any}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link href="/ready-shop">
              <Button size="lg" variant="outline" className="group border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg luxury-hover">
                View All Collections
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Values - Clean & Minimal */}
      <section className="py-32 bg-background" data-testid="section-values">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-serif font-bold text-foreground luxury-text mb-6">
              What We Do
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              Making quality African wear in Nairobi since 2008
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-serif font-bold text-foreground">Handmade in Nairobi</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every piece is cut and sewn by our tailors in our workshop
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-serif font-bold text-foreground">Real African Fabric</h3>
              <p className="text-muted-foreground leading-relaxed">
                Ankara, Kitenge, and other fabrics sourced from Kenya and West Africa
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-serif font-bold text-foreground">Custom or Ready-Made</h3>
              <p className="text-muted-foreground leading-relaxed">
                Shop our collection or order something made just for you
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Elegant */}
      <section className="py-32 luxury-gradient" data-testid="section-cta">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-5xl lg:text-6xl font-serif font-bold text-foreground luxury-text">
              Ready to Begin?
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed font-light">
              Start your journey with a custom piece designed exclusively for you, or explore our ready-to-wear collection
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/custom-orders">
              <Button size="lg" className="group bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-5 rounded-xl font-semibold text-lg shadow-xl luxury-hover">
                Create Custom Piece
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/ready-shop">
              <Button size="lg" variant="outline" className="group border-2 border-foreground/20 hover:border-primary text-foreground hover:text-primary px-10 py-5 rounded-xl font-semibold text-lg backdrop-blur-sm bg-white/60 luxury-hover">
                Shop Collection
                <ShoppingBag className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}