import { College, Listing } from './types';

export const COLLEGES: College[] = [
  { id: 'c1', name: 'Rajarambapu Institute of Technology (RIT)', location: 'Islampur' },
  { id: 'c2', name: 'Karmveer Bhaurao Patil College', location: 'Islampur' },
  { id: 'c3', name: 'Kusumtai Rajarambapu Patil College', location: 'Islampur' },
  { id: 'c4', name: 'Yashwantrao Chavan College', location: 'Islampur' },
  { id: 'c5', name: 'Annasaheb Dange College', location: 'Islampur' },
  { id: 'c6', name: 'Prakash Medical College', location: 'Islampur' },
  { id: 'c7', name: 'Nanasaheb Mahdik College', location: 'Islampur' },
];

export const MOCK_LISTINGS: Listing[] = [
  {
    id: 'l1',
    ownerId: 'owner1',
    ownerName: 'Ramesh Patil',
    title: 'Sunrise Student Hostel',
    collegeId: 'c1', // RIT
    distance: 0.5,
    rent: 3500,
    facilities: ['WiFi', 'Hot Water', 'Mess'],
    address: 'Near RIT Main Gate, Rajaramnagar, Islampur',
    contact: '9876543210',
    createdAt: Date.now()
  },
  {
    id: 'l2',
    ownerId: 'owner2',
    ownerName: 'Suresh Deshmukh',
    title: 'Green View PG',
    collegeId: 'c5', // Annasaheb Dange
    distance: 1.2,
    rent: 4500,
    facilities: ['WiFi', 'Parking', 'CCTV'],
    address: 'Near Ashta Naka, Islampur',
    contact: '9988776655',
    createdAt: Date.now() - 100000
  },
  {
    id: 'l3',
    ownerId: 'owner1',
    ownerName: 'Ramesh Patil',
    title: 'Budget Stay for Boys',
    collegeId: 'c2', // KBP
    distance: 0.8,
    rent: 2500,
    facilities: ['Power Backup'],
    address: 'Kacheri Road, Near KBP College, Islampur',
    contact: '9876543210',
    createdAt: Date.now() - 200000
  }
];