import { Link, useLocation } from "wouter";
import { CurrencyToggle } from "./currency-toggle";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useState, useEffect } from "react";

export function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [shopMenuOpen, setShopMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/custom-orders", label: "Custom Orders" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];
  
  const shopCategories = {
    "Women's Wear": [
      { name: "Tops", href: "/shop/womens/tops" },
      { name: "Blazers", href: "/shop/womens/blazers" },
      { name: "Skirts", href: "/shop/womens/skirts" },
      { name: "Short Dresses", href: "/shop/womens/short-dresses" },
      { name: "Maxi Dresses", href: "/shop/womens/maxi-dresses" },
    ],
    "Men's Wear": [
      { name: "Shirts", href: "/shop/mens/shirts" },
      { name: "Bomber Jackets", href: "/shop/mens/bomber-jackets" },
    ],
    "Kids Wear": [
      { name: "Boys", href: "/shop/kids/boys" },
      { name: "Girls", href: "/shop/kids/girls" },
    ],
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b bg-white ${
      isScrolled 
        ? 'shadow-lg py-3 sm:py-4 border-border/30' 
        : 'py-4 sm:py-6 border-border/20 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group" data-testid="link-home">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary">Azani</h1>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-medium transition-all duration-300 ${
                  location === link.href
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary'
                }`}
                data-testid={`link-nav-${link.label.toLowerCase().replace(' ', '-')}`}
              >
                {link.label}
                {location === link.href && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
                )}
              </Link>
            ))}
            
            {/* Shop Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShopMenuOpen(true)}
              onMouseLeave={() => setShopMenuOpen(false)}
            >
              <button
                className={`font-medium transition-all duration-300 ${
                  location.startsWith('/shop')
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary'
                }`}
                data-testid="button-nav-shop"
              >
                Shop
              </button>
              
              {shopMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-[600px] bg-white rounded-xl shadow-2xl border border-border/20 p-6">
                  <div className="grid grid-cols-3 gap-6">
                    {Object.entries(shopCategories).map(([category, items]) => (
                      <div key={category}>
                        <h3 className="font-semibold text-sm text-foreground mb-3">{category}</h3>
                        <div className="space-y-2">
                          {items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                              data-testid={`link-shop-${item.name.toLowerCase().replace(/ /g, '-')}`}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-border/20">
                    <Link 
                      href="/shop/ankara-bags"
                      className="text-sm font-medium text-primary/60 hover:text-primary transition-colors flex items-center gap-2"
                      data-testid="link-shop-ankara-bags"
                    >
                      <span>Ankara Bags</span>
                      <span className="text-xs px-2 py-1 bg-primary/10 rounded-full">Coming Soon</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Right Side - Search, Currency & Cart */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="group p-2 touch-manipulation" data-testid="button-search">
              <Search className="h-5 w-5 sm:h-6 sm:w-6 text-foreground group-hover:text-primary transition-colors" />
            </button>
            
            <CurrencyToggle />
            
            <button className="relative group p-2 touch-manipulation" data-testid="button-cart">
              <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-foreground group-hover:text-primary transition-colors" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-primary-foreground">0</span>
              </div>
            </button>
            
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-foreground hover:text-primary transition-colors touch-manipulation"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ${
          mobileMenuOpen 
            ? 'max-h-[600px] opacity-100 mt-8' 
            : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 space-y-4 max-h-[500px] overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block text-lg font-medium transition-colors ${
                  location === link.href
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary'
                }`}
                onClick={() => setMobileMenuOpen(false)}
                data-testid={`link-mobile-${link.label.toLowerCase().replace(' ', '-')}`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile Shop Categories */}
            <Link
              href="/shop/womens/tops"
              className={`block text-lg font-medium transition-colors ${
                location.includes('/shop/womens')
                  ? 'text-primary'
                  : 'text-foreground hover:text-primary'
              }`}
              onClick={() => setMobileMenuOpen(false)}
              data-testid="link-mobile-womens-wear"
            >
              Women's Wear
            </Link>
            
            <Link
              href="/shop/mens/shirts"
              className={`block text-lg font-medium transition-colors ${
                location.includes('/shop/mens')
                  ? 'text-primary'
                  : 'text-foreground hover:text-primary'
              }`}
              onClick={() => setMobileMenuOpen(false)}
              data-testid="link-mobile-mens-wear"
            >
              Men's Wear
            </Link>
            
            <Link
              href="/shop/kids/boys"
              className={`block text-lg font-medium transition-colors ${
                location.includes('/shop/kids')
                  ? 'text-primary'
                  : 'text-foreground hover:text-primary'
              }`}
              onClick={() => setMobileMenuOpen(false)}
              data-testid="link-mobile-kids-wear"
            >
              Kids Wear
            </Link>
            
            <Link
              href="/shop/ankara-bags"
              className={`block text-lg font-medium transition-colors ${
                location === '/shop/ankara-bags'
                  ? 'text-primary'
                  : 'text-foreground hover:text-primary'
              }`}
              onClick={() => setMobileMenuOpen(false)}
              data-testid="link-mobile-ankara-bags"
            >
              Ankara Bags
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}