import React, { useState } from 'react';
import { Save, RotateCcw } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';

const HeroContentManager: React.FC = () => {
  const { heroContent, updateHeroContent } = useContent();
  const [formData, setFormData] = useState(heroContent);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateHeroContent(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setFormData(heroContent);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Hero Content</h1>
        <p className="text-gray-300">Kelola konten utama di halaman beranda</p>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="subtitle" className="block text-sm font-medium text-gray-300 mb-2">
              Subtitle
            </label>
            <input
              type="text"
              id="subtitle"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
              placeholder="Trading Crypto Academy"
            />
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
              Main Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
              placeholder="Kuasai Seni Trading Cryptocurrency"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
              placeholder="Deskripsi hero section..."
            />
          </div>

          <div>
            <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-300 mb-2">
              WhatsApp Number
            </label>
            <input
              type="text"
              id="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
              placeholder="6281234567890"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <Save className="w-5 h-5" />
              {saved ? 'Tersimpan!' : 'Simpan'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 border border-white/20 hover:border-white/30"
            >
              <RotateCcw className="w-5 h-5" />
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HeroContentManager;