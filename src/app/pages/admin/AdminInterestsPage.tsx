import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Mail, Phone, Calendar, Search, Trash2, Heart, HandHeart, Handshake, AlertCircle, Eye, RefreshCw } from "lucide-react";
import { useContent } from "../../context/ContentContext";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

export function AdminInterestsPage() {
  const { interests, updateInterestStatus, deleteInterest, refreshInterests } = useContent();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'donate' | 'volunteer' | 'partner'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'contacted' | 'completed'>('all');
  const [selectedInterest, setSelectedInterest] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [interestToDelete, setInterestToDelete] = useState<any>(null);

  const filteredInterests = interests.filter(interest => {
    const matchesSearch = 
      interest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interest.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interest.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === 'all' || interest.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || interest.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleStatusChange = (id: string, status: 'new' | 'contacted' | 'completed') => {
    updateInterestStatus(id, status);
    toast.success('Interest status updated successfully');
  };

  const handleDeleteClick = (interest: any) => {
    setInterestToDelete(interest);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!interestToDelete) {
      return;
    }

    deleteInterest(interestToDelete.id);
    toast.success('Interest deleted successfully');
    setDeleteDialogOpen(false);
    setInterestToDelete(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-green-100 text-green-700';
      case 'contacted': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'donate': return <Heart className="w-4 h-4 text-gray-900" />;
      case 'volunteer': return <HandHeart className="w-4 h-4 text-green-600" />;
      case 'partner': return <Handshake className="w-4 h-4 text-purple-600" />;
      default: return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'donate': return 'bg-gray-100 text-black';
      case 'volunteer': return 'bg-green-100 text-green-700';
      case 'partner': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const stats = {
    total: interests.length,
    donate: interests.filter(i => i.type === 'donate').length,
    volunteer: interests.filter(i => i.type === 'volunteer').length,
    partner: interests.filter(i => i.type === 'partner').length,
    new: interests.filter(i => i.status === 'new').length,
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 lg:mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Interests & Donations Management</h1>
          <p className="text-gray-600 mt-2">Track people interested in donating, volunteering, and partnering</p>
        </div>
        <Button variant="outline" onClick={() => refreshInterests()} className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 lg:mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Interests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-gray-500 mt-1">{stats.new} new</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-gray-900" />
              <div className="text-2xl font-bold">{stats.donate}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Volunteers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <HandHeart className="w-5 h-5 text-green-600" />
              <div className="text-2xl font-bold">{stats.volunteer}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Partnerships</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Handshake className="w-5 h-5 text-purple-600" />
              <div className="text-2xl font-bold">{stats.partner}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Interests ({filteredInterests.length})</CardTitle>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search interests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={(value: any) => setTypeFilter(value)}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="donate">Donations</SelectItem>
                <SelectItem value="volunteer">Volunteers</SelectItem>
                <SelectItem value="partner">Partnerships</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto"><Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInterests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                    No interests found
                  </TableCell>
                </TableRow>
              ) : (
                filteredInterests.map((interest) => (
                  <TableRow key={interest.id}>
                    <TableCell className="font-medium">
                      <button
                        onClick={() => setSelectedInterest(interest)}
                        className="text-green-600 hover:underline text-left"
                      >
                        {interest.name}
                      </button>
                      {interest.message.includes('volunteering for:') && (
                        <p className="text-xs text-gray-500 mt-0.5">
                          Project: {interest.message.split('volunteering for:')[1]?.split('.')[0]?.trim()}
                        </p>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(interest.type)}>
                        <div className="flex items-center gap-1">
                          {getTypeIcon(interest.type)}
                          {interest.type}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 text-sm">
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-gray-400" />
                          <a href={`mailto:${interest.email}`} className="text-green-600 hover:underline">
                            {interest.email}
                          </a>
                        </div>
                        {interest.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-gray-400" />
                            <span className="text-gray-600">{interest.phone}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar className="w-3 h-3" />
                        {interest.date}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={interest.status}
                        onValueChange={(value: any) => handleStatusChange(interest.id, value)}
                      >
                        <SelectTrigger className="w-[130px]">
                          <Badge className={getStatusColor(interest.status)}>
                            {interest.status}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedInterest(interest)}
                        >
                          <Eye className="w-4 h-4 text-green-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(interest)}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table></div>
        </CardContent>
      </Card>

      <Dialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          setDeleteDialogOpen(open);
          if (!open) {
            setInterestToDelete(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <DialogTitle className="text-xl">Delete Interest?</DialogTitle>
                <DialogDescription className="mt-1">
                  This will permanently remove "{interestToDelete?.name}" from the admin dashboard.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <DialogFooter className="sm:justify-end gap-2 mt-4">
            <Button type="button" variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleConfirmDelete}
            >
              Delete Interest
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={selectedInterest !== null} onOpenChange={() => setSelectedInterest(null)}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle>{selectedInterest?.name}</DialogTitle>
            <DialogDescription>
              {selectedInterest?.type} interest from {selectedInterest?.date}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm text-gray-700 mb-1">Type</h4>
              <Badge className={getTypeColor(selectedInterest?.type || '')}>
                <div className="flex items-center gap-1">
                  {getTypeIcon(selectedInterest?.type || '')}
                  {selectedInterest?.type}
                </div>
              </Badge>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-700 mb-1">Contact Information</h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <a href={`mailto:${selectedInterest?.email}`} className="text-green-600 hover:underline">
                    {selectedInterest?.email}
                  </a>
                </div>
                {selectedInterest?.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <a href={`https://wa.me/${selectedInterest.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                      {selectedInterest.phone}
                    </a>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-700 mb-1">Message</h4>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{selectedInterest?.message}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-700 mb-1">Status</h4>
              <Select
                value={selectedInterest?.status}
                onValueChange={(value: any) => {
                  handleStatusChange(selectedInterest?.id, value);
                  setSelectedInterest({ ...selectedInterest, status: value });
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <Badge className={getStatusColor(selectedInterest?.status || 'new')}>
                    {selectedInterest?.status}
                  </Badge>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AdminInterestsPage;
