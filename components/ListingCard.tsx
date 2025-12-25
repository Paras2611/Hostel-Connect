import React from 'react';
import { Listing } from '../types';
import { Button } from './Button';
import { MapPin, Phone, User, Building, Wifi, Droplets, Utensils, Zap, Video, Wind, Home } from 'lucide-react';

interface ListingCardProps {
  listing: Listing;
  collegeName?: string;
  isOwnerView?: boolean;
  onDelete?: (id: string) => void;
}

const getFacilityIcon = (name: string) => {
  const normalized = name.toLowerCase();
  if (normalized.includes('wifi')) return <Wifi size={14} />;
  if (normalized.includes('water')) return <Droplets size={14} />;
  if (normalized.includes('food') || normalized.includes('mess')) return <Utensils size={14} />;
  if (normalized.includes('power')) return <Zap size={14} />;
  if (normalized.includes('cctv')) return <Video size={14} />;
  if (normalized.includes('ac')) return <Wind size={14} />;
  return <Building size={14} />;
};

export const ListingCard: React.FC<ListingCardProps> = ({ 
  listing, 
  collegeName, 
  isOwnerView = false,
  onDelete
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      {/* Replaced Random Image with Professional Placeholder */}
      <div className="h-40 w-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center relative">
        <div className="text-blue-200">
          <Home size={64} strokeWidth={1} />
        </div>
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-semibold text-gray-700 shadow-sm border border-gray-100">
          {listing.distance} km from College
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold text-gray-900 leading-tight">{listing.title}</h3>
            {collegeName && <p className="text-xs text-blue-600 font-medium mt-1">{collegeName}</p>}
          </div>
          <span className="bg-green-100 text-green-800 text-sm font-bold px-2 py-1 rounded">
            ₹{listing.rent}/mo
          </span>
        </div>

        <div className="flex items-start gap-2 text-gray-600 text-sm mb-3">
          <MapPin size={16} className="mt-0.5 shrink-0" />
          <p className="line-clamp-2">{listing.address}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {listing.facilities.map((fac, idx) => (
            <span key={idx} className="inline-flex items-center gap-1 bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded border border-gray-200">
              {getFacilityIcon(fac)}
              {fac}
            </span>
          ))}
        </div>

        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <User size={16} />
            </div>
            <div>
              <p className="text-xs text-gray-500">Owner</p>
              <p className="text-sm font-medium text-gray-900">{listing.ownerName}</p>
            </div>
          </div>
          
          {isOwnerView ? (
            <Button 
              variant="danger" 
              size="sm" 
              onClick={() => onDelete?.(listing.id)}
            >
              Delete
            </Button>
          ) : (
            <a 
              href={`tel:${listing.contact}`} 
              className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Phone size={16} />
              Call
            </a>
          )}
        </div>
      </div>
    </div>
  );
};