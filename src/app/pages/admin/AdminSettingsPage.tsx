import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { User, Building2, Lock, Palette, Save } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "../../components/ui/textarea";

export function AdminSettingsPage() {
  // Account Settings
  const [accountData, setAccountData] = useState({
    name: "Admin User",
    email: "admin@lulacongo.org",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Organization Settings
  const [orgData, setOrgData] = useState({
    name: "Let Us Live Association",
    acronym: "LULA",
    email: "info@lulacongo.org",
    phone: "+243 999 123 456",
    address: "Goma, North Kivu, Democratic Republic of Congo",
    website: "www.lulacongo.org"
  });

  // Site Appearance Settings
  const [appearanceData, setAppearanceData] = useState({
    teamHeroBackground: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c",
    aboutHeroBackground: "https://images.unsplash.com/photo-1578632767115-351597cf2477",
    homeHeroBackground: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c",
    primaryColor: "#2563EB",
    accentColor: "#F97316"
  });

  // Load saved settings on mount
  useEffect(() => {
    const savedOrgSettings = localStorage.getItem('lula_org_settings');
    if (savedOrgSettings) {
      setOrgData(JSON.parse(savedOrgSettings));
    }

    const savedAppearanceSettings = localStorage.getItem('lula_appearance_settings');
    if (savedAppearanceSettings) {
      setAppearanceData(JSON.parse(savedAppearanceSettings));
    }
  }, []);

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
    // Save organization settings
    localStorage.setItem('lula_org_settings', JSON.stringify(orgData));
    toast.success("Organization settings updated successfully!");
  };

  const handleSaveAppearance = (e: React.FormEvent) => {
    e.preventDefault();
    // Save appearance settings
    localStorage.setItem('lula_appearance_settings', JSON.stringify(appearanceData));
    toast.success("Appearance settings updated successfully! Refresh the page to see changes.");
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
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
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
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
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
              <CardTitle>Site Appearance</CardTitle>
              <CardDescription>Customize the look and feel of your website</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveAppearance} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Hero Background Images</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="team-hero">Team Page Hero Background</Label>
                    <Input
                      id="team-hero"
                      value={appearanceData.teamHeroBackground}
                      onChange={(e) => setAppearanceData({ ...appearanceData, teamHeroBackground: e.target.value })}
                      placeholder="https://..."
                    />
                    <p className="text-sm text-gray-500">Recommended: 1920x600px image</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="about-hero">About Page Hero Background</Label>
                    <Input
                      id="about-hero"
                      value={appearanceData.aboutHeroBackground}
                      onChange={(e) => setAppearanceData({ ...appearanceData, aboutHeroBackground: e.target.value })}
                      placeholder="https://..."
                    />
                    <p className="text-sm text-gray-500">Recommended: 1920x600px image</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="home-hero">Home Page Hero Background</Label>
                    <Input
                      id="home-hero"
                      value={appearanceData.homeHeroBackground}
                      onChange={(e) => setAppearanceData({ ...appearanceData, homeHeroBackground: e.target.value })}
                      placeholder="https://..."
                    />
                    <p className="text-sm text-gray-500">Recommended: 1920x800px image</p>
                  </div>
                </div>

                <div className="border-t pt-6 space-y-4">
                  <h3 className="text-lg font-semibold">Color Scheme</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="primary-color">Primary Color (Blue)</Label>
                      <div className="flex gap-2">
                        <Input
                          id="primary-color"
                          type="color"
                          value={appearanceData.primaryColor}
                          onChange={(e) => setAppearanceData({ ...appearanceData, primaryColor: e.target.value })}
                          className="w-20 h-10"
                        />
                        <Input
                          value={appearanceData.primaryColor}
                          onChange={(e) => setAppearanceData({ ...appearanceData, primaryColor: e.target.value })}
                          placeholder="#2563EB"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="accent-color">Accent Color (Orange)</Label>
                      <div className="flex gap-2">
                        <Input
                          id="accent-color"
                          type="color"
                          value={appearanceData.accentColor}
                          onChange={(e) => setAppearanceData({ ...appearanceData, accentColor: e.target.value })}
                          className="w-20 h-10"
                        />
                        <Input
                          value={appearanceData.accentColor}
                          onChange={(e) => setAppearanceData({ ...appearanceData, accentColor: e.target.value })}
                          placeholder="#F97316"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> After saving appearance settings, please refresh the page to see the changes take effect.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save Appearance Settings
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