import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Zap, MessageCircle, HelpCircle, PhoneCall, Mail, MapPin } from "lucide-react";
import { Button } from "./ui/button";

export function FaqSection() {
  const faqs = [
    {
      question: "How do I report a power outage?",
      answer: "You can report a power outage through our 24/7 contact center at 123, through the PLN Mobile app, or via the Customer Portal on our website. Please provide your customer ID and location details for faster resolution."
    },
    {
      question: "How can I check my electricity bill?",
      answer: "You can check your electricity bill through multiple channels: the PLN Mobile app, our Customer Portal website, by visiting the nearest PLN office, or by calling our contact center at 123. Bills are typically issued monthly."
    },
    {
      question: "What payment methods are accepted for electricity bills?",
      answer: "PLN accepts various payment methods including online banking, mobile banking, credit/debit cards, e-wallets (GoPay, OVO, DANA, LinkAja), ATMs, minimarkets (Indomaret, Alfamart), post offices, and direct payment at PLN offices."
    },
    {
      question: "How do I apply for a new electricity connection?",
      answer: "New connections can be requested through our online Customer Portal, the PLN Mobile app, or by visiting the nearest PLN office. You'll need to provide identification, property ownership documents, and details about your required power capacity."
    },
    {
      question: "What is PLN's renewable energy program?",
      answer: "PLN is committed to increasing renewable energy in our generation mix, with programs including solar panel installation, geothermal development, hydroelectric expansion, and wind farm construction. Customers can participate through net metering programs for rooftop solar installations."
    },
    {
      question: "How do I upgrade my power capacity?",
      answer: "Power capacity upgrades can be requested through the Customer Portal, PLN Mobile app, or at PLN offices. After submitting your request, a technical team will assess feasibility, provide a quote, and schedule the upgrade upon payment."
    }
  ];

  return (
    <section id="faq" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <div className="inline-block glass px-4 py-2 rounded-full mb-4">
              <span className="text-sm text-primary font-medium flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                Support
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-medium mb-6 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground mb-10">
              Find answers to common questions about PLN services, billing, connections, and more.
            </p>

            <div className="glass rounded-2xl border border-white/10 overflow-hidden">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-white/10">
                    <AccordionTrigger className="px-6 py-4 hover:bg-white/5 transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
          
          <div>
            <div className="inline-block glass px-4 py-2 rounded-full mb-4">
              <span className="text-sm text-primary font-medium flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Contact Us
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-medium mb-6 tracking-tight">
              Get in Touch with PLN
            </h2>
            <p className="text-muted-foreground mb-10">
              Our customer service team is available 24/7 to assist you with any questions or concerns.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="glass p-6 rounded-2xl border border-white/10 spatial">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/90 to-blue-400/90 flex items-center justify-center mb-4 shadow-lg">
                  <PhoneCall className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2">Phone Support</h3>
                <p className="text-muted-foreground mb-4">
                  Call our 24/7 customer service line for immediate assistance.
                </p>
                <p className="text-lg font-medium">123</p>
                <p className="text-sm text-muted-foreground">(toll-free from any phone in Indonesia)</p>
              </div>
              
              <div className="glass p-6 rounded-2xl border border-white/10 spatial">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/90 to-blue-400/90 flex items-center justify-center mb-4 shadow-lg">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2">Email Support</h3>
                <p className="text-muted-foreground mb-4">
                  Send us an email and we'll respond within 24 hours.
                </p>
                <p className="text-lg font-medium">pln123@pln.co.id</p>
                <p className="text-sm text-muted-foreground">(for general inquiries)</p>
              </div>
              
              <div className="glass p-6 rounded-2xl border border-white/10 spatial sm:col-span-2">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/90 to-blue-400/90 flex items-center justify-center mb-4 shadow-lg">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2">Head Office</h3>
                <p className="text-muted-foreground mb-4">
                  Visit our head office in Jakarta for in-person assistance.
                </p>
                <p className="text-lg font-medium">PLN Head Office</p>
                <p className="text-muted-foreground">Jl. Trunojoyo Blok M I No.135, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12160, Indonesia</p>
              </div>
            </div>
            
            <div className="glass rounded-2xl border border-white/10 p-8">
              <h3 className="mb-6">Have a Specific Question?</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-3 rounded-xl glass border border-white/20 focus:border-primary/50 bg-white/10"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-3 rounded-xl glass border border-white/20 focus:border-primary/50 bg-white/10"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block mb-2 text-sm">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="w-full px-4 py-3 rounded-xl glass border border-white/20 focus:border-primary/50 bg-white/10"
                    placeholder="How can we help you?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-2 text-sm">Message</label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    className="w-full px-4 py-3 rounded-xl glass border border-white/20 focus:border-primary/50 bg-white/10"
                    placeholder="Please describe your question or issue in detail"
                  ></textarea>
                </div>
                <Button className="w-full rounded-full glass bg-primary/90 hover:bg-primary/100">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}