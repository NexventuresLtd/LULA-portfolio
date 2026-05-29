import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { User, Building2, Lock, Palette, Save, ExternalLink, Upload } from "lucide-react";
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

  const handleSaveAppearance = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateAppearanceSettings(appearanceData);
      toast.success("Appearance settings saved successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save appearance settings.");
    }
  };

  const handleBackgroundImageUpload = (fieldName: keyof typeof appearanceData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAppearanceData({ ...appearanceData, [fieldName]: reader.result as string });
      };
      reader.readAsDataURL(file);
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
                          onChange={(e) => setAppearanceData({ ...appearanceData, homeHeroBackground: e.target.value })}
                          placeholder="https://... or upload below"
                        />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="home-hero-upload"
                          onChange={handleBackgroundImageUpload('homeHeroBackground')}
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
                          onChange={(e) => setAppearanceData({ ...appearanceData, aboutHeroBackground: e.target.value })}
                          placeholder="https://... or upload below"
                        />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="about-hero-upload"
                          onChange={handleBackgroundImageUpload('aboutHeroBackground')}
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
                          onChange={(e) => setAppearanceData({ ...appearanceData, aboutStoryBackground: e.target.value })}
                          placeholder="https://... or upload below"
                        />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="about-story-upload"
                          onChange={handleBackgroundImageUpload('aboutStoryBackground')}
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
                          onChange={(e) => setAppearanceData({ ...appearanceData, teamHeroBackground: e.target.value })}
                          placeholder="https://... or upload below"
                        />
                        <input type="file" accept="image/*" className="hidden" id="team-hero-upload" onChange={handleBackgroundImageUpload('teamHeroBackground')} />
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
                          onChange={(e) => setAppearanceData({ ...appearanceData, programsHeroBackground: e.target.value })}
                          placeholder="https://... or upload below"
                        />
                        <input type="file" accept="image/*" className="hidden" id="programs-hero-upload" onChange={handleBackgroundImageUpload('programsHeroBackground')} />
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
                          onChange={(e) => setAppearanceData({ ...appearanceData, projectsHeroBackground: e.target.value })}
                          placeholder="https://... or upload below"
                        />
                        <input type="file" accept="image/*" className="hidden" id="projects-hero-upload" onChange={handleBackgroundImageUpload('projectsHeroBackground')} />
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
                          onChange={(e) => setAppearanceData({ ...appearanceData, newsHeroBackground: e.target.value })}
                          placeholder="https://... or upload below"
                        />
                        <input type="file" accept="image/*" className="hidden" id="news-hero-upload" onChange={handleBackgroundImageUpload('newsHeroBackground')} />
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
                          onChange={(e) => setAppearanceData({ ...appearanceData, impactStoriesHeroBackground: e.target.value })}
                          placeholder="https://... or upload below"
                        />
                        <input type="file" accept="image/*" className="hidden" id="impact-hero-upload" onChange={handleBackgroundImageUpload('impactStoriesHeroBackground')} />
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
                          onChange={(e) => setAppearanceData({ ...appearanceData, partnersHeroBackground: e.target.value })}
                          placeholder="https://... or upload below"
                        />
                        <input type="file" accept="image/*" className="hidden" id="partners-hero-upload" onChange={handleBackgroundImageUpload('partnersHeroBackground')} />
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
                          onChange={(e) => setAppearanceData({ ...appearanceData, contactHeroBackground: e.target.value })}
                          placeholder="https://... or upload below"
                        />
                        <input type="file" accept="image/*" className="hidden" id="contact-hero-upload" onChange={handleBackgroundImageUpload('contactHeroBackground')} />
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
                          onChange={(e) => setAppearanceData({ ...appearanceData, getInvolvedHeroBackground: e.target.value })}
                          placeholder="https://... or upload below"
                        />
                        <input type="file" accept="image/*" className="hidden" id="getinvolved-hero-upload" onChange={handleBackgroundImageUpload('getInvolvedHeroBackground')} />
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
                          onChange={(e) => setAppearanceData({ ...appearanceData, homeCTABackground: e.target.value })}
                          placeholder="https://... or upload below"
                        />
                        <input type="file" accept="image/*" className="hidden" id="home-cta-upload" onChange={handleBackgroundImageUpload('homeCTABackground')} />
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
                    <strong>Note:</strong> After saving appearance settings, refresh the page to see the changes take effect.
                  </p>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
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