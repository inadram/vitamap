
import React, { useState } from 'react';
import { Calendar, ChevronRight, Info, Loader2 } from 'lucide-react';
import { SKIN_TYPES } from '../constants';
import { UserProfile, CountryData } from '../types';
import { getHealthInsight } from '../services/geminiService';

interface SidebarProps {
  selectedCountry: CountryData;
  onProfileChange: (profile: UserProfile) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedCountry, onProfileChange }) => {
  const [profile, setProfile] = useState<UserProfile>({
    age: '',
    sex: 'Female',
    skinType: '3'
  });
  const [calculating, setCalculating] = useState(false);
  const [insight, setInsight] = useState<string | null>(null);

  const handleCalculate = async () => {
    if (!profile.age) return;
    setCalculating(true);
    const result = await getHealthInsight(profile, selectedCountry);
    setInsight(result);
    setCalculating(false);
    onProfileChange(profile);
  };

  return (
    <aside className="w-full md:w-[400px] h-full bg-white border-l border-gray-200 flex flex-col p-8 overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Personalized Check</h2>
      <p className="text-gray-500 text-sm mb-8">
        Calculate your estimated Vitamin D needs based on your profile and selected location.
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="number" 
              value={profile.age}
              onChange={(e) => setProfile(p => ({ ...p, age: e.target.value }))}
              placeholder="e.g. 30"
              className="w-full pl-10 pr-4 py-3 bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500 rounded-xl text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Biological Sex</label>
          <div className="flex p-1 bg-gray-100 rounded-xl">
            <button 
              onClick={() => setProfile(p => ({ ...p, sex: 'Female' }))}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${profile.sex === 'Female' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500'}`}
            >
              Female
            </button>
            <button 
              onClick={() => setProfile(p => ({ ...p, sex: 'Male' }))}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${profile.sex === 'Male' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500'}`}
            >
              Male
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Skin Type</label>
          <select 
            value={profile.skinType}
            onChange={(e) => setProfile(p => ({ ...p, skinType: e.target.value }))}
            className="w-full px-4 py-3 bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500 rounded-xl text-sm appearance-none cursor-pointer"
          >
            {SKIN_TYPES.map(type => (
              <option key={type.id} value={type.id}>{type.label}</option>
            ))}
          </select>
        </div>

        <button 
          onClick={handleCalculate}
          disabled={!profile.age || calculating}
          className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          {calculating ? <Loader2 className="w-5 h-5 animate-spin" /> : <><span>Calculate Intake</span> <ChevronRight className="w-5 h-5" /></>}
        </button>
      </div>

      {insight && (
        <div className="mt-8 p-6 bg-emerald-50 rounded-2xl border border-emerald-100 relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Estimated Need</p>
              <h3 className="text-3xl font-bold text-gray-900">600-800 <span className="text-lg font-medium text-gray-500">IU</span></h3>
            </div>
            <span className="px-2 py-1 bg-white text-[10px] font-bold text-gray-600 rounded-md shadow-sm">Daily</span>
          </div>
          
          <div className="h-2 bg-gray-200 rounded-full mb-4">
            <div className="h-full bg-emerald-500 rounded-full w-[70%]" />
          </div>

          <p className="text-sm text-gray-600 leading-relaxed italic">
            "{insight}"
          </p>
          
          <div className="mt-4 pt-4 border-t border-emerald-100 flex items-start space-x-2">
            <Info className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
            <p className="text-[11px] text-emerald-700">Based on winter conditions in {selectedCountry.name}. Consider supplements from October to March.</p>
          </div>
        </div>
      )}

      <div className="mt-auto pt-6 text-center">
        <a href="#" className="text-xs text-gray-400 underline decoration-gray-300">View Methodology & Sources</a>
      </div>
    </aside>
  );
};

export default Sidebar;
