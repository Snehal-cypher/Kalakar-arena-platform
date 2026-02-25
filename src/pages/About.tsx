import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Globe, Shield, Sparkles, Users, Heart } from 'lucide-react';

export default function About() {
  return (
    <main className="min-h-screen bg-background relative">
      <Navbar />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-brand-plum/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground text-balance">
              Empowering Local Creators,
              <span className="text-brand-plum block mt-2">One Connection at a Time</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              KALAKAR ARENA is more than a platform — it's a movement to support local
              artisans, newly graduated designers, and home-based entrepreneurs who pour
              their heart into their craft.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Our Mission
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We believe every artist deserves a stage, and every creation deserves
                  appreciation. KALAKAR ARENA was born from the desire to bridge the gap
                  between talented local creators and people seeking unique, handcrafted
                  products.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  From newly graduated fashion designers to home bakers, from jewelry
                  makers to embroidery artists — we provide a platform where creativity
                  meets opportunity, all without the burden of high marketing costs.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Target className="w-10 h-10 text-brand-plum mx-auto mb-3" />
                    <h4 className="font-semibold text-foreground">Low Budget Friendly</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Free to join and showcase
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Globe className="w-10 h-10 text-brand-plum mx-auto mb-3" />
                    <h4 className="font-semibold text-foreground">Local Focus</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Support your community
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Shield className="w-10 h-10 text-brand-plum mx-auto mb-3" />
                    <h4 className="font-semibold text-foreground">Direct Contact</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      No middlemen involved
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Sparkles className="w-10 h-10 text-brand-plum mx-auto mb-3" />
                    <h4 className="font-semibold text-foreground">Unique Creations</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      One-of-a-kind pieces
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Serve */}
        <section className="py-16 bg-brand-plum/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
              Who We Serve
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-brand-plum/10 flex items-center justify-center mb-4">
                    <Sparkles className="w-7 h-7 text-brand-plum" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                    For Creators
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Newly graduated fashion designers looking for their first customers</li>
                    <li>• Home bakers wanting to expand beyond word-of-mouth</li>
                    <li>• Jewelry makers crafting unique imitation pieces</li>
                    <li>• Artists specializing in embroidery, candle making, and more</li>
                    <li>• Anyone with a creative skill and limited marketing budget</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-brand-plum/10 flex items-center justify-center mb-4">
                    <Users className="w-7 h-7 text-brand-plum" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                    For Users
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• People seeking unique, handcrafted products</li>
                    <li>• Those who want to support local talent and small businesses</li>
                    <li>• Anyone looking for customized items for special occasions</li>
                    <li>• Gift shoppers wanting something truly personal</li>
                    <li>• Design enthusiasts who appreciate artisan craftsmanship</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
              Our Values
            </h2>
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-brand-plum/10 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-brand-plum" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Community First</h3>
                <p className="text-muted-foreground text-sm">
                  We believe in building a supportive community where creators help each
                  other grow and customers find genuine connections.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-brand-plum/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-brand-plum" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Authenticity</h3>
                <p className="text-muted-foreground text-sm">
                  Every creator on our platform is real, and every creation is genuine.
                  We value honest representation and quality.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-brand-plum/10 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-brand-plum" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Empowerment</h3>
                <p className="text-muted-foreground text-sm">
                  We empower creators to turn their passion into livelihood without
                  the barrier of expensive marketing or middlemen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-brand-plum">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Join the Community?
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Whether you're a creator looking to showcase your work or someone seeking
              unique handcrafted items, we welcome you to KALAKAR ARENA.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup?type=creator">
                <Button size="lg" variant="secondary" className="text-brand-plum">
                  Join as Creator
                </Button>
              </Link>
              <Link to="/explore">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                  Explore Creators
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
