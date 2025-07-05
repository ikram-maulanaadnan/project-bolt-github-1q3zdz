import React, { createContext, useContext, useState, useEffect } from 'react';
import { Feature, Package, Testimonial, FAQ, HeroContent } from '../types';

const API_URL = 'http://localhost:8080/api'; // Pastikan port benar

// Tipe data yang disediakan oleh context
interface ContentContextType {
  heroContent: HeroContent;
  features: Feature[];
  packages: Package[];
  testimonials: Testimonial[];
  faqs: FAQ[];
  isLoading: boolean;
  refetchData: () => void;
  // Anda bisa menambahkan fungsi CRUD lain di sini nanti
}

// Nilai awal untuk mencegah error
const initialHeroContent: HeroContent = { title: 'Loading...', subtitle: '', description: '', whatsappNumber: '' };

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used within a ContentProvider');
  return context;
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [heroContent, setHeroContent] = useState<HeroContent>(initialHeroContent);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refetchData = async () => {
    setIsLoading(true);
    try {
      const responses = await Promise.all([
        fetch(`${API_URL}/hero`),
        fetch(`${API_URL}/features`),
        fetch(`${API_URL}/packages`),
        fetch(`${API_URL}/testimonials`),
        fetch(`${API_URL}/faqs`),
      ]);

      // Cek jika ada response yang tidak ok
      for (const res of responses) {
        if (!res.ok) {
          throw new Error(`Gagal mengambil data dari: ${res.url}`);
        }
      }

      const [heroData, featuresData, packagesData, testimonialsData, faqsData] = await Promise.all(responses.map(res => res.json()));

      setHeroContent(heroData);
      setFeatures(featuresData);
      setPackages(packagesData);
      setTestimonials(testimonialsData);
      setFaqs(faqsData);
      
    } catch (error) {
      console.error("Gagal mengambil data konten dari backend:", error);
      // Anda bisa menambahkan state untuk menampilkan pesan error di UI
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refetchData();
  }, []);

  const value = { heroContent, features, packages, testimonials, faqs, isLoading, refetchData };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};