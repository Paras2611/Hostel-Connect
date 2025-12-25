import { College, Listing } from './types';

export const COLLEGES: College[] = [
  { id: 'c1', name: 'Walwa College of Engineering', location: 'Walwa' },
  { id: 'c2', name: 'Sangli Institute of Technology', location: 'Vishrambag' },
  { id: 'c3', name: 'Krishna College', location: 'Islampur' },
  { id: 'c4', name: 'Government Polytechnic', location: 'Miraj' },
];

export const MOCK_LISTINGS: Listing[] = [
  {
    id: 'l1',
    ownerId: 'owner1',
    ownerName: 'Ramesh Patil',
    title: 'Sunrise Student Hostel',
    collegeId: 'c1',
    distance: 0.5,
    rent: 3500,
    facilities: ['WiFi', 'Hot Water', 'Mess'],
    address: 'Near Main Gate, Walwa Campus Road',
    contact: '9876543210',
    createdAt: Date.now()
  },
  {
    id: 'l2',
    ownerId: 'owner2',
    ownerName: 'Suresh Deshmukh',
    title: 'Green View PG',
    collegeId: 'c2',
    distance: 1.2,
    rent: 4500,
    facilities: ['WiFi', 'Parking', 'CCTV'],
    address: 'Plot 45, Vishrambag Society',
    contact: '9988776655',
    createdAt: Date.now() - 100000
  },
  {
    id: 'l3',
    ownerId: 'owner1',
    ownerName: 'Ramesh Patil',
    title: 'Budget Stay for Boys',
    collegeId: 'c3',
    distance: 2.5,
    rent: 2500,
    facilities: ['Power Backup'],
    address: 'Islampur Market Road',
    contact: '9876543210',
    createdAt: Date.now() - 200000
  }
];