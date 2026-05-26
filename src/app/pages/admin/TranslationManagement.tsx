import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';
import { Save, Globe, Search } from 'lucide-react';

export default function TranslationManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const translations = [
    { key: 'nav.home', en: 'Home', fr: 'Accueil', sw: 'Nyumbani', category: 'Navigation' },
    { key: 'nav.about', en: 'About Us', fr: 'À Propos', sw: 'Kuhusu Sisi', category: 'Navigation' },
    { key: 'nav.programs', en: 'Programs', fr: 'Programmes', sw: 'Programu', category: 'Navigation' },
    { key: 'hero.title', en: 'Building Hope, Transforming Lives', fr: 'Construire l\'Espoir, Transformer les Vies', sw: 'Kujenga Tumaini, Kubadilisha Maisha', category: 'Hero' },
    { key: 'common.donate', en: 'Donate', fr: 'Faire un Don', sw: 'Toa Mchango', category: 'Common' },
  ];

  return (
    <div className="p-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Translation Management</h1>
          <p className="text-gray-600 mt-2">Manage multilingual content</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Save className="w-4 h-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Languages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-green-600" />
                <span className="font-medium">English</span>
              </div>
              <Badge variant="default">Primary</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-gray-600" />
                <span className="font-medium">Français</span>
              </div>
              <Badge variant="secondary">Active</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-gray-600" />
                <span className="font-medium">Kiswahili</span>
              </div>
              <Badge variant="secondary">Active</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Translation Strings</CardTitle>
                <CardDescription>Total: {translations.length} strings</CardDescription>
              </div>
              <div className="w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search translations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {translations.map((translation, index) => (
                <Card key={index} className="border-l-4 border-l-blue-600">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                          {translation.key}
                        </code>
                        <Badge variant="secondary" className="ml-2">
                          {translation.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-xs text-gray-600">English (EN)</Label>
                        <Input
                          defaultValue={translation.en}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">Français (FR)</Label>
                        <Input
                          defaultValue={translation.fr}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">Kiswahili (SW)</Label>
                        <Input
                          defaultValue={translation.sw}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
