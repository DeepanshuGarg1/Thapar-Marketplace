
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { allListings } from '@/data/mockData';
import { Listing } from '@/models/Listing';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeftRight, Plus, Trash2, X, Upload } from 'lucide-react';

const Barter = () => {
  const [searchParams] = useSearchParams();
  const listingId = searchParams.get('listingId');
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [listing, setListing] = useState<Listing | null>(null);
  const [offeredItems, setOfferedItems] = useState<Array<{ description: string, images: string[] }>>([
    { description: '', images: [] }
  ]);
  const [offeredMoney, setOfferedMoney] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  
  // Check if user is authenticated
  useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to use the barter system",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
  }, [user, navigate]);
  
  // Fetch listing details if listingId is provided
  useEffect(() => {
    if (listingId) {
      const fetchListing = () => {
        const found = allListings.find(l => l.id === listingId);
        if (found) {
          setListing(found);
          
          // If listing doesn't allow barter, redirect back
          if (!found.barterEnabled) {
            toast({
              title: "Barter not available",
              description: "This listing does not accept barter offers",
              variant: "destructive",
            });
            navigate(`/listings/${listingId}`);
          }
        } else {
          toast({
            title: "Listing not found",
            description: "The requested listing could not be found",
            variant: "destructive",
          });
          navigate('/listings');
        }
      };
      
      fetchListing();
    }
  }, [listingId]);
  
  const handleAddItem = () => {
    setOfferedItems([...offeredItems, { description: '', images: [] }]);
  };
  
  const handleRemoveItem = (index: number) => {
    const newItems = [...offeredItems];
    newItems.splice(index, 1);
    setOfferedItems(newItems);
  };
  
  const handleItemDescriptionChange = (index: number, value: string) => {
    const newItems = [...offeredItems];
    newItems[index].description = value;
    setOfferedItems(newItems);
  };
  
  const handleSubmitOffer = () => {
    // Validate inputs
    const validItems = offeredItems.filter(item => item.description.trim() !== '');
    
    if (validItems.length === 0 && offeredMoney <= 0) {
      toast({
        title: "Invalid offer",
        description: "Please add at least one item or some money to your offer",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Barter offer sent!",
        description: "The seller has been notified of your offer",
      });
      
      if (listing) {
        navigate(`/listings/${listing.id}`);
      } else {
        navigate('/listings');
      }
      
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowLeftRight className="h-6 w-6" />
              Make a Barter Offer
            </CardTitle>
            <CardDescription>
              Offer your items or a combination of items and money
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Target listing display */}
            {listing && (
              <div className="p-4 border rounded-lg bg-muted/20">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={listing.images[0]}
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{listing.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {listing.description}
                    </p>
                    <div className="mt-1 font-medium">
                      {new Intl.NumberFormat('en-IN', {
                        style: 'currency',
                        currency: 'INR',
                        maximumFractionDigits: 0,
                      }).format(listing.price)}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Your offered items */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Your Offered Items</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddItem}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Item
                </Button>
              </div>
              
              <div className="space-y-4">
                {offeredItems.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg relative">
                    {offeredItems.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8"
                        onClick={() => handleRemoveItem(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`item-description-${index}`}>Item Description</Label>
                        <Textarea
                          id={`item-description-${index}`}
                          placeholder="Describe your item in detail"
                          value={item.description}
                          onChange={(e) => handleItemDescriptionChange(index, e.target.value)}
                          className="resize-none"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Item Images</Label>
                        <div className="border-2 border-dashed rounded-lg p-6 text-center">
                          <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                          <p className="mt-2 text-sm text-muted-foreground">
                            Drag and drop images or click to upload
                          </p>
                          <Button
                            type="button"
                            variant="secondary"
                            className="mt-4"
                          >
                            Select Images
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Money offer */}
            <div className="space-y-2">
              <Label htmlFor="money-offer">Money Offer (Optional)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">₹</span>
                <Input
                  id="money-offer"
                  type="number"
                  placeholder="0"
                  min={0}
                  value={offeredMoney || ''}
                  onChange={(e) => setOfferedMoney(Number(e.target.value))}
                  className="pl-7"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Add money along with your items or make a money-only offer
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                if (listing) {
                  navigate(`/listings/${listing.id}`);
                } else {
                  navigate('/listings');
                }
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitOffer}
              disabled={isLoading}
            >
              {isLoading ? "Sending Offer..." : "Send Barter Offer"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Barter;
