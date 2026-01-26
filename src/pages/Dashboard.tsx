import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  User, 
  ImagePlus, 
  MessageSquare, 
  Settings,
  Loader2,
  Camera,
  Plus,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Eye
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

interface ContactRequest {
  id: string;
  message: string;
  status: string;
  created_at: string;
  sender_id: string;
}

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState<Record<string, unknown> | null>(null);
  const [creatorProfile, setCreatorProfile] = useState<Record<string, unknown> | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingPost, setUploadingPost] = useState(false);

  // Form states
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [instagram, setInstagram] = useState('');
  const [website, setWebsite] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [portfolioDescription, setPortfolioDescription] = useState('');
  const [categories, setCategories] = useState<string[]>([]);

  // New post form
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostDescription, setNewPostDescription] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('');
  const [newPostImage, setNewPostImage] = useState<File | null>(null);

  const categoryOptions = [
    'Fashion Design', 'Home Baking', 'Jewelry Making', 'Embroidery',
    'Candle Making', 'Pottery', 'Crochet & Knitting', 'Mehendi Art',
    'Custom Cakes', 'Photography', 'Painting', 'Calligraphy'
  ];

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

      if (profileData) {
        setProfile(profileData);
        setFullName(profileData.full_name || '');
      }

      // Fetch creator profile
      const { data: creatorData } = await supabase
        .from('creator_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (creatorData) {
        setCreatorProfile(creatorData);
        setBio(creatorData.bio || '');
        setPhone(creatorData.phone || '');
        setCity(creatorData.city || '');
        setState(creatorData.state || '');
        setInstagram(creatorData.instagram || '');
        setWebsite(creatorData.website || '');
        setWhatsapp(creatorData.whatsapp || '');
        setPortfolioDescription(creatorData.portfolio_description || '');
        setCategories(creatorData.categories || []);
      }

      // Fetch posts
      const { data: postsData } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (postsData) {
        setPosts(postsData);
      }

      // Fetch contact requests
      const { data: requestsData } = await supabase
        .from('contact_requests')
        .select('*')
        .eq('creator_id', user.id)
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

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploadingAvatar(true);
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      await supabase
        .from('profiles')
        .update({ avatar_url: urlData.publicUrl })
        .eq('user_id', user.id);

      setProfile(prev => prev ? { ...prev, avatar_url: urlData.publicUrl } : null);
      toast({ title: 'Avatar updated successfully!' });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast({ title: 'Failed to upload avatar', variant: 'destructive' });
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    setSaving(true);
    try {
      // Update profile
      await supabase
        .from('profiles')
        .update({ full_name: fullName })
        .eq('user_id', user.id);

      // Update creator profile
      await supabase
        .from('creator_profiles')
        .update({
          bio,
          phone,
          city,
          state,
          instagram,
          website,
          whatsapp,
          portfolio_description: portfolioDescription,
          categories
        })
        .eq('user_id', user.id);

      toast({ title: 'Profile updated successfully!' });
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({ title: 'Failed to save profile', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleAddPost = async () => {
    if (!user || !newPostImage || !newPostTitle) return;

    setUploadingPost(true);
    try {
      const fileExt = newPostImage.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('posts')
        .upload(filePath, newPostImage);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('posts')
        .getPublicUrl(filePath);

      const { data: postData, error: postError } = await supabase
        .from('posts')
        .insert({
          user_id: user.id,
          title: newPostTitle,
          description: newPostDescription || null,
          image_url: urlData.publicUrl,
          category: newPostCategory || null
        })
        .select()
        .single();

      if (postError) throw postError;

      setPosts(prev => [postData, ...prev]);
      setNewPostTitle('');
      setNewPostDescription('');
      setNewPostCategory('');
      setNewPostImage(null);
      toast({ title: 'Post added successfully!' });
    } catch (error) {
      console.error('Error adding post:', error);
      toast({ title: 'Failed to add post', variant: 'destructive' });
    } finally {
      setUploadingPost(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

      setPosts(prev => prev.filter(p => p.id !== postId));
      toast({ title: 'Post deleted successfully!' });
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({ title: 'Failed to delete post', variant: 'destructive' });
    }
  };

  const handleUpdateRequestStatus = async (requestId: string, status: 'accepted' | 'rejected') => {
    try {
      await supabase
        .from('contact_requests')
        .update({ status })
        .eq('id', requestId);

      setContactRequests(prev => 
        prev.map(r => r.id === requestId ? { ...r, status } : r)
      );
      toast({ title: `Request ${status}!` });
    } catch (error) {
      console.error('Error updating request:', error);
      toast({ title: 'Failed to update request', variant: 'destructive' });
    }
  };

  const toggleCategory = (category: string) => {
    setCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const userName = fullName || user?.email?.split('@')[0] || 'Creator';
  const avatarUrl = profile?.avatar_url as string | undefined;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="relative">
              <Avatar className="h-20 w-20 border-4 border-primary/20">
                <AvatarImage src={avatarUrl} alt={userName} />
                <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
                  {userName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <label className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1.5 cursor-pointer hover:bg-primary/90 transition-colors">
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                  disabled={uploadingAvatar}
                />
              </label>
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-foreground">
                Welcome, {userName}!
              </h1>
              <p className="text-muted-foreground">Manage your creator profile and portfolio</p>
            </div>
          </div>

          {/* Dashboard Tabs */}
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="bg-muted">
              <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <User className="w-4 h-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="portfolio" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <ImagePlus className="w-4 h-4 mr-2" />
                Portfolio ({posts.length})
              </TabsTrigger>
              <TabsTrigger value="requests" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <MessageSquare className="w-4 h-4 mr-2" />
                Requests ({contactRequests.length})
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Your public profile details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Bio</Label>
                      <Textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell people about yourself and your work..."
                        rows={4}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Portfolio Description</Label>
                      <Textarea
                        value={portfolioDescription}
                        onChange={(e) => setPortfolioDescription(e.target.value)}
                        placeholder="Describe your portfolio and services..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>How clients can reach you</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>City</Label>
                        <Input
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Your city"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>State</Label>
                        <Input
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          placeholder="Your state"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>WhatsApp</Label>
                      <Input
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="WhatsApp number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Instagram</Label>
                      <Input
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        placeholder="@yourusername"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Website</Label>
                      <Input
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Categories</CardTitle>
                    <CardDescription>Select the categories that best describe your work</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {categoryOptions.map((category) => (
                        <Badge
                          key={category}
                          variant={categories.includes(category) ? 'default' : 'outline'}
                          className="cursor-pointer"
                          onClick={() => toggleCategory(category)}
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="md:col-span-2">
                  <Button onClick={handleSaveProfile} disabled={saving} className="w-full sm:w-auto">
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Settings className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Portfolio Tab */}
            <TabsContent value="portfolio">
              <div className="space-y-6">
                {/* Add New Post */}
                <Card>
                  <CardHeader>
                    <CardTitle>Add New Work</CardTitle>
                    <CardDescription>Showcase your latest creation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Title</Label>
                          <Input
                            value={newPostTitle}
                            onChange={(e) => setNewPostTitle(e.target.value)}
                            placeholder="Name of your work"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Textarea
                            value={newPostDescription}
                            onChange={(e) => setNewPostDescription(e.target.value)}
                            placeholder="Describe your work..."
                            rows={3}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Category</Label>
                          <Input
                            value={newPostCategory}
                            onChange={(e) => setNewPostCategory(e.target.value)}
                            placeholder="e.g., Fashion Design"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Image</Label>
                          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                            {newPostImage ? (
                              <div className="space-y-2">
                                <img
                                  src={URL.createObjectURL(newPostImage)}
                                  alt="Preview"
                                  className="max-h-40 mx-auto rounded-lg object-cover"
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setNewPostImage(null)}
                                >
                                  Remove
                                </Button>
                              </div>
                            ) : (
                              <label className="cursor-pointer">
                                <ImagePlus className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                                <p className="text-sm text-muted-foreground">
                                  Click to upload image
                                </p>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => setNewPostImage(e.target.files?.[0] || null)}
                                />
                              </label>
                            )}
                          </div>
                        </div>
                        <Button
                          onClick={handleAddPost}
                          disabled={uploadingPost || !newPostImage || !newPostTitle}
                          className="w-full"
                        >
                          {uploadingPost ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Plus className="mr-2 h-4 w-4" />
                              Add to Portfolio
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Existing Posts */}
                {posts.length === 0 ? (
                  <Card className="border-dashed">
                    <CardContent className="py-12 text-center">
                      <ImagePlus className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h4 className="font-medium text-foreground mb-2">No posts yet</h4>
                      <p className="text-sm text-muted-foreground">
                        Start adding your work to build your portfolio
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {posts.map((post) => (
                      <Card key={post.id} className="overflow-hidden group">
                        <div className="aspect-square relative">
                          <img
                            src={post.image_url}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button
                              size="icon"
                              variant="secondary"
                              onClick={() => handleDeletePost(post.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
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
            </TabsContent>

            {/* Requests Tab */}
            <TabsContent value="requests">
              {contactRequests.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="py-12 text-center">
                    <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h4 className="font-medium text-foreground mb-2">No requests yet</h4>
                    <p className="text-sm text-muted-foreground">
                      When users contact you, their requests will appear here
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {contactRequests.map((request) => (
                    <Card key={request.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge
                                variant={
                                  request.status === 'accepted' ? 'default' :
                                  request.status === 'rejected' ? 'destructive' : 'secondary'
                                }
                              >
                                {request.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                                {request.status === 'accepted' && <CheckCircle className="w-3 h-3 mr-1" />}
                                {request.status === 'rejected' && <XCircle className="w-3 h-3 mr-1" />}
                                {request.status}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {new Date(request.created_at).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-foreground">{request.message}</p>
                          </div>
                          {request.status === 'pending' && (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleUpdateRequestStatus(request.id, 'accepted')}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Accept
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUpdateRequestStatus(request.id, 'rejected')}
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          )}
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
    </main>
  );
}
