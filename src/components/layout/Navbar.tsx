import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  Sun, 
  Moon, 
  Bell, 
  MessageSquare, 
  User, 
  LogOut, 
  Menu, 
  X,
  ShoppingCart 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from 'date-fns';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, currentTime } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full sticky top-0 z-50 bg-background border-b border-border glass-morphism">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo and brand */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center">
              <ShoppingCart className="h-6 w-6 text-primary" />
              <span className="ml-2 text-xl font-bold">
                Thapar {theme === 'day' ? 'DayMarket' : 'NightMarket'}
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-sm text-muted-foreground">
              {format(currentTime, 'EEEE, h:mm a')}
            </div>
            
            <Link to="/listings">
              <Button variant="ghost">Listings</Button>
            </Link>
            
            <Link to="/barter">
              <Button variant="ghost">Barter</Button>
            </Link>
            
            {user && (
              <Link to="/messages">
                <Button variant="ghost" size="icon">
                  <MessageSquare className="h-5 w-5" />
                </Button>
              </Link>
            )}

            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer w-full">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/my-listings" className="cursor-pointer w-full">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      <span>My Listings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="default">Sign In</Button>
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 space-y-3 animate-fade-in">
            <Link 
              to="/listings" 
              className="block px-3 py-2 rounded-md hover:bg-secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Listings
            </Link>
            <Link 
              to="/barter" 
              className="block px-3 py-2 rounded-md hover:bg-secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Barter
            </Link>
            {user ? (
              <>
                <Link 
                  to="/messages" 
                  className="block px-3 py-2 rounded-md hover:bg-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Messages
                </Link>
                <Link 
                  to="/profile" 
                  className="block px-3 py-2 rounded-md hover:bg-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link 
                  to="/my-listings" 
                  className="block px-3 py-2 rounded-md hover:bg-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Listings
                </Link>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start px-3"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="block px-3 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button className="w-full">Sign In</Button>
              </Link>
            )}
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-sm text-muted-foreground">
                {theme === 'day' ? 'Switch to NightMarket' : 'Switch to DayMarket'}
              </span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
