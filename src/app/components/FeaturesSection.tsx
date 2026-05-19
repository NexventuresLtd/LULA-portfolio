import { 
  Zap, 
  Lightbulb,
  LineChart, 
  Battery, 
  Leaf, 
  ShieldCheck,
  Globe,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "../context/LanguageContext";

export function FeaturesSection() {
  const { t } = useLanguage();
  const features = [
    {
      icon: Lightbulb,
      title: t("features.smart_grid.title"),
      description: t("features.smart_grid.description")
    },
    {
      icon: Battery,
      title: t("features.energy_storage.title"),
      description: t("features.energy_storage.description")
    },
    {
      icon: Leaf,
      title: t("features.renewable.title"),
      description: t("features.renewable.description")
    },
    {
      icon: LineChart,
      title: t("features.monitoring.title"),
      description: t("features.monitoring.description")
    },
    {
      icon: ShieldCheck,
      title: t("features.security.title"),
      description: t("features.security.description")
    },
    {
      icon: Globe,
      title: t("features.coverage.title"),
      description: t("features.coverage.description")
    },
    {
      icon: Clock,
      title: t("features.reliability.title"),
      description: t("features.reliability.description")
    },
    {
      icon: Zap,
      title: t("features.ev.title"),
      description: t("features.ev.description")
    }
  ];

  return (
    <section id="features" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-blue-400/5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <div className="inline-block glass px-4 py-2 rounded-full mb-4">
            <span className="text-sm text-primary font-medium flex items-center gap-2">
              <Zap className="w-4 h-4" />
              {t("features.title")}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-medium mb-6 tracking-tight">
            {t("features.heading")}
          </h2>
          <p className="text-muted-foreground">
            {t("features.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass p-6 rounded-2xl border border-white/10 hover:border-primary/20 transition-all duration-300 spatial"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/90 to-blue-400/90 flex items-center justify-center mb-6 shadow-lg">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* Energy Consumption Statistics */}
        <div className="mt-24 glass rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
          <div className="absolute -bottom-12 -right-12 w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <div className="inline-block glass px-4 py-2 rounded-full mb-4">
                <span className="text-sm text-primary font-medium flex items-center gap-2">
                  <LineChart className="w-4 h-4" />
                  Energy Insights
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-medium mb-6 tracking-tight">
                Powering <span className="gradient-text">75+ Million</span> Connections
              </h2>
              <p className="text-muted-foreground mb-6">
                As Indonesia's national electricity company, PLN serves over 75 million customers 
                across the archipelago, delivering essential energy for homes, businesses, and industries.
              </p>
              <div className="flex flex-wrap gap-8 mt-8">
                <div>
                  <div className="text-4xl font-medium gradient-text mb-1">98.9%</div>
                  <div className="text-sm text-muted-foreground">Electrification Rate</div>
                </div>
                <div>
                  <div className="text-4xl font-medium gradient-text mb-1">63.2 GW</div>
                  <div className="text-sm text-muted-foreground">Installed Capacity</div>
                </div>
                <div>
                  <div className="text-4xl font-medium gradient-energy mb-1">23.5%</div>
                  <div className="text-sm text-muted-foreground">Renewable Energy</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="rounded-2xl overflow-hidden glass border border-white/10 shadow-xl aspect-[4/3]">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop"
                  alt="PLN Electric Grid Infrastructure"
                  width={600}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -top-6 -right-6 glass px-4 py-3 rounded-xl shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Green Initiative</div>
                    <div className="text-xs text-muted-foreground">+15% YoY Growth</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 glass px-4 py-3 rounded-xl shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    <Battery className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Grid Reliability</div>
                    <div className="text-xs text-muted-foreground">99.7% Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}