import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Plus, Edit, Trash2, Upload, Building2 } from "lucide-react";
import { useContent } from "../../context/ContentContext";
import { toast } from "sonner";
import type { Partner } from "../../context/ContentContext";

export function AdminPartnersPage() {
  const { partners, addPartner, updatePartner, deletePartner } = useContent();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'international' as 'international' | 'government' | 'local',
    logo: ''
  });

  const handleOpenDialog = (partner?: Partner) => {
    if (partner) {
      setEditingPartner(partner);
      setFormData({
        name: partner.name,
        type: partner.type,
        logo: partner.logo || ''
      });
    } else {
      setEditingPartner(null);
      setFormData({
        name: '',
        type: 'international',
        logo: ''
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPartner) {
      updatePartner(editingPartner.id, formData);
      toast.success('Partner updated successfully!');
    } else {
      addPartner(formData);
      toast.success('Partner added successfully!');
    }
    
    setIsDialogOpen(false);
    setEditingPartner(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this partner?')) {
      deletePartner(id);
      toast.success('Partner deleted successfully!');
    }
  };

  const internationalPartners = partners.filter(p => p.type === 'international');
  const governmentPartners = partners.filter(p => p.type === 'government');
  const localPartners = partners.filter(p => p.type === 'local');

  const PartnerCard = ({ partner }: { partner: Partner }) => (
    <Card key={partner.id} className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          {partner.logo ? (
            <img src={partner.logo} alt={partner.name} className="w-16 h-16 object-contain" />
          ) : (
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-8 h-8 text-gray-400" />
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{partner.name}</h3>
            <p className="text-sm text-gray-600 capitalize">{partner.type}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleOpenDialog(partner)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDelete(partner.id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Partners Management</h1>
          <p className="text-gray-600 mt-2">Manage your organization's partners</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => handleOpenDialog()}>
              <Plus className="w-5 h-5 mr-2" />
              Add Partner
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingPartner ? 'Edit Partner' : 'Add New Partner'}</DialogTitle>
              <DialogDescription>
                {editingPartner ? 'Update the partner details below' : 'Fill in the details to add a new partner'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Organization Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Partner Type *</Label>
                  <Select value={formData.type} onValueChange={(value: 'international' | 'government' | 'local') => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="international">International Partner</SelectItem>
                      <SelectItem value="government">Government Partner</SelectItem>
                      <SelectItem value="local">Local Partner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logo">Logo URL (Optional)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="logo"
                      value={formData.logo}
                      onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                      placeholder="https://example.com/logo.png"
                    />
                    <Button type="button" variant="outline" size="icon">
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Enter the URL of the partner's logo image, or leave blank to use default icon
                  </p>
                  {formData.logo && (
                    <div className="mt-2 p-4 border rounded-lg bg-gray-50">
                      <p className="text-sm text-gray-600 mb-2">Logo Preview:</p>
                      <img src={formData.logo} alt="Logo preview" className="max-w-xs max-h-24 object-contain" />
                    </div>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  {editingPartner ? 'Update Partner' : 'Add Partner'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {partners.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">
            No partners found. Click "Add Partner" to add your first partner.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {/* International Partners */}
          {internationalPartners.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">International Partners</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {internationalPartners.map(partner => (
                  <PartnerCard key={partner.id} partner={partner} />
                ))}
              </div>
            </div>
          )}

          {/* Government Partners */}
          {governmentPartners.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Government Partners</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {governmentPartners.map(partner => (
                  <PartnerCard key={partner.id} partner={partner} />
                ))}
              </div>
            </div>
          )}

          {/* Local Partners */}
          {localPartners.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Local Partners</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {localPartners.map(partner => (
                  <PartnerCard key={partner.id} partner={partner} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminPartnersPage;
