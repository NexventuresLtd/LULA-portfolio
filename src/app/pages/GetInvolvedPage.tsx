import { useSEO } from '../hooks/useSEO';
import { useState } from "react";
import { useNavigate } from "react-router";
import { useLanguage } from "../context/LanguageProvider";
import { useContent } from "../context/ContentContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Heart, HandHeart, Handshake, CheckCircle, MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

export function GetInvolvedPage() {
  const { t } = useLanguage();
  useSEO("Get Involved - Donate, Volunteer or Partner", "Support LULA through donations, volunteering, or partnerships. Your contribution transforms lives in Eastern DR Congo.");
  const { addInterest, appearanceSettings, orgSettings } = useContent();
  const navigate = useNavigate();
  const [donationAmount, setDonationAmount] = useState("");
  const [currency, setCurrency] = useState("USD");

  const currencyAmounts: Record<string, string[]> = {
    USD: ['10', '25', '50', '100', '250', '500'],
    EUR: ['10', '25', '50', '100', '250', '500'],
    GBP: ['10', '20', '50', '100', '200', '500'],
    CDF: ['5000', '10000', '25000', '50000', '100000', '250000'],
    RWF: ['5000', '10000', '25000', '50000', '100000', '250000'],
  };
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
  };

  return (
    <div className="bg-white">
      <section id="hero-section" className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-black/60 z-10" />
        <img
          src={appearanceSettings.getInvolvedHeroBackground}
          alt="Get Involved"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t("involved.title")}
            </h1>
            <p className="text-xl text-gray-100 max-w-3xl">
              {t("involved.subtitle")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
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
                  {t("involved.donateDesc")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Label>{t("form.quickSelect")}</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {(currencyAmounts[currency] || currencyAmounts.USD).map((amt) => (
                        <Button
                          key={amt}
                          type="button"
                          variant={donationAmount === amt ? 'default' : 'outline'}
                          onClick={() => setDonationAmount(amt)}
                          className="h-10"
                        >
                          {Number(amt).toLocaleString()}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Label htmlFor="custom">{t("form.orEnterAmount")}</Label>
                      <Input
                        id="custom"
                        placeholder="Enter amount"
                        className="mt-2"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                      />
                    </div>
                    <div className="w-28">
                      <Label>{t("form.currency")}</Label>
                      <Select value={currency} onValueChange={setCurrency}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                          <SelectItem value="CDF">CDF</SelectItem>
                          <SelectItem value="RWF">RWF</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {orgSettings.paymentDetails && (
                    <div className="bg-gray-50 p-4 rounded-lg border">
                      <h4 className="font-semibold text-gray-900 mb-2">{t("form.paymentDetails")}</h4>
                      <p className="text-sm text-gray-600 whitespace-pre-line">{orgSettings.paymentDetails}</p>
                    </div>
                  )}

                  <a
                    href={`https://wa.me/${orgSettings.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello LULA, I would like to donate ${donationAmount} ${currency}. Please share payment details.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white gap-2">
                      <MessageCircle className="w-5 h-5" />
                      Donate {donationAmount ? `${donationAmount} ${currency}` : ''} via WhatsApp
                    </Button>
                  </a>
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
                    {t("involved.volunteerDesc")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" onClick={() => setIsVolunteerDialogOpen(true)}>{t("involved.applyVolunteer")}</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                    <Handshake className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle>{t("involved.partner_title")}</CardTitle>
                  <CardDescription>
                    {t("involved.partnerDesc")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" onClick={() => setIsPartnerDialogOpen(true)}>{t("involved.partnerInquiry")}</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={isVolunteerDialogOpen} onOpenChange={setIsVolunteerDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("form.volunteerApp")}</DialogTitle>
            <DialogDescription>
              {t("form.volunteerAppDesc")}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleVolunteerSubmit}>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-4">
                <Label htmlFor="name">{t("form.name")}</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={volunteerForm.name}
                  onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                />
              </div>
              <div className="col-span-4">
                <Label htmlFor="email">{t("form.email")}</Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  value={volunteerForm.email}
                  onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                />
              </div>
              <div className="col-span-4">
                <Label htmlFor="phone">{t("form.phone")}</Label>
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  value={volunteerForm.phone}
                  onChange={(e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value })}
                />
              </div>
              <div className="col-span-4">
                <Label htmlFor="message">{t("form.message")}</Label>
                <Textarea
                  id="message"
                  placeholder="Enter your message"
                  value={volunteerForm.message}
                  onChange={(e) => setVolunteerForm({ ...volunteerForm, message: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{t("form.submit")}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isPartnerDialogOpen} onOpenChange={setIsPartnerDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("form.partnerInquiry")}</DialogTitle>
            <DialogDescription>
              {t("form.partnerInquiryDesc")}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePartnerSubmit}>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-4">
                <Label htmlFor="name">{t("form.name")}</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={partnerForm.name}
                  onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })}
                />
              </div>
              <div className="col-span-4">
                <Label htmlFor="email">{t("form.email")}</Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  value={partnerForm.email}
                  onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                />
              </div>
              <div className="col-span-4">
                <Label htmlFor="phone">{t("form.phone")}</Label>
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  value={partnerForm.phone}
                  onChange={(e) => setPartnerForm({ ...partnerForm, phone: e.target.value })}
                />
              </div>
              <div className="col-span-4">
                <Label htmlFor="message">{t("form.message")}</Label>
                <Textarea
                  id="message"
                  placeholder="Enter your message"
                  value={partnerForm.message}
                  onChange={(e) => setPartnerForm({ ...partnerForm, message: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{t("form.submit")}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDonateDialogOpen} onOpenChange={setIsDonateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("form.donateTitle")}</DialogTitle>
            <DialogDescription>
              {t("form.donateDesc")}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleDonateSubmit}>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-4">
                <Label htmlFor="name">{t("form.name")}</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={donateForm.name}
                  onChange={(e) => setDonateForm({ ...donateForm, name: e.target.value })}
                />
              </div>
              <div className="col-span-4">
                <Label htmlFor="email">{t("form.email")}</Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  value={donateForm.email}
                  onChange={(e) => setDonateForm({ ...donateForm, email: e.target.value })}
                />
              </div>
              <div className="col-span-4">
                <Label htmlFor="phone">{t("form.phone")}</Label>
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  value={donateForm.phone}
                  onChange={(e) => setDonateForm({ ...donateForm, phone: e.target.value })}
                />
              </div>
              <div className="col-span-4">
                <Label htmlFor="message">{t("form.message")}</Label>
                <Textarea
                  id="message"
                  placeholder="Enter your message"
                  value={donateForm.message}
                  onChange={(e) => setDonateForm({ ...donateForm, message: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{t("form.submit")}</Button>
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
                <DialogTitle className="text-xl">{t("form.thankYouVolunteer")}</DialogTitle>
                <DialogDescription className="mt-1">
                  {t("involved.thankYouVolunteerDesc")}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <DialogFooter className="sm:justify-end mt-4 gap-2">
            <a href={`https://wa.me/${orgSettings.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
              <Button type="button" variant="outline" className="gap-2 text-green-600 border-green-600 hover:bg-green-50">
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Button>
            </a>
            <Button
              type="button"
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={handleSuccessDialogClose}
            >
              OK
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
                <DialogTitle className="text-xl">{t("form.thankYouPartner")}</DialogTitle>
                <DialogDescription className="mt-1">
                  {t("involved.thankYouPartnerDesc")}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <DialogFooter className="sm:justify-end mt-4 gap-2">
            <a href={`https://wa.me/${orgSettings.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
              <Button type="button" variant="outline" className="gap-2 text-green-600 border-green-600 hover:bg-green-50">
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Button>
            </a>
            <Button
              type="button"
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={handleSuccessDialogClose}
            >
              OK
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
                <DialogTitle className="text-xl">{t("form.thankYouDonate")}</DialogTitle>
                <DialogDescription className="mt-1">
                  {t("involved.thankYouDonateDesc")}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <DialogFooter className="sm:justify-end mt-4 gap-2">
            <a href={`https://wa.me/${orgSettings.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
              <Button type="button" variant="outline" className="gap-2 text-green-600 border-green-600 hover:bg-green-50">
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Button>
            </a>
            <Button
              type="button"
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={handleSuccessDialogClose}
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}