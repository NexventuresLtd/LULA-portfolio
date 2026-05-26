import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Plus, Edit, Trash2, Search, Globe } from 'lucide-react';

export default function PartnersManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const partners = [
    {
      id: 1,
      name: 'UNICEF',
      type: 'International',
      focus: 'Child Protection',
      since: '2018',
      status: 'Active',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    },
    {
      id: 2,
      name: 'WHO',
      type: 'International',
      focus: 'Health',
      since: '2019',
      status: 'Active',
      logo: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=100&h=100&fit=crop',
    },
    {
      id: 3,
      name: 'UN Women',
      type: 'International',
      focus: 'Women Empowerment',
      since: '2020',
      status: 'Active',
      logo: 'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=100&h=100&fit=crop',
    },
    {
      id: 4,
      name: 'Local Health Initiative',
      type: 'Local',
      focus: 'Community Health',
      since: '2021',
      status: 'Active',
      logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=100&h=100&fit=crop',
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Partners Management</h1>
          <p className="text-gray-600 mt-2">Manage partner organizations and donors</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Partner
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Partner Organizations</CardTitle>
              <CardDescription>Total: {partners.length} partners</CardDescription>
            </div>
            <div className="w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search partners..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {partners.map((partner) => (
              <Card key={partner.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                        <Globe className="w-8 h-8 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{partner.name}</h3>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="secondary">{partner.type}</Badge>
                          <Badge
                            variant="default"
                            className="bg-green-100 text-green-800"
                          >
                            {partner.status}
                          </Badge>
                        </div>
                        <div className="mt-3 space-y-1 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Focus:</span> {partner.focus}
                          </div>
                          <div>
                            <span className="font-medium">Partner since:</span> {partner.since}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
