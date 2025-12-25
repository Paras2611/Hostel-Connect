import React, { useState, useEffect } from 'react';
import { COLLEGES } from '../constants';
import { Listing, FACILITIES_LIST, User } from '../types';
import { StorageService } from '../services/storage';
import { ListingCard } from '../components/ListingCard';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Plus, X } from 'lucide-react';

interface OwnerDashboardProps {
  user: User;
}

export const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ user }) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [showForm, setShowForm] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Partial<Listing>>({
    facilities: []
  });

  useEffect(() => {
    // Refresh listings
    setListings(StorageService.getListings());
  }, [showForm]); 

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this listing?')) {
      StorageService.deleteListing(id);
      setListings(StorageService.getListings());
    }
  };

  const handleFacilityToggle = (facility: string) => {
    setFormData(prev => {
      const current = prev.facilities || [];
      if (current.includes(facility)) {
        return { ...prev, facilities: current.filter(f => f !== facility) };
      } else {
        return { ...prev, facilities: [...current, facility] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.collegeId || !formData.rent) return;

    const newListing: Listing = {
      id: Date.now().toString(),
      ownerId: user.id,
      ownerName: user.name,
      title: formData.title!,
      collegeId: formData.collegeId!,
      distance: Number(formData.distance) || 0,
      rent: Number(formData.rent) || 0,
      facilities: formData.facilities || [],
      address: formData.address || '',
      contact: formData.contact || '',
      // No random image URL anymore
      createdAt: Date.now()
    };

    StorageService.addListing(newListing);
    setShowForm(false);
    setFormData({ facilities: [] });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Properties</h2>
          <p className="text-gray-500">Manage your hostel and PG listings</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2 shadow-lg shadow-blue-200">
          <Plus size={20} />
          Add Listing
        </Button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold">Add New Property</h3>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  label="Property Title" 
                  placeholder="e.g. Sunrise Boys Hostel" 
                  required 
                  value={formData.title || ''}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
                
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Near College</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                    value={formData.collegeId || ''}
                    onChange={e => setFormData({...formData, collegeId: e.target.value})}
                  >
                    <option value="">Select College</option>
                    {COLLEGES.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <Input 
                  label="Distance (km)" 
                  type="number" 
                  step="0.1" 
                  placeholder="0.5" 
                  required 
                  value={formData.distance || ''}
                  onChange={e => setFormData({...formData, distance: Number(e.target.value)})}
                />

                <Input 
                  label="Monthly Rent (₹)" 
                  type="number" 
                  placeholder="3500" 
                  required 
                  value={formData.rent || ''}
                  onChange={e => setFormData({...formData, rent: Number(e.target.value)})}
                />

                <Input 
                  label="Contact Number" 
                  type="tel" 
                  placeholder="9876543210" 
                  required 
                  value={formData.contact || ''}
                  onChange={e => setFormData({...formData, contact: e.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Full Address</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  rows={3}
                  required
                  value={formData.address || ''}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Facilities</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {FACILITIES_LIST.map(fac => (
                    <label key={fac} className="flex items-center gap-2 cursor-pointer p-2 border rounded-lg hover:bg-gray-50 transition-colors">
                      <input 
                        type="checkbox"
                        checked={(formData.facilities || []).includes(fac)}
                        onChange={() => handleFacilityToggle(fac)}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm">{fac}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <Button type="button" variant="secondary" className="flex-1" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  Post Listing
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map(listing => (
          <ListingCard 
            key={listing.id} 
            listing={listing} 
            collegeName={COLLEGES.find(c => c.id === listing.collegeId)?.name}
            isOwnerView={true}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};