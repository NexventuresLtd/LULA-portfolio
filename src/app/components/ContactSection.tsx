import { Button } from "./ui/button";
import { Smartphone, QrCode, Zap, BatteryCharging, Receipt, CreditCard } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ContactSection() {
  const appFeatures = [
    {
      icon: Receipt,
      title: "Bill Management",
      description: "View and pay your electricity bills directly through the app"
    },
    {
      icon: Zap,
      title: "Usage Monitoring",
      description: "Track your electricity consumption in real-time"
    },
    {
      icon: BatteryCharging,
      title: "Outage Reporting",
      description: "Report and check the status of power outages in your area"
    },
    {
      icon: CreditCard,
      title: "Multiple Payment Options",
      description: "Pay using various payment methods including e-wallets and credit cards"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/80 to-blue-500/80 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_40%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.1),transparent_40%)]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block glass bg-white/10 px-4 py-2 rounded-full mb-4">
              <span className="text-sm font-medium flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                Mobile App
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-medium mb-6 tracking-tight">
              Manage Your Electricity Anywhere, Anytime
            </h2>
            <p className="mb-8 text-white/80">
              Download the PLN Mobile app to manage your electricity account, monitor usage,
              pay bills, report outages, and access a range of services from your smartphone.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {appFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="mb-1">{feature.title}</h3>
                    <p className="text-sm text-white/70">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button className="glass bg-black/80 hover:bg-black/90 text-white rounded-xl h-14 px-6">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.0765 10.0273C17.0511 7.73828 18.9727 6.58203 19.0488 6.5332C18.1367 5.17969 16.6738 4.98047 16.1777 4.96875C14.9414 4.83984 13.7461 5.71094 13.1133 5.71094C12.4629 5.71094 11.4902 4.98047 10.4414 5.00391C9.08984 5.02734 7.82227 5.80859 7.14062 7.01172C5.72656 9.45703 6.76172 13.0566 8.12695 15.3164C8.81445 16.4258 9.62109 17.6699 10.6816 17.6289C11.7187 17.5879 12.1211 16.9492 13.3574 16.9492C14.5762 16.9492 14.9551 17.6289 16.043 17.6055C17.166 17.5879 17.873 16.4785 18.5371 15.3633C19.3086 14.1035 19.6172 12.8594 19.6289 12.8125C19.6055 12.8008 17.1074 11.916 17.0765 10.0273Z" />
                    <path d="M15.4864 3.78516C16.0426 3.10938 16.4215 2.16797 16.3098 1.21484C15.5032 1.24609 14.5071 1.73828 13.9274 2.39062C13.4137 2.97266 12.9528 3.96094 13.0762 4.87891C13.9743 4.94531 14.9079 4.45312 15.4864 3.78516Z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-lg font-medium leading-tight">App Store</div>
                  </div>
                </div>
              </Button>
              
              <Button className="glass bg-black/80 hover:bg-black/90 text-white rounded-xl h-14 px-6">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.9236 8.23828C15.4395 6.83594 12.9609 5.41016 12.9609 5.41016L12.9629 5.41406C12.9609 5.41406 3.03906 5.40625 3.03906 5.40625C3.03906 5.40625 3.03906 14.9863 3.03906 17.6836C3.03906 20.3965 12.9629 18.9961 12.9629 18.9961L12.9609 19C12.9609 19 20.5312 13.2227 20.9609 12.6133C21.3945 12 20.9922 11.3945 20.9609 11.3945C20.7422 11.0469 17.9236 8.23828 17.9236 8.23828ZM8.02344 14.0039V9.00391L13.0234 11.5039L8.02344 14.0039Z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-lg font-medium leading-tight">Google Play</div>
                  </div>
                </div>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="w-80 h-[530px] mx-auto relative">
              {/* Phone frame */}
              <div className="absolute inset-0 rounded-[40px] glass border-4 border-white/20 shadow-2xl overflow-hidden z-20">
                <div className="absolute top-0 left-0 right-0 h-20 bg-black/30 backdrop-blur-md z-10">
                  <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-36 h-6 bg-black rounded-full"></div>
                </div>
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=1000&auto=format&fit=crop"
                  alt="PLN Mobile App"
                  width={400}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating UI elements */}
              <div className="absolute top-24 right-[-80px] glass px-4 py-3 rounded-xl shadow-lg z-30">
                <div className="flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-primary" />
                  <div className="text-sm">Scan to download</div>
                </div>
              </div>
              
              <div className="absolute bottom-40 left-[-80px] glass px-4 py-3 rounded-xl shadow-lg z-30">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <div className="text-sm">Energy Saving Tips</div>
                </div>
              </div>
              
              {/* Glow effect behind phone */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-96 bg-primary/30 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}