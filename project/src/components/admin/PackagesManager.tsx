import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Star } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';
import { Package } from '../../types';

const PackagesManager: React.FC = () => {
  const { packages, addPackage, updatePackage, deletePackage } = useContent();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    features: [''],
    popular: false
  });

  const handleOpenModal = (pkg?: Package) => {
    if (pkg) {
      setEditingPackage(pkg);
      setFormData({
        name: pkg.name,
        price: pkg.price,
        description: pkg.description,
        features: pkg.features,
        popular: pkg.popular
      });
    } else {
      setEditingPackage(null);
      setFormData({
        name: '',
        price: '',
        description: '',
        features: [''],
        popular: false
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPackage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const packageData = {
      ...formData,
      features: formData.features.filter(f => f.trim() !== '')
    };
    
    if (editingPackage) {
      updatePackage(editingPackage.id, packageData);
    } else {
      addPackage(packageData);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus package ini?')) {
      deletePackage(id);
    }
  };

  const addFeatureField = () => {
    setFormData({
      ...formData,
      features: [...formData.features, '']
    });
  };

  const removeFeatureField = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({
      ...formData,
      features: newFeatures
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Packages Management</h1>
          <p className="text-gray-300">Kelola paket-paket kursus yang ditawarkan</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          Tambah Package
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 hover:transform hover:scale-105 ${
              pkg.popular
                ? 'border-yellow-400 shadow-yellow-400/20 shadow-lg'
                : 'border-white/20 hover:border-white/30'
            }`}
          >
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  POPULER
                </div>
              </div>
            )}
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{pkg.name}</h3>
                <div className="text-2xl font-bold text-yellow-400 mb-2">{pkg.price}</div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenModal(pkg)}
                  className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/20 rounded-lg transition-all duration-200"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(pkg.id)}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm mb-4">{pkg.description}</p>
            
            <div className="space-y-2">
              {pkg.features.slice(0, 3).map((feature, index) => (
                <div key={index} className="text-gray-300 text-sm">
                  • {feature}
                </div>
              ))}
              {pkg.features.length > 3 && (
                <div className="text-gray-400 text-xs">
                  +{pkg.features.length - 3} fitur lainnya
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-2xl border border-white/20 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">
                {editingPackage ? 'Edit Package' : 'Tambah Package'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nama Package
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                    placeholder="Paket Harian"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Harga
                  </label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                    placeholder="Rp 50.000"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Deskripsi
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                  placeholder="Deskripsi package"
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Fitur-fitur
                  </label>
                  <button
                    type="button"
                    onClick={addFeatureField}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    + Tambah Fitur
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        className="flex-1 px-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                        placeholder="Fitur package"
                      />
                      {formData.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFeatureField(index)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="popular"
                  checked={formData.popular}
                  onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                  className="w-4 h-4 text-blue-600 bg-white/5 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="popular" className="text-sm font-medium text-gray-300">
                  Tandai sebagai package populer
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  <Save className="w-5 h-5" />
                  Simpan
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-semibold transition-all duration-300 border border-white/20 hover:border-white/30"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackagesManager;