import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import {
  Shirt,
  Cake,
  Gem,
  Scissors,
  Flame,
  Package,
  Star,
  Palette,
  Camera,
  Brush,
  Pen,
} from 'lucide-react';

const categories = [
  {
    name: 'Fashion Design',
    description: 'Custom clothing, alterations, and unique fashion pieces',
    icon: Shirt,
    color: 'bg-pink-100 text-pink-600',
  },
  {
    name: 'Home Baking',
    description: 'Freshly baked cakes, cookies, breads, and pastries',
    icon: Cake,
    color: 'bg-orange-100 text-orange-600',
  },
  {
    name: 'Jewelry Making',
    description: 'Handcrafted jewelry, imitation and custom designs',
    icon: Gem,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    name: 'Embroidery',
    description: 'Traditional and modern embroidery work',
    icon: Scissors,
    color: 'bg-red-100 text-red-600',
  },
  {
    name: 'Candle Making',
    description: 'Decorative and scented handmade candles',
    icon: Flame,
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    name: 'Pottery',
    description: 'Handcrafted ceramic items and pottery art',
    icon: Package,
    color: 'bg-amber-100 text-amber-600',
  },
  {
    name: 'Crochet & Knitting',
    description: 'Hand-knitted and crocheted items',
    icon: Star,
    color: 'bg-teal-100 text-teal-600',
  },
  {
    name: 'Mehendi Art',
    description: 'Beautiful henna designs for all occasions',
    icon: Palette,
    color: 'bg-green-100 text-green-600',
  },
  {
    name: 'Custom Cakes',
    description: 'Designer cakes for special celebrations',
    icon: Cake,
    color: 'bg-rose-100 text-rose-600',
  },
  {
    name: 'Photography',
    description: 'Professional photography services',
    icon: Camera,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    name: 'Painting',
    description: 'Original artworks and custom paintings',
    icon: Brush,
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    name: 'Calligraphy',
    description: 'Beautiful hand-lettering and calligraphy art',
    icon: Pen,
    color: 'bg-slate-100 text-slate-600',
  },
];

export default function Categories() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              Explore Categories
            </h1>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              Discover talented creators across various creative fields. Find the perfect
              artisan for your custom project needs.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/explore?category=${encodeURIComponent(category.name)}`}
              >
                <Card className="hover:shadow-lg transition-all hover:border-primary/50 cursor-pointer h-full group">
                  <CardContent className="p-6">
                    <div
                      className={`w-14 h-14 rounded-xl ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <category.icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <div className="bg-primary/10 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                Are you a Creator?
              </h3>
              <p className="text-muted-foreground mb-4">
                Join KALAKAR ARENA and showcase your talent to thousands of potential customers.
              </p>
              <Link to="/signup?type=creator">
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium transition-colors">
                  Join as Creator
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
