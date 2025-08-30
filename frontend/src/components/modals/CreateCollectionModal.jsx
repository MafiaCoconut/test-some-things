import React, { useState } from 'react';
import { X, Upload, FolderPlus } from 'lucide-react';

const CreateCollectionModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    coverImage: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSubmit(formData);
      setFormData({ name: '', description: '', coverImage: '' });
    }
  };

  const handleImageUrlChange = (e) => {
    setFormData(prev => ({
      ...prev,
      coverImage: e.target.value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-monstrino-black border border-monstrino-purple/30 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-monstrino-purple/20">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-monstrino-purple/20">
          <div className="flex items-center space-x-2">
            <FolderPlus className="w-5 h-5 text-monstrino-pink" />
            <h2 className="text-xl font-display font-bold text-monstrino-pink">
              Create Collection
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-monstrino-white/60 hover:text-monstrino-white transition-colors duration-150"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Collection Name */}
          <div className="space-y-2">
            <label className="text-monstrino-white text-sm font-mono uppercase tracking-wide">
              Collection Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter collection name"
              className="w-full bg-monstrino-white/10 border border-monstrino-purple/30 rounded-lg px-4 py-3 text-monstrino-white placeholder-monstrino-white/60 focus:outline-none focus:ring-2 focus:ring-monstrino-pink focus:border-transparent"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-monstrino-white text-sm font-mono uppercase tracking-wide">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your collection..."
              rows={3}
              className="w-full bg-monstrino-white/10 border border-monstrino-purple/30 rounded-lg px-4 py-3 text-monstrino-white placeholder-monstrino-white/60 focus:outline-none focus:ring-2 focus:ring-monstrino-pink focus:border-transparent resize-none"
            />
          </div>

          {/* Cover Image URL */}
          <div className="space-y-2">
            <label className="text-monstrino-white text-sm font-mono uppercase tracking-wide">
              Cover Image URL (Optional)
            </label>
            <div className="relative">
              <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-monstrino-purple w-5 h-5" />
              <input
                type="url"
                value={formData.coverImage}
                onChange={handleImageUrlChange}
                placeholder="https://example.com/image.jpg"
                className="w-full bg-monstrino-white/10 border border-monstrino-purple/30 rounded-lg pl-12 pr-4 py-3 text-monstrino-white placeholder-monstrino-white/60 focus:outline-none focus:ring-2 focus:ring-monstrino-pink focus:border-transparent"
              />
            </div>
          </div>

          {/* Image Preview */}
          {formData.coverImage && (
            <div className="space-y-2">
              <label className="text-monstrino-white text-sm font-mono uppercase tracking-wide">
                Preview
              </label>
              <div className="aspect-video rounded-lg overflow-hidden bg-monstrino-black/50">
                <img 
                  src={formData.coverImage} 
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-transparent border border-monstrino-white/30 text-monstrino-white px-4 py-3 rounded-full font-mono text-sm uppercase tracking-wide transition-all duration-300 hover:bg-monstrino-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 cta-button bg-monstrino-pink hover:bg-monstrino-pink/90 text-monstrino-black px-4 py-3 rounded-full font-mono text-sm uppercase tracking-wide transition-all duration-300"
            >
              Create Collection
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCollectionModal;