import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Palette, Menu, X, User, LayoutDashboard, LogOut, Compass } from 'lucide-react';

export function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const userType = user?.user_metadata?.user_type;
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-8 flex items-start justify-between pointer-events-none">
      {/* Logo - Top Left */}
      <Link to="/" className="pointer-events-auto flex items-center gap-2">
        <img
          src="/kalakar-arena-logo.png"
          alt="Kalakar Arena"
          className="h-20 w-auto md:h-24 object-contain"
        />
      </Link>

      {/* Nav Pill - Top Right */}
      <div className="pointer-events-auto bg-brand-teal/95 backdrop-blur-md border border-white/20 shadow-lg rounded-full px-8 py-3 flex items-center gap-6 md:gap-8 transition-all duration-300">
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-white font-medium hover:text-brand-cream transition-colors">
            Home
          </Link>
          <Link to="/about" className="text-white font-medium hover:text-brand-cream transition-colors">
            About
          </Link>
          <Link to="/categories" className="text-white font-medium hover:text-brand-cream transition-colors flex items-center gap-1">
            Services <span className="text-xs">▼</span>
          </Link>
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-3 pl-2 md:border-l md:border-white/20">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full hover:bg-white/10 text-white">
                  <Avatar className="h-8 w-8 border border-white/30">
                    <AvatarImage src="" alt={userName} />
                    <AvatarFallback className="bg-white/20 text-white">
                      {userName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-card" align="end" forceMount>
                {/* ... existing menu items ... */}
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userName}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                {userType === 'creator' && (
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-brand-cream font-medium rounded-full">
                Login
              </Button>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Outside the pill) */}
      {mobileMenuOpen && (
        <div className="fixed top-24 right-6 w-64 bg-[#FDF6F3] rounded-2xl shadow-xl border border-white/50 p-4 pointer-events-auto z-50 animate-fade-in flex flex-col gap-2 md:hidden">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 hover:bg-[#4E2C2A]/5 rounded-lg text-[#4E2C2A]">Home</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 hover:bg-[#4E2C2A]/5 rounded-lg text-[#4E2C2A]">About</Link>
          <Link to="/categories" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 hover:bg-[#4E2C2A]/5 rounded-lg text-[#4E2C2A]">Services</Link>
        </div>
      )}
    </nav>
  );
}
