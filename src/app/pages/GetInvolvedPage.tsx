import { useState } from "react";
import { useNavigate } from "react-router";
import { useLanguage } from "../context/LanguageProvider";
import { useContent } from "../context/ContentContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Heart, HandHeart, Handshake, DollarSign, CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";

export function GetInvolvedPage() {
  const { t } = useLanguage();
  const { addInterest } = useContent();
  const navigate = useNavigate();
  const [donationAmount, setDonationAmount] = useState("");
  const [isVolunteerDialogOpen, setIsVolunteerDialogOpen] = useState(false);
  const [isPartnerDialogOpen, setIsPartnerDialogOpen] = useState(false);
  const [isDonateDialogOpen, setIsDonateDialogOpen] = useState(false);
  const [showVolunteerSuccess, setShowVolunteerSuccess] = useState(false);
  const [showPartnerSuccess, setShowPartnerSuccess] = useState(false);
  const [showDonateSuccess, setShowDonateSuccess] = useState(false);
  
  const [volunteerForm, setVolunteerForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [partnerForm, setPartnerForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [donateForm, setDonateForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Submit to backend (simulated by saving to context)
    addInterest({
      name: volunteerForm.name,
      email: volunteerForm.email,
      phone: volunteerForm.phone,
      type: 'volunteer',
      message: volunteerForm.message
    });

    setVolunteerForm({ name: "", email: "", phone: "", message: "" });
    setIsVolunteerDialogOpen(false);
    setShowVolunteerSuccess(true);
  };

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Submit to backend (simulated by saving to context)
    addInterest({
      name: partnerForm.name,
      email: partnerForm.email,
      phone: partnerForm.phone,
      type: 'partner',
      message: partnerForm.message
    });

    setPartnerForm({ name: "", email: "", phone: "", message: "" });
    setIsPartnerDialogOpen(false);
    setShowPartnerSuccess(true);
  };

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Submit to backend (simulated by saving to context)
    addInterest({
      name: donateForm.name,
      email: donateForm.email,
      phone: donateForm.phone,
      type: 'donate',
      message: `Interested in donating ${donationAmount}. ${donateForm.message}`
    });

    setDonateForm({ name: "", email: "", phone: "", message: "" });
    setDonationAmount("");
    setIsDonateDialogOpen(false);
    setShowDonateSuccess(true);
  };

  const handleSuccessDialogClose = () => {
    setShowVolunteerSuccess(false);
    setShowPartnerSuccess(false);
    setShowDonateSuccess(false);
    navigate('/');
  };

  return (
    <div className="bg-white">
      <section id="hero-section" className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-black/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="Get Involved"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t("involved.title")}
            </h1>
            <p className="text-xl text-gray-100 max-w-3xl">
              Your support transforms lives and builds stronger communities in Eastern DR Congo
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 border-2 border-gray-300">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Heart className="w-6 h-6 text-gray-900" />
                  </div>
                  <CardTitle className="text-2xl">{t("involved.donate_title")}</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Your donation directly supports our programs in child protection, women's empowerment, and community health.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Label>Select Amount</Label>
                    <div className="grid grid-cols-3 gap-3 mt-2">
                      {["$25", "$50", "$100"].map((amount) => (
                        <Button
                          key={amount}
                          variant={donationAmount === amount ? "default" : "outline"}
                          onClick={() => setDonationAmount(amount)}
                          className="h-12"
                        >
                          {amount}
                        </Button>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-3 mt-3">
                      {["$250", "$500", "$1000"].map((amount) => (
                        <Button
                          key={amount}
                          variant={donationAmount === amount ? "default" : "outline"}
                          onClick={() => setDonationAmount(amount)}
                          className="h-12"
                        >
                          {amount}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="custom">Or Enter Custom Amount</Label>
                    <div className="relative mt-2">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="custom"
                        type="number"
                        placeholder="Enter amount"
                        className="pl-10"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                      />
                    </div>
                  </div>

                  <Button size="lg" className="w-full bg-gray-900 hover:bg-black text-white" onClick={() => setIsDonateDialogOpen(true)}>
                    <Heart className="w-5 h-5 mr-2" />
                    Donate {donationAmount}
                  </Button>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Your Impact</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• $25 provides school supplies for 5 children</li>
                      <li>• $50 supports HIV testing for 10 individuals</li>
                      <li>• $100 funds vocational training for 2 women</li>
                      <li>• $500 establishes a safe space for children</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                    <HandHeart className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle>{t("involved.volunteer_title")}</CardTitle>
                  <CardDescription>
                    Join our team of dedicated volunteers making a difference on the ground.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" onClick={() => setIsVolunteerDialogOpen(true)}>
                    Apply to Volunteer
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                    <Handshake className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle>{t("involved.partner_title")}</CardTitle>
                  <CardDescription>
                    Collaborate with us to amplify impact across Eastern DR Congo.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" onClick={() => setIsPartnerDialogOpen(true)}>
                    Partnership Inquiry
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={isVolunteerDialogOpen} onOpenChange={setIsVolunteerDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Volunteer Application</DialogTitle>
            <DialogDescription>
              Please fill out the form below to apply to volunteer with us.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleVolunteerSubmit}>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-4">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={volunteerForm.name}
                  onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                />
              </div>
              <div className="col-span-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  value={volunteerForm.email}
                  onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                />
              </div>
              <div className="col-span-4">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  value={volunteerForm.phone}
                  onChange={(e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value })}
                />
              </div>
              <div className="col-span-4">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Enter your message"
                  value={volunteerForm.message}
                  onChange={(e) => setVolunteerForm({ ...volunteerForm, message: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isPartnerDialogOpen} onOpenChange={setIsPartnerDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Partner Inquiry</DialogTitle>
            <DialogDescription>
              Please fill out the form below to inquire about partnering with us.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePartnerSubmit}>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-4">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={partnerForm.name}
                  onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })}
                />
              </div>
              <div className="col-span-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  value={partnerForm.email}
                  onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                />
              </div>
              <div className="col-span-4">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  value={partnerForm.phone}
                  onChange={(e) => setPartnerForm({ ...partnerForm, phone: e.target.value })}
                />
              </div>
              <div className="col-span-4">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Enter your message"
                  value={partnerForm.message}
                  onChange={(e) => setPartnerForm({ ...partnerForm, message: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDonateDialogOpen} onOpenChange={setIsDonateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Donate</DialogTitle>
            <DialogDescription>
              Please fill out the form below to donate to our cause.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleDonateSubmit}>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-4">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={donateForm.name}
                  onChange={(e) => setDonateForm({ ...donateForm, name: e.target.value })}
                />
              </div>
              <div className="col-span-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  value={donateForm.email}
                  onChange={(e) => setDonateForm({ ...donateForm, email: e.target.value })}
                />
              </div>
              <div className="col-span-4">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  value={donateForm.phone}
                  onChange={(e) => setDonateForm({ ...donateForm, phone: e.target.value })}
                />
              </div>
              <div className="col-span-4">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Enter your message"
                  value={donateForm.message}
                  onChange={(e) => setDonateForm({ ...donateForm, message: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Success Dialogs */}
      <Dialog open={showVolunteerSuccess} onOpenChange={setShowVolunteerSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <DialogTitle className="text-xl">Thank You for Volunteering!</DialogTitle>
                <DialogDescription className="mt-1">
                  We've received your application. Our team will contact you soon with next steps.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <DialogFooter className="sm:justify-end mt-4">
            <Button
              type="button"
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={handleSuccessDialogClose}
            >
              OK, Go to Home
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showPartnerSuccess} onOpenChange={setShowPartnerSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <DialogTitle className="text-xl">Thank You for Your Interest!</DialogTitle>
                <DialogDescription className="mt-1">
                  We've received your partnership inquiry. We'll be in touch shortly to discuss collaboration opportunities.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <DialogFooter className="sm:justify-end mt-4">
            <Button
              type="button"
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={handleSuccessDialogClose}
            >
              OK, Go to Home
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDonateSuccess} onOpenChange={setShowDonateSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <DialogTitle className="text-xl">Thank You for Your Donation!</DialogTitle>
                <DialogDescription className="mt-1">
                  We've received your donation request. Our team will contact you with payment details and next steps.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <DialogFooter className="sm:justify-end mt-4">
            <Button
              type="button"
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={handleSuccessDialogClose}
            >
              OK, Go to Home
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}