
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ListingCard from '@/components/listings/ListingCard';
import { allListings } from '@/data/mockData';
import { Listing } from '@/models/Listing';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Sun, Moon, ArrowRight } from 'lucide-react';

const Homepage = () => {
  const { theme, isDayMarket, isNightMarket, currentTime } = useTheme();
  const { user } = useAuth();
  const [featuredListings, setFeaturedListings] = useState<Listing[]>([]);
  
  // Get current market type listings for featured section
  useEffect(() => {
    const marketType = isDayMarket ? 'day' : 'night';
    const filtered = allListings
      .filter(listing => listing.marketType === marketType)
      .sort(() => 0.5 - Math.random()) // Randomize
      .slice(0, 6); // Take first 6
    
    setFeaturedListings(filtered);
  }, [isDayMarket]);
  
  const heroSection = () => (
    <div className={`w-full py-12 px-4 ${isDayMarket ? 'bg-gradient-to-br from-white to-daymarket-100' : 'bg-gradient-to-br from-nightmarket-100 to-black'}`}>
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
        <motion.div 
          className="max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Thapar{' '}
            <span className={isDayMarket ? 'text-daymarket-500' : 'text-nightmarket-200'}>
              {isDayMarket ? 'DayMarket' : 'NightMarket'}
            </span>
          </h1>
          <p className="text-xl mb-6">
            {isDayMarket
              ? 'Browse, buy, and sell items across campus. Find textbooks, electronics, bicycles and more.'
              : 'Late-night essentials delivered to your hostel. Snacks, stationery, chargers, and more.'
            }
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/listings">
              <Button className="gap-2" size="lg">
                Browse Listings
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            {!user && (
              <Link to="/register">
                <Button variant="outline" className="gap-2" size="lg">
                  Sign Up
                </Button>
              </Link>
            )}
          </div>
        </motion.div>
        
        <motion.div 
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-spin-slow"></div>
            <div className="absolute inset-4 rounded-full bg-background flex items-center justify-center">
              {isDayMarket ? (
                <Sun className="h-24 w-24 text-daymarket-500" />
              ) : (
                <Moon className="h-24 w-24 text-nightmarket-200" />
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
  
  const featuredSection = () => (
    <div className="container mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">
          Featured Listings
        </h2>
        <Link to="/listings">
          <Button variant="ghost" className="gap-2">
            View All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredListings.slice(0, 6).map((listing) => (
          <motion.div
            key={listing.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: Math.random() * 0.3 }}
          >
            <ListingCard listing={listing} />
          </motion.div>
        ))}
      </div>
    </div>
  );
  
  const howItWorksSection = () => (
    <div className={`w-full py-12 px-4 ${isDayMarket ? 'bg-gray-50' : 'bg-nightmarket-100/20'}`}>
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          How It Works
        </h2>
        
        <Tabs defaultValue={isDayMarket ? "day" : "night"} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="day" className="gap-2">
              <Sun className="h-4 w-4" />
              DayMarket
            </TabsTrigger>
            <TabsTrigger value="night" className="gap-2">
              <Moon className="h-4 w-4" />
              NightMarket
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="day">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 bg-daymarket-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Create a Listing</h3>
                  <p className="text-muted-foreground">
                    List your items for sale or browse what others are offering across campus.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 bg-daymarket-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Arrange a Meeting</h3>
                  <p className="text-muted-foreground">
                    Chat with the seller and agree on a safe meeting spot on campus.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 bg-daymarket-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Complete the Exchange</h3>
                  <p className="text-muted-foreground">
                    Meet up, inspect the item, and complete your transaction safely.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="night">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 bg-nightmarket-200/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Check Hostel Listings</h3>
                  <p className="text-muted-foreground">
                    Browse late-night essentials available in your hostel zone.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 bg-nightmarket-200/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Request Delivery</h3>
                  <p className="text-muted-foreground">
                    Message the seller and request delivery to your hostel room.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 bg-nightmarket-200/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Rate Your Experience</h3>
                  <p className="text-muted-foreground">
                    Receive your items and rate the volunteer who delivered them.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen">
      {heroSection()}
      {featuredSection()}
      {howItWorksSection()}
    </div>
  );
};

export default Homepage;
