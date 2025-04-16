
import { ReactNode } from 'react';
import Navbar from './Navbar';
import { useTheme } from '@/contexts/ThemeContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Clock } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isMarketOpen, isDayMarket, isNightMarket } = useTheme();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {!isMarketOpen && (
        <Alert className="mx-auto max-w-4xl mt-4">
          <Clock className="h-4 w-4" />
          <AlertTitle>Market is currently closed</AlertTitle>
          <AlertDescription>
            The marketplace is closed during transition periods. DayMarket opens at 8 AM and NightMarket opens at 8:30 PM.
          </AlertDescription>
        </Alert>
      )}
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="py-6 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Thapar Marketplace. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
