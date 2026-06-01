import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { useContent } from "../../context/ContentContext";
import { toast } from "sonner";
import { Save, Info } from "lucide-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export function AdminAboutPage() {
  const { aboutContent, updateAboutContent } = useContent();
  const [formData, setFormData] = useState(aboutContent);

  const handleSave = () => {
    updateAboutContent(formData);
    toast.success('About Us content updated successfully');
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'align',
    'link'
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">About Us Content</h1>
          <p className="text-gray-600 mt-2">Edit organization mission, vision, and story</p>
        </div>
        <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5 text-green-600" />
              Mission Statement
            </CardTitle>
            <CardDescription>
              Your organization's core purpose and what you aim to achieve
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.mission}
              onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
              rows={4}
              className="w-full"
              placeholder="Enter your mission statement..."
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5 text-green-600" />
              Vision Statement
            </CardTitle>
            <CardDescription>
              Your organization's aspirational goals and future direction
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.vision}
              onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
              rows={4}
              className="w-full"
              placeholder="Enter your vision statement..."
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5 text-green-600" />
              Our Story
            </CardTitle>
            <CardDescription>
              Share your organization's history, background, and journey using the rich text editor below
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="story">Story Content</Label>
              <div className="mt-2">
                <ReactQuill
                  value={formData.story}
                  onChange={(value) => setFormData({ ...formData, story: value })}
                  modules={modules}
                  formats={formats}
                  placeholder="Write your organization's story here..."
                  className="bg-white"
                  theme="snow"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle className="text-lg">Preview</CardTitle>
            <CardDescription>
              How your story will appear on the About Us page
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h3>
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: formData.story }}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AdminAboutPage;
