
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Listing } from '@/models/Listing';
import { Star, MapPin, BarChart } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useTheme } from '@/contexts/ThemeContext';

interface ListingCardProps {
  listing: Listing;
}

const ListingCard = ({ listing }: ListingCardProps) => {
  const { isDayMarket } = useTheme();
  
  // Format the price to Indian Rupees
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(listing.price);
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="object-cover w-full h-full transition-transform duration-200 hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge 
            variant={listing.marketType === 'day' ? 'default' : 'secondary'}
            className={listing.marketType === 'day' 
              ? 'bg-daymarket-500 hover:bg-daymarket-500'
              : 'bg-nightmarket-200 hover:bg-nightmarket-200'
            }
          >
            {listing.marketType === 'day' ? 'Day' : 'Night'}
          </Badge>
        </div>
        {listing.barterEnabled && (
          <div className="absolute bottom-2 left-2">
            <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
              <BarChart className="h-3 w-3 mr-1" />
              Barter
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="pt-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold line-clamp-2 text-lg">{listing.title}</h3>
          <span className="font-bold text-lg whitespace-nowrap">{formattedPrice}</span>
        </div>
        
        <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-2">
          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          <span>{listing.sellerReputation}</span>
          <span className="mx-1">•</span>
          <span>{listing.sellerName}</span>
        </div>
        
        <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-2">
          <MapPin className="h-4 w-4" />
          <span>
            {listing.location.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
          {listing.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {listing.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 pb-4">
        <div className="w-full flex justify-between items-center">
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(listing.createdAt), { addSuffix: true })}
          </span>
          <Link to={`/listings/${listing.id}`}>
            <Button variant="secondary" size="sm">
              View Details
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ListingCard;
