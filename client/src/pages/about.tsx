import { Award, Leaf, Users, Globe } from "lucide-react";
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
                  For over 15 years, our master tailors have been creating bespoke pieces that celebrate African heritage while meeting the demands of modern style.
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
                  <div className="text-3xl font-bold text-accent-foreground" data-testid="text-experience-badge">15+</div>
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
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                <Award className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Master Craftsmanship</h3>
              <p className="text-muted-foreground">Trained artisans with decades of experience in traditional tailoring techniques</p>
            </div>
            
            <div className="text-center space-y-4" data-testid="card-value-sustainability">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto">
                <Leaf className="h-8 w-8 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Sustainable Practice</h3>
              <p className="text-muted-foreground">Ethically sourced fabrics supporting local communities and artisans</p>
            </div>
            
            <div className="text-center space-y-4" data-testid="card-value-heritage">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Cultural Heritage</h3>
              <p className="text-muted-foreground">Preserving and celebrating African traditions through modern design</p>
            </div>
            
            <div className="text-center space-y-4" data-testid="card-value-global">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                <Globe className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Global Reach</h3>
              <p className="text-muted-foreground">Bringing authentic African fashion to customers worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background" data-testid="section-team">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-6" data-testid="text-team-title">
              Meet Our Artisans
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-team-description">
              The skilled hands and creative minds behind every Azani piece
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4" data-testid="card-team-1">
              <img
                src={aboutImages.team}
                alt="Master Tailor Samuel Kimani"
                className="w-32 h-32 rounded-full object-cover mx-auto"
              />
              <h3 className="text-xl font-semibold text-foreground">Samuel Kimani</h3>
              <p className="text-primary font-medium">Master Tailor</p>
              <p className="text-sm text-muted-foreground">
                15+ years of experience in bespoke tailoring and traditional African garment construction.
              </p>
            </div>
            
            <div className="text-center space-y-4" data-testid="card-team-2">
              <img
                src={aboutImages.team}
                alt="Design Director Grace Wanjiku"
                className="w-32 h-32 rounded-full object-cover mx-auto"
              />
              <h3 className="text-xl font-semibold text-foreground">Grace Wanjiku</h3>
              <p className="text-secondary font-medium">Design Director</p>
              <p className="text-sm text-muted-foreground">
                Creative visionary specializing in contemporary interpretations of traditional African patterns.
              </p>
            </div>
            
            <div className="text-center space-y-4" data-testid="card-team-3">
              <img
                src={aboutImages.team}
                alt="Quality Manager Joseph Muthui"
                className="w-32 h-32 rounded-full object-cover mx-auto"
              />
              <h3 className="text-xl font-semibold text-foreground">Joseph Muthui</h3>
              <p className="text-accent font-medium">Quality Manager</p>
              <p className="text-sm text-muted-foreground">
                Ensures every piece meets our exacting standards for fit, finish, and durability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-card" data-testid="section-stats">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2" data-testid="stat-pieces">
              <div className="text-4xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Custom Pieces Created</div>
            </div>
            <div className="space-y-2" data-testid="stat-countries">
              <div className="text-4xl font-bold text-secondary">50+</div>
              <div className="text-sm text-muted-foreground">Countries Served</div>
            </div>
            <div className="space-y-2" data-testid="stat-experience">
              <div className="text-4xl font-bold text-accent">15+</div>
              <div className="text-sm text-muted-foreground">Years of Excellence</div>
            </div>
            <div className="space-y-2" data-testid="stat-satisfaction">
              <div className="text-4xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
