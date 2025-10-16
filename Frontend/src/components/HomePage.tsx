import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { familyMembers } from '@/data/familyMembers';
import { Gift, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from './Navbar';

export default function HomePage() {
  const [displayedMembers, setDisplayedMembers] = useState(familyMembers.slice(0, 15));
  const [isShuffling, setIsShuffling] = useState(false);
  const navigate = useNavigate();

  // Shuffle function
  const shuffleMembers = () => {
    setIsShuffling(true);
    setTimeout(() => {
      const shuffled = [...familyMembers].sort(() => Math.random() - 1);
      setDisplayedMembers(shuffled.slice(0, 15));
      setIsShuffling(false);
    }, 300);
  };

  // Auto shuffle every 5 seconds
  useEffect(() => {
    const interval = setInterval(shuffleMembers, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleMemberClick = (memberId: string) => {
    navigate(`/member/${memberId}`);
  };

  const handleOtherClick = () => {
    navigate('/other');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="gradient-soft min-h-screen">
        {/* Header */}
        <header className="container mx-auto px-4 py-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Gift className="w-10 h-10 text-primary gift-float" />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
           Heartify : Gift for your loved ones
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Find the perfect gift for everyone special in your life
        </p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-8">
        {/* Shuffle Button */}
        <div className="flex justify-center mb-8">
          <Button 
            onClick={shuffleMembers} 
            variant="outline" 
            className="gap-2 hover:bg-accent/50"
            disabled={isShuffling}
          >
            <Shuffle className={`w-4 h-4 ${isShuffling ? 'animate-spin' : ''}`} />
            {isShuffling ? 'Shuffling...' : 'Shuffle'}
          </Button>
        </div>

        {/* Family Members Grid */}
        <div className={`gift-grid mb-8 ${isShuffling ? 'shuffle-animation' : ''}`}>
          {displayedMembers.map((member, index) => (
            <div
              key={`${member.id}-${index}`}
              className="family-member-card"
              onClick={() => handleMemberClick(member.id)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl mb-3 gift-pulse">{member.icon}</div>
              <h3 className="font-semibold text-card-foreground">{member.name}</h3>
            </div>
          ))}
        </div>

        {/* Other Button - Always Fixed */}
        <div className="flex justify-center">
          <div className="family-member-card max-w-xs" onClick={handleOtherClick}>
            <div className="text-4xl mb-3">❓</div>
            <h3 className="font-semibold text-card-foreground">Other</h3>
            <p className="text-sm text-muted-foreground mt-1">Can't find your relation?</p>
          </div>
        </div>
      </main>
      </div>
    </div>
  );
}
