import React from 'react';
import { User } from '../types';
import { LogOut, Home } from 'lucide-react';

interface NavbarProps {
  user: User;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  return (
    <nav className="bg-[#3F4C6B] border-b border-[#2E3954] sticky top-0 z-50 shadow-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="bg-[#F2A65A] p-1.5 rounded-lg">
              <Home className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-[#F8FAFC]">
              HostelConnect
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-[#F8FAFC]">{user.name}</p>
              <p className="text-xs text-gray-300 capitalize">{user.role}</p>
            </div>
            <button 
              onClick={onLogout}
              className="p-2 text-gray-300 hover:text-[#F2A65A] hover:bg-white/10 rounded-full transition-all"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};