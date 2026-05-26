import { useState } from "react";
import { useNavigate } from "react-router";
import { useLULALanguage } from "../context/LULALanguageContext";
import { useContent } from "../context/ContentContext";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";

export function ContactPage() {
  const { t } = useLULALanguage();
  const { addEnquiry } = useContent();
  const navigate = useNavigate();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Save enquiry to context (simulating backend submission)
    addEnquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message
    });

    // Show success dialog
    setShowSuccessDialog(true);

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };

  const handleDialogClose = () => {
    setShowSuccessDialog(false);
    navigate('/');
  };

  return (
    <div className="bg-white">
      <section id="hero-section" className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/60 to-green-800/50 z-10" />
        <img
          src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="Contact Us"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t("contact.title")}
            </h1>
            <p className="text-xl text-green-100 max-w-3xl">
              We'd love to hear from you. Reach out to learn more about our work or get involved.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">{t("contact.name")}</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">{t("contact.email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">{t("contact.phone")}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="subject">{t("contact.subject")}</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="message">{t("contact.message")}</Label>
                  <Textarea
                    id="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-green-600 hover:bg-green-700">
                  {t("contact.send")}
                </Button>
              </form>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">{t("contact.office")}</h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-green-600" />
                      Head Office
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Avenue de la Paix, Quartier Himbi<br />
                      Goma, North Kivu<br />
                      Democratic Republic of Congo
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-green-600" />
                      Phone
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">+243 XXX XXX XXX</p>
                    <p className="text-sm text-gray-500 mt-1">Monday - Friday, 8am - 5pm EAT</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-green-600" />
                      Email
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">info@lulacongo.org</p>
                    <p className="text-sm text-gray-500 mt-1">We respond within 24 hours</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-green-600" />
                      Office Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Monday - Friday: 8:00 AM - 5:00 PM<br />
                      Saturday: 9:00 AM - 1:00 PM<br />
                      Sunday: Closed
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="aspect-[21/9] bg-gray-300 rounded-lg overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <MapPin className="w-12 h-12 mr-3" />
              <span className="text-lg">Map Location: Goma, North Kivu, DR Congo</span>
            </div>
          </div>
        </div>
      </section>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <DialogTitle className="text-xl">Message Sent Successfully!</DialogTitle>
                <DialogDescription className="mt-1">
                  Thank you for contacting us. We'll get back to you within 24 hours.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <DialogFooter className="sm:justify-end mt-4">
            <Button
              type="button"
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={handleDialogClose}
            >
              OK, Go to Home
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}