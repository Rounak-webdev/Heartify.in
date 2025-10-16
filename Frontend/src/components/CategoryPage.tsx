import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { familyMembers, allFamilyMembers, giftCategories } from '@/data/familyMembers';
import { ArrowLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import Navbar from './Navbar';

export default function CategoryPage() {
  const { memberId } = useParams<{ memberId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [customCategory, setCustomCategory] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Check if this is a custom relation from the Other page
  const isCustomRelation = memberId === 'custom';
  const relationName = location.state?.relationName || 'Custom Relation';

  // Find the family member
  const member = [...familyMembers, ...allFamilyMembers].find(m => m.id === memberId);
  
  if (!member && !isCustomRelation) {
    return (
      <div className="min-h-screen gradient-soft flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Member not found</h1>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  // Get categories for the member or use default categories for custom relations
  const memberCategories = member?.categories || [
    'Fashion & Accessories',
    'Tech & Gadgets', 
    'Home & Lifestyle',
    'Food & Hampers',
    'Personalized & Creative'
  ];

  // Filter gift categories based on member's categories
  const availableCategories = giftCategories.filter(cat => 
    memberCategories.includes(cat.name)
  );

  const handleCustomSubmit = () => {
    if (customCategory.trim()) {
      // For demo purposes, you could implement actual category handling here
      alert(`Custom category "${customCategory}" submitted for ${isCustomRelation ? relationName : member?.name}!`);
      setIsDialogOpen(false);
      setCustomCategory('');
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    // Navigate to form page
    const relationParam = isCustomRelation ? relationName : member?.name;
    navigate(`/form/${encodeURIComponent(relationParam)}/${encodeURIComponent(categoryName)}`);
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
            onClick={() => navigate(-1)}
            className="hover:bg-accent/50"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="text-4xl">
              {isCustomRelation ? '👤' : member?.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {isCustomRelation ? relationName : member?.name}
              </h1>
              <p className="text-muted-foreground">Choose a gift category</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-8">
        {/* Categories Grid */}
        <div className="gift-grid mb-8">
          {availableCategories.map((category) => (
            <div
              key={category.id}
              className="category-card"
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="font-semibold text-card-foreground text-center text-sm leading-tight">
                {category.name}
              </h3>
            </div>
          ))}
        </div>

        {/* Custom Category Button */}
        <div className="flex justify-center">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <div className="category-card max-w-xs cursor-pointer">
                <div className="text-4xl mb-3">
                  <Plus className="w-8 h-8 text-primary mx-auto" />
                </div>
                <h3 className="font-semibold text-card-foreground">Other</h3>
                <p className="text-sm text-muted-foreground mt-1">Custom category</p>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  Custom Category for {isCustomRelation ? relationName : member?.name}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Textarea
                  placeholder="Describe the type of gift you're looking for..."
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  className="rounded-lg min-h-[100px]"
                />
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleCustomSubmit}
                    disabled={!customCategory.trim()}
                    className="gradient-primary text-primary-foreground"
                  >
                    Submit Request
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