
import { Listing, BarterOffer } from '../models/Listing';

// Generate a random ID
const generateId = () => Math.random().toString(36).substring(2, 9);

// Helper function to get random items from an array
const getRandomItems = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Mock listing images
const bookImages = [
  'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=2787&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2798&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=2730&auto=format&fit=crop',
];

const electronicsImages = [
  'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?q=80&w=2880&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=2864&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=2864&auto=format&fit=crop',
];

const furnitureImages = [
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2940&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=2874&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=2880&auto=format&fit=crop',
];

const bicycleImages = [
  'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=2940&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?q=80&w=2948&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517949908114-71669a64d885?q=80&w=2940&auto=format&fit=crop',
];

const accessoriesImages = [
  'https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?q=80&w=2874&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1575223970966-76ae61ee7838?q=80&w=2940&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1642033658524-1aa550bea53a?q=80&w=2874&auto=format&fit=crop',
];

const snacksImages = [
  'https://images.unsplash.com/photo-1612559473746-c7d8896d4e32?q=80&w=2944&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?q=80&w=2942&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1607958996333-41215c10d088?q=80&w=2940&auto=format&fit=crop',
];

const chargersImages = [
  'https://images.unsplash.com/photo-1583863032927-a810fa7db3a2?q=80&w=2940&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1601752835158-fc0c86e73471?q=80&w=2940&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1588599376442-3cbf9c67449e?q=80&w=2931&auto=format&fit=crop',
];

const stationeryImages = [
  'https://images.unsplash.com/photo-1565010505224-382cdb214b4c?q=80&w=2940&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1553413077-190c9d3b6691?q=80&w=2940&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1583160247711-5f0e76357f5f?q=80&w=2842&auto=format&fit=crop',
];

const notesImages = [
  'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2940&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2940&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2874&auto=format&fit=crop',
];

const medicineImages = [
  'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2940&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1626498247255-97959f924de7?q=80&w=2940&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1599493758267-c6c884c7071f?q=80&w=2804&auto=format&fit=crop',
];

// Mock seller data
const sellers = [
  { id: '1', name: 'Arjun Singh', reputation: 4.8 },
  { id: '2', name: 'Priya Sharma', reputation: 4.9 },
  { id: '3', name: 'Ravi Kumar', reputation: 4.7 },
  { id: '4', name: 'Neha Gupta', reputation: 4.5 },
  { id: '5', name: 'Vikram Patel', reputation: 4.6 },
];

// Mock day listings
export const dayListings: Listing[] = [
  // Books
  {
    id: generateId(),
    title: 'Data Structures & Algorithms Textbook',
    description: 'Excellent condition, slight highlighting in first 3 chapters. CS 301 textbook, 4th edition.',
    price: 450,
    category: 'books',
    images: getRandomItems(bookImages, 2),
    sellerId: sellers[0].id,
    sellerName: sellers[0].name,
    sellerReputation: sellers[0].reputation,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    status: 'active',
    location: 'library',
    marketType: 'day',
    barterEnabled: true,
    tags: ['textbook', 'computer science', 'DSA'],
  },
  {
    id: generateId(),
    title: 'Engineering Mathematics Set (4 books)',
    description: 'Complete set of engineering mathematics books from semesters 1-4. Good condition, no markings.',
    price: 600,
    category: 'books',
    images: getRandomItems(bookImages, 1),
    sellerId: sellers[1].id,
    sellerName: sellers[1].name,
    sellerReputation: sellers[1].reputation,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    status: 'active',
    location: 'academic_block',
    marketType: 'day',
    barterEnabled: false,
    tags: ['mathematics', 'textbook', 'engineering'],
  },

  // Electronics
  {
    id: generateId(),
    title: 'Barely Used Scientific Calculator',
    description: 'Casio FX-991EX, all functions working perfectly. Includes case and manual.',
    price: 750,
    category: 'electronics',
    images: getRandomItems(electronicsImages, 2),
    sellerId: sellers[2].id,
    sellerName: sellers[2].name,
    sellerReputation: sellers[2].reputation,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    status: 'active',
    location: 'canteen',
    marketType: 'day',
    barterEnabled: true,
    tags: ['calculator', 'casio', 'engineering'],
  },
  {
    id: generateId(),
    title: 'Laptop Cooling Pad',
    description: 'Dual fan cooling pad with adjustable height, USB powered, fits up to 15" laptops.',
    price: 350,
    category: 'electronics',
    images: getRandomItems(electronicsImages, 1),
    sellerId: sellers[3].id,
    sellerName: sellers[3].name,
    sellerReputation: sellers[3].reputation,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // 1 day ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
    status: 'active',
    location: 'hostel_lounge',
    marketType: 'day',
    barterEnabled: false,
    tags: ['laptop', 'cooling', 'accessories'],
  },

  // Bicycles
  {
    id: generateId(),
    title: 'Mountain Bike - Perfect for Campus',
    description: 'Hero Ranger MTB, 21 gears, recently serviced, excellent condition. Includes lock.',
    price: 3500,
    category: 'bicycles',
    images: getRandomItems(bicycleImages, 2),
    sellerId: sellers[4].id,
    sellerName: sellers[4].name,
    sellerReputation: sellers[4].reputation,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6), // Updated 6 days ago
    status: 'active',
    location: 'hostel_lounge',
    marketType: 'day',
    barterEnabled: true,
    tags: ['bike', 'cycle', 'transportation'],
  },

  // Furniture
  {
    id: generateId(),
    title: 'Foldable Study Table',
    description: 'Compact wooden study table, foldable for easy storage. Barely used, no scratches.',
    price: 800,
    category: 'furniture',
    images: getRandomItems(furnitureImages, 2),
    sellerId: sellers[0].id,
    sellerName: sellers[0].name,
    sellerReputation: sellers[0].reputation,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // 4 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
    status: 'active',
    location: 'hostel_lounge',
    marketType: 'day',
    barterEnabled: false,
    tags: ['furniture', 'study', 'table'],
  },
  {
    id: generateId(),
    title: 'Comfortable Bean Bag',
    description: 'Large grey bean bag, refilled recently, washable cover, very comfortable for studying.',
    price: 650,
    category: 'furniture',
    images: getRandomItems(furnitureImages, 1),
    sellerId: sellers[1].id,
    sellerName: sellers[1].name,
    sellerReputation: sellers[1].reputation,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    status: 'active',
    location: 'hostel_lounge',
    marketType: 'day',
    barterEnabled: true,
    tags: ['furniture', 'bean bag', 'comfort'],
  },

  // Accessories
  {
    id: generateId(),
    title: 'Wireless Earbuds',
    description: 'TWS earbuds with charging case, 20hr battery life, water resistant, excellent sound quality.',
    price: 1200,
    category: 'accessories',
    images: getRandomItems(accessoriesImages, 2),
    sellerId: sellers[2].id,
    sellerName: sellers[2].name,
    sellerReputation: sellers[2].reputation,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    status: 'active',
    location: 'canteen',
    marketType: 'day',
    barterEnabled: false,
    tags: ['electronics', 'audio', 'music'],
  },
];

// Mock night listings
export const nightListings: Listing[] = [
  // Snacks
  {
    id: generateId(),
    title: 'Instant Noodles Pack (6 Count)',
    description: 'Assorted flavors, expiring in 6 months. Quick midnight snack!',
    price: 150,
    category: 'snacks',
    images: getRandomItems(snacksImages, 1),
    sellerId: sellers[0].id,
    sellerName: sellers[0].name,
    sellerReputation: sellers[0].reputation,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
    status: 'active',
    location: 'hostel_j',
    marketType: 'night',
    barterEnabled: true,
    tags: ['food', 'instant', 'noodles'],
  },
  {
    id: generateId(),
    title: 'Variety Chips & Snacks Bundle',
    description: 'Mix of chips, biscuits, and chocolate. Perfect for exam nights!',
    price: 220,
    category: 'snacks',
    images: getRandomItems(snacksImages, 2),
    sellerId: sellers[1].id,
    sellerName: sellers[1].name,
    sellerReputation: sellers[1].reputation,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    status: 'active',
    location: 'hostel_k',
    marketType: 'night',
    barterEnabled: false,
    tags: ['food', 'chips', 'chocolate'],
  },

  // Chargers
  {
    id: generateId(),
    title: 'Fast Charging Cable (Type-C)',
    description: 'Brand new 1.5m cable with 60W fast charging support. Works with all Type-C devices.',
    price: 180,
    category: 'chargers',
    images: getRandomItems(chargersImages, 1),
    sellerId: sellers[2].id,
    sellerName: sellers[2].name,
    sellerReputation: sellers[2].reputation,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 8),
    status: 'active',
    location: 'hostel_l',
    marketType: 'night',
    barterEnabled: true,
    tags: ['electronics', 'charging', 'cable'],
  },
  {
    id: generateId(),
    title: 'Universal Power Bank 10000mAh',
    description: 'Reliable power bank with dual output, charges phones up to 3 times. Used but works perfectly.',
    price: 450,
    category: 'chargers',
    images: getRandomItems(chargersImages, 2),
    sellerId: sellers[3].id,
    sellerName: sellers[3].name,
    sellerReputation: sellers[3].reputation,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
    status: 'active',
    location: 'hostel_m',
    marketType: 'night',
    barterEnabled: false,
    tags: ['electronics', 'power bank', 'charging'],
  },

  // Stationery
  {
    id: generateId(),
    title: 'Complete Stationery Pack',
    description: 'Everything you need: pens, pencils, highlighters, sticky notes, and more.',
    price: 250,
    category: 'stationery',
    images: getRandomItems(stationeryImages, 2),
    sellerId: sellers[4].id,
    sellerName: sellers[4].name,
    sellerReputation: sellers[4].reputation,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 24 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    status: 'active',
    location: 'hostel_n',
    marketType: 'night',
    barterEnabled: true,
    tags: ['stationery', 'pens', 'study'],
  },

  // Notes
  {
    id: generateId(),
    title: 'Operating Systems Handwritten Notes',
    description: 'Detailed notes for CS 305, covers entire syllabus with diagrams. Helped me score A+.',
    price: 150,
    category: 'notes',
    images: getRandomItems(notesImages, 1),
    sellerId: sellers[0].id,
    sellerName: sellers[0].name,
    sellerReputation: sellers[0].reputation,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
    status: 'active',
    location: 'hostel_j',
    marketType: 'night',
    barterEnabled: false,
    tags: ['notes', 'CS', 'operating systems'],
  },
  {
    id: generateId(),
    title: 'Circuit Theory Previous Year Questions',
    description: 'Collection of last 5 years questions with solutions. Very helpful for exam preparation.',
    price: 120,
    category: 'notes',
    images: getRandomItems(notesImages, 2),
    sellerId: sellers[1].id,
    sellerName: sellers[1].name,
    sellerReputation: sellers[1].reputation,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 9), // 9 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 9),
    status: 'active',
    location: 'hostel_k',
    marketType: 'night',
    barterEnabled: true,
    tags: ['notes', 'circuit theory', 'electrical'],
  },

  // Medicine
  {
    id: generateId(),
    title: 'Basic Cold & Fever Medicines',
    description: 'Assorted tablets for cold, fever, and headache. All within expiry dates.',
    price: 100,
    category: 'medicine',
    images: getRandomItems(medicineImages, 1),
    sellerId: sellers[2].id,
    sellerName: sellers[2].name,
    sellerReputation: sellers[2].reputation,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
    status: 'active',
    location: 'hostel_l',
    marketType: 'night',
    barterEnabled: false,
    tags: ['medicine', 'cold', 'fever'],
  },
];

// Combine all listings
export const allListings = [...dayListings, ...nightListings];

// Mock barter offers
export const barterOffers: BarterOffer[] = [
  {
    id: generateId(),
    listingId: dayListings[0].id,
    buyerId: '6',
    buyerName: 'Amit Sharma',
    offeredItems: [
      {
        description: 'Machine Learning textbook in excellent condition',
        images: getRandomItems(bookImages, 1),
      },
    ],
    offeredMoney: 200,
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
  },
  {
    id: generateId(),
    listingId: dayListings[4].id,
    buyerId: '7',
    buyerName: 'Meera Patel',
    offeredItems: [
      {
        description: 'Small folding chair, good condition',
        images: getRandomItems(furnitureImages, 1),
      },
      {
        description: 'Study lamp with adjustable brightness',
        images: [],
      },
    ],
    offeredMoney: 0,
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
];
