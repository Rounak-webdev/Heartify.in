export interface FamilyMember {
  id: string;
  name: string;
  icon: string;
  categories?: string[];
}

export const familyMembers: FamilyMember[] = [
  { id: 'father', name: 'Father', icon: '👨‍🦳', categories: ['Fashion & Accessories', 'Tech & Gadgets', 'Home & Lifestyle', 'Books & Stationery', 'Beauty & Wellness'] },
  { id: 'mother', name: 'Mother', icon: '👩‍🦳', categories: ['Fashion & Accessories', 'Beauty & Wellness', 'Home & Lifestyle', 'Food & Hampers', 'Traditional & Spiritual'] },
  { id: 'grandfather', name: 'Grandfather', icon: '👴', categories: ['Books & Stationery', 'Traditional & Spiritual', 'Home & Lifestyle', 'Food & Hampers'] },
  { id: 'grandmother', name: 'Grandmother', icon: '👵', categories: ['Traditional & Spiritual', 'Home & Lifestyle', 'Food & Hampers', 'Beauty & Wellness'] },
  { id: 'brother', name: 'Brother', icon: '👨', categories: ['Tech & Gadgets', 'Fashion & Accessories', 'Sports / Kids & Fun', 'Food & Hampers'] },
  { id: 'sister', name: 'Sister', icon: '👩', categories: ['Fashion & Accessories', 'Beauty & Wellness', 'Personalized & Creative', 'Food & Hampers'] },
  { id: 'uncle', name: 'Uncle', icon: '👨‍🦱', categories: ['Home & Lifestyle', 'Fashion & Accessories', 'Books & Stationery', 'Food & Hampers'] },
  { id: 'aunt', name: 'Aunt', icon: '👩‍🦱', categories: ['Fashion & Accessories', 'Home & Lifestyle', 'Beauty & Wellness', 'Traditional & Spiritual'] },
  { id: 'cousin', name: 'Cousin', icon: '🧑', categories: ['Tech & Gadgets', 'Fashion & Accessories', 'Personalized & Creative', 'Experience Gifts'] },
  { id: 'husband', name: 'Husband', icon: '🤵', categories: ['Fashion & Accessories', 'Tech & Gadgets', 'Experience Gifts', 'Food & Hampers'] },
  { id: 'wife', name: 'Wife', icon: '👰', categories: ['Fashion & Accessories', 'Beauty & Wellness', 'Personalized & Creative', 'Experience Gifts'] },
  { id: 'son', name: 'Son', icon: '👦', categories: ['Kids & Fun', 'Sports Gear', 'Books & Stationery', 'Food & Hampers'] },
  { id: 'daughter', name: 'Daughter', icon: '👧', categories: ['Kids & Fun', 'Fashion & Accessories', 'Personalized & Creative', 'Food & Hampers'] },
  { id: 'friend', name: 'Friend', icon: '🧑‍🤝‍🧑', categories: ['Personalized & Creative', 'Tech & Gadgets', 'Food & Hampers', 'Experience Gifts'] },
  { id: 'colleague', name: 'Colleague', icon: '👥', categories: ['Home & Lifestyle', 'Books & Stationery', 'Food & Hampers', 'Personalized & Creative'] },
  { id: 'teacher', name: 'Teacher', icon: '🧑‍🏫', categories: ['Books & Stationery', 'Home & Lifestyle', 'Food & Hampers', 'Traditional & Spiritual'] },
  { id: 'neighbour', name: 'Neighbour', icon: '🏠', categories: ['Food & Hampers', 'Home & Lifestyle', 'Plants & Flowers', 'Traditional & Spiritual'] },
  { id: 'girlfriend', name: 'Girlfriend', icon: '💕', categories: ['Fashion & Accessories', 'Personalized & Creative', 'Beauty & Wellness', 'Experience Gifts'] },
  { id: 'boyfriend', name: 'Boyfriend', icon: '💖', categories: ['Fashion & Accessories', 'Personalized & Creative', 'Beauty & Wellness', 'Experience Gifts'] }
];

export const allFamilyMembers = [
  ...familyMembers,
  { id: 'father-in-law', name: 'Father-in-law', icon: '👨‍🦳', categories: ['Traditional & Spiritual', 'Food & Hampers', 'Home & Lifestyle', 'Fashion & Accessories'] },
  { id: 'mother-in-law', name: 'Mother-in-law', icon: '👩‍🦳', categories: ['Traditional & Spiritual', 'Food & Hampers', 'Home & Lifestyle', 'Fashion & Accessories'] },
  { id: 'best-friend', name: 'Best Friend', icon: '👫', categories: ['Personalized & Creative', 'Tech & Gadgets', 'Food & Hampers', 'Experience Gifts'] },
  { id: 'school-friend', name: 'School Friend', icon: '🎓', categories: ['Books & Stationery', 'Kids & Fun', 'Food & Hampers', 'Personalized & Creative'] },
  { id: 'college-friend', name: 'College Friend', icon: '🎒', categories: ['Fashion & Accessories', 'Tech & Gadgets', 'Personalized & Creative', 'Experience Gifts'] },
  { id: 'office-colleague', name: 'Office Colleague', icon: '💼', categories: ['Home & Lifestyle', 'Books & Stationery', 'Food & Hampers', 'Personalized & Creative'] },
  { id: 'boss', name: 'Boss / Manager', icon: '👔', categories: ['Home & Lifestyle', 'Books & Stationery', 'Food & Hampers', 'Experience Gifts'] },
  { id: 'mentor', name: 'Teacher / Mentor', icon: '🎯', categories: ['Books & Stationery', 'Home & Lifestyle', 'Food & Hampers', 'Traditional & Spiritual'] },
  { id: 'childhood-friend', name: 'Childhood Friend', icon: '🧸', categories: ['Personalized & Creative', 'Food & Hampers', 'Books & Stationery', 'Kids & Fun'] }
];

export const giftCategories = [
  { id: 'fashion-accessories', name: 'Fashion & Accessories', icon: '👗' },
  { id: 'tech-gadgets', name: 'Tech & Gadgets', icon: '📱' },
  { id: 'home-lifestyle', name: 'Home & Lifestyle', icon: '🏠' },
  { id: 'books-stationery', name: 'Books & Stationery', icon: '📚' },
  { id: 'beauty-wellness', name: 'Beauty & Wellness', icon: '💄' },
  { id: 'food-hampers', name: 'Food & Hampers', icon: '🍯' },
  { id: 'traditional-spiritual', name: 'Traditional & Spiritual', icon: '🕉️' },
  { id: 'sports-gear', name: 'Sports Gear', icon: '⚽' },
  { id: 'kids-fun', name: 'Kids & Fun', icon: '🎈' },
  { id: 'personalized-creative', name: 'Personalized & Creative', icon: '🎨' },
  { id: 'experience-gifts', name: 'Experience Gifts', icon: '🎪' },
  { id: 'plants-flowers', name: 'Plants & Flowers', icon: '🌸' }
];