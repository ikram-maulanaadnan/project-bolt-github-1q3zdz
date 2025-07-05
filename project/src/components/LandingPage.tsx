import React from 'react';
import {
  TrendingUp, Users, Shield, Clock, MessageCircle, Star, CheckCircle,
  BarChart3, Zap, Target, Award, ChevronDown, Activity
} from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { Package, Feature, Testimonial, FAQ } from '../types';

const iconMap: { [key: string]: React.ReactNode } = {
    TrendingUp: <TrendingUp className="w-8 h-8" />,
    Target: <Target className="w-8 h-8" />,
    Shield: <Shield className="w-8 h-8" />,
    BarChart3: <BarChart3 className="w-8 h-8" />,
    Zap: <Zap className="w-8 h-8" />,
    Award: <Award className="w-8 h-8" />,
    Users: <Users className="w-8 h-8" />,
    Clock: <Clock className="w-8 h-8" />,
    CheckCircle: <CheckCircle className="w-8 h-8" />,
    Star: <Star className="w-8 h-8" />,
    MessageCircle: <MessageCircle className="w-8 h-8" />,
    Activity: <Activity className="w-8 h-8" />,
};

const LandingPage: React.FC = () => {
  const { heroContent, features, packages, testimonials, faqs, isLoading } = useContent();

  const whatsappMessage = "Halo%2C+saya+ingin+daftar+kursus+trading+crypto...";
  const whatsappLink = `https://wa.me/${heroContent.whatsappNumber}?text=${whatsappMessage}`;

  const scrollToPackages = () => {
    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePayment = async (price: number, currency: string, description: string) => {
    alert('Mempersiapkan halaman pembayaran...');
    try {
      const response = await fetch('http://localhost:8080/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price_amount: price, price_currency: currency, order_description: description }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal membuat link pembayaran');
      }
      const data = await response.json();
      if (data.invoice_url) {
        window.location.href = data.invoice_url;
      } else {
        throw new Error('URL invoice tidak diterima dari NOWPayments');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        alert(`Terjadi kesalahan: ${error.message}`);
      } else {
        alert('Terjadi kesalahan yang tidak diketahui.');
      }
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">Loading Application Data...</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-950 font-sans text-white">
        {/* Di sini Anda bisa menempelkan seluruh JSX dari LandingPage Anda yang sudah didesain */}
        {/* Saya akan berikan contoh hanya pada bagian packages yang perlu perhatian khusus */}

        {/* ... (Hero Section, Market Update Section, Features Section) ... */}
        
        {/* Packages Section (dengan tipe yang benar) */}
        {packages.length > 0 && (
            <section id="packages" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
                <div className="max-w-7xl mx-auto">
                    {/* ... (Judul seksi paket) ... */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {packages.map((pkg: Package) => ( // Tipe ditambahkan di sini
                            <div
                                key={pkg.id}
                                className={`relative bg-white/5 ...`} // ClassName Anda
                            >
                                {/* ... (Isi kartu paket Anda: nama, harga, deskripsi, fitur) ... */}
                                <button
                                    onClick={() => {
                                        const price = parseFloat(pkg.price.replace(/[^0-9.-]+/g,""));
                                        handlePayment(price, 'usd', `Pembelian Paket: ${pkg.name}`);
                                    }}
                                    className={`block w-full text-center ...`} // ClassName Anda
                                >
                                    Bayar dengan Kripto
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        )}
        
        {/* ... (Testimonials Section, FAQ Section, CTA Section, Footer, dan <style>) ... */}
    </div>
  );
};

export default LandingPage;