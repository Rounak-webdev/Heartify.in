import Navbar from '@/components/Navbar';
import { giftCategories } from '@/data/familyMembers';
import { useNavigate } from 'react-router-dom';

export default function CategoriesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              All Gift Categories
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our curated collection of gift categories for every occasion and relationship
            </p>
          </div>

          <div className="gift-grid">
            {giftCategories.map((category) => (
              <div
                key={category.id}
                className="category-card cursor-pointer"
                onClick={() => navigate('/')}
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-card-foreground text-center text-sm leading-tight">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}