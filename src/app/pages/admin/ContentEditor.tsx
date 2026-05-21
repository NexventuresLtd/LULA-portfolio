import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Save, Eye } from 'lucide-react';

export default function ContentEditor() {
  const [selectedPage, setSelectedPage] = useState('home');
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const pages = [
    { value: 'home', label: 'Homepage' },
    { value: 'about', label: 'About Us' },
    { value: 'mission', label: 'Mission & Vision' },
    { value: 'contact', label: 'Contact Information' },
  ];

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Content Editor</h1>
        <p className="text-gray-600 mt-2">Edit website content and translations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Page Selection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Select Page</Label>
                <Select value={selectedPage} onValueChange={setSelectedPage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {pages.map((page) => (
                      <SelectItem key={page.value} value={page.value}>
                        {page.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Language</Label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="sw">Kiswahili</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Homepage Content ({selectedLanguage.toUpperCase()})</CardTitle>
              <CardDescription>Edit hero section, mission statement, and featured content</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="hero">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="hero">Hero Section</TabsTrigger>
                  <TabsTrigger value="mission">Mission</TabsTrigger>
                  <TabsTrigger value="stats">Statistics</TabsTrigger>
                </TabsList>

                <TabsContent value="hero" className="space-y-4 mt-6">
                  <div>
                    <Label htmlFor="hero-title">Main Headline</Label>
                    <Input
                      id="hero-title"
                      defaultValue="Building Hope, Transforming Lives"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="hero-subtitle">Subtitle</Label>
                    <Textarea
                      id="hero-subtitle"
                      rows={3}
                      defaultValue="Empowering communities in Eastern DR Congo through child protection, women empowerment, and sustainable development"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="hero-cta1">Primary CTA Text</Label>
                    <Input
                      id="hero-cta1"
                      defaultValue="Support Our Mission"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="hero-cta2">Secondary CTA Text</Label>
                    <Input
                      id="hero-cta2"
                      defaultValue="Learn More"
                      className="mt-2"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="mission" className="space-y-4 mt-6">
                  <div>
                    <Label htmlFor="mission-title">Mission Statement</Label>
                    <Textarea
                      id="mission-title"
                      rows={4}
                      defaultValue="To empower vulnerable communities in Eastern Democratic Republic of Congo through comprehensive programs in child protection, HIV prevention, women empowerment, and sustainable development."
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vision-title">Vision Statement</Label>
                    <Textarea
                      id="vision-title"
                      rows={4}
                      defaultValue="A future where every individual in Eastern DR Congo has access to opportunities, protection, and the resources needed to live with dignity and hope."
                      className="mt-2"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="stats" className="space-y-4 mt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Beneficiaries Reached</Label>
                      <Input defaultValue="50,000+" className="mt-2" />
                    </div>
                    <div>
                      <Label>Regions Served</Label>
                      <Input defaultValue="12" className="mt-2" />
                    </div>
                    <div>
                      <Label>Active Programs</Label>
                      <Input defaultValue="25+" className="mt-2" />
                    </div>
                    <div>
                      <Label>Partners</Label>
                      <Input defaultValue="40+" className="mt-2" />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex gap-3 mt-6">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
