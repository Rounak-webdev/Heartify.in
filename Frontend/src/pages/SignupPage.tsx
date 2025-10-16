import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Heart, Mail, Lock, User, Calendar, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import api from "../services/api";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    dateOfBirth: '',
    password: '',
    created_at: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
    acceptTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignup = async (e : React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.acceptTerms) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions to continue.",
        variant: "destructive"
      });
      return;
    }

    if (!captchaVerified) {
      toast({
        title: "Verification Required",
        description: "Please complete the captcha verification.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      interface SignupResponse {
        token?: string;
        email?: string;
        message?: string;
      }

      const { data } = await api.post<SignupResponse>('/users/signup', formData); // ✅ Using axios api instance

      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      localStorage.setItem('user', JSON.stringify({ email: data.email }));

      toast({
        title: 'Signup Successful',
        description: data.message || 'Your account has been created!'
      });

      window.location.href = '/login';
    } catch (err: any) {
      toast({
        title: 'Signup Failed',
        description: err.response?.data?.message || 'Unable to create account.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    toast({
      title: "Google Signup Disabled",
      description: "Please connect backend to enable Google authentication.",
      variant: "destructive"
    });
  };

  const handleCaptcha = () => {
    setCaptchaVerified(!captchaVerified);
    toast({
      title: !captchaVerified ? "Captcha Verified" : "Captcha Removed",
      description: !captchaVerified ? "You are verified as human" : "Verification removed"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full mb-4">
              <Heart className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Join Heartify</h1>
            <p className="text-muted-foreground">Create your account to start gifting</p>
          </div>

          <Card className="shadow-lg border-2">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Create Account</CardTitle>
              <CardDescription className="text-center">
                Sign up to discover personalized gifts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Google Signup */}
              <Button 
                variant="outline" 
                className="w-full h-12 text-base font-medium"
                onClick={handleGoogleSignup}
              >
                {/* ✅ Inline Google logo */}
                <svg className="w-5 h-5 mr-3" viewBox="0 0 533.5 544.3">
                  <path fill="#4285F4" d="M533.5 278.4c0-18.5-1.5-37.1-4.9-55H272v104h147c-6 33-24 61-51 80v66h82c48-44 76-109 76-195z"/>
                  <path fill="#34A853" d="M272 544.3c69 0 126.8-22.7 169-61.5l-82-66c-23 16-52 26-87 26-67 0-124-45-144-106H44v67c42 83 129 140 228 140z"/>
                  <path fill="#FBBC05" d="M128 336c-10-29-10-60 0-89V180h-84c-38 76-38 165 0 241l84-85z"/>
                  <path fill="#EA4335" d="M272 107c36 0 69 12 94 35l71-71C399 24 341 0 272 0 173 0 86 57 44 140l84 84c20-61 77-117 144-117z"/>
                </svg>
                Sign up with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or create with email</span>
                </div>
              </div>

              {/* Signup Form */}
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                {/* Captcha */}
                <div className="space-y-3">
                  <Label>Security Verification</Label>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg bg-muted/30">
                    <Checkbox 
                      id="captcha"
                      checked={captchaVerified}
                      onCheckedChange={handleCaptcha}
                    />
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-muted-foreground" />
                      <Label htmlFor="captcha" className="text-sm cursor-pointer">
                        I'm not a robot
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="terms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => handleInputChange('acceptTerms', checked)}
                  />
                  <Label htmlFor="terms" className="text-sm leading-5 cursor-pointer">
                    I agree to the{' '}
                    <Link to="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    className="text-primary hover:underline font-medium"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
