import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Heart, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from './Navbar';

export default function ConfirmationPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto redirect to home after 10 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <Check className="w-10 h-10 text-green-600" />
          </div>

          <Card className="text-center">
            <CardHeader>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Heart className="w-8 h-8 text-primary" />
                <CardTitle className="text-3xl font-bold text-primary">
                  Order Placed Successfully!
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-6xl mb-4">🎁</div>
              
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">
                  Heartify will surprise your loved one!
                </h2>
                
                <div className="bg-accent/20 rounded-lg p-6 space-y-3">
                  <p className="text-muted-foreground">
                    <strong>What happens next?</strong>
                  </p>
                  <div className="text-left space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>We'll review your gift requirements</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Our team will curate the perfect gift</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>We'll contact you for any clarifications</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Your gift will be delivered with love</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4">
                  <p className="text-sm font-medium text-primary">
                    💝 Expected delivery: 3-5 business days
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    We'll send you tracking updates via SMS/Email
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <Button 
                  onClick={() => navigate('/')}
                  className="w-full bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
                
                <p className="text-xs text-muted-foreground">
                  Redirecting to home in 10 seconds...
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Decorative Elements */}
          <div className="mt-12 grid grid-cols-3 gap-8 opacity-60">
            <div className="text-4xl gift-float" style={{ animationDelay: '0s' }}>🎈</div>
            <div className="text-4xl gift-float" style={{ animationDelay: '1s' }}>🎉</div>
            <div className="text-4xl gift-float" style={{ animationDelay: '2s' }}>✨</div>
          </div>
        </div>
      </div>
    </div>
  );
}