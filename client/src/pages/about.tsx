import { Award, Leaf, Users, Globe, Quote } from "lucide-react";
import { aboutImages } from "@/lib/product-images";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-muted to-background" data-testid="section-about-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-serif font-bold text-foreground mb-6" data-testid="text-about-title">
            About Azani
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="text-about-description">
            Born in the vibrant streets of Nairobi, Azani represents the perfect fusion of traditional African craftsmanship and contemporary luxury fashion.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-background" data-testid="section-story">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-serif font-bold text-foreground mb-6" data-testid="text-story-title">
                  Our Story
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed mb-6" data-testid="text-story-intro">
                  For over 10 years, our master tailors have been creating bespoke pieces that celebrate African heritage while meeting the demands of modern style.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6" data-testid="text-story-mission">
                  Each garment tells a story of cultural pride, exceptional skill, and personal expression. We believe that clothing should not only fit perfectly but also reflect the rich traditions and vibrant spirit of African culture.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed" data-testid="text-story-vision">
                  From our workshop in Nairobi to customers worldwide, we continue to bridge the gap between traditional craftsmanship and contemporary fashion, creating pieces that honor our heritage while embracing modern elegance.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img
                src={aboutImages.workshop}
                alt="Master tailor working with colorful African fabrics in Nairobi workshop"
                className="rounded-2xl shadow-2xl w-full h-auto"
                data-testid="img-workshop-story"
              />
              
              <div className="absolute -top-6 -right-6 bg-accent p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-foreground" data-testid="text-experience-badge">10+</div>
                  <div className="text-sm text-accent-foreground/80">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-card" data-testid="section-values">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-6" data-testid="text-values-title">
              Our Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-values-description">
              These principles guide everything we do, from design to delivery
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4" data-testid="card-value-craftsmanship">
              <div className="w-16 h-16 border-2 border-primary rounded-full flex items-center justify-center mx-auto">
                <Award className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Master Craftsmanship</h3>
              <p className="text-muted-foreground">Trained artisans with decades of experience in traditional tailoring techniques</p>
            </div>
            
            <div className="text-center space-y-4" data-testid="card-value-sustainability">
              <div className="w-16 h-16 border-2 border-primary rounded-full flex items-center justify-center mx-auto">
                <Leaf className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Sustainable Practice</h3>
              <p className="text-muted-foreground">Ethically sourced fabrics supporting local communities and artisans</p>
            </div>
            
            <div className="text-center space-y-4" data-testid="card-value-heritage">
              <div className="w-16 h-16 border-2 border-primary rounded-full flex items-center justify-center mx-auto">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Cultural Heritage</h3>
              <p className="text-muted-foreground">Preserving and celebrating African traditions through modern design</p>
            </div>
            
            <div className="text-center space-y-4" data-testid="card-value-global">
              <div className="w-16 h-16 border-2 border-primary rounded-full flex items-center justify-center mx-auto">
                <Globe className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Global Reach</h3>
              <p className="text-muted-foreground">Bringing authentic African fashion to customers worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background" data-testid="section-testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-6" data-testid="text-testimonials-title">
              What Our Clients Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-testimonials-description">
              Real feedback from customers who love our work
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-2xl space-y-4" data-testid="card-testimonial-1">
              <div className="w-12 h-12 border-2 border-primary rounded-full flex items-center justify-center">
                <Quote className="h-6 w-6 text-primary" />
              </div>
              <p className="text-muted-foreground leading-relaxed">
                The fit is perfect and the quality is outstanding. I ordered a custom Ankara suit and received exactly what I envisioned. Worth every shilling.
              </p>
              <div>
                <h4 className="font-semibold text-foreground">Amani Johnson</h4>
                <p className="text-sm text-muted-foreground">Lagos, Nigeria</p>
              </div>
            </div>
            
            <div className="bg-card p-8 rounded-2xl space-y-4" data-testid="card-testimonial-2">
              <div className="w-12 h-12 border-2 border-primary rounded-full flex items-center justify-center">
                <Quote className="h-6 w-6 text-primary" />
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Azani made my wedding outfit and it was absolutely stunning. The attention to detail and traditional patterns were exactly what I wanted.
              </p>
              <div>
                <h4 className="font-semibold text-foreground">Sarah Mwangi</h4>
                <p className="text-sm text-muted-foreground">Nairobi, Kenya</p>
              </div>
            </div>
            
            <div className="bg-card p-8 rounded-2xl space-y-4" data-testid="card-testimonial-3">
              <div className="w-12 h-12 border-2 border-primary rounded-full flex items-center justify-center">
                <Quote className="h-6 w-6 text-primary" />
              </div>
              <p className="text-muted-foreground leading-relaxed">
                I've ordered three times now. The quality is consistent, shipping is reliable, and the designs are beautiful. Highly recommend.
              </p>
              <div>
                <h4 className="font-semibold text-foreground">Marcus Thompson</h4>
                <p className="text-sm text-muted-foreground">London, UK</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
