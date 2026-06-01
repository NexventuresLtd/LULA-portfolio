import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Plus, Edit, Trash2, Search, Eye } from 'lucide-react';

export default function NewsManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const articles = [
    {
      id: 1,
      title: 'New Safe Space Opens in Goma',
      category: 'Project Launch',
      author: 'Marie Kalala',
      date: '2026-05-15',
      status: 'Published',
      views: 1250,
    },
    {
      id: 2,
      title: 'Women Cooperative Success Story',
      category: 'Impact Story',
      author: 'Amani Mukendi',
      date: '2026-05-10',
      status: 'Published',
      views: 892,
    },
    {
      id: 3,
      title: 'HIV Awareness Campaign Results',
      category: 'Report',
      author: 'Jean-Claude Nzomo',
      date: '2026-05-05',
      status: 'Published',
      views: 1567,
    },
    {
      id: 4,
      title: 'Annual Impact Report 2025',
      category: 'Report',
      author: 'Marie Kalala',
      date: '2026-04-28',
      status: 'Draft',
      views: 0,
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">News & Articles</h1>
          <p className="text-gray-600 mt-2">Manage publications and updates</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Article
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>All Articles</CardTitle>
              <CardDescription>Total: {articles.length} articles</CardDescription>
            </div>
            <div className="w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search articles..."
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
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Views</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium max-w-xs">{article.title}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{article.category}</Badge>
                  </TableCell>
                  <TableCell>{article.author}</TableCell>
                  <TableCell>{new Date(article.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={article.status === 'Published' ? 'default' : 'secondary'}
                      className={article.status === 'Published' ? 'bg-green-100 text-green-800' : ''}
                    >
                      {article.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{article.views.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
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
