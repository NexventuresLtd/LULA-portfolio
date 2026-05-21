import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Plus, Edit, Trash2, Search } from 'lucide-react';

export default function ProjectsManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const projects = [
    {
      id: 1,
      name: 'Safe Spaces for Children',
      category: 'Child Protection',
      region: 'North Kivu',
      status: 'Active',
      beneficiaries: 1250,
    },
    {
      id: 2,
      name: 'Women Economic Empowerment',
      category: 'Women Empowerment',
      region: 'South Kivu',
      status: 'Active',
      beneficiaries: 850,
    },
    {
      id: 3,
      name: 'HIV Prevention & Education',
      category: 'Health',
      region: 'Ituri',
      status: 'Active',
      beneficiaries: 2100,
    },
    {
      id: 4,
      name: 'Youth Vocational Training',
      category: 'Education',
      region: 'North Kivu',
      status: 'Planning',
      beneficiaries: 0,
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects Management</h1>
          <p className="text-gray-600 mt-2">Manage all LULA projects and initiatives</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New Project
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>All Projects</CardTitle>
              <CardDescription>Total: {projects.length} projects</CardDescription>
            </div>
            <div className="w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Beneficiaries</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>{project.category}</TableCell>
                  <TableCell>{project.region}</TableCell>
                  <TableCell>
                    <Badge
                      variant={project.status === 'Active' ? 'default' : 'secondary'}
                      className={project.status === 'Active' ? 'bg-green-100 text-green-800' : ''}
                    >
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{project.beneficiaries.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
