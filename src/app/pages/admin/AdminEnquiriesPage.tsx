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
import { Mail, Phone, Calendar, Search, Trash2, AlertCircle, Eye } from "lucide-react";
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

export function AdminEnquiriesPage() {
  const { enquiries, updateEnquiryStatus, deleteEnquiry } = useContent();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'in-progress' | 'resolved'>('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [enquiryToDelete, setEnquiryToDelete] = useState<any>(null);

  const filteredEnquiries = enquiries.filter(enquiry => {
    const matchesSearch = 
      enquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enquiry.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enquiry.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || enquiry.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id: string, status: 'new' | 'in-progress' | 'resolved') => {
    updateEnquiryStatus(id, status);
    toast.success('Enquiry status updated successfully');
  };

  const handleDeleteClick = (enquiry: any) => {
    setEnquiryToDelete(enquiry);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!enquiryToDelete) {
      return;
    }

    deleteEnquiry(enquiryToDelete.id);
    toast.success('Enquiry deleted successfully');
    setDeleteDialogOpen(false);
    setEnquiryToDelete(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-green-100 text-green-700';
      case 'in-progress': return 'bg-yellow-100 text-yellow-700';
      case 'resolved': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Enquiries Management</h1>
        <p className="text-gray-600 mt-2">Manage contact form submissions from the website</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Enquiries ({filteredEnquiries.length})</CardTitle>
          <div className="flex gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search enquiries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEnquiries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                    No enquiries found
                  </TableCell>
                </TableRow>
              ) : (
                filteredEnquiries.map((enquiry) => (
                  <TableRow key={enquiry.id}>
                    <TableCell className="font-medium">{enquiry.name}</TableCell>
                    <TableCell>
                      <button
                        onClick={() => setSelectedEnquiry(enquiry)}
                        className="text-green-600 hover:underline text-left"
                      >
                        {enquiry.subject}
                      </button>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 text-sm">
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-gray-400" />
                          <a href={`mailto:${enquiry.email}`} className="text-green-600 hover:underline">
                            {enquiry.email}
                          </a>
                        </div>
                        {enquiry.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-gray-400" />
                            <span className="text-gray-600">{enquiry.phone}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar className="w-3 h-3" />
                        {enquiry.date}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={enquiry.status}
                        onValueChange={(value: any) => handleStatusChange(enquiry.id, value)}
                      >
                        <SelectTrigger className="w-[140px]">
                          <Badge className={getStatusColor(enquiry.status)}>
                            {enquiry.status}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedEnquiry(enquiry)}
                        >
                          <Eye className="w-4 h-4 text-green-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(enquiry)}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          setDeleteDialogOpen(open);
          if (!open) {
            setEnquiryToDelete(null);
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
                <DialogTitle className="text-xl">Delete Enquiry?</DialogTitle>
                <DialogDescription className="mt-1">
                  This will permanently remove "{enquiryToDelete?.subject}" from the admin dashboard.
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
              Delete Enquiry
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={selectedEnquiry !== null} onOpenChange={() => setSelectedEnquiry(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedEnquiry?.subject}</DialogTitle>
            <DialogDescription>
              From {selectedEnquiry?.name} on {selectedEnquiry?.date}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm text-gray-700 mb-1">Contact Information</h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <a href={`mailto:${selectedEnquiry?.email}`} className="text-green-600 hover:underline">
                    {selectedEnquiry?.email}
                  </a>
                </div>
                {selectedEnquiry?.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{selectedEnquiry?.phone}</span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-700 mb-1">Message</h4>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{selectedEnquiry?.message}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-700 mb-1">Status</h4>
              <Select
                value={selectedEnquiry?.status}
                onValueChange={(value: any) => {
                  handleStatusChange(selectedEnquiry?.id, value);
                  setSelectedEnquiry({ ...selectedEnquiry, status: value });
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <Badge className={getStatusColor(selectedEnquiry?.status || 'new')}>
                    {selectedEnquiry?.status}
                  </Badge>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AdminEnquiriesPage;
