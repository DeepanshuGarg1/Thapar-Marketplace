import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

// User type definition
export type User = {
  id: string;
  email: string;
  name: string;
  hostel?: string;
  verified: boolean;
  reputation: number;
  avatar: string;
};

// Mock user for demo
const MOCK_USER: User = {
  id: '1',
  email: 'student@thapar.edu',
  name: 'Sample Student',
  hostel: 'Hostel J',
  verified: true,
  reputation: 4.8,
  avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=student',
};

// Context type
type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  verifyEmail: (email: string) => Promise<boolean>;
  verifyHostel: (qrCode: string) => Promise<boolean>;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = () => {
      const savedUser = localStorage.getItem('thapar_marketplace_user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {
          localStorage.removeItem('thapar_marketplace_user');
        }
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  // Login function - simplified for demo
  const login = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validate email domain
      if (!email.endsWith('@thapar.edu')) {
        toast({
          title: "Authentication Error",
          description: "Please use your Thapar email address",
          variant: "destructive",
        });
        throw new Error('Invalid email domain');
      }
      
      // Set user in state and localStorage
      setUser(MOCK_USER);
      localStorage.setItem('thapar_marketplace_user', JSON.stringify(MOCK_USER));
      
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in",
      });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('thapar_marketplace_user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  // Email verification - mock function
  const verifyEmail = async (email: string): Promise<boolean> => {
    // For demo, just checking the domain
    return email.endsWith('@thapar.edu');
  };

  // Hostel verification - mock function
  const verifyHostel = async (qrCode: string): Promise<boolean> => {
    return qrCode === 'valid-qr-code';
  };

  const value = {
    user,
    loading,
    login,
    logout,
    verifyEmail,
    verifyHostel,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Context hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
