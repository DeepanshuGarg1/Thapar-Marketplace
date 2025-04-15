
export type Category = 
  // Day Categories
  | 'books' 
  | 'electronics' 
  | 'bicycles' 
  | 'furniture' 
  | 'accessories'
  // Night Categories
  | 'snacks' 
  | 'chargers' 
  | 'stationery' 
  | 'notes' 
  | 'medicine';

export type ListingStatus = 'active' | 'pending' | 'sold' | 'reserved';

export type Location = 
  // Day Locations
  | 'library' 
  | 'canteen' 
  | 'hostel_lounge' 
  | 'academic_block'
  // Night Locations (Hostels)
  | 'hostel_j' 
  | 'hostel_k' 
  | 'hostel_l' 
  | 'hostel_m' 
  | 'hostel_n';

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: Category;
  images: string[];
  sellerId: string;
  sellerName: string;
  sellerReputation: number;
  createdAt: Date;
  updatedAt: Date;
  status: ListingStatus;
  location: Location;
  marketType: 'day' | 'night';
  barterEnabled: boolean;
  tags: string[];
}

export interface BarterOffer {
  id: string;
  listingId: string;
  buyerId: string;
  buyerName: string;
  offeredItems: {
    description: string;
    images: string[];
  }[];
  offeredMoney: number;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}
