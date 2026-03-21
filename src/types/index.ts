export interface Tool {
  _id: string;
  name: string;
  slug: string;
  category: string;
  emoji: string;
  accent: string;
  description: string;
  longDescription: string;
  rating: number;
  reviews: number;
  pricing: "Free" | "Freemium" | "Paid";
  badge: string | null;
  url: string;
  features: string[];
  pros: string[];
  cons: string[];
  isFeatured: boolean;
  createdAt: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  emoji: string;
  content: string;
}
