import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Plus, Edit, Trash2, AlertCircle } from "lucide-react";
import { useContent } from "../../context/ContentContext";
import { toast } from "sonner";
import type { Program } from "../../context/ContentContext";

export function AdminProgramsPage() {
  const { programs, addProgram, updateProgram, deleteProgram } = useContent();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [programToDelete, setProgramToDelete] = useState<Program | null>(null);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    details: '',
    beneficiaries: '',
    icon: 'Shield',
    color: 'bg-green-50 text-green-600'
  });

  const iconOptions = ['Shield', 'Heart', 'Stethoscope', 'GraduationCap', 'Handshake', 'Users', 'Briefcase'];
  const colorOptions = [
    { value: 'bg-green-50 text-green-600', label: 'Blue' },
    { value: 'bg-green-50 text-green-600', label: 'Green' },
    { value: 'bg-pink-50 text-pink-600', label: 'Pink' },
    { value: 'bg-purple-50 text-purple-600', label: 'Purple' },
    { value: 'bg-gray-50 text-gray-900', label: 'Orange' },
    { value: 'bg-indigo-50 text-indigo-600', label: 'Indigo' },
    { value: 'bg-emerald-50 text-emerald-600', label: 'Emerald' },
  ];

  const handleOpenDialog = (program?: Program) => {
    if (program) {
      setEditingProgram(program);
      setFormData({
        title: program.title,
        description: program.description,
        details: program.details,
        beneficiaries: program.beneficiaries,
        icon: program.icon,
        color: program.color
      });
    } else {
      setEditingProgram(null);
      setFormData({
        title: '',
        description: '',
        details: '',
        beneficiaries: '',
        icon: 'Shield',
        color: 'bg-green-50 text-green-600'
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProgram) {
      updateProgram(editingProgram.id, formData);
      toast.success('Program updated successfully!');
    } else {
      addProgram(formData);
      toast.success('Program added successfully!');
    }
    
    setIsDialogOpen(false);
    setEditingProgram(null);
    setFormData({
      title: '',
      description: '',
      details: '',
      beneficiaries: '',
      icon: 'Shield',
      color: 'bg-green-50 text-green-600'
    });
  };

  const handleDeleteClick = (program: Program) => {
    setProgramToDelete(program);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!programToDelete) {
      return;
    }

    deleteProgram(programToDelete.id);
    toast.success('Program deleted successfully!');
    setDeleteDialogOpen(false);
    setProgramToDelete(null);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Programs Management</h1>
          <p className="text-gray-600 mt-2">Manage your organization's programs</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleOpenDialog()}>
              <Plus className="w-5 h-5 mr-2" />
              Add Program
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProgram ? 'Edit Program' : 'Add New Program'}</DialogTitle>
              <DialogDescription>
                {editingProgram ? 'Update the program details below' : 'Fill in the details to create a new program'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Program Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Short Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="details">Detailed Description *</Label>
                  <Textarea
                    id="details"
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    required
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="beneficiaries">Beneficiaries *</Label>
                  <Input
                    id="beneficiaries"
                    value={formData.beneficiaries}
                    onChange={(e) => setFormData({ ...formData, beneficiaries: e.target.value })}
                    placeholder="e.g., 25,000+ children"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="icon">Icon</Label>
                  <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map(icon => (
                        <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Color Theme</Label>
                  <Select value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {colorOptions.map(color => (
                        <SelectItem key={color.value} value={color.value}>{color.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  {editingProgram ? 'Update Program' : 'Add Program'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {programs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              No programs found. Click "Add Program" to create your first program.
            </CardContent>
          </Card>
        ) : (
          programs.map((program) => (
            <Card key={program.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl">{program.title}</CardTitle>
                    <p className="text-gray-600 mt-2">{program.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenDialog(program)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteClick(program)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700"><strong>Details:</strong> {program.details}</p>
                  <p className="text-sm text-gray-700"><strong>Beneficiaries:</strong> {program.beneficiaries}</p>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span><strong>Icon:</strong> {program.icon}</span>
                    <span><strong>Color:</strong> {program.color.split(' ')[0]}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          setDeleteDialogOpen(open);
          if (!open) {
            setProgramToDelete(null);
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
                <DialogTitle className="text-xl">Delete Program?</DialogTitle>
                <DialogDescription className="mt-1">
                  This will permanently remove "{programToDelete?.title}" from the admin dashboard.
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
              Delete Program
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AdminProgramsPage;
