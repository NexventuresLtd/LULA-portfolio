import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Plus, Edit, Trash2, Search, Target } from 'lucide-react';

export default function ProgramsManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const programs = [
    {
      id: 1,
      name: 'Child Protection',
      description: 'Creating safe environments for vulnerable children',
      beneficiaries: 12500,
      budget: '$250,000',
      status: 'Active',
      icon: '🛡️',
    },
    {
      id: 2,
      name: 'HIV Prevention',
      description: 'Community-based prevention and education',
      beneficiaries: 8900,
      budget: '$180,000',
      status: 'Active',
      icon: '🏥',
    },
    {
      id: 3,
      name: 'Women Empowerment',
      description: 'Economic empowerment and vocational training',
      beneficiaries: 6700,
      budget: '$320,000',
      status: 'Active',
      icon: '👩‍💼',
    },
    {
      id: 4,
      name: 'SRH Education',
      description: 'Sexual and reproductive health education',
      beneficiaries: 15200,
      budget: '$150,000',
      status: 'Active',
      icon: '📚',
    },
    {
      id: 5,
      name: 'Peacebuilding',
      description: 'Community reconciliation initiatives',
      beneficiaries: 4500,
      budget: '$200,000',
      status: 'Planning',
      icon: '🕊️',
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Programs Management</h1>
          <p className="text-gray-600 mt-2">Manage all organizational programs</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Program
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>All Programs</CardTitle>
              <CardDescription>Total: {programs.length} programs</CardDescription>
            </div>
            <div className="w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search programs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => (
              <Card key={program.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{program.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{program.name}</CardTitle>
                        <Badge
                          variant={program.status === 'Active' ? 'default' : 'secondary'}
                          className={`mt-1 ${program.status === 'Active' ? 'bg-green-100 text-green-800' : ''}`}
                        >
                          {program.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{program.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Beneficiaries:</span>
                      <span className="font-semibold">{program.beneficiaries.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Budget:</span>
                      <span className="font-semibold">{program.budget}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Target className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
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
