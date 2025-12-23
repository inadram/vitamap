
import React, { useEffect, useRef, useState } from 'react';
import { Sun, Utensils, LayoutGrid, Info, Plus, Minus, Navigation, Globe, SearchX, Loader2 } from 'lucide-react';
import { CountryData, MapViewType } from '../types';

interface MapContainerProps {
  onSelectCountry: (country: CountryData) => void;
  selectedCountry: CountryData;
  filteredCountries: CountryData[];
  searchTerm: string;
}

const MapContainer: React.FC<MapContainerProps> = ({ onSelectCountry, selectedCountry, filteredCountries, searchTerm }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [viewType, setViewType] = useState<MapViewType>(MapViewType.Sunshine);
  const [googleMap, setGoogleMap] = useState<any | null>(null);
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const markersRef = useRef<any[]>([]);

  // Check for Google Maps API availability
  useEffect(() => {
    const checkApi = () => {
      if ((window as any).google && (window as any).google.maps) {
        setIsApiLoaded(true);
      } else {
        setTimeout(checkApi, 500);
      }
    };
    checkApi();
  }, []);

  useEffect(() => {
    const win = window as any;
    if (mapRef.current && !googleMap && isApiLoaded) {
      const map = new win.google.maps.Map(mapRef.current, {
        center: { lat: 52, lng: 12 },
        zoom: 4,
        styles: [
          { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] },
          { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] },
          { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] },
          { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] },
          { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] },
          { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }
        ],
        disableDefaultUI: true,
        gestureHandling: 'greedy'
      });
      setGoogleMap(map);
    }
  }, [googleMap, isApiLoaded]);

  // Handle dynamic marker management based on filtered results
  useEffect(() => {
    if (!googleMap) return;
    const win = window as any;

    // Helper to get short code for UV Index
    const getUvCode = (uv: string) => {
      if (uv.includes('Extremely Low')) return 'EL';
      if (uv.includes('Very Low')) return 'VL';
      if (uv.includes('Low')) return 'L';
      if (uv.includes('Moderate')) return 'M';
      if (uv.includes('High')) return 'H';
      return '?';
    };

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Create new markers for visible countries
    filteredCountries.forEach(country => {
      const isSelected = country.id === selectedCountry.id;
      
      const marker = new win.google.maps.Marker({
        position: { lat: country.lat, lng: country.lng },
        map: googleMap,
        title: `${country.name} - UV Index: ${country.uvIndex}`,
        label: {
          text: getUvCode(country.uvIndex),
          color: 'white',
          fontSize: isSelected ? '11px' : '9px',
          fontWeight: 'bold'
        },
        icon: {
          path: win.google.maps.SymbolPath.CIRCLE,
          fillColor: country.riskLevel === 'High' ? '#ef4444' : country.riskLevel === 'Moderate' ? '#f59e0b' : '#10b981',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
          scale: isSelected ? 20 : 16 // Increased scale to fit labels
        },
        zIndex: isSelected ? 1000 : 1
      });

      marker.addListener('click', () => {
        onSelectCountry(country);
      });

      markersRef.current.push(marker);
    });
  }, [googleMap, filteredCountries, selectedCountry, onSelectCountry]);

  useEffect(() => {
    if (googleMap && selectedCountry) {
      googleMap.panTo({ lat: selectedCountry.lat, lng: selectedCountry.lng });
    }
  }, [selectedCountry, googleMap]);

  return (
    <div className="relative flex-1 h-full bg-gray-100">
      {/* Loading State */}
      {!isApiLoaded && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
          <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mb-4" />
          <p className="text-sm font-medium text-gray-600">Initializing Map Engine...</p>
        </div>
      )}

      <div ref={mapRef} className="w-full h-full grayscale-[0.1]" />

      {/* No Results Overlay */}
      {filteredCountries.length === 0 && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-100/40 backdrop-blur-[2px]">
          <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 flex flex-col items-center text-center max-w-sm animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <SearchX className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-500 text-sm">We couldn't find any Vitamin D data for "{searchTerm}". Try another European region.</p>
          </div>
        </div>
      )}

      {/* Floating UI Overlays */}
      <div className="absolute top-6 left-6 z-10 w-80 pointer-events-none">
        {/* Selected Country Card */}
        <div className={`bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 transition-all duration-500 transform pointer-events-auto ${filteredCountries.length === 0 ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
          <div className="relative h-32 bg-cover bg-center" style={{ backgroundImage: `url('https://picsum.photos/seed/${selectedCountry.id}/400/200')` }}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute top-3 right-3 px-2 py-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center space-x-1">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              <span>{selectedCountry.riskLevel} Risk</span>
            </div>
            <div className="absolute bottom-4 left-6">
              <p className="text-xs text-white/80 font-medium uppercase tracking-tight">Current Selection</p>
              <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
                <span>{selectedCountry.name}</span>
                <Globe className="w-4 h-4 text-white/60" />
              </h3>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-3 bg-orange-50 rounded-2xl border border-orange-100">
                <div className="flex items-center space-x-2 mb-1">
                  <Sun className="w-3 h-3 text-orange-500" />
                  <span className="text-[10px] font-bold text-orange-600 uppercase">UV Index</span>
                </div>
                <p className="text-sm font-bold text-gray-800">{selectedCountry.uvIndex}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100">
                <div className="flex items-center space-x-2 mb-1">
                  <Info className="w-3 h-3 text-blue-500" />
                  <span className="text-[10px] font-bold text-blue-600 uppercase">Omega-3</span>
                </div>
                <p className="text-sm font-bold text-gray-800">{selectedCountry.omega3}</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-md cursor-pointer transition-all group">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <div className="w-4 h-4 border-2 border-white rounded-sm" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">{selectedCountry.product.name}</p>
                  <p className="text-[10px] text-emerald-600 font-semibold">{selectedCountry.product.match}</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-500 transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* Layer Selectors */}
      <div className="absolute top-6 right-6 z-10 flex flex-col space-y-4">
        {[
          { id: MapViewType.Sunshine, label: 'Sunshine Duration', icon: Sun, color: 'text-orange-500' },
          { id: MapViewType.Dietary, label: 'Dietary Patterns', icon: Utensils, color: 'text-orange-600' },
          { id: MapViewType.Heatmap, label: 'Deficiency Heatmap', icon: LayoutGrid, color: 'text-red-500' }
        ].map(item => (
          <button 
            key={item.id}
            onClick={() => setViewType(item.id)}
            className={`flex items-center space-x-3 px-5 py-3 rounded-full shadow-lg transition-all border ${viewType === item.id ? 'bg-white border-emerald-500 scale-105' : 'bg-white/90 border-transparent hover:bg-white'}`}
          >
            <span className="text-sm font-semibold text-gray-700">{item.label}</span>
            <item.icon className={`w-4 h-4 ${item.color}`} />
          </button>
        ))}
      </div>

      {/* Map Controls */}
      <div className="absolute bottom-24 right-6 z-10 flex flex-col space-y-2">
        <button onClick={() => googleMap?.setZoom((googleMap.getZoom() || 0) + 1)} className="p-3 bg-white shadow-xl rounded-xl hover:bg-gray-50 transition-colors"><Plus className="w-5 h-5 text-gray-600" /></button>
        <button onClick={() => googleMap?.setZoom((googleMap.getZoom() || 0) - 1)} className="p-3 bg-white shadow-xl rounded-xl hover:bg-gray-50 transition-colors"><Minus className="w-5 h-5 text-gray-600" /></button>
        <button onClick={() => googleMap?.panTo({ lat: 50, lng: 15 })} className="mt-2 p-3 bg-white shadow-xl rounded-xl hover:bg-gray-50 transition-colors"><Navigation className="w-5 h-5 text-gray-600" /></button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-10 left-6 z-10 w-64 bg-white/90 backdrop-blur rounded-2xl p-4 shadow-xl border border-white/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Deficiency Risk Level</span>
          <Info className="w-3.5 h-3.5 text-gray-400" />
        </div>
        <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-orange-400 to-red-500 rounded-full mb-2" />
        <div className="flex justify-between text-[10px] font-bold text-gray-400">
          <span>Low</span>
          <span>Moderate</span>
          <span>High</span>
        </div>
      </div>
    </div>
  );
};

const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
);

export default MapContainer;
