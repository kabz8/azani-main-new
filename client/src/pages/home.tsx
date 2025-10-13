import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight, Sparkles, Globe, Award, Users, ShoppingBag, Scissors, Shirt, Ruler } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { HeroCarousel } from "@/components/hero-carousel";
import type { Product } from "@shared/schema";

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
      <section className="relative pt-24 pb-12 md:pt-28 md:pb-16" data-testid="section-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Title and Description - Order 1 on mobile and desktop */}
            <div className="space-y-3 sm:space-y-6 lg:space-y-8 order-1 fade-in-up bg-white lg:bg-transparent px-6 py-6 lg:px-0 lg:py-0 rounded-2xl lg:rounded-none shadow-[0_10px_30px_-15px_rgba(0,0,0,0.15)] lg:shadow-none border border-primary/10 lg:border-0">
              <h1 className="text-4xl sm:text-5xl lg:text-8xl font-playfair font-extrabold leading-tight lg:leading-none tracking-tight luxury-text" data-testid="text-hero-title">
                <span className="block text-foreground">Azani Africa</span>
              </h1>
              
              <div className="space-y-3">
                <p className="text-lg sm:text-xl lg:text-2xl text-primary font-semibold uppercase tracking-[0.15em] leading-relaxed" data-testid="text-hero-tagline">
                  We customize outfits with a touch of ankara
                </p>
                <div className="h-[2px] w-20 bg-gradient-to-r from-primary to-primary/40"></div>
              </div>
              
              <p className="text-base sm:text-lg lg:text-2xl text-muted-foreground/90 leading-relaxed max-w-xl" data-testid="text-hero-description">
                Where traditional African artistry meets contemporary luxury. Each piece tells a story of heritage, crafted with precision in the heart of Kenya.
              </p>
            </div>
            
            {/* Carousel - Order 2 on mobile, right column on desktop */}
            <div className="relative order-2 w-full">
              <HeroCarousel />
            </div>

            {/* Buttons - Order 3 on mobile, left column on desktop */}
            <div className="flex flex-col sm:flex-row gap-4 order-3 lg:order-1 w-full">
              <Link href="/custom-orders" className="w-full sm:w-auto">
                <Button size="lg" className="w-full group bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-4 rounded-xl font-semibold text-base sm:text-lg shadow-xl luxury-hover" data-testid="button-hero-custom">
                  Start Custom Order
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/ready-shop" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full group border-2 border-foreground/20 hover:border-primary text-foreground hover:text-primary px-6 sm:px-8 py-4 rounded-xl font-semibold text-base sm:text-lg backdrop-blur-sm bg-white/60 luxury-hover" data-testid="button-hero-collections">
                  View Collections
                  <ShoppingBag className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                </Button>
              </Link>
            </div>
            
            {/* Stats - Order 4 on mobile, left column on desktop */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-6 sm:pt-8 border-t border-foreground/10 order-4 lg:order-1 w-full">
              <div className="text-center space-y-1 sm:space-y-2">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary" data-testid="text-stat-pieces">500+</div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium">Custom Pieces</div>
              </div>
              <div className="text-center space-y-1 sm:space-y-2">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary" data-testid="text-stat-countries">50+</div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium">Countries</div>
              </div>
              <div className="text-center space-y-1 sm:space-y-2">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary" data-testid="text-stat-experience">10+</div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium">Years</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections - Luxurious Layout */}
      <section className="py-16 sm:py-24 lg:py-32 bg-card" data-testid="section-featured">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20 space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-primary">Signature Collection</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-serif font-bold text-foreground luxury-text" data-testid="text-featured-title">
              Featured Pieces
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light px-4" data-testid="text-featured-description">
              Discover our carefully curated signature styles that embody the essence of African luxury fashion
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="fade-in-up" style={{ '--stagger': index } as any}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 sm:mt-16">
            <Link href="/ready-shop" className="inline-block w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto group border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 sm:px-8 py-4 rounded-xl font-semibold text-base sm:text-lg luxury-hover">
                View All Collections
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Values - Clean & Minimal */}
      <section className="py-16 sm:py-24 lg:py-32 bg-background" data-testid="section-values">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-serif font-bold text-foreground luxury-text mb-4 sm:mb-6">
              What We Do
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto font-light px-4">
              Making quality African wear in Nairobi since 2015
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-primary flex items-center justify-center">
                  <Scissors className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground">Handmade in Nairobi</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed px-2">
                Every piece is cut and sewn by our tailors in our workshop
              </p>
            </div>
            
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-primary flex items-center justify-center">
                  <Shirt className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground">Real African Fabric</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed px-2">
                Ankara, Kitenge, and other fabrics sourced from Kenya and West Africa
              </p>
            </div>
            
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-primary flex items-center justify-center">
                  <Ruler className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground">Custom or Ready-Made</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed px-2">
                Shop our collection or order something made just for you
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Elegant */}
      <section className="py-16 sm:py-24 lg:py-32 luxury-gradient" data-testid="section-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 sm:space-y-12">
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-serif font-bold text-foreground luxury-text">
              Ready to Begin?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed font-light px-4">
              Start your journey with a custom piece designed exclusively for you, or explore our ready-to-wear collection
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link href="/custom-orders" className="w-full sm:w-auto">
              <Button size="lg" className="w-full group bg-primary hover:bg-primary/90 text-primary-foreground px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-semibold text-base sm:text-lg shadow-xl luxury-hover">
                Create Custom Piece
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/ready-shop" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full group border-2 border-foreground/20 hover:border-primary text-foreground hover:text-primary px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-semibold text-base sm:text-lg backdrop-blur-sm bg-white/60 luxury-hover">
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