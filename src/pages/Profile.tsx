import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  MessageSquare, 
  LogOut, 
  Loader2, 
  MapPin, 
  User,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Follow {
  id: string;
  following_id: string;
  created_at: string;
}

interface ContactRequest {
  id: string;
  message: string;
  status: string;
  created_at: string;
  creator_id: string;
}

export default function Profile() {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Record<string, unknown> | null>(null);
  const [follows, setFollows] = useState<Follow[]>([]);
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);
  const [followedCreators, setFollowedCreators] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }

    if (user) {
      fetchData();
    }
  }, [user, authLoading, navigate]);

  const fetchData = async () => {
    if (!user) return;

    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      setProfile(profileData);

      // Fetch follows
      const { data: followsData } = await supabase
        .from('follows')
        .select('*')
        .eq('follower_id', user.id);

      if (followsData) {
        setFollows(followsData);

        // Fetch followed creators' profiles
        const creatorIds = followsData.map(f => f.following_id);
        if (creatorIds.length > 0) {
          const { data: creatorsData } = await supabase
            .from('profiles')
            .select('*')
            .in('user_id', creatorIds);

          const { data: creatorProfilesData } = await supabase
            .from('creator_profiles')
            .select('*')
            .in('user_id', creatorIds);

          const combined = creatorsData?.map(p => ({
            ...p,
            creatorProfile: creatorProfilesData?.find(cp => cp.user_id === p.user_id)
          })) || [];

          setFollowedCreators(combined);
        }
      }

      // Fetch contact requests
      const { data: requestsData } = await supabase
        .from('contact_requests')
        .select('*')
        .eq('sender_id', user.id)
        .order('created_at', { ascending: false });

      if (requestsData) {
        setContactRequests(requestsData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    await signOut();
    navigate('/');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'accepted':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const userName = profile?.full_name as string || user?.email?.split('@')[0] || 'User';
  const avatarUrl = profile?.avatar_url as string | undefined;
  const userType = user?.user_metadata?.user_type;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Avatar className="h-24 w-24 border-4 border-primary/20">
                  <AvatarImage src={avatarUrl} alt={userName} />
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
                    {userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center sm:text-left">
                  <h1 className="font-serif text-2xl font-bold text-foreground">
                    {userName}
                  </h1>
                  <p className="text-muted-foreground">{user?.email}</p>
                  <div className="flex items-center justify-center sm:justify-start gap-4 mt-4">
                    <div className="text-center">
                      <div className="font-bold text-foreground">{follows.length}</div>
                      <div className="text-xs text-muted-foreground">Following</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-foreground">{contactRequests.length}</div>
                      <div className="text-xs text-muted-foreground">Inquiries</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {userType === 'creator' && (
                    <Link to="/dashboard">
                      <Button variant="outline" className="w-full">
                        Go to Dashboard
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="border-destructive text-destructive hover:bg-destructive/10"
                  >
                    {loggingOut ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="following" className="space-y-6">
            <TabsList className="bg-muted">
              <TabsTrigger
                value="following"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Heart className="w-4 h-4 mr-2" />
                Following ({follows.length})
              </TabsTrigger>
              <TabsTrigger
                value="inquiries"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                My Inquiries ({contactRequests.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="following">
              {follows.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="py-12 text-center">
                    <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h4 className="font-medium text-foreground mb-2">No creators followed yet</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Start exploring and follow creators whose work you love
                    </p>
                    <Link to="/explore">
                      <Button>Explore Creators</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {followedCreators.map((creator) => (
                    <Link key={creator.user_id as string} to={`/creator/${creator.user_id}`}>
                      <Card className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-14 w-14">
                              <AvatarImage src={creator.avatar_url as string} />
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {(creator.full_name as string)?.charAt(0) || 'C'}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-foreground truncate">
                                {creator.full_name as string || 'Creator'}
                              </h4>
                              {(creator.creatorProfile as Record<string, unknown>)?.city && (
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <MapPin className="w-3 h-3" />
                                  {(creator.creatorProfile as Record<string, unknown>).city as string}
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="inquiries">
              {contactRequests.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="py-12 text-center">
                    <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h4 className="font-medium text-foreground mb-2">No inquiries sent yet</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Contact creators to discuss your requirements
                    </p>
                    <Link to="/explore">
                      <Button>Find Creators</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {contactRequests.map((request) => (
                    <Card key={request.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge
                                variant={
                                  request.status === 'accepted' ? 'default' :
                                  request.status === 'rejected' ? 'destructive' : 'secondary'
                                }
                              >
                                {getStatusIcon(request.status)}
                                <span className="ml-1">{request.status}</span>
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {new Date(request.created_at).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-foreground bg-muted rounded-lg p-3 text-sm">
                              {request.message}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
