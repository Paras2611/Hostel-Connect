import React, { useState } from 'react';
import { UserRole } from '../types';
import { StorageService } from '../services/storage';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { UserCircle2, Building2, Lock, Mail } from 'lucide-react';

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
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }
    
    // Simulate login
    const user = StorageService.login(email, password, role);
    onLogin(user);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">HostelConnect</h1>
          <p className="text-gray-500">Login to your account</p>
        </div>

        {/* Role Toggle */}
        <div className="grid grid-cols-2 gap-4 p-1 bg-gray-100 rounded-xl">
          <button
            onClick={() => setRole('student')}
            type="button"
            className={`flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all ${
              role === 'student' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <UserCircle2 size={18} />
            Student
          </button>
          <button
            onClick={() => setRole('owner')}
            type="button"
            className={`flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all ${
              role === 'owner' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Building2 size={18} />
            Owner
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-9 text-gray-400" size={18} />
            <Input 
              label="Email Address" 
              placeholder="name@example.com" 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-9 text-gray-400" size={18} />
            <Input 
              label="Password" 
              placeholder="Enter your password" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pl-10"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <Button type="submit" className="w-full" size="lg">
            Login
          </Button>
        </form>

        <div className="text-center space-y-2 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 font-medium">Demo Credentials</p>
          <div className="flex justify-center gap-4 text-xs text-gray-400">
            <span>Any Email / Pass for Users</span>
            <span>admin@hostel.com / admin123</span>
          </div>
        </div>
      </div>
    </div>
  );
};