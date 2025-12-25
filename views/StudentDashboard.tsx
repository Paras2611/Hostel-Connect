import React, { useState, useEffect } from 'react';
import { COLLEGES } from '../constants';
import { Listing } from '../types';
import { StorageService } from '../services/storage';
import { ListingCard } from '../components/ListingCard';
import { Filter, Search } from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [selectedCollege, setSelectedCollege] = useState<string>('');
  const [maxDistance, setMaxDistance] = useState<number>(5);
  const [maxRent, setMaxRent] = useState<number>(10000);

  useEffect(() => {
    setListings(StorageService.getListings());
  }, []);

  const filteredListings = listings.filter(l => {
    if (selectedCollege && l.collegeId !== selectedCollege) return false;
    if (l.distance > maxDistance) return false;
    if (l.rent > maxRent) return false;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      
      {/* Search Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Search className="text-blue-600" size={24} />
          Find Accommodation
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Select College</label>
            <select 
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
            >
              <option value="">All Colleges</option>
              {COLLEGES.map(c => (
                <option key={c.id} value={c.id}>{c.name} - {c.location}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <label className="font-medium text-gray-700">Distance</label>
              <span className="text-blue-600 font-semibold">&lt; {maxDistance} km</span>
            </div>
            <input 
              type="range" 
              min="0.5" 
              max="10" 
              step="0.5"
              value={maxDistance}
              onChange={(e) => setMaxDistance(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>0.5km</span>
              <span>10km</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <label className="font-medium text-gray-700">Max Rent</label>
              <span className="text-blue-600 font-semibold">₹{maxRent}</span>
            </div>
            <input 
              type="range" 
              min="1000" 
              max="20000" 
              step="500"
              value={maxRent}
              onChange={(e) => setMaxRent(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>₹1k</span>
              <span>₹20k</span>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {filteredListings.length} Result{filteredListings.length !== 1 ? 's' : ''} Found
          </h3>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Filter size={16} />
            <span>Sorted by relevance</span>
          </div>
        </div>

        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map(listing => (
              <ListingCard 
                key={listing.id} 
                listing={listing} 
                collegeName={COLLEGES.find(c => c.id === listing.collegeId)?.name}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500">No PGs found matching your criteria.</p>
            <button 
              onClick={() => {
                setSelectedCollege('');
                setMaxDistance(10);
                setMaxRent(20000);
              }}
              className="text-blue-600 font-medium mt-2 hover:underline"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};