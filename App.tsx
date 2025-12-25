import React, { useState, useEffect } from 'react';
import { User } from './types';
import { StorageService } from './services/storage';
import { Login } from './views/Login';
import { StudentDashboard } from './views/StudentDashboard';
import { OwnerDashboard } from './views/OwnerDashboard';
import { AdminDashboard } from './views/AdminDashboard';
import { Navbar } from './components/Navbar';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = StorageService.getUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
  };

  const handleLogout = () => {
    StorageService.logout();
    setUser(null);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20">
      <Navbar user={user} onLogout={handleLogout} />
      
      <main>
        {user.role === 'admin' && <AdminDashboard />}
        {user.role === 'student' && <StudentDashboard />}
        {user.role === 'owner' && <OwnerDashboard user={user} />}
      </main>
    </div>
  );
}

export default App;