import React, { useEffect, useState } from 'react';
import { StorageService } from '../services/storage';
import { Building, Users, Home, TrendingUp, DollarSign, MapPin } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    setStats(StorageService.getAnalytics());
  }, []);

  if (!stats) return <div>Loading analytics...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
          <p className="text-gray-500">Platform overview and analytics</p>
        </div>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium">
          System Status: Online
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <Users size={20} />
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">+12%</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900">{stats.totalUsers}</h3>
          <p className="text-sm text-gray-500">Total Users</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
              <Home size={20} />
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">+5%</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900">{stats.totalListings}</h3>
          <p className="text-sm text-gray-500">Active Listings</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-green-100 rounded-lg text-green-600">
              <DollarSign size={20} />
            </div>
            <span className="text-xs font-semibold text-gray-500">Avg</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900">₹{stats.avgRent}</h3>
          <p className="text-sm text-gray-500">Average Monthly Rent</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
              <Building size={20} />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-900">{stats.totalOwners}</h3>
          <p className="text-sm text-gray-500">Verified Owners</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Listings per College Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <MapPin size={18} className="text-gray-400" />
            Listings by College Area
          </h3>
          <div className="space-y-4">
            {stats.listingsPerCollege.map((item: any, idx: number) => {
              const percentage = stats.totalListings > 0 
                ? Math.round((item.count / stats.totalListings) * 100) 
                : 0;
              
              return (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">{item.name}</span>
                    <span className="text-gray-500">{item.count} Listings</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions / Recent Activity Placeholder */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp size={18} className="text-gray-400" />
            Platform Health
          </h3>
          <div className="space-y-4">
             <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
               <div className="flex justify-between items-center mb-1">
                 <span className="text-sm font-medium text-gray-900">Server Load</span>
                 <span className="text-xs font-bold text-green-600">Normal</span>
               </div>
               <div className="w-full bg-gray-200 rounded-full h-1.5">
                 <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '25%' }}></div>
               </div>
             </div>

             <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
               <div className="flex justify-between items-center mb-1">
                 <span className="text-sm font-medium text-gray-900">Storage Usage</span>
                 <span className="text-xs font-bold text-blue-600">45%</span>
               </div>
               <div className="w-full bg-gray-200 rounded-full h-1.5">
                 <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
               </div>
             </div>

             <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
               <div className="flex justify-between items-center mb-1">
                 <span className="text-sm font-medium text-gray-900">User Growth (MoM)</span>
                 <span className="text-xs font-bold text-purple-600">+18.5%</span>
               </div>
               <div className="w-full bg-gray-200 rounded-full h-1.5">
                 <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};