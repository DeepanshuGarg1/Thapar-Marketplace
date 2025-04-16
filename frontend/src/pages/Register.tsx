
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ShoppingCart, Sun, Moon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { 
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem
} from '@/components/ui/select';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hostel, setHostel] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  
  const { login } = useAuth();
  const { theme, isDayMarket } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEmailStep = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    if (!email.endsWith('@thapar.edu')) {
      toast({
        title: "Error",
        description: "Please use your Thapar email address",
        variant: "destructive",
      });
      return;
    }

    setStep(2);
  };

  const handleHostelVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hostel) {
      toast({
        title: "Error",
        description: "Please select your hostel",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      // In a real app, we would verify the hostel and create the account
      // For demo, we'll just log in
      await login(email, password);
      
      toast({
        title: "Account created!",
        description: "You have successfully registered and logged in",
      });
      
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="w-full shadow-lg animate-fade-in">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <div className="relative">
                <ShoppingCart className="h-10 w-10 text-primary" />
                {isDayMarket ? (
                  <Sun className="h-5 w-5 text-daymarket-500 absolute -top-1 -right-1" />
                ) : (
                  <Moon className="h-5 w-5 text-nightmarket-200 absolute -top-1 -right-1" />
                )}
              </div>
            </div>
            <CardTitle className="text-2xl">
              Create an Account
            </CardTitle>
            <CardDescription>
              {step === 1 
                ? "Enter your details to create your account" 
                : "Verify your hostel accommodation"
              }
            </CardDescription>
          </CardHeader>
          
          {step === 1 ? (
            <form onSubmit={handleEmailStep}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">College Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="student@thapar.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  className="w-full"
                >
                  Continue
                </Button>
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </div>
              </CardFooter>
            </form>
          ) : (
            <form onSubmit={handleHostelVerification}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hostel">Select Your Hostel</Label>
                  <Select onValueChange={setHostel} value={hostel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select hostel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Hostels</SelectLabel>
                        <SelectItem value="hostel_j">Hostel J</SelectItem>
                        <SelectItem value="hostel_k">Hostel K</SelectItem>
                        <SelectItem value="hostel_l">Hostel L</SelectItem>
                        <SelectItem value="hostel_m">Hostel M</SelectItem>
                        <SelectItem value="hostel_n">Hostel N</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="qrCode">Verify with Mess Card QR</Label>
                  <div className="border-2 border-dashed rounded-lg p-4 text-center">
                    <p className="text-sm mb-2">Scan your mess card QR code to verify</p>
                    <Button type="button" variant="outline" className="w-full">
                      Upload QR Image
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    For demo purposes, click continue without uploading
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="flex w-full gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={isLoading}
                  >
                    {isLoading ? "Verifying..." : "Complete Registration"}
                  </Button>
                </div>
              </CardFooter>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Register;
