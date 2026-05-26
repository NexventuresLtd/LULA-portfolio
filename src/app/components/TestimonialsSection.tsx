import { useRef, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Zap, Lightbulb, Leaf, Sun, Wind, PlugZap, BadgeCheck } from "lucide-react";
import { Button } from "./ui/button";

export function TestimonialsSection() {
  const innovations = [
    {
      title: "Solar Archipelago Initiative",
      description: "Harnessing the abundant sunshine across Indonesia's islands with advanced solar farms and distributed rooftop systems.",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1000&auto=format&fit=crop",
      icon: Sun,
      stats: [
        { label: "Capacity", value: "3.2 GW" },
        { label: "Locations", value: "32 Islands" }
      ]
    },
    {
      title: "Geothermal Expansion Project",
      description: "Utilizing Indonesia's position on the Ring of Fire to expand clean geothermal energy generation across volcanic regions.",
      image: "https://images.unsplash.com/photo-1588372405219-e40d64f63fca?q=80&w=1000&auto=format&fit=crop",
      icon: Zap,
      stats: [
        { label: "Capacity", value: "2.1 GW" },
        { label: "Projects", value: "15 Active" }
      ]
    },
    {
      title: "Smart Grid Implementation",
      description: "Deploying intelligent grid technology to optimize power distribution and reduce losses across our national network.",
      image: "https://images.unsplash.com/photo-1484662020986-75935d2ebc66?q=80&w=1000&auto=format&fit=crop",
      icon: PlugZap,
      stats: [
        { label: "Efficiency", value: "+18%" },
        { label: "Coverage", value: "12 Provinces" }
      ]
    },
    {
      title: "Wind Power Corridors",
      description: "Building strategic wind farms in Indonesia's high-wind coastal areas and mountain passes to diversify renewable sources.",
      image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?q=80&w=1000&auto=format&fit=crop",
      icon: Wind,
      stats: [
        { label: "Capacity", value: "850 MW" },
        { label: "Turbines", value: "220+" }
      ]
    }
  ];

  const floatingRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      floatingRefs.current.forEach((el) => {
        if (!el) return;
        
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Calculate distance from mouse to center of element
        const distance = Math.sqrt(x * x + y * y);
        const maxDistance = Math.sqrt(Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2)) / 2;
        
        // Scale effect based on distance (further = less effect)
        const scale = 1 - Math.min(0.5, distance / maxDistance);
        
        // Apply transform - move slightly toward mouse
        el.style.transform = `translate(${x * scale * 0.03}px, ${y * scale * 0.03}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-2/3 w-96 h-96 rounded-full bg-blue-400/5 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-2/3 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block glass px-4 py-2 rounded-full mb-4">
            <span className="text-sm text-primary font-medium flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Innovation
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-medium mb-6 tracking-tight">
            Pioneering <span className="gradient-text">Sustainable Energy</span> for Indonesia
          </h2>
          <p className="text-muted-foreground">
            Discover PLN's innovative projects that are transforming Indonesia's energy landscape and 
            leading the way toward a greener, more sustainable future.
          </p>
        </div>

        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {innovations.map((innovation, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2 p-2">
                <div 
                  className="h-full glass rounded-3xl overflow-hidden border border-white/10 spatial"
                  ref={el => floatingRefs.current[index] = el}
                >
                  <div className="relative h-56 overflow-hidden">
                    <ImageWithFallback
                      src={innovation.image}
                      alt={innovation.title}
                      width={500}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center text-white">
                          <innovation.icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-white text-xl">{innovation.title}</h3>
                      </div>
                      <div className="flex gap-4">
                        {innovation.stats.map((stat, i) => (
                          <div key={i} className="glass px-3 py-1 rounded-full text-white text-sm">
                            <span className="font-medium">{stat.value}</span> {stat.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-muted-foreground mb-6">{innovation.description}</p>
                    <Button 
                      variant="outline" 
                      className="rounded-full glass border-primary/20 hover:border-primary/40 hover:bg-primary/5 w-full"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8 gap-4">
            <CarouselPrevious className="static rounded-full glass border-white/20" />
            <CarouselNext className="static rounded-full glass border-white/20" />
          </div>
        </Carousel>
        
        {/* Sustainability Commitment Section */}
        <div className="mt-24 glass rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-green-500/10 blur-3xl"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <div className="inline-block glass px-4 py-2 rounded-full mb-4">
                <span className="text-sm text-green-600 dark:text-green-400 font-medium flex items-center gap-2">
                  <Leaf className="w-4 h-4" />
                  Sustainability Commitment
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-medium mb-6 tracking-tight">
                Net Zero <span className="gradient-energy">Carbon Emissions</span> by 2060
              </h2>
              <p className="text-muted-foreground mb-6">
                PLN is committed to Indonesia's clean energy transition, with ambitious targets 
                to reduce carbon emissions while ensuring reliable electricity for all citizens.
              </p>
              
              <div className="space-y-4 mt-8">
                <div className="flex items-start gap-3">
                  <BadgeCheck className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                  <div>
                    <h4 className="mb-1">50% Renewable Energy Mix by 2040</h4>
                    <p className="text-sm text-muted-foreground">
                      Aggressive expansion of solar, wind, geothermal, and hydro capacity
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <BadgeCheck className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                  <div>
                    <h4 className="mb-1">Phase Out Coal Plants by 2050</h4>
                    <p className="text-sm text-muted-foreground">
                      Gradual decommissioning of coal power plants and transition to cleaner alternatives
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <BadgeCheck className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                  <div>
                    <h4 className="mb-1">Carbon Capture Implementation</h4>
                    <p className="text-sm text-muted-foreground">
                      Investing in carbon capture technology for existing thermal plants
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative h-[400px]">
              <div className="rounded-2xl overflow-hidden glass border border-white/10 shadow-xl h-full">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop"
                  alt="Sustainable Energy Future"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating Progress Indicators */}
              <div className="absolute top-6 right-6 glass px-5 py-4 rounded-xl shadow-lg">
                <h4 className="mb-2">Renewable Progress</h4>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '23.5%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Current: 23.5%</span>
                  <span>Target: 50%</span>
                </div>
              </div>
              
              <div className="absolute bottom-6 left-6 glass px-5 py-4 rounded-xl shadow-lg">
                <h4 className="mb-2">Carbon Reduction</h4>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '18%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Current: 18%</span>
                  <span>Target: 100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}