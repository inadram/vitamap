
import React from 'react';
import { Search } from 'lucide-react';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-50">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">V</div>
          <span className="text-xl font-bold text-gray-800">Interactive Vitamin Map</span>
          <span className="text-gray-400 mx-2">|</span>
          <span className="text-gray-500">Europe Region</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-500">
          <a href="#" className="text-emerald-600 border-b-2 border-emerald-600 h-16 flex items-center">Dashboard</a>
          <a href="#" className="hover:text-emerald-600 h-16 flex items-center transition-colors">My Health Profile</a>
          <a href="#" className="hover:text-emerald-600 h-16 flex items-center transition-colors">Settings</a>
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search country..." 
            className="pl-10 pr-4 py-2 bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent rounded-lg text-sm transition-all w-64 outline-none"
          />
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <img src="https://picsum.photos/seed/user123/40/40" className="w-8 h-8 rounded-full border border-gray-200" alt="Avatar" />
        </button>
      </div>
    </header>
  );
};

export default Header;
