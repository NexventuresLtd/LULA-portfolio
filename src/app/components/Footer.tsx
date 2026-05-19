import { Zap, Facebook, Twitter, Instagram, Youtube, Linkedin, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "Customer Services",
      links: [
        { label: "Pay Bills", href: "#" },
        { label: "Report Outage", href: "#" },
        { label: "New Connection", href: "#" },
        { label: "Service Change", href: "#" },
      ]
    },
    {
      title: "About PLN",
      links: [
        { label: "Company Profile", href: "#" },
        { label: "History", href: "#" },
        { label: "Leadership", href: "#" },
        { label: "Sustainability", href: "#" },
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Energy Calculator", href: "#" },
        { label: "Outage Map", href: "#" },
        { label: "Energy Saving Tips", href: "#" },
        { label: "FAQ", href: "#faq" },
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of Service", href: "#" },
        { label: "Privacy Policy", href: "#" },
        { label: "Service Standards", href: "#" },
        { label: "Regulatory Compliance", href: "#" },
      ]
    }
  ];

  return (
    <footer className="relative overflow-hidden">
      <div className="bg-gradient-to-b from-background to-primary/5 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-8 mb-12">
            <div className="col-span-2 md:col-span-6 lg:col-span-4">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center shadow-md">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium tracking-tight">PLN</span>
                  <span className="text-xs text-muted-foreground">Perusahaan Listrik Negara</span>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">
                PT PLN (Persero) is Indonesia's state-owned electricity company, providing power generation, 
                transmission, and distribution services throughout the archipelago.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Jl. Trunojoyo Blok M I No.135, Jakarta 12160, Indonesia
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">123 (Call Center)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">pln123@pln.co.id</span>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-primary/10 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-primary/10 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-primary/10 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-primary/10 transition-colors"
                  aria-label="Youtube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-primary/10 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            {footerLinks.map((section, index) => (
              <div key={index} className="col-span-1 md:col-span-3 lg:col-span-2">
                <h4 className="mb-4 font-medium">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a 
                        href={link.href} 
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="glass rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-medium gradient-text mb-2">17,000+</div>
                <div className="text-sm text-muted-foreground">Employees Nationwide</div>
              </div>
              <div>
                <div className="text-3xl font-medium gradient-text mb-2">75+ Million</div>
                <div className="text-sm text-muted-foreground">Customers Served</div>
              </div>
              <div>
                <div className="text-3xl font-medium gradient-text mb-2">99.7%</div>
                <div className="text-sm text-muted-foreground">Service Reliability</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border/50 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm mb-4 md:mb-0">
              © {currentYear} PT PLN (Persero). All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Whistleblower System
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Site Map
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}