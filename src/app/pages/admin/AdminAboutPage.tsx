import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { useContent } from "../../context/ContentContext";
import { toast } from "sonner";
import { Save, Info } from "lucide-react";

export function AdminAboutPage() {
  const { aboutContent, updateAboutContent } = useContent();
  const [formData, setFormData] = useState(aboutContent);

  const handleSave = () => {
    updateAboutContent(formData);
    toast.success('About Us content updated successfully');
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">About Us Content</h1>
          <p className="text-gray-600 mt-2">Edit organization mission, vision, and story</p>
        </div>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-600" />
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
              <Info className="w-5 h-5 text-blue-600" />
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
              <Info className="w-5 h-5 text-blue-600" />
              Our Story
            </CardTitle>
            <CardDescription>
              Share your organization's history, background, and journey. You can use HTML formatting for rich text.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="story">Story Content (HTML supported)</Label>
              <Textarea
                id="story"
                value={formData.story}
                onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                rows={12}
                className="w-full font-mono text-sm"
                placeholder="Enter your organization's story... You can use HTML tags like <p>, <h3>, <strong>, <ul>, <li>, etc."
              />
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-sm text-gray-900 mb-2">HTML Formatting Tips</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Use <code className="bg-white px-1 rounded">&lt;p&gt;...&lt;/p&gt;</code> for paragraphs</li>
                <li>• Use <code className="bg-white px-1 rounded">&lt;h3&gt;...&lt;/h3&gt;</code> for section headings</li>
                <li>• Use <code className="bg-white px-1 rounded">&lt;strong&gt;...&lt;/strong&gt;</code> for bold text</li>
                <li>• Use <code className="bg-white px-1 rounded">&lt;ul&gt;&lt;li&gt;...&lt;/li&gt;&lt;/ul&gt;</code> for lists</li>
              </ul>
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
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AdminAboutPage;
