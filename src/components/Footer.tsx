import { Link } from 'react-router-dom';
import { Palette } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-brand-cream text-brand-deep-red py-16 border-t border-brand-deep-red/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-brand-deep-red flex items-center justify-center">
                <Palette className="w-5 h-5 text-brand-cream" />
              </div>
              <span className="font-serif text-xl font-bold">KALAKAR ARENA</span>
            </Link>
            <p className="text-brand-deep-red/80 text-sm leading-relaxed">
              Connecting talented local creators with people seeking unique,
              handcrafted products and services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-brand-deep-red/80">
              <li><Link to="/explore" className="hover:text-brand-deep-red transition-colors font-medium">Explore Creators</Link></li>
              <li><Link to="/categories" className="hover:text-brand-deep-red transition-colors font-medium">Categories</Link></li>
              <li><Link to="/about" className="hover:text-brand-deep-red transition-colors font-medium">About Us</Link></li>
            </ul>
          </div>

          {/* For Creators */}
          <div>
            <h4 className="font-semibold mb-4">For Creators</h4>
            <ul className="space-y-2 text-brand-deep-red/80">
              <li><Link to="/signup?type=creator" className="hover:text-brand-deep-red transition-colors font-medium">Join as Creator</Link></li>
              <li><Link to="/dashboard" className="hover:text-brand-deep-red transition-colors font-medium">Creator Dashboard</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Popular Categories</h4>
            <ul className="space-y-2 text-brand-deep-red/80">
              <li><Link to="/explore?category=fashion" className="hover:text-brand-deep-red transition-colors font-medium">Fashion Design</Link></li>
              <li><Link to="/explore?category=baking" className="hover:text-brand-deep-red transition-colors font-medium">Home Baking</Link></li>
              <li><Link to="/explore?category=jewelry" className="hover:text-brand-deep-red transition-colors font-medium">Jewelry Making</Link></li>
              <li><Link to="/explore?category=embroidery" className="hover:text-brand-deep-red transition-colors font-medium">Embroidery</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-brand-deep-red/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-brand-deep-red/60 text-sm">
            © 2024 KALAKAR ARENA. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-brand-deep-red/60 text-sm">
            <span className="hover:text-brand-deep-red transition-colors cursor-pointer font-medium">Privacy Policy</span>
            <span className="hover:text-brand-deep-red transition-colors cursor-pointer font-medium">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
