
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import MapContainer from './components/MapContainer';
import Sidebar from './components/Sidebar';
import { EUROPE_COUNTRIES } from './constants';
import { CountryData, UserProfile } from './types';

const App: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<CountryData>(EUROPE_COUNTRIES[0]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCountries = useMemo(() => {
    return EUROPE_COUNTRIES.filter(country => 
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleSelectCountry = (country: CountryData) => {
    setSelectedCountry(country);
  };

  const handleProfileUpdate = (profile: UserProfile) => {
    setUserProfile(profile);
  };

  // Automatically select and pan to the country if a single exact-ish match is found via search
  useEffect(() => {
    if (searchTerm && filteredCountries.length === 1) {
      setSelectedCountry(filteredCountries[0]);
    }
  }, [filteredCountries, searchTerm]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white text-gray-900">
      <Header 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />
      
      <main className="flex flex-1 relative overflow-hidden flex-col md:flex-row">
        <MapContainer 
          selectedCountry={selectedCountry} 
          onSelectCountry={handleSelectCountry}
          filteredCountries={filteredCountries}
          searchTerm={searchTerm}
        />
        
        <Sidebar 
          selectedCountry={selectedCountry}
          onProfileChange={handleProfileUpdate}
        />
      </main>

      {/* Mobile Footer Toggle (Simulated) */}
      <div className="md:hidden h-16 bg-white border-t border-gray-200 flex items-center justify-center font-bold text-emerald-600">
        Personalize Your Calculation
      </div>
    </div>
  );
};

export default App;
