import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
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
  Camera
} from 'lucide-react';

const categories = [
  { name: 'Fashion Design', icon: Shirt, color: 'bg-pink-100 text-pink-600' },
  { name: 'Home Baking', icon: Cake, color: 'bg-orange-100 text-orange-600' },
  { name: 'Jewelry Making', icon: Gem, color: 'bg-purple-100 text-purple-600' },
  { name: 'Embroidery', icon: Scissors, color: 'bg-red-100 text-red-600' },
  { name: 'Candle Making', icon: Flame, color: 'bg-yellow-100 text-yellow-600' },
  { name: 'Photography', icon: Camera, color: 'bg-blue-100 text-blue-600' },
];

export default function Index() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
              Discover Local 
              <span className="text-primary block mt-2">Creative Talent</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 text-balance animate-fade-in">
              Connect with talented artisans, designers, and creators in your community. 
              From custom fashion to handcrafted jewelry, find unique creations made with passion.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
              <Link to="/explore">
                <Button size="lg" className="w-full sm:w-auto">
                  Explore Creators
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/signup?type=creator">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Join as Creator
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground">500+</div>
              <div className="text-primary-foreground/70 text-sm mt-1">Local Creators</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground">12+</div>
              <div className="text-primary-foreground/70 text-sm mt-1">Categories</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground">10K+</div>
              <div className="text-primary-foreground/70 text-sm mt-1">Happy Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore Categories
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover talented creators across various creative fields
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Link key={category.name} to={`/explore?category=${category.name}`}>
                <Card className="hover:shadow-lg transition-all hover:border-primary/50 cursor-pointer group">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <category.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">View creators</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/categories">
              <Button variant="outline">
                View All Categories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connecting creators and users in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Browse Creators</h3>
              <p className="text-muted-foreground text-sm">
                Explore profiles, portfolios, and find the perfect creator for your needs
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Connect Directly</h3>
              <p className="text-muted-foreground text-sm">
                Send inquiries, discuss requirements, and connect with creators directly
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Get Unique Creations</h3>
              <p className="text-muted-foreground text-sm">
                Receive handcrafted, unique products made just for you
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Are You a Creator?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Showcase your talent, reach new customers, and grow your creative business. 
            Join KALAKAR ARENA for free today!
          </p>
          <Link to="/signup?type=creator">
            <Button size="lg" variant="secondary">
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
