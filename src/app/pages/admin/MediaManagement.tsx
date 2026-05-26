import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';
import { Upload, Search, Image as ImageIcon, FileText, Trash2, Download } from 'lucide-react';

export default function MediaManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const images = [
    {
      id: 1,
      name: 'children-education.jpg',
      size: '2.4 MB',
      date: '2026-05-15',
      url: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=300&h=200&fit=crop',
    },
    {
      id: 2,
      name: 'women-cooperative.jpg',
      size: '1.8 MB',
      date: '2026-05-10',
      url: 'https://images.unsplash.com/photo-1487546331507-fcf8a5d27ab3?w=300&h=200&fit=crop',
    },
    {
      id: 3,
      name: 'health-clinic.jpg',
      size: '3.1 MB',
      date: '2026-05-08',
      url: 'https://images.unsplash.com/photo-1553775927-a071d5a6a39a?w=300&h=200&fit=crop',
    },
    {
      id: 4,
      name: 'community-gathering.jpg',
      size: '2.7 MB',
      date: '2026-05-05',
      url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=300&h=200&fit=crop',
    },
  ];

  const documents = [
    {
      id: 1,
      name: 'Annual Report 2025.pdf',
      size: '8.5 MB',
      date: '2026-04-28',
      type: 'PDF',
    },
    {
      id: 2,
      name: 'Project Proposal - Safe Spaces.docx',
      size: '1.2 MB',
      date: '2026-05-12',
      type: 'DOCX',
    },
    {
      id: 3,
      name: 'Budget Overview Q2.xlsx',
      size: '456 KB',
      date: '2026-05-18',
      type: 'XLSX',
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Media Library</h1>
          <p className="text-gray-600 mt-2">Manage images, documents, and files</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Upload className="w-4 h-4 mr-2" />
          Upload Files
        </Button>
      </div>

      <Tabs defaultValue="images" className="space-y-6">
        <TabsList>
          <TabsTrigger value="images">
            <ImageIcon className="w-4 h-4 mr-2" />
            Images
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileText className="w-4 h-4 mr-2" />
            Documents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="images">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Image Gallery</CardTitle>
                  <CardDescription>Total: {images.length} images</CardDescription>
                </div>
                <div className="w-64">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search images..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {images.map((image) => (
                  <Card key={image.id} className="overflow-hidden">
                    <div className="aspect-video bg-gray-100">
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-medium text-sm truncate">{image.name}</h4>
                      <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                        <span>{image.size}</span>
                        <span>{image.date}</span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Download className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Documents</CardTitle>
                  <CardDescription>Total: {documents.length} documents</CardDescription>
                </div>
                <div className="w-64">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search documents..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {documents.map((doc) => (
                  <Card key={doc.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                            <FileText className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">{doc.name}</h4>
                            <div className="flex gap-3 mt-1 text-sm text-gray-500">
                              <Badge variant="secondary">{doc.type}</Badge>
                              <span>{doc.size}</span>
                              <span>{doc.date}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
