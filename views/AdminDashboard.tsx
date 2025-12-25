import React, { useEffect, useState } from 'react';
import { StorageService } from '../services/storage';
import { Building, Users, Home, TrendingUp, DollarSign, BarChart3, PieChart } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    setStats(StorageService.getAnalytics());
  }, []);

  if (!stats) return (
    <div className="flex items-center justify-center min-h-[400px] text-gray-500">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
        <div className="text-sm">Loading analytics...</div>
      </div>
    </div>
  );

  // Calculate max value for relative sizing
  const maxListings = Math.max(...stats.listingsPerCollege.map((c: any) => c.count), 1);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#1F2933]">Admin Dashboard</h2>
          <p className="text-gray-500">Platform overview and performance metrics</p>
        </div>
        <div className="bg-white text-[#3F4C6B] px-4 py-2 rounded-full text-sm font-medium border border-gray-200 shadow-sm flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          System Status: Operational
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md hover:border-gray-200 group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-110 transition-transform">
              <Users size={22} />
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+12%</span>
          </div>
          <h3 className="text-3xl font-extrabold text-[#1F2933]">{stats.totalUsers}</h3>
          <p className="text-sm text-gray-500 font-medium">Total Registered Users</p>
          <div className="mt-4 flex gap-2">
             <div className="flex-1 bg-gray-50 rounded-lg p-2 text-center">
                <span className="block text-lg font-bold text-gray-700">{stats.totalStudents}</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wide">Students</span>
             </div>
             <div className="flex-1 bg-gray-50 rounded-lg p-2 text-center">
                <span className="block text-lg font-bold text-gray-700">{stats.totalOwners}</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wide">Owners</span>
             </div>
          </div>
        </div>

        {/* Listings */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md hover:border-gray-200 group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl group-hover:scale-110 transition-transform">
              <Home size={22} />
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+5%</span>
          </div>
          <h3 className="text-3xl font-extrabold text-[#1F2933]">{stats.totalListings}</h3>
          <p className="text-sm text-gray-500 font-medium">Active Properties</p>
          <div className="mt-4 pt-3 border-t border-gray-50 text-xs text-gray-400 flex items-center gap-1">
            <Building size={12} />
            Across {stats.listingsPerCollege.length} Colleges
          </div>
        </div>

        {/* Avg Rent */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md hover:border-gray-200 group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:scale-110 transition-transform">
              <DollarSign size={22} />
            </div>
          </div>
          <h3 className="text-3xl font-extrabold text-[#1F2933]">₹{stats.avgRent}</h3>
          <p className="text-sm text-gray-500 font-medium">Average Monthly Rent</p>
           <div className="mt-4 pt-3 border-t border-gray-50 text-xs text-gray-400">
            Based on current inventory
          </div>
        </div>

        {/* Occupancy / Growth (Mock) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md hover:border-gray-200 group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl group-hover:scale-110 transition-transform">
              <TrendingUp size={22} />
            </div>
             <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">High</span>
          </div>
          <h3 className="text-3xl font-extrabold text-[#1F2933]">94%</h3>
          <p className="text-sm text-gray-500 font-medium">Search Success Rate</p>
          <div className="mt-4 pt-3 border-t border-gray-50 text-xs text-gray-400">
            High student engagement
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart: Horizontal Bar Chart for College Distribution */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-[#1F2933] flex items-center gap-2">
                <BarChart3 size={20} className="text-[#3F4C6B]" />
                Listings by College
              </h3>
              <p className="text-sm text-gray-500">Distribution of properties across campuses</p>
            </div>
          </div>
          
          <div className="space-y-5">
            {stats.listingsPerCollege.map((item: any, idx: number) => {
              const percentage = (item.count / maxListings) * 100;
              return (
                <div key={idx} className="group">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm font-medium text-gray-700 group-hover:text-[#3F4C6B] transition-colors truncate max-w-[70%]">
                      {item.name}
                    </span>
                    <span className="text-sm font-bold text-gray-900 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                      {item.count}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div 
                      className="h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r from-[#3F4C6B] to-[#5a6b94] relative group/bar cursor-pointer"
                      style={{ width: `${percentage}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      
                      {/* Tooltip */}
                      <div className="absolute right-0 -top-10 translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-all duration-200 z-20 pointer-events-none">
                        <div className="bg-[#1F2933] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xl border border-gray-600 whitespace-nowrap">
                          {item.count} Listings
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1F2933]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Secondary Stats / Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-[#1F2933] mb-4 flex items-center gap-2">
              <PieChart size={20} className="text-[#F2A65A]" />
              Quick Analytics
            </h3>
            
            <div className="space-y-6">
               <div className="space-y-2">
                 <div className="flex justify-between text-sm">
                   <span className="text-gray-600">Avg. Distance from College</span>
                   <span className="font-semibold text-[#1F2933]">1.2 km</span>
                 </div>
                 <div className="w-full bg-gray-100 rounded-full h-1.5">
                   <div className="bg-[#F2A65A] h-1.5 rounded-full" style={{ width: '40%' }}></div>
                 </div>
               </div>

               <div className="space-y-2">
                 <div className="flex justify-between text-sm">
                   <span className="text-gray-600">Amenities Availability</span>
                   <span className="font-semibold text-[#1F2933]">85%</span>
                 </div>
                 <div className="w-full bg-gray-100 rounded-full h-1.5">
                   <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                 </div>
                 <p className="text-xs text-gray-400">Listings with 3+ facilities</p>
               </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
               <h4 className="text-sm font-semibold text-gray-900 mb-3">Top Facilities</h4>
               <div className="flex flex-wrap gap-2">
                 {['WiFi', 'Hot Water', 'Mess', 'CCTV'].map(tag => (
                   <span key={tag} className="px-3 py-1 bg-gray-50 text-gray-600 text-xs rounded-full border border-gray-200">
                     {tag}
                   </span>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};