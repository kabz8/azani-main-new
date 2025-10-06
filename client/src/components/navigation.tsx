import { Link, useLocation } from "wouter";
import { CurrencyToggle } from "./currency-toggle";
import { ShoppingBag, Menu, X, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
    { href: "/ready-shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

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
          </div>
          
          {/* Right Side - Currency & Cart */}
          <div className="flex items-center space-x-3 sm:space-x-6">
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
            ? 'max-h-96 opacity-100 mt-8' 
            : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 space-y-6">
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
            
            {/* Mobile CTA */}
            <div className="pt-4 border-t border-border/50">
              <Link href="/custom-orders">
                <button 
                  className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Start Custom Order
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}