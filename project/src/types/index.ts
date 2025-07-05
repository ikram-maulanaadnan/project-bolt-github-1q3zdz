export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface Package {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface HeroContent {
  id?: number; // ID bersifat opsional
  title: string;
  subtitle: string;
  description: string;
  whatsappNumber: string;
}

export interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
}