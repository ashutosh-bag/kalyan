export interface Project {
  id: string;
  slug: string;
  title: string;
  category: 'residential' | 'penthouse' | 'commercial' | 'hospitality';
  location: string;
  year: number;
  areaSqFt: number;
  image: string;
  gallery: string[];
  description: string;
  client: string;
  featured?: boolean;
  materials: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: string;
  metric: string;
}

export interface ContactSubmission {
  id?: string;
  fullName: string;
  email: string;
  phone?: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  message: string;
  createdAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
