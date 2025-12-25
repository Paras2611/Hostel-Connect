import React, { useState } from 'react';
import { UserRole } from '../types';
import { StorageService } from '../services/storage';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { UserCircle2, Building2, Lock, Mail, Home, ShieldCheck } from 'lucide-react';

interface LoginProps {
  onLogin: (user: any) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [role, setRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      // Simulate login with error handling
      const user = StorageService.login(email, password, role);
      onLogin(user);
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  const getRoleDescription = () => {
    switch(role) {
      case 'student': return 'Find your perfect home away from home';
      case 'owner': return 'Manage your properties and find tenants';
      case 'admin': return 'System administration access';
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-50 animate-gradient-xy -z-10"></div>
      
      <style>{`
        @keyframes gradient-xy {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
        .animate-gradient-xy {
          background-size: 200% 200%;
          animation: gradient-xy 15s ease infinite;
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>

      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center animate-float">
          <div className="bg-[#3F4C6B] p-4 rounded-2xl mb-4 shadow-xl shadow-blue-900/10 transform rotate-3">
            <Home className="text-[#F2A65A] w-10 h-10 -rotate-3" strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl font-extrabold text-[#1F2933] tracking-tight mb-2">HostelConnect</h1>
          <p className="text-gray-500 font-medium">Islampur's Best Accommodation Finder</p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-8 space-y-8">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-[#1F2933]">Welcome Back</h2>
            <p className="text-sm text-gray-500">{getRoleDescription()}</p>
          </div>

          {/* Role Toggle */}
          <div className="grid grid-cols-3 gap-2 p-1.5 bg-gray-100/80 rounded-2xl">
            {(['student', 'owner', 'admin'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                type="button"
                className={`flex flex-col sm:flex-row items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  role === r 
                    ? 'bg-white text-[#3F4C6B] shadow-sm ring-1 ring-black/5 scale-[1.02]' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                }`}
              >
                {r === 'student' && <UserCircle2 size={18} />}
                {r === 'owner' && <Building2 size={18} />}
                {r === 'admin' && <ShieldCheck size={18} />}
                <span className="capitalize">{r}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              <div className="relative group">
                <Mail className="absolute left-3.5 top-[38px] text-gray-400 group-focus-within:text-[#3F4C6B] transition-colors" size={18} />
                <Input 
                  label="Email Address" 
                  placeholder="name@example.com" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 py-3 bg-gray-50/50 focus:bg-white transition-all border-gray-200 focus:ring-[#3F4C6B] focus:border-[#3F4C6B]"
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-3.5 top-[38px] text-gray-400 group-focus-within:text-[#3F4C6B] transition-colors" size={18} />
                <Input 
                  label="Password" 
                  placeholder="Enter your password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 py-3 bg-gray-50/50 focus:bg-white transition-all border-gray-200 focus:ring-[#3F4C6B] focus:border-[#3F4C6B]"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium text-center border border-red-100 animate-pulse">
                {error}
              </div>
            )}
            
            <Button 
              type="submit" 
              variant="cta" 
              className="w-full shadow-lg shadow-orange-200 hover:shadow-orange-300 transform active:scale-[0.98] transition-all py-3 text-lg" 
              size="lg"
            >
              Sign In
            </Button>
          </form>

          <div className="text-center space-y-3 pt-6 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Demo Credentials</p>
            <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-500 flex flex-col gap-1.5 border border-gray-100">
               <div className="flex justify-between">
                 <span>Student/Owner:</span>
                 <span className="font-mono text-gray-700">Any Email</span>
               </div>
               <div className="flex justify-between">
                 <span>Admin:</span>
                 <span className="font-mono text-gray-700">admin@hostel.com / admin123</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};