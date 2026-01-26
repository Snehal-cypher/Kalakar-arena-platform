import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, MapPin, ImageIcon, Heart, Loader2 } from 'lucide-react';

interface Creator {
  user_id: string;
  bio: string | null;
  city: string | null;
  categories: string[];
  profile: {
    full_name: string | null;
    avatar_url: string | null;
  } | null;
  posts: {
    id: string;
    title: string;
    image_url: string;
  }[];
}

export default function Explore() {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [following, setFollowing] = useState<Set<string>>(new Set());

  const categories = [
    'All', 'Fashion Design', 'Home Baking', 'Jewelry Making', 'Embroidery',
    'Candle Making', 'Pottery', 'Crochet & Knitting', 'Mehendi Art',
    'Photography', 'Painting', 'Calligraphy'
  ];

  useEffect(() => {
    fetchCreators();
    if (user) {
      fetchFollowing();
    }
  }, [user]);

  const fetchCreators = async () => {
    try {
      // Fetch creator profiles with their profile info
      const { data: creatorProfiles, error } = await supabase
        .from('creator_profiles')
        .select('user_id, bio, city, categories');

      if (error) throw error;

      // Fetch profiles for these creators
      const userIds = creatorProfiles?.map(c => c.user_id) || [];
      
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, full_name, avatar_url')
        .in('user_id', userIds);

      // Fetch posts for these creators
      const { data: posts } = await supabase
        .from('posts')
        .select('id, user_id, title, image_url')
        .in('user_id', userIds)
        .order('created_at', { ascending: false });

      // Combine data
      const combinedData: Creator[] = creatorProfiles?.map(creator => ({
        ...creator,
        categories: creator.categories || [],
        profile: profiles?.find(p => p.user_id === creator.user_id) || null,
        posts: posts?.filter(p => p.user_id === creator.user_id).slice(0, 3) || []
      })) || [];

      setCreators(combinedData);
    } catch (error) {
      console.error('Error fetching creators:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFollowing = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('follows')
      .select('following_id')
      .eq('follower_id', user.id);

    if (data) {
      setFollowing(new Set(data.map(f => f.following_id)));
    }
  };

  const handleFollow = async (creatorId: string) => {
    if (!user) return;

    if (following.has(creatorId)) {
      await supabase
        .from('follows')
        .delete()
        .eq('follower_id', user.id)
        .eq('following_id', creatorId);
      
      setFollowing(prev => {
        const next = new Set(prev);
        next.delete(creatorId);
        return next;
      });
    } else {
      await supabase
        .from('follows')
        .insert({ follower_id: user.id, following_id: creatorId });
      
      setFollowing(prev => new Set([...prev, creatorId]));
    }
  };

  const filteredCreators = creators.filter(creator => {
    const matchesSearch = !searchQuery || 
      creator.profile?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.city?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = !selectedCategory || selectedCategory === 'All' ||
      creator.categories?.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore Creators
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover talented local creators and find the perfect artisan for your needs
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by name, skill, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category || (category === 'All' && !selectedCategory) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(category === 'All' ? '' : category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Creators Grid */}
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredCreators.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="py-12 text-center">
                <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h4 className="font-medium text-foreground mb-2">No creators found</h4>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCreators.map((creator) => (
                <Link key={creator.user_id} to={`/creator/${creator.user_id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                    {/* Posts Preview */}
                    <div className="grid grid-cols-3 gap-0.5 aspect-video bg-muted">
                      {creator.posts.length > 0 ? (
                        creator.posts.map((post, index) => (
                          <div
                            key={post.id}
                            className={`relative overflow-hidden ${
                              index === 0 && creator.posts.length === 1 ? 'col-span-3' : ''
                            }`}
                          >
                            <img
                              src={post.image_url}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ))
                      ) : (
                        <div className="col-span-3 flex items-center justify-center">
                          <ImageIcon className="w-12 h-12 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        {/* Avatar */}
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex-shrink-0 overflow-hidden">
                          {creator.profile?.avatar_url ? (
                            <img
                              src={creator.profile.avatar_url}
                              alt={creator.profile.full_name || 'Creator'}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-primary font-semibold text-lg">
                                {creator.profile?.full_name?.charAt(0) || 'C'}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-semibold text-foreground truncate">
                              {creator.profile?.full_name || 'Creator'}
                            </h3>
                            {user && (
                              <Button
                                size="sm"
                                variant={following.has(creator.user_id) ? 'default' : 'outline'}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleFollow(creator.user_id);
                                }}
                              >
                                <Heart className={`w-4 h-4 ${following.has(creator.user_id) ? 'fill-current' : ''}`} />
                              </Button>
                            )}
                          </div>
                          
                          {creator.city && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                              <MapPin className="w-3 h-3" />
                              {creator.city}
                            </div>
                          )}

                          {creator.categories && creator.categories.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {creator.categories.slice(0, 2).map((cat) => (
                                <Badge key={cat} variant="secondary" className="text-xs">
                                  {cat}
                                </Badge>
                              ))}
                              {creator.categories.length > 2 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{creator.categories.length - 2}
                                </Badge>
                              )}
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
        </div>
      </div>

      <Footer />
    </main>
  );
}
