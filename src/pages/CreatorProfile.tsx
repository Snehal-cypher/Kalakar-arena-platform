import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  MapPin,
  Phone,
  Instagram,
  Globe,
  Heart,
  MessageSquare,
  Loader2,
  ArrowLeft,
  Send,
  ImageIcon
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Post {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string | null;
  created_at: string;
}

export default function CreatorProfile() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [profile, setProfile] = useState<Record<string, unknown> | null>(null);
  const [creatorProfile, setCreatorProfile] = useState<Record<string, unknown> | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    if (id) {
      fetchCreatorData();
      if (user) {
        checkFollowStatus();
      }
    }
  }, [id, user]);

  const fetchCreatorData = async () => {
    if (!id) return;

    try {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', id)
        .maybeSingle();

      if (!profileData) {
        setLoading(false);
        return;
      }

      const { data: creatorData } = await supabase
        .from('creator_profiles')
        .select('*')
        .eq('user_id', id)
        .maybeSingle();

      const { data: postsData } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', id)
        .order('created_at', { ascending: false });

      setProfile(profileData);
      setCreatorProfile(creatorData);
      setPosts(postsData || []);
    } catch (error) {
      console.error('Error fetching creator:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkFollowStatus = async () => {
    if (!user || !id) return;

    const { data } = await supabase
      .from('follows')
      .select('id')
      .eq('follower_id', user.id)
      .eq('following_id', id)
      .maybeSingle();

    setIsFollowing(!!data);
  };

  const handleFollow = async () => {
    if (!user || !id) return;

    setFollowLoading(true);
    try {
      if (isFollowing) {
        await supabase
          .from('follows')
          .delete()
          .eq('follower_id', user.id)
          .eq('following_id', id);
        setIsFollowing(false);
      } else {
        await supabase
          .from('follows')
          .insert({ follower_id: user.id, following_id: id });
        setIsFollowing(true);
      }
    } catch (error) {
      console.error('Error following:', error);
    } finally {
      setFollowLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!user || !id || !contactMessage.trim()) return;

    setSendingMessage(true);
    try {
      await supabase
        .from('contact_requests')
        .insert({
          sender_id: user.id,
          creator_id: id,
          message: contactMessage.trim()
        });

      toast({ title: 'Message sent successfully!' });
      setContactMessage('');
      setDialogOpen(false);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({ title: 'Failed to send message', variant: 'destructive' });
    } finally {
      setSendingMessage(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile || !creatorProfile) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-20">
          <div className="max-w-4xl mx-auto px-4 py-16 text-center">
            <h1 className="font-serif text-2xl font-bold text-foreground mb-4">
              Creator not found
            </h1>
            <Link to="/explore">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Explore
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const fullName = profile.full_name as string || 'Creator';
  const avatarUrl = profile.avatar_url as string | undefined;
  const bio = creatorProfile.bio as string | undefined;
  const city = creatorProfile.city as string | undefined;
  const state = creatorProfile.state as string | undefined;
  const phone = creatorProfile.phone as string | undefined;
  const instagram = creatorProfile.instagram as string | undefined;
  const website = creatorProfile.website as string | undefined;
  const whatsapp = creatorProfile.whatsapp as string | undefined;
  const categories = (creatorProfile.categories as string[]) || [];
  const portfolioDescription = creatorProfile.portfolio_description as string | undefined;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <Link to="/explore" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Explore
          </Link>

          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-primary/20">
                  <AvatarImage src={avatarUrl} alt={fullName} />
                  <AvatarFallback className="bg-primary/10 text-primary text-3xl font-semibold">
                    {fullName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <div>
                      <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                        {fullName}
                      </h1>
                      {(city || state) && (
                        <div className="flex items-center gap-1 text-muted-foreground mt-1">
                          <MapPin className="w-4 h-4" />
                          {[city, state].filter(Boolean).join(', ')}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {user && user.id !== id && (
                        <>
                          <Button
                            variant={isFollowing ? 'default' : 'outline'}
                            onClick={handleFollow}
                            disabled={followLoading}
                          >
                            {followLoading ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                <Heart className={`mr-2 h-4 w-4 ${isFollowing ? 'fill-current' : ''}`} />
                                {isFollowing ? 'Following' : 'Follow'}
                              </>
                            )}
                          </Button>

                          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <DialogTrigger asChild>
                              <Button>
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Contact
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-card">
                              <DialogHeader>
                                <DialogTitle>Contact {fullName}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <Textarea
                                  placeholder="Write your message..."
                                  value={contactMessage}
                                  onChange={(e) => setContactMessage(e.target.value)}
                                  rows={4}
                                />
                                <Button
                                  className="w-full"
                                  onClick={handleSendMessage}
                                  disabled={sendingMessage || !contactMessage.trim()}
                                >
                                  {sendingMessage ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  ) : (
                                    <Send className="mr-2 h-4 w-4" />
                                  )}
                                  Send Message
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </>
                      )}
                    </div>
                  </div>

                  {bio && (
                    <p className="text-muted-foreground mb-4">{bio}</p>
                  )}

                  {categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {categories.map((cat) => (
                        <Badge key={cat} variant="secondary">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Contact Info */}
                  <div className="flex flex-wrap gap-4 text-sm">
                    {phone && (
                      <a href={`tel:${phone}`} className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                        <Phone className="w-4 h-4" />
                        {phone}
                      </a>
                    )}
                    {instagram && (
                      <a
                        href={`https://instagram.com/${instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                      >
                        <Instagram className="w-4 h-4" />
                        {instagram}
                      </a>
                    )}
                    {website && (
                      <a
                        href={website.startsWith('http') ? website : `https://${website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                      >
                        <Globe className="w-4 h-4" />
                        Website
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Portfolio */}
          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              Portfolio
              {portfolioDescription && (
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  — {portfolioDescription}
                </span>
              )}
            </h2>

            {posts.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="py-12 text-center">
                  <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No portfolio items yet</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.map((post) => (
                  <Card
                    key={post.id}
                    className="overflow-hidden cursor-pointer group"
                    onClick={() => setSelectedPost(post)}
                  >
                    <div className="aspect-square relative">
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-medium text-foreground truncate">{post.title}</h4>
                      {post.category && (
                        <Badge variant="secondary" className="mt-2">
                          {post.category}
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Post Detail Dialog */}
          <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
            <DialogContent className="max-w-3xl bg-card">
              {selectedPost && (
                <div className="grid md:grid-cols-2 gap-4">
                  <img
                    src={selectedPost.image_url}
                    alt={selectedPost.title}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                      {selectedPost.title}
                    </h3>
                    {selectedPost.category && (
                      <Badge variant="secondary" className="mb-4">
                        {selectedPost.category}
                      </Badge>
                    )}
                    {selectedPost.description && (
                      <p className="text-muted-foreground">{selectedPost.description}</p>
                    )}
                    <p className="text-sm text-muted-foreground mt-4">
                      Posted on {new Date(selectedPost.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Footer />
    </main>
  );
}
