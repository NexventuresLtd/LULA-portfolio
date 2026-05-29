import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { User, Building2, Lock, Palette, Save, ExternalLink, Upload, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "../../components/ui/textarea";
import { useContent } from "../../context/ContentContext";

export function AdminSettingsPage() {
  const { orgSettings, updateOrgSettings, appearanceSettings, updateAppearanceSettings } = useContent();

  // Account Settings
  const [accountData, setAccountData] = useState({
    name: "Admin User",
    email: "admin@lulacongo.org",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Organization Settings (from context)
  const [orgData, setOrgData] = useState({
    name: orgSettings.name || "Let Us Live Association",
    acronym: "LULA",
    email: orgSettings.email,
    phone: orgSettings.phone,
    address: orgSettings.address,
    website: orgSettings.website || "www.lula-asbl.org"
  });

  // Site Appearance Settings (from context)
  const [appearanceData, setAppearanceData] = useState({
    homeHeroBackground: appearanceSettings.homeHeroBackground || "",
    aboutHeroBackground: appearanceSettings.aboutHeroBackground || "",
    aboutStoryBackground: appearanceSettings.aboutStoryBackground || "",
    teamHeroBackground: appearanceSettings.teamHeroBackground || "",
    contactHeroBackground: appearanceSettings.contactHeroBackground || "",
    programsHeroBackground: appearanceSettings.programsHeroBackground || "",
    projectsHeroBackground: appearanceSettings.projectsHeroBackground || "",
    newsHeroBackground: appearanceSettings.newsHeroBackground || "",
    impactStoriesHeroBackground: appearanceSettings.impactStoriesHeroBackground || "",
    partnersHeroBackground: appearanceSettings.partnersHeroBackground || "",
    getInvolvedHeroBackground: appearanceSettings.getInvolvedHeroBackground || "",
    homeCTABackground: appearanceSettings.homeCTABackground || ""
  });

  // Load appearance from context when it changes
  useEffect(() => {
    if (Object.keys(appearanceSettings).length > 0) {
      setAppearanceData(prev => ({ ...prev, ...appearanceSettings }));
    }
  }, [appearanceSettings]);

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (accountData.newPassword) {
      if (accountData.newPassword !== accountData.confirmPassword) {
        toast.error("New passwords do not match!");
        return;
      }
      if (!accountData.currentPassword) {
        toast.error("Please enter your current password!");
        return;
      }
    }
    
    // Save account settings
    toast.success("Account settings updated successfully!");
    
    // Clear password fields
    setAccountData({
      ...accountData,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  const handleSaveOrganization = (e: React.FormEvent) => {
    e.preventDefault();
    updateOrgSettings({
      name: orgData.name,
      email: orgData.email,
      phone: orgData.phone,
      address: orgData.address,
      website: orgData.website
    });
    toast.success("Organization settings updated successfully!");
  };

  const handleSaveAppearance = async () => {
    const merged = { ...appearanceSettings, ...Object.fromEntries(
      Object.entries(appearanceData).filter(([_, v]) => v !== '')
    )};
    try {
      await updateAppearanceSettings(merged);
      toast.success("Appearance settings saved successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save appearance settings.");
    }
  };

  const handleRevertToDefault = async () => {
    const defaults = {
      homeHeroBackground: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
      aboutHeroBackground: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
      aboutStoryBackground: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
      teamHeroBackground: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
      contactHeroBackground: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
      programsHeroBackground: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
      projectsHeroBackground: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
      newsHeroBackground: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
      impactStoriesHeroBackground: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
      partnersHeroBackground: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
      getInvolvedHeroBackground: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
      homeCTABackground: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    };
    setAppearanceData(defaults);
    try {
      await updateAppearanceSettings(defaults);
      toast.success('Reverted to default images!');
    } catch (error) {
      toast.error('Failed to revert. Please try again.');
    }
  };

  const handleImageUpload = (fieldName: keyof typeof appearanceData) => async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const token = localStorage.getItem('lula-admin-token');
      const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL || 'https://api.lula-asbl.org'}/api/media/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      const imageUrl = `${import.meta.env.VITE_BACKEND_BASE_URL || 'https://api.lula-asbl.org'}${data.url}`;
      const updated = { ...appearanceData, [fieldName]: imageUrl };
      setAppearanceData(updated);
      await updateAppearanceSettings({ ...appearanceSettings, ...Object.fromEntries(
        Object.entries(updated).filter(([_, v]) => v !== '')
      )});
      toast.success('Image uploaded and saved!');
    } catch {
      toast.error('Failed to upload image. Please try again.');
    }
  };

  const handleImageUrlChange = async (fieldName: keyof typeof appearanceData, value: string) => {
    const updated = { ...appearanceData, [fieldName]: value };
    setAppearanceData(updated);
  };

  const handleImageUrlBlur = async () => {
    const nonEmpty = Object.fromEntries(
      Object.entries(appearanceData).filter(([_, v]) => v !== '')
    );
    if (Object.keys(nonEmpty).length > 0) {
      try {
        await updateAppearanceSettings({ ...appearanceSettings, ...nonEmpty });
      } catch {}
    }
  };


  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account and organization settings</p>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
          <TabsTrigger value="account">
            <User className="w-4 h-4 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger value="organization">
            <Building2 className="w-4 h-4 mr-2" />
            Organization
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="w-4 h-4 mr-2" />
            Appearance
          </TabsTrigger>
        </TabsList>

        {/* Account Settings Tab */}
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your personal account information and security</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveAccount} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="account-name">Full Name</Label>
                    <Input
                      id="account-name"
                      value={accountData.name}
                      onChange={(e) => setAccountData({ ...accountData, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="account-email">Email Address</Label>
                    <Input
                      id="account-email"
                      type="email"
                      value={accountData.email}
                      onChange={(e) => setAccountData({ ...accountData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Change Password
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        value={accountData.currentPassword}
                        onChange={(e) => setAccountData({ ...accountData, currentPassword: e.target.value })}
                        placeholder="Enter current password"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={accountData.newPassword}
                        onChange={(e) => setAccountData({ ...accountData, newPassword: e.target.value })}
                        placeholder="Enter new password"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={accountData.confirmPassword}
                        onChange={(e) => setAccountData({ ...accountData, confirmPassword: e.target.value })}
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save Account Settings
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Organization Settings Tab */}
        <TabsContent value="organization">
          <Card>
            <CardHeader>
              <CardTitle>Organization Information</CardTitle>
              <CardDescription>Update your organization's public information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveOrganization} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="org-name">Organization Name</Label>
                    <Input
                      id="org-name"
                      value={orgData.name}
                      onChange={(e) => setOrgData({ ...orgData, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="org-acronym">Acronym</Label>
                    <Input
                      id="org-acronym"
                      value={orgData.acronym}
                      onChange={(e) => setOrgData({ ...orgData, acronym: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="org-email">Contact Email</Label>
                    <Input
                      id="org-email"
                      type="email"
                      value={orgData.email}
                      onChange={(e) => setOrgData({ ...orgData, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="org-phone">Phone Number</Label>
                    <Input
                      id="org-phone"
                      value={orgData.phone}
                      onChange={(e) => setOrgData({ ...orgData, phone: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="org-website">Website</Label>
                    <Input
                      id="org-website"
                      value={orgData.website}
                      onChange={(e) => setOrgData({ ...orgData, website: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="org-address">Address</Label>
                  <Textarea
                    id="org-address"
                    value={orgData.address}
                    onChange={(e) => setOrgData({ ...orgData, address: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save Organization Settings
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings Tab */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Background Images</CardTitle>
              <CardDescription>Customize background images across your website. Click "View Location" to see where each image appears.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveAppearance} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-6">
                    {/* Home Page Hero */}
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="home-hero" className="text-base font-semibold">Home Page - Hero Section</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => window.open('/#hero-section', '_blank')}
                          className="gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Location
                        </Button>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Input
                          id="home-hero"
                          value={appearanceData.homeHeroBackground}
                          onChange={(e) => handleImageUrlChange("homeHeroBackground", e.target.value)} onBlur={handleImageUrlBlur}
                          placeholder="Paste image URL here"
                        />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="home-hero-upload"
                          onChange={handleImageUpload('homeHeroBackground')}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => document.getElementById('home-hero-upload')?.click()}
                          title="Upload image"
                        >
                          <Upload className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Recommended: 1920x1080px (Full-screen hero)</p>
                      {appearanceData.homeHeroBackground && (
                        <div className="mt-2 p-2 border rounded-lg bg-white">
                          <img src={appearanceData.homeHeroBackground} alt="Preview" className="w-full h-24 object-cover rounded" />
                        </div>
                      )}
                    </div>

                    {/* About Page Hero */}
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="about-hero" className="text-base font-semibold">About Us Page - Hero Section</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => window.open('/about#hero-section', '_blank')}
                          className="gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Location
                        </Button>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Input
                          id="about-hero"
                          value={appearanceData.aboutHeroBackground}
                          onChange={(e) => handleImageUrlChange("aboutHeroBackground", e.target.value)} onBlur={handleImageUrlBlur}
                          placeholder="Paste image URL here"
                        />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="about-hero-upload"
                          onChange={handleImageUpload('aboutHeroBackground')}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => document.getElementById('about-hero-upload')?.click()}
                          title="Upload image"
                        >
                          <Upload className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Recommended: 1920x600px</p>
                      {appearanceData.aboutHeroBackground && (
                        <div className="mt-2 p-2 border rounded-lg bg-white">
                          <img src={appearanceData.aboutHeroBackground} alt="Preview" className="w-full h-24 object-cover rounded" />
                        </div>
                      )}
                    </div>

                    {/* About Page Our Story Section */}
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="about-story" className="text-base font-semibold">About Us Page - Our Story Section</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => window.open('/about#story-section', '_blank')}
                          className="gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Location
                        </Button>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Input
                          id="about-story"
                          value={appearanceData.aboutStoryBackground}
                          onChange={(e) => handleImageUrlChange("aboutStoryBackground", e.target.value)} onBlur={handleImageUrlBlur}
                          placeholder="Paste image URL here"
                        />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="about-story-upload"
                          onChange={handleImageUpload('aboutStoryBackground')}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => document.getElementById('about-story-upload')?.click()}
                          title="Upload image"
                        >
                          <Upload className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Recommended: 1920x1000px (Wide format)</p>
                      {appearanceData.aboutStoryBackground && (
                        <div className="mt-2 p-2 border rounded-lg bg-white">
                          <img src={appearanceData.aboutStoryBackground} alt="Preview" className="w-full h-24 object-cover rounded" />
                        </div>
                      )}
                    </div>

                    {/* Team Page Hero */}
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="team-hero" className="text-base font-semibold">Team Page - Hero Section</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => window.open('/team#hero-section', '_blank')}
                          className="gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Location
                        </Button>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Input
                          id="team-hero"
                          value={appearanceData.teamHeroBackground}
                          onChange={(e) => handleImageUrlChange("teamHeroBackground", e.target.value)} onBlur={handleImageUrlBlur}
                          placeholder="Paste image URL here"
                        />
                        <input type="file" accept="image/*" className="hidden" id="team-hero-upload" onChange={handleImageUpload('teamHeroBackground')} />
                        <Button type="button" variant="outline" size="icon" onClick={() => document.getElementById('team-hero-upload')?.click()} title="Upload image">
                          <Upload className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Recommended: 1920x600px</p>
                      {appearanceData.teamHeroBackground && <div className="mt-2 p-2 border rounded-lg bg-white"><img src={appearanceData.teamHeroBackground} alt="Preview" className="w-full h-24 object-cover rounded" /></div>}
                    </div>

                    {/* Programs Page Hero */}
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="programs-hero" className="text-base font-semibold">Programs Page - Hero Section</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => window.open('/programs#hero-section', '_blank')}
                          className="gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Location
                        </Button>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Input
                          id="programs-hero"
                          value={appearanceData.programsHeroBackground}
                          onChange={(e) => handleImageUrlChange("programsHeroBackground", e.target.value)} onBlur={handleImageUrlBlur}
                          placeholder="Paste image URL here"
                        />
                        <input type="file" accept="image/*" className="hidden" id="programs-hero-upload" onChange={handleImageUpload('programsHeroBackground')} />
                        <Button type="button" variant="outline" size="icon" onClick={() => document.getElementById('programs-hero-upload')?.click()} title="Upload image">
                          <Upload className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Recommended: 1920x600px</p>
                      {appearanceData.programsHeroBackground && <div className="mt-2 p-2 border rounded-lg bg-white"><img src={appearanceData.programsHeroBackground} alt="Preview" className="w-full h-24 object-cover rounded" /></div>}
                    </div>

                    {/* Projects Page Hero */}
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="projects-hero" className="text-base font-semibold">Projects Page - Hero Section</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => window.open('/projects#hero-section', '_blank')}
                          className="gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Location
                        </Button>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Input
                          id="projects-hero"
                          value={appearanceData.projectsHeroBackground}
                          onChange={(e) => handleImageUrlChange("projectsHeroBackground", e.target.value)} onBlur={handleImageUrlBlur}
                          placeholder="Paste image URL here"
                        />
                        <input type="file" accept="image/*" className="hidden" id="projects-hero-upload" onChange={handleImageUpload('projectsHeroBackground')} />
                        <Button type="button" variant="outline" size="icon" onClick={() => document.getElementById('projects-hero-upload')?.click()} title="Upload image">
                          <Upload className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Recommended: 1920x600px</p>
                      {appearanceData.projectsHeroBackground && <div className="mt-2 p-2 border rounded-lg bg-white"><img src={appearanceData.projectsHeroBackground} alt="Preview" className="w-full h-24 object-cover rounded" /></div>}
                    </div>

                    {/* News Page Hero */}
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="news-hero" className="text-base font-semibold">News Page - Hero Section</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => window.open('/news#hero-section', '_blank')}
                          className="gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Location
                        </Button>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Input
                          id="news-hero"
                          value={appearanceData.newsHeroBackground}
                          onChange={(e) => handleImageUrlChange("newsHeroBackground", e.target.value)} onBlur={handleImageUrlBlur}
                          placeholder="Paste image URL here"
                        />
                        <input type="file" accept="image/*" className="hidden" id="news-hero-upload" onChange={handleImageUpload('newsHeroBackground')} />
                        <Button type="button" variant="outline" size="icon" onClick={() => document.getElementById('news-hero-upload')?.click()} title="Upload image">
                          <Upload className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Recommended: 1920x600px</p>
                      {appearanceData.newsHeroBackground && <div className="mt-2 p-2 border rounded-lg bg-white"><img src={appearanceData.newsHeroBackground} alt="Preview" className="w-full h-24 object-cover rounded" /></div>}
                    </div>

                    {/* Impact Stories Page Hero */}
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="impact-hero" className="text-base font-semibold">Impact Stories Page - Hero Section</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => window.open('/impact-stories#hero-section', '_blank')}
                          className="gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Location
                        </Button>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Input
                          id="impact-hero"
                          value={appearanceData.impactStoriesHeroBackground}
                          onChange={(e) => handleImageUrlChange("impactStoriesHeroBackground", e.target.value)} onBlur={handleImageUrlBlur}
                          placeholder="Paste image URL here"
                        />
                        <input type="file" accept="image/*" className="hidden" id="impact-hero-upload" onChange={handleImageUpload('impactStoriesHeroBackground')} />
                        <Button type="button" variant="outline" size="icon" onClick={() => document.getElementById('impact-hero-upload')?.click()} title="Upload image">
                          <Upload className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Recommended: 1920x600px</p>
                      {appearanceData.impactStoriesHeroBackground && <div className="mt-2 p-2 border rounded-lg bg-white"><img src={appearanceData.impactStoriesHeroBackground} alt="Preview" className="w-full h-24 object-cover rounded" /></div>}
                    </div>

                    {/* Partners Page Hero */}
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="partners-hero" className="text-base font-semibold">Partners Page - Hero Section</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => window.open('/partners#hero-section', '_blank')}
                          className="gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Location
                        </Button>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Input
                          id="partners-hero"
                          value={appearanceData.partnersHeroBackground}
                          onChange={(e) => handleImageUrlChange("partnersHeroBackground", e.target.value)} onBlur={handleImageUrlBlur}
                          placeholder="Paste image URL here"
                        />
                        <input type="file" accept="image/*" className="hidden" id="partners-hero-upload" onChange={handleImageUpload('partnersHeroBackground')} />
                        <Button type="button" variant="outline" size="icon" onClick={() => document.getElementById('partners-hero-upload')?.click()} title="Upload image">
                          <Upload className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Recommended: 1920x600px</p>
                      {appearanceData.partnersHeroBackground && <div className="mt-2 p-2 border rounded-lg bg-white"><img src={appearanceData.partnersHeroBackground} alt="Preview" className="w-full h-24 object-cover rounded" /></div>}
                    </div>

                    {/* Contact Page Hero */}
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="contact-hero" className="text-base font-semibold">Contact Page - Hero Section</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => window.open('/contact#hero-section', '_blank')}
                          className="gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Location
                        </Button>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Input
                          id="contact-hero"
                          value={appearanceData.contactHeroBackground}
                          onChange={(e) => handleImageUrlChange("contactHeroBackground", e.target.value)} onBlur={handleImageUrlBlur}
                          placeholder="Paste image URL here"
                        />
                        <input type="file" accept="image/*" className="hidden" id="contact-hero-upload" onChange={handleImageUpload('contactHeroBackground')} />
                        <Button type="button" variant="outline" size="icon" onClick={() => document.getElementById('contact-hero-upload')?.click()} title="Upload image">
                          <Upload className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Recommended: 1920x600px</p>
                      {appearanceData.contactHeroBackground && <div className="mt-2 p-2 border rounded-lg bg-white"><img src={appearanceData.contactHeroBackground} alt="Preview" className="w-full h-24 object-cover rounded" /></div>}
                    </div>

                    {/* Get Involved Page Hero */}
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="getinvolved-hero" className="text-base font-semibold">Get Involved Page - Hero Section</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => window.open('/get-involved#hero-section', '_blank')}
                          className="gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Location
                        </Button>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Input
                          id="getinvolved-hero"
                          value={appearanceData.getInvolvedHeroBackground}
                          onChange={(e) => handleImageUrlChange("getInvolvedHeroBackground", e.target.value)} onBlur={handleImageUrlBlur}
                          placeholder="Paste image URL here"
                        />
                        <input type="file" accept="image/*" className="hidden" id="getinvolved-hero-upload" onChange={handleImageUpload('getInvolvedHeroBackground')} />
                        <Button type="button" variant="outline" size="icon" onClick={() => document.getElementById('getinvolved-hero-upload')?.click()} title="Upload image">
                          <Upload className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Recommended: 1920x600px</p>
                      {appearanceData.getInvolvedHeroBackground && <div className="mt-2 p-2 border rounded-lg bg-white"><img src={appearanceData.getInvolvedHeroBackground} alt="Preview" className="w-full h-24 object-cover rounded" /></div>}
                    </div>

                    {/* Home Page CTA Section */}
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="home-cta" className="text-base font-semibold">Home Page - CTA Section (Near Footer)</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => window.open('/#cta', '_blank')}
                          className="gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Location
                        </Button>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Input
                          id="home-cta"
                          value={appearanceData.homeCTABackground}
                          onChange={(e) => handleImageUrlChange("homeCTABackground", e.target.value)} onBlur={handleImageUrlBlur}
                          placeholder="Paste image URL here"
                        />
                        <input type="file" accept="image/*" className="hidden" id="home-cta-upload" onChange={handleImageUpload('homeCTABackground')} />
                        <Button type="button" variant="outline" size="icon" onClick={() => document.getElementById('home-cta-upload')?.click()} title="Upload image">
                          <Upload className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Recommended: 1920x600px</p>
                      {appearanceData.homeCTABackground && <div className="mt-2 p-2 border rounded-lg bg-white"><img src={appearanceData.homeCTABackground} alt="Preview" className="w-full h-24 object-cover rounded" /></div>}
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800">
                    <strong>Note:</strong> Changes are saved to the backend and reflect across the site immediately.
                  </p>
                </div>

                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={handleRevertToDefault} className="gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Revert to Default
                  </Button>
                  <Button type="button" onClick={handleSaveAppearance} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save Background Images
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AdminSettingsPage;