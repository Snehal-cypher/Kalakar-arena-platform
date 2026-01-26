import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Palette, Loader2, AlertCircle, User, Paintbrush } from 'lucide-react';

export default function SignUp() {
  const [searchParams] = useSearchParams();
  const [userType, setUserType] = useState<'user' | 'creator'>(
    searchParams.get('type') === 'creator' ? 'creator' : 'user'
  );
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    const { error } = await signUp(email, password, fullName, userType);
    
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      navigate(userType === 'creator' ? '/dashboard' : '/explore');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
            <Palette className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-serif text-2xl font-bold text-foreground">KALAKAR ARENA</span>
        </Link>

        <Card className="border-border shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="font-serif text-2xl">Create Account</CardTitle>
            <CardDescription>Join KALAKAR ARENA to start your creative journey</CardDescription>
          </CardHeader>
          <CardContent>
            {/* User Type Selection */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={() => setUserType('user')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  userType === 'user'
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <User className={`w-6 h-6 mx-auto mb-2 ${userType === 'user' ? 'text-primary' : 'text-muted-foreground'}`} />
                <div className={`font-medium ${userType === 'user' ? 'text-primary' : 'text-foreground'}`}>
                  I'm a User
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Discover creators
                </div>
              </button>
              <button
                type="button"
                onClick={() => setUserType('creator')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  userType === 'creator'
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <Paintbrush className={`w-6 h-6 mx-auto mb-2 ${userType === 'creator' ? 'text-primary' : 'text-muted-foreground'}`} />
                <div className={`font-medium ${userType === 'creator' ? 'text-primary' : 'text-foreground'}`}>
                  I'm a Creator
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Showcase my work
                </div>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-green-500 bg-green-50 text-green-700">
                  <AlertDescription>Account created successfully! Redirecting...</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
