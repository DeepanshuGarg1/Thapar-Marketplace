
import { useState } from 'react';
import { Category, Location } from '@/models/Listing';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { X, Filter, Star } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface ListingFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  search: string;
  category: Category | 'all';
  location: Location | 'all';
  priceRange: [number, number];
  minRating: number;
  barterOnly: boolean;
}

const ListingFilters = ({ onFilterChange }: ListingFiltersProps) => {
  const { isDayMarket } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'all',
    location: 'all',
    priceRange: [0, 5000],
    minRating: 0,
    barterOnly: false,
  });
  
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  
  const categories = isDayMarket
    ? ['books', 'electronics', 'bicycles', 'furniture', 'accessories']
    : ['snacks', 'chargers', 'stationery', 'notes', 'medicine'];
  
  const locations = isDayMarket
    ? ['library', 'canteen', 'hostel_lounge', 'academic_block']
    : ['hostel_j', 'hostel_k', 'hostel_l', 'hostel_m', 'hostel_n'];
  
  const handleFilterChange = (filterUpdate: Partial<FilterState>) => {
    const newFilters = { ...filters, ...filterUpdate };
    setFilters(newFilters);
    
    // Count active filters
    let count = 0;
    if (newFilters.search) count++;
    if (newFilters.category !== 'all') count++;
    if (newFilters.location !== 'all') count++;
    if (newFilters.priceRange[0] > 0 || newFilters.priceRange[1] < 5000) count++;
    if (newFilters.minRating > 0) count++;
    if (newFilters.barterOnly) count++;
    
    setActiveFiltersCount(count);
  };
  
  const applyFilters = () => {
    onFilterChange(filters);
    setIsOpen(false);
  };
  
  const resetFilters = () => {
    const resetState: FilterState = {
      search: '',
      category: 'all',
      location: 'all',
      priceRange: [0, 5000],
      minRating: 0,
      barterOnly: false,
    };
    
    setFilters(resetState);
    onFilterChange(resetState);
    setActiveFiltersCount(0);
  };
  
  return (
    <div className="mb-6">
      {/* Search bar and filter button (always visible) */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="relative flex-grow">
          <Input
            placeholder="Search listings..."
            value={filters.search}
            onChange={(e) => {
              handleFilterChange({ search: e.target.value });
              // Apply search filter immediately
              onFilterChange({ ...filters, search: e.target.value });
            }}
            className="w-full"
          />
          {filters.search && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
              onClick={() => {
                handleFilterChange({ search: '' });
                onFilterChange({ ...filters, search: '' });
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button
          variant={isOpen ? "secondary" : "outline"}
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="relative"
        >
          <Filter className="h-4 w-4" />
          {activeFiltersCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-4 h-4 text-xs flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </div>
      
      {/* Active filters display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.category !== 'all' && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Category: {filters.category}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => {
                  handleFilterChange({ category: 'all' });
                  onFilterChange({ ...filters, category: 'all' });
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {filters.location !== 'all' && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Location: {filters.location.replace('_', ' ')}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => {
                  handleFilterChange({ location: 'all' });
                  onFilterChange({ ...filters, location: 'all' });
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {(filters.priceRange[0] > 0 || filters.priceRange[1] < 5000) && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Price: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => {
                  handleFilterChange({ priceRange: [0, 5000] });
                  onFilterChange({ ...filters, priceRange: [0, 5000] });
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {filters.minRating > 0 && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Min Rating: {filters.minRating}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => {
                  handleFilterChange({ minRating: 0 });
                  onFilterChange({ ...filters, minRating: 0 });
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {filters.barterOnly && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Barter Only
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => {
                  handleFilterChange({ barterOnly: false });
                  onFilterChange({ ...filters, barterOnly: false });
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="text-xs"
            onClick={resetFilters}
          >
            Clear All
          </Button>
        </div>
      )}
      
      {/* Expanded filters */}
      {isOpen && (
        <div className="p-4 border rounded-lg shadow-sm bg-background mb-4 animate-fade-in">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="category">
              <AccordionTrigger>Category</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={filters.category === 'all' ? 'default' : 'outline'}
                    className="text-sm h-8"
                    onClick={() => handleFilterChange({ category: 'all' })}
                  >
                    All Categories
                  </Button>
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={filters.category === category ? 'default' : 'outline'}
                      className="text-sm h-8"
                      onClick={() => handleFilterChange({ category: category as Category })}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="location">
              <AccordionTrigger>Location</AccordionTrigger>
              <AccordionContent>
                <Select
                  value={filters.location}
                  onValueChange={(value) => 
                    handleFilterChange({ location: value as Location | 'all' })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="price">
              <AccordionTrigger>Price Range</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Slider
                    value={filters.priceRange}
                    min={0}
                    max={5000}
                    step={100}
                    onValueChange={(value) => 
                      handleFilterChange({ priceRange: value as [number, number] })
                    }
                  />
                  <div className="flex justify-between items-center">
                    <div>
                      <Label>Min: ₹{filters.priceRange[0]}</Label>
                    </div>
                    <div>
                      <Label>Max: ₹{filters.priceRange[1]}</Label>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="rating">
              <AccordionTrigger>Seller Rating</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {[0, 3, 3.5, 4, 4.5].map((rating) => (
                    <Button
                      key={rating}
                      variant={filters.minRating === rating ? 'default' : 'outline'}
                      className="mr-2 mb-2"
                      onClick={() => handleFilterChange({ minRating: rating })}
                    >
                      {rating === 0 ? 'Any' : (
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 fill-yellow-500 text-yellow-500" />
                          {rating}+
                        </div>
                      )}
                    </Button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="barter">
              <AccordionTrigger>Other Options</AccordionTrigger>
              <AccordionContent>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="barterOnly"
                    checked={filters.barterOnly}
                    onChange={(e) => 
                      handleFilterChange({ barterOnly: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="barterOnly">Show barter-enabled listings only</Label>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={resetFilters}>
              Reset
            </Button>
            <Button onClick={applyFilters}>
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingFilters;
