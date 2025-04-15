
import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import Layout from '@/components/layout/Layout';
import ListingCard from '@/components/listings/ListingCard';
import ListingFilters, { FilterState } from '@/components/listings/ListingFilters';
import { allListings } from '@/data/mockData';
import { Listing } from '@/models/Listing';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Listings = () => {
  const { isDayMarket } = useTheme();
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Initialize listings based on current market type
  useEffect(() => {
    setIsLoading(true);
    const marketType = isDayMarket ? 'day' : 'night';
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      const filtered = allListings.filter(listing => listing.marketType === marketType);
      setListings(filtered);
      setFilteredListings(filtered);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [isDayMarket]);
  
  // Handle filter changes
  const handleFilterChange = (filters: FilterState) => {
    let filtered = [...listings];
    
    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        listing => 
          listing.title.toLowerCase().includes(searchTerm) ||
          listing.description.toLowerCase().includes(searchTerm) ||
          listing.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    
    // Apply category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(listing => listing.category === filters.category);
    }
    
    // Apply location filter
    if (filters.location !== 'all') {
      filtered = filtered.filter(listing => listing.location === filters.location);
    }
    
    // Apply price range filter
    filtered = filtered.filter(
      listing => 
        listing.price >= filters.priceRange[0] && 
        listing.price <= filters.priceRange[1]
    );
    
    // Apply rating filter
    if (filters.minRating > 0) {
      filtered = filtered.filter(listing => listing.sellerReputation >= filters.minRating);
    }
    
    // Apply barter-only filter
    if (filters.barterOnly) {
      filtered = filtered.filter(listing => listing.barterEnabled);
    }
    
    setFilteredListings(filtered);
  };
  
  // Loading skeleton
  const renderSkeletons = () => {
    return Array(6).fill(0).map((_, index) => (
      <div key={index} className="rounded-lg overflow-hidden animate-pulse">
        <div className="bg-gray-300 aspect-square w-full"></div>
        <div className="p-4 space-y-3">
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-10 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>
    ));
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            {isDayMarket ? 'DayMarket' : 'NightMarket'} Listings
          </h1>
          <Link to="/create-listing">
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              New Listing
            </Button>
          </Link>
        </div>
        
        <ListingFilters onFilterChange={handleFilterChange} />
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {renderSkeletons()}
          </div>
        ) : filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredListings.map((listing, index) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ListingCard listing={listing} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold mb-2">No listings found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or check back later for new items
            </p>
            <Button onClick={() => handleFilterChange({
              search: '',
              category: 'all',
              location: 'all',
              priceRange: [0, 5000],
              minRating: 0,
              barterOnly: false,
            })}>
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Listings;
