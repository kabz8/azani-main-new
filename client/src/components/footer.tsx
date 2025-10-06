import { Link } from "wouter";
import { Instagram, Facebook, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold">Azani</h3>
            <p className="text-background/80">
              Authentic African fashion, crafted with love in Nairobi and delivered worldwide.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-8 h-8 bg-background/20 rounded-full flex items-center justify-center text-background hover:bg-background/30 smooth-hover"
                data-testid="link-social-instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-background/20 rounded-full flex items-center justify-center text-background hover:bg-background/30 smooth-hover"
                data-testid="link-social-facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-background/20 rounded-full flex items-center justify-center text-background hover:bg-background/30 smooth-hover"
                data-testid="link-social-twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-background mb-4">Shop</h4>
            <div className="space-y-2">
              <Link href="/custom-orders" className="block text-background/80 hover:text-background smooth-hover" data-testid="link-footer-custom">
                Custom Orders
              </Link>
              <Link href="/ready-shop" className="block text-background/80 hover:text-background smooth-hover" data-testid="link-footer-ready">
                Ready to Wear
              </Link>
              <Link href="/ready-shop" className="block text-background/80 hover:text-background smooth-hover" data-testid="link-footer-prints">
                African Prints
              </Link>
              <Link href="/ready-shop" className="block text-background/80 hover:text-background smooth-hover" data-testid="link-footer-suits">
                Suits & Blazers
              </Link>
              <Link href="/ready-shop" className="block text-background/80 hover:text-background smooth-hover" data-testid="link-footer-traditional">
                Traditional Wear
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-background mb-4">Support</h4>
            <div className="space-y-2">
              <Link href="/contact" className="block text-background/80 hover:text-background smooth-hover" data-testid="link-footer-size-guide">
                Size Guide
              </Link>
              <Link href="/contact" className="block text-background/80 hover:text-background smooth-hover" data-testid="link-footer-returns">
                Returns
              </Link>
              <Link href="/contact" className="block text-background/80 hover:text-background smooth-hover" data-testid="link-footer-care">
                Care Instructions
              </Link>
              <Link href="/contact" className="block text-background/80 hover:text-background smooth-hover" data-testid="link-footer-faq">
                FAQ
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-background mb-4">Contact</h4>
            <div className="space-y-2 text-background/80">
              <Link href="/contact" className="block hover:text-background smooth-hover" data-testid="text-footer-address">Lumumba Drive Roysambu</Link>
              <p data-testid="text-footer-country">Nairobi, Kenya</p>
              <a href="tel:+254755537861" className="block hover:text-background smooth-hover" data-testid="text-footer-phone">+254 755 537 861</a>
              <a href="mailto:hello@azaniafrica.com" className="block hover:text-background smooth-hover" data-testid="text-footer-email">hello@azaniafrica.com</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-background/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-background/60 text-sm" data-testid="text-footer-copyright">
            &copy; 2025 Azani. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/contact" className="text-background/60 hover:text-background text-sm smooth-hover" data-testid="link-footer-privacy">
              Privacy Policy
            </Link>
            <Link href="/contact" className="text-background/60 hover:text-background text-sm smooth-hover" data-testid="link-footer-terms">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-background/60 hover:text-background text-sm smooth-hover" data-testid="link-footer-cookies">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
