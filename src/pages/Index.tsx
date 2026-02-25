import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArtisticBackground } from '@/components/ArtisticBackground';
import { motion, AnimatePresence } from "framer-motion";
import { useState } from 'react';
import { useEffect } from 'react';
import {
  ArrowRight,
  Sparkles,
  Users,
  Heart,
  Shirt,
  Cake,
  Gem,
  Scissors,
  Flame,
  Camera,
  Shield
} from 'lucide-react';

const categories = [
  { name: 'Fashion Design', icon: Shirt, color: 'bg-pink-100 text-pink-600' },
  { name: 'Home Baking', icon: Cake, color: 'bg-orange-100 text-orange-600' },
  { name: 'Jewelry Making', icon: Gem, color: 'bg-purple-100 text-purple-600' },
];

export default function Index() {
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);

  const subtitles = [
    "Connect with talented artisans, designers, and creators in your community.",
    "From custom fashion to handcrafted jewelry, find unique creations made with passion.",
    "Support local artists and discover one-of-a-kind handmade treasures.",
    "Turn your creative passion into a thriving business with Kalakar Arena."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSubtitleIndex((prev) => (prev + 1) % subtitles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden">
      <ArtisticBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="text-left max-w-4xl mx-auto">
              <motion.h1
                className="hero-text font-serif text-4xl md:text-6xl lg:text-7xl font-normal tracking-wide text-brand-deep-brown mb-10 drop-shadow-md opacity-100 uppercase leading-none"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Discover
                <span className="block text-brand-deep-brown">Local Creative</span>
                <span className="block text-brand-deep-brown">Talent</span>
              </motion.h1>

              <div className="h-20 md:h-24 mb-8 flex items-center justify-start">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={subtitles[currentSubtitleIndex]}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="text-lg md:text-xl text-brand-deep-brown font-medium tracking-wide max-w-2xl mr-auto leading-relaxed"
                  >
                    {subtitles[currentSubtitleIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex flex-col sm:flex-row items-center justify-start gap-6"
              >
                <Link to="/explore">
                  <Button size="lg" className="rounded-full px-8 py-6 text-lg bg-brand-deep-brown hover:bg-brand-deep-brown/90 text-brand-cream transition-all duration-300 shadow-lg hover:shadow-xl">
                    Explore Creators
                  </Button>
                </Link>
                <Link to="/signup?type=creator">
                  <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg border-brand-deep-brown text-brand-deep-brown hover:bg-brand-beige">
                    Join as Creator
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>



      {/* Categories Section */}
      <section id="categories-section" className="relative z-10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-deep-brown mb-4 drop-shadow-md">
              Explore Categories
            </h2>
            <p className="text-brand-deep-brown/80 font-medium max-w-2xl mx-auto drop-shadow-sm">
              Discover talented creators across various creative fields
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/explore?category=${category.name}`}>
                  <Card className="category-card h-full border-2 border-brand-teal shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group bg-brand-teal hover:bg-brand-teal/90 hover:scale-[1.02]">
                    <CardContent className="p-8 flex flex-col items-center text-center gap-6">
                      <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 text-white shadow-sm">
                        <category.icon className="w-8 h-8 opacity-100 stroke-[2]" />
                      </div>
                      <div>
                        <h3 className="font-serif text-xl font-bold text-white mb-2">{category.name}</h3>
                        <p className="text-sm text-brand-cream font-bold opacity-90">Explore creators</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/categories">
              <Button variant="default" className="shadow-lg bg-brand-deep-brown hover:bg-brand-deep-brown/90 text-white">
                View All Categories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 py-16 md:py-24 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-deep-brown mb-4">
              How It Works
            </h2>
            <p className="text-brand-deep-brown/80 font-medium max-w-2xl mx-auto">
              Connecting creators and users in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-beige/50 border border-brand-terracotta/30 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-brand-deep-brown" />
              </div>
              <h3 className="font-semibold text-brand-deep-brown mb-2">Browse Creators</h3>
              <p className="text-brand-deep-brown/80 font-medium text-sm">
                Explore profiles, portfolios, and find the perfect creator for your needs
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-beige/50 border border-brand-terracotta/30 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-brand-deep-brown" />
              </div>
              <h3 className="font-semibold text-brand-deep-brown mb-2">Connect Directly</h3>
              <p className="text-brand-deep-brown/80 font-medium text-sm">
                Send inquiries, discuss requirements, and connect with creators directly
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-beige/50 border border-brand-terracotta/30 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-brand-deep-brown" />
              </div>
              <h3 className="font-semibold text-brand-deep-brown mb-2">Get Unique Creations</h3>
              <p className="text-brand-deep-brown/80 font-medium text-sm">
                Receive handcrafted, unique products made just for you
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative z-10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center bg-white/95 backdrop-blur-md p-8 md:p-12 rounded-2xl shadow-xl border border-brand-terracotta/50">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-deep-brown mb-6">
                About Kalakar Arena
              </h2>
              <p className="text-brand-deep-brown font-medium leading-relaxed mb-6 text-lg">
                We believe every artist deserves a stage, and every creation deserves appreciation.
                KALAKAR ARENA was born from the desire to bridge the gap between talented local
                creators and people seeking unique, handcrafted products.
              </p>
              <p className="text-brand-deep-brown font-medium leading-relaxed mb-8 text-lg">
                From newly graduated fashion designers to home bakers and jewelry makers — we
                provide a platform where creativity meets opportunity, all without the burden
                of high marketing costs.
              </p>
              <Link to="/about">
                <Button variant="outline" className="border-brand-deep-brown text-brand-deep-brown hover:bg-brand-deep-brown hover:text-white transition-colors">
                  Learn More About Us
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-brand-beige/30 p-6 rounded-xl border border-brand-terracotta/40 text-center shadow-md">
                <div className="w-12 h-12 rounded-full bg-brand-cream border border-brand-terracotta/20 flex items-center justify-center mx-auto mb-3 text-brand-deep-brown">
                  <Heart className="w-6 h-6 stroke-[2]" />
                </div>
                <h4 className="font-bold text-brand-deep-brown">Community</h4>
              </div>
              <div className="bg-brand-beige/30 p-6 rounded-xl border border-brand-terracotta/40 text-center shadow-md">
                <div className="w-12 h-12 rounded-full bg-brand-cream border border-brand-terracotta/20 flex items-center justify-center mx-auto mb-3 text-brand-deep-brown">
                  <Shield className="w-6 h-6 stroke-[2]" />
                </div>
                <h4 className="font-bold text-brand-deep-brown">Authentic</h4>
              </div>
              <div className="bg-brand-beige/30 p-6 rounded-xl border border-brand-terracotta/40 text-center shadow-md">
                <div className="w-12 h-12 rounded-full bg-brand-cream border border-brand-terracotta/20 flex items-center justify-center mx-auto mb-3 text-brand-deep-brown">
                  <Sparkles className="w-6 h-6 stroke-[2]" />
                </div>
                <h4 className="font-bold text-brand-deep-brown">Unique</h4>
              </div>
              <div className="bg-brand-beige/30 p-6 rounded-xl border border-brand-terracotta/40 text-center shadow-md">
                <div className="w-12 h-12 rounded-full bg-brand-cream border border-brand-terracotta/20 flex items-center justify-center mx-auto mb-3 text-brand-deep-brown">
                  <Users className="w-6 h-6 stroke-[2]" />
                </div>
                <h4 className="font-bold text-brand-deep-brown">Direct</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-16 md:py-24 bg-brand-deep-brown/95 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-cream mb-4 drop-shadow-md">
            Are You a Creator?
          </h2>
          <p className="text-brand-cream/90 font-medium mb-8 max-w-xl mx-auto drop-shadow-sm">
            Showcase your talent, reach new customers, and grow your creative business.
            Join KALAKAR ARENA for free today!
          </p>
          <Link to="/signup?type=creator">
            <Button size="lg" variant="secondary" className="shadow-lg bg-brand-cream text-brand-deep-brown hover:bg-white">
              Join as Creator
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
