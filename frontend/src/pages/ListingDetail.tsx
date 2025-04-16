
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { allListings } from '@/data/mockData';
import { Listing } from '@/models/Listing';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  MapPin,
  Star,
  MessageSquare,
  Share,
  Flag,
  ChevronLeft,
  BarChart,
  ArrowLeftRight,
  User,
  Calendar,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';

const ListingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [listing, setListing] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  useEffect(() => {
    const fetchListing = () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const found = allListings.find(l => l.id === id);
        if (found) {
          setListing(found);
        }
        setIsLoading(false);
      }, 500);
    };
    
    fetchListing();
  }, [id]);
  
  const handleContactSeller = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to contact the seller",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    // In a real app, this would open a chat or redirect to messages
    toast({
      title: "Message sent!",
      description: "You've initiated a conversation with the seller",
    });
    
    navigate('/messages');
  };
  
  const handleBarterOffer = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to make a barter offer",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    navigate(`/barter?listingId=${id}`);
  };
  
  const handleShareListing = () => {
    // In a real app, this would show a share modal or copy to clipboard
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Listing URL copied to clipboard",
    });
  };
  
  // Loading state
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-300 rounded w-1/3"></div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2">
                <div className="bg-gray-300 aspect-square rounded-lg"></div>
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <div className="h-10 bg-gray-300 rounded"></div>
                <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="h-32 bg-gray-300 rounded"></div>
                <div className="flex space-x-2">
                  <div className="h-10 bg-gray-300 rounded w-1/3"></div>
                  <div className="h-10 bg-gray-300 rounded w-1/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  // Not found state
  if (!listing) {
    return (
      <Layout>
        <div className="container mx-auto py-16 px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Listing Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The listing you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/listings">
            <Button>View All Listings</Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  // Format the price
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(listing.price);
  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        {/* Back button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-4 w-4" />
            Back to listings
          </Button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image gallery */}
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Carousel className="w-full">
              <CarouselContent>
                {listing.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-square w-full overflow-hidden rounded-xl">
                      <img
                        src={image}
                        alt={`${listing.title} - Image ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
            
            {/* Thumbnails */}
            {listing.images.length > 1 && (
              <div className="flex mt-4 gap-2 overflow-x-auto pb-2">
                {listing.images.map((image, index) => (
                  <button
                    key={index}
                    className={`w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 
                      ${selectedImageIndex === index ? 'border-primary' : 'border-transparent'}`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
          
          {/* Listing details */}
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge 
                variant={listing.marketType === 'day' ? 'default' : 'secondary'}
                className={listing.marketType === 'day' 
                  ? 'bg-daymarket-500 hover:bg-daymarket-500'
                  : 'bg-nightmarket-200 hover:bg-nightmarket-200'
                }
              >
                {listing.marketType === 'day' ? 'DayMarket' : 'NightMarket'}
              </Badge>
              <Badge variant="outline">
                {listing.category.charAt(0).toUpperCase() + listing.category.slice(1)}
              </Badge>
              {listing.barterEnabled && (
                <Badge variant="outline" className="gap-1">
                  <BarChart className="h-3 w-3" />
                  Barter Enabled
                </Badge>
              )}
            </div>
            
            <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
            
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-bold">{formattedPrice}</span>
            </div>
            
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {listing.location.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Listed {format(new Date(listing.createdAt), 'MMM d, yyyy')}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-6">
              <Avatar className="h-10 w-10">
                <AvatarImage src={`https://api.dicebear.com/7.x/bottts/svg?seed=${listing.sellerId}`} />
                <AvatarFallback>{listing.sellerName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{listing.sellerName}</div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                  {listing.sellerReputation} seller rating
                </div>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-muted-foreground whitespace-pre-line">
                {listing.description}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {listing.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button className="gap-2" onClick={handleContactSeller}>
                <MessageSquare className="h-4 w-4" />
                Contact Seller
              </Button>
              
              {listing.barterEnabled && (
                <Button variant="outline" className="gap-2" onClick={handleBarterOffer}>
                  <ArrowLeftRight className="h-4 w-4" />
                  Make Barter Offer
                </Button>
              )}
              
              <Button variant="ghost" size="icon" onClick={handleShareListing}>
                <Share className="h-5 w-5" />
              </Button>
              
              <Button variant="ghost" size="icon" onClick={() => {
                toast({
                  title: "Listing reported",
                  description: "Our team will review this listing. Thank you for keeping our marketplace safe.",
                });
              }}>
                <Flag className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ListingDetail;
