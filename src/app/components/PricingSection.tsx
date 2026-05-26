import { Check, Zap, Home, Building2, Factory, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function PricingSection() {
  const customerPortals = [
    {
      name: "Residential",
      icon: Home,
      description: "For homes and residential electricity needs",
      features: [
        "Online bill payment",
        "Usage monitoring",
        "Outage reporting",
        "Connection requests",
        "Energy-saving tips",
      ],
      cta: "Access Portal",
      image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=2070&auto=format&fit=crop",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Business",
      icon: Building2,
      description: "For small to medium businesses",
      features: [
        "Business account management",
        "Priority customer service",
        "Energy efficiency consultation",
        "Peak demand management",
        "Multiple location monitoring",
        "Detailed usage analytics",
      ],
      cta: "Access Portal",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
      color: "from-purple-500 to-indigo-500",
      popular: true,
    },
    {
      name: "Industrial",
      icon: Factory,
      description: "For large industrial operations",
      features: [
        "High-voltage service management",
        "Custom infrastructure solutions",
        "Load balancing tools",
        "Redundancy planning",
        "Dedicated account representative",
        "Emergency response priority",
        "Custom tariff options",
      ],
      cta: "Contact Industrial Team",
      image: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=2070&auto=format&fit=crop",
      color: "from-gray-900 to-red-500",
    }
  ];

  return (
    <section id="pricing" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block glass px-4 py-2 rounded-full mb-4">
            <span className="text-sm text-primary font-medium flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Customer Portals
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-medium mb-6 tracking-tight">
            Tailored Solutions for All Customer Types
          </h2>
          <p className="text-muted-foreground">
            Access specialized services through our customer portals designed for your specific needs,
            whether you're a homeowner, business operator, or industrial facility manager.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {customerPortals.map((portal, index) => (
            <div 
              key={index} 
              className={`glass rounded-3xl overflow-hidden transition-all duration-300 spatial border border-white/10 ${
                portal.popular ? 'ring-2 ring-primary relative scale-105 z-10' : ''
              }`}
            >
              {portal.popular && (
                <Badge className="absolute top-4 right-4 z-20 glass bg-primary">
                  Most Popular
                </Badge>
              )}
              
              <div className="relative h-48 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r ${portal.color} opacity-90`}></div>
                <ImageWithFallback
                  src={portal.image}
                  alt={portal.name}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <portal.icon className="w-12 h-12 mx-auto mb-2" />
                    <h3 className="text-xl md:text-2xl font-medium">{portal.name}</h3>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
              </div>
              
              <div className="p-8">
                <p className="text-muted-foreground mb-6">{portal.description}</p>
                <ul className="space-y-3 mb-8">
                  {portal.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full rounded-full group ${
                    portal.popular 
                      ? "bg-primary hover:bg-primary/90" 
                      : "bg-white/80 hover:bg-white/90 text-foreground"
                  }`}
                >
                  <span>{portal.cta}</span>
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Additional Service Section */}
        <div className="mt-20 glass rounded-3xl p-8 md:p-12 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block glass px-4 py-2 rounded-full mb-4">
                <span className="text-sm text-primary font-medium flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  New Connections
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-medium mb-4">Need a New Electric Connection?</h3>
              <p className="text-muted-foreground mb-6">
                Whether you're building a new home, opening a business location, or expanding industrial operations,
                PLN provides streamlined services for establishing new electrical connections.
              </p>
              <Button className="rounded-full glass bg-primary/90 hover:bg-primary/100 px-8 group">
                <span>Apply Online</span>
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="glass p-6 rounded-2xl border border-white/10 hover:border-primary/20 spatial">
                <div className="mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400 flex items-center justify-center">
                    <span className="text-lg font-medium">1</span>
                  </div>
                </div>
                <h4 className="mb-2">Apply</h4>
                <p className="text-sm text-muted-foreground">Submit application through our online portal</p>
              </div>
              
              <div className="glass p-6 rounded-2xl border border-white/10 hover:border-primary/20 spatial">
                <div className="mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-green-600 dark:bg-green-900/40 dark:text-blue-400 flex items-center justify-center">
                    <span className="text-lg font-medium">2</span>
                  </div>
                </div>
                <h4 className="mb-2">Assessment</h4>
                <p className="text-sm text-muted-foreground">Technical evaluation of your location</p>
              </div>
              
              <div className="glass p-6 rounded-2xl border border-white/10 hover:border-primary/20 spatial">
                <div className="mb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400 flex items-center justify-center">
                    <span className="text-lg font-medium">3</span>
                  </div>
                </div>
                <h4 className="mb-2">Installation</h4>
                <p className="text-sm text-muted-foreground">Professional setup by PLN technicians</p>
              </div>
              
              <div className="glass p-6 rounded-2xl border border-white/10 hover:border-primary/20 spatial">
                <div className="mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-900 dark:bg-gray-900/40 dark:text-gray-700 flex items-center justify-center">
                    <span className="text-lg font-medium">4</span>
                  </div>
                </div>
                <h4 className="mb-2">Activation</h4>
                <p className="text-sm text-muted-foreground">Final inspection and power activation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}