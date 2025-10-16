import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { allFamilyMembers } from '@/data/familyMembers';
import { Search, ArrowLeft, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Navbar from './Navbar';

export default function OtherPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [customRelation, setCustomRelation] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const filteredMembers = allFamilyMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMemberClick = (memberId: string) => {
    navigate(`/member/${memberId}`);
  };

  const handleCustomSubmit = () => {
    if (customRelation.trim()) {
      // For demo purposes, navigate to a generic gift category page
      navigate('/categories/custom', { state: { relationName: customRelation.trim() } });
      setIsDialogOpen(false);
      setCustomRelation('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="gradient-soft min-h-screen">
        {/* Header */}
        <header className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/')}
            className="hover:bg-accent/50"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Find Your Loved One</h1>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Search for your loved one"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 py-6 text-lg rounded-2xl border-2 focus:border-primary"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-8">
        {/* All Family Members Grid */}
        <div className="gift-grid mb-8">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="family-member-card"
              onClick={() => handleMemberClick(member.id)}
            >
              <div className="text-4xl mb-3">{member.icon}</div>
              <h3 className="font-semibold text-card-foreground text-center">{member.name}</h3>
            </div>
          ))}
        </div>

        {/* Custom Other Button */}
        <div className="flex justify-center">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <div className="family-member-card max-w-xs cursor-pointer">
                <div className="text-4xl mb-3">
                  <Plus className="w-8 h-8 text-primary mx-auto" />
                </div>
                <h3 className="font-semibold text-card-foreground">Other</h3>
                <p className="text-sm text-muted-foreground mt-1">Specify your relationship</p>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Specify Your Relationship</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="e.g., Godfather, Stepmother, etc."
                  value={customRelation}
                  onChange={(e) => setCustomRelation(e.target.value)}
                  className="rounded-lg"
                  onKeyPress={(e) => e.key === 'Enter' && handleCustomSubmit()}
                />
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleCustomSubmit}
                    disabled={!customRelation.trim()}
                    className="gradient-primary text-primary-foreground"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>
      </div>
    </div>
  );
}