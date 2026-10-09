export interface StudioContact {
  phone: string;
  phoneDisplay: string;
  email: string;
  address: {
    street: string;
    locality: string;
    region: string;
    postalCode: string;
    country: string;
    formattedAddress: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  openingHours: {
    days: string;
    hours: string;
    sunday?: string;
  };
  googleMapsEmbedUrl: string;
  googleBusinessProfileUrl: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    youtube: string;
  };
}

export interface StudioBranding {
  logo: string;
  logoWebp?: string;
  footerBg: string;
  contactBg: string;
}

export interface StudioInfo {
  name: string;
  legalName: string;
  tagline: string;
  metaDescription: string;
  keywords: string[];
  contact: StudioContact;
  branding: StudioBranding;
}

export interface ProcessStep {
  step: number;
  title: string;
  icon: string;
  description: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: 'residential' | 'penthouse' | 'commercial' | 'hospitality';
  location: string;
  year?: number;
  areaSqFt?: number;
  image: string;
  gallery: string[];
  description: string;
  client?: string;
  featured?: boolean;
  materials?: string[];
}

export interface GalleryPhoto {
  id: number;
  image: string;
  title: string;
  category: string;
}

export interface ServiceItem {
  id: string;
  slug?: string;
  title: string;
  subtitle: string;
  description: string;
  summary?: string;
  features: string[];
  icon: string;
  metric?: string;
  image?: string;
}

export interface InteriorPackage {
  id: string;
  name: string;
  idealFor: string;
  image: string;
  highlights: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
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
  content?: string;
}

export interface ContactSubmission {
  id?: string;
  fullName: string;
  email: string;
  phone?: string;
  projectType: string;
  budgetRange?: string;
  timeline?: string;
  message: string;
  createdAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
