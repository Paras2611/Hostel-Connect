import { Listing, User, UserRole } from '../types';
import { MOCK_LISTINGS, COLLEGES } from '../constants';

const KEYS = {
  USER: 'hostel_connect_user',
  LISTINGS: 'hostel_connect_listings'
};

export const StorageService = {
  getUser: (): User | null => {
    const data = localStorage.getItem(KEYS.USER);
    return data ? JSON.parse(data) : null;
  },

  login: (email: string, password: string, role: UserRole): User => {
    // 1. Strict check if user selects Admin role
    if (role === 'admin') {
      if (email === 'admin@hostel.com' && password === 'admin123') {
        const adminUser: User = {
          id: 'admin_1',
          name: 'Administrator',
          email: email,
          role: 'admin'
        };
        localStorage.setItem(KEYS.USER, JSON.stringify(adminUser));
        return adminUser;
      } else {
        throw new Error("Invalid credentials for Admin. Please use admin@hostel.com");
      }
    }

    // 2. Global check for admin credentials (convenience if they enter admin creds but selected another role)
    if (email === 'admin@hostel.com' && password === 'admin123') {
      const adminUser: User = {
        id: 'admin_1',
        name: 'Administrator',
        email: email,
        role: 'admin'
      };
      localStorage.setItem(KEYS.USER, JSON.stringify(adminUser));
      return adminUser;
    }

    // 3. Simulation for Students/Owners (Accept any password for demo)
    const name = email.split('@')[0];
    const user: User = {
      id: role === 'owner' ? `owner_${Date.now()}` : `student_${Date.now()}`,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email: email,
      role
    };
    localStorage.setItem(KEYS.USER, JSON.stringify(user));
    return user;
  },

  logout: () => {
    localStorage.removeItem(KEYS.USER);
  },

  getListings: (): Listing[] => {
    const data = localStorage.getItem(KEYS.LISTINGS);
    if (!data) {
      localStorage.setItem(KEYS.LISTINGS, JSON.stringify(MOCK_LISTINGS));
      return MOCK_LISTINGS;
    }
    return JSON.parse(data);
  },

  addListing: (listing: Listing) => {
    const listings = StorageService.getListings();
    listings.unshift(listing);
    localStorage.setItem(KEYS.LISTINGS, JSON.stringify(listings));
  },

  updateListing: (updatedListing: Listing) => {
    const listings = StorageService.getListings();
    const index = listings.findIndex(l => l.id === updatedListing.id);
    if (index !== -1) {
      listings[index] = updatedListing;
      localStorage.setItem(KEYS.LISTINGS, JSON.stringify(listings));
    }
  },

  deleteListing: (id: string) => {
    const listings = StorageService.getListings();
    const updated = listings.filter(l => l.id !== id);
    localStorage.setItem(KEYS.LISTINGS, JSON.stringify(updated));
  },

  getAnalytics: () => {
    const listings = StorageService.getListings();
    const totalListings = listings.length;
    
    // Calculate College distribution
    const listingsPerCollege = COLLEGES.map(college => {
      return {
        name: college.name,
        count: listings.filter(l => l.collegeId === college.id).length
      };
    });

    const totalRent = listings.reduce((sum, l) => sum + l.rent, 0);
    const avgRent = totalListings > 0 ? Math.round(totalRent / totalListings) : 0;

    return {
      totalUsers: 145, // Mocked total users for analytics demo
      totalStudents: 120, // Mocked
      totalOwners: 25, // Mocked
      totalListings,
      listingsPerCollege,
      avgRent
    };
  }
};