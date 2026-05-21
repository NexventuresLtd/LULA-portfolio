import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLULALanguage } from '../../context/LULALanguageContext';

interface Province {
  name: string;
  lat: number;
  lng: number;
}

const provinces: Province[] = [
  { 
    name: "North Kivu", 
    lat: -0.7917729, 
    lng: 29.045993
  },
  { 
    name: "South Kivu", 
    lat: -3.011658, 
    lng: 28.299435
  },
  { 
    name: "Ituri", 
    lat: 1.8754518, 
    lng: 29.045993
  },
  { 
    name: "Tanganyika", 
    lat: -6.2740118, 
    lng: 27.9249002
  },
  { 
    name: "Haut-Katanga", 
    lat: -11.0646485, 
    lng: 27.5495846
  },
  { 
    name: "Maniema", 
    lat: -3.0730929, 
    lng: 26.041389
  },
  { 
    name: "Tshopo", 
    lat: 0.5455462, 
    lng: 24.904221
  },
  { 
    name: "Kasaï", 
    lat: -5.0471979, 
    lng: 20.7122465
  },
  { 
    name: "Kasaï-Central", 
    lat: -6.2514921, 
    lng: 22.2384017
  },
  { 
    name: "Lomami", 
    lat: -5.4903729, 
    lng: 25.2837585
  },
  { 
    name: "Sankuru", 
    lat: -2.8437453, 
    lng: 23.3823545
  },
  { 
    name: "Kwilu", 
    lat: -4.4863479, 
    lng: 18.4276047
  }
];

export default function DRCongoMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<number | null>(null);
  const { t } = useLULALanguage();

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map with dark teal theme
    const map = L.map(mapRef.current, {
      center: [-3.5, 24.0],
      zoom: 5,
      zoomControl: true,
      scrollWheelZoom: true
    });

    mapInstanceRef.current = map;

    // Use dark map style with terrain like Google Maps
    L.tileLayer('https://{s}.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: '&copy; Google Maps'
    }).addTo(map);

    // Custom orange marker icon matching LULA color palette
    const createCustomIcon = () => {
      return L.divIcon({
        className: '',
        html: `
          <div style="
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
          ">
            <div style="
              width: 28px;
              height: 28px;
              background: #ea580c;
              border: 3px solid white;
              border-radius: 50% 50% 50% 0;
              transform: rotate(-45deg);
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 3px 10px rgba(0,0,0,0.3);
            ">
              <div style="
                width: 10px;
                height: 10px;
                background: white;
                border-radius: 50%;
                transform: rotate(45deg);
              "></div>
            </div>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -32]
      });
    };

    // Add markers and store references
    provinces.forEach((province, index) => {
      const marker = L.marker([province.lat, province.lng], { 
        icon: createCustomIcon() 
      }).addTo(map);
      
      marker.bindPopup(`
        <div style="padding: 10px;">
          <div style="font-weight: bold; font-size: 15px; color: #1e3a8a;">
            ${province.name}
          </div>
        </div>
      `);

      markersRef.current[index] = marker;
    });

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleProvinceClick = (index: number, lat: number, lng: number) => {
    setSelectedProvince(index);
    if (mapInstanceRef.current && markersRef.current[index]) {
      // Fly to location
      mapInstanceRef.current.flyTo([lat, lng], 8, {
        duration: 1.5
      });
      // Open the popup for this marker
      setTimeout(() => {
        markersRef.current[index].openPopup();
      }, 1500);
    }
  };

  const handleZoomOut = () => {
    setSelectedProvince(null);
    if (mapInstanceRef.current) {
      // Close all popups
      mapInstanceRef.current.closePopup();
      // Fly back to default view
      mapInstanceRef.current.flyTo([-3.5, 24.0], 5, {
        duration: 1.5
      });
    }
  };

  return (
    <div className="relative w-full">
      {/* Map Container with Sidebar */}
      <div className="relative w-full flex flex-col lg:flex-row gap-0 rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
        {/* Map Section */}
        <div className="relative w-full lg:w-2/3 h-[600px]">
          <div ref={mapRef} className="w-full h-full z-0" />

          {/* Title Overlay */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-blue-900/95 backdrop-blur-sm rounded-xl px-6 py-3 shadow-xl border border-blue-700 z-[400] pointer-events-none">
            <h3 className="text-xl font-bold text-white text-center">{t('map.title')}</h3>
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="w-full lg:w-1/3 bg-gray-800 border-t lg:border-t-0 lg:border-l border-gray-700 flex flex-col h-[600px]">
          {/* Header */}
          <div 
            onClick={handleZoomOut}
            className="p-4 border-b border-gray-700 flex-shrink-0 cursor-pointer hover:bg-gray-700/50 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-white font-semibold">{t('map.regions_header')}</h4>
              <svg className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
              </svg>
            </div>
          </div>

          {/* Scrollable Province List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-800">
            {provinces.map((province, index) => (
              <div
                key={index}
                onClick={() => handleProvinceClick(index, province.lat, province.lng)}
                className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all ${
                  selectedProvince === index
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700/40 hover:bg-gray-700/70 text-gray-200'
                }`}
              >
                {/* Pin Icon */}
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>

                {/* Province Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold truncate">
                    {province.name}
                  </h4>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom styles for Leaflet and Scrollbar */}
      <style>{`
        .leaflet-popup-content-wrapper {
          border-radius: 0.75rem;
          box-shadow: 0 4px 24px rgba(0,0,0,0.3);
          background: white;
          border: 2px solid #2563eb;
        }
        
        .leaflet-popup-tip {
          box-shadow: 0 4px 24px rgba(0,0,0,0.3);
        }

        .leaflet-control-zoom a {
          background: rgba(37, 99, 235, 0.95) !important;
          color: white !important;
          border: 1px solid rgba(59, 130, 246, 0.8) !important;
        }

        .leaflet-control-zoom a:hover {
          background: rgba(29, 78, 216, 0.95) !important;
        }

        .leaflet-control-attribution {
          background: rgba(31, 41, 55, 0.8) !important;
          color: rgba(156, 163, 175, 0.9) !important;
          font-size: 10px;
        }

        .leaflet-container {
          font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #1f2937;
        }

        /* Custom scrollbar */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: #1f2937;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #2563eb;
          border-radius: 3px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #1d4ed8;
        }
      `}</style>
    </div>
  );
}