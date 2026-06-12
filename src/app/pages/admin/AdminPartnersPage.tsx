import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../../components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Plus, Edit, Trash2, Upload, Building2, Star, AlertCircle } from "lucide-react";
import { useLanguage } from "../../context/LanguageProvider";
import { useContent } from "../../context/ContentContext";
import { toast } from "sonner";
import type { Partner } from "../../context/ContentContext";

export function AdminPartnersPage() {
  const { t } = useLanguage();
  const { partners, addPartner, updatePartner, deletePartner } = useContent();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [partnerToDelete, setPartnerToDelete] = useState<Partner | null>(null);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'international' as 'international' | 'government' | 'local',
    logo: '',
    featured: false
  });

  const handleOpenDialog = (partner?: Partner) => {
    if (partner) {
      setEditingPartner(partner);
      setFormData({
        name: partner.name,
        type: partner.type,
        logo: partner.logo || '',
        featured: partner.featured || false
      });
    } else {
      setEditingPartner(null);
      setFormData({
        name: '',
        type: 'international',
        logo: '',
        featured: false
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingPartner) {
        await updatePartner(editingPartner.id, formData);
        toast.success('Partner updated successfully!');
      } else {
        await addPartner(formData);
        toast.success('Partner added successfully!');
      }

      setIsDialogOpen(false);
      setEditingPartner(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to save the partner.');
    }
  };

  const handleDeleteClick = (partner: Partner) => {
    setPartnerToDelete(partner);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!partnerToDelete) {
      return;
    }

    try {
      await deletePartner(partnerToDelete.id);
      toast.success('Partner deleted successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to delete the partner.');
    } finally {
      setDeleteDialogOpen(false);
      setPartnerToDelete(null);
    }
  };

  const handleToggleFeatured = async (partner: Partner) => {
    try {
      await updatePartner(partner.id, {
        ...partner,
        featured: !partner.featured
      });
      toast.success(partner.featured ? 'Partner removed from homepage' : 'Partner featured on homepage!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to update the partner.');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const internationalPartners = partners.filter(p => p.type === 'international');
  const governmentPartners = partners.filter(p => p.type === 'government');
  const localPartners = partners.filter(p => p.type === 'local');

  const PartnerCard = ({ partner }: { partner: Partner }) => (
    <Card key={partner.id} className="hover:shadow-lg transition-shadow relative">
      <div className="absolute top-2 right-2">
        <button
          onClick={() => handleToggleFeatured(partner)}
          className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-all hover:scale-105 ${
            partner.featured
              ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
          title={partner.featured ? 'Click to remove from homepage' : 'Click to feature on homepage'}
        >
          <Star className={`w-3 h-3 ${partner.featured ? 'fill-yellow-700' : ''}`} />
          {partner.featured ? t('admin.featured') : t('admin.featured')}
        </button>
      </div>
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
              onClick={() => handleDeleteClick(partner)}
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
    <>
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 lg:mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t("admin.partnersMgmt")}</h1>
          <p className="text-gray-600 mt-2">{t("admin.partnersMgmtDesc")}</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleOpenDialog()}>
              <Plus className="w-5 h-5 mr-2" />{t("admin.addPartner")}</Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl">
            <DialogHeader>
              <DialogTitle>{editingPartner ? t('admin.edit') + ' ' + t('admin.partners') : t('admin.addPartner')}</DialogTitle>
              <DialogDescription>
                {editingPartner ? t('admin.update') : t('admin.addPartner')}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('form.name')} *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">{t('admin.category')} *</Label>
                  <Select value={formData.type} onValueChange={(value: 'international' | 'government' | 'local') => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="international">{t('admin.partners')} (International)</SelectItem>
                      <SelectItem value="government">{t('admin.partners')} (Government)</SelectItem>
                      <SelectItem value="local">{t('admin.partners')} (Local)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logo">{t('admin.imageUrl')}</Label>
                  <div className="flex gap-2">
                    <Input
                      id="logo"
                      value={formData.logo}
                      onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                      placeholder="https://example.com/logo.png or upload below"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="logo-upload"
                      onChange={handleImageUpload}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => document.getElementById('logo-upload')?.click()}
                      title="Upload image"
                    >
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    
                  </p>
                  {formData.logo && (
                    <div className="mt-2 p-4 border rounded-lg bg-gray-50">
                      <p className="text-sm text-gray-600 mb-2">{t('admin.imageUrl')}:</p>
                      <img src={formData.logo} alt="Logo preview" className="max-w-xs max-h-24 object-contain" />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, featured: checked as boolean })}
                    />
                    <Label htmlFor="featured" className="flex items-center gap-2 cursor-pointer">
                      <Star className="w-4 h-4 text-yellow-600" />
                      {t('admin.featured')}
                    </Label>
                  </div>
                  <p className="text-xs text-gray-500">
                    
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>{t("admin.cancel")}</Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  {editingPartner ? t('admin.update') : t('admin.addPartner')}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {partners.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">
            {t("admin.noResults")}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {/* International Partners */}
          {internationalPartners.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('admin.partners')} (International)</h2>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('admin.partners')} (Government)</h2>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('admin.partners')} (Local)</h2>
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

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('admin.confirmDelete')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('admin.deleteWarning')} "{partnerToDelete?.name}"?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => { setDeleteDialogOpen(false); setPartnerToDelete(null); }}>{t('admin.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-600 hover:bg-red-700">{t('admin.delete')}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default AdminPartnersPage;
