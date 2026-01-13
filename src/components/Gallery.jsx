import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Camera, Filter, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useData } from '@/hooks/useData';
import { useFilter } from '@/context/FilterContext';

const Gallery = () => {
  const { activeFilter, setActiveFilter } = useFilter(); // Global state
  const { data: images } = useData('gallery');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = useMemo(() => {
    if (!images) return ['all', 'photo', 'video'];
    const allCategories = new Set(['all', 'photo', 'video','marine life', 'coral gardens', 'manta rays', 'sea turtles', 'reef sharks', 'dive', 'wreck diving', 'night dives']);
    images.forEach(img => {
      if (img.categories && Array.isArray(img.categories)) {
        img.categories.forEach(cat => allCategories.add(cat));
      }
    });
    return Array.from(allCategories);
  }, [images]);

  const filteredImages = useMemo(() => {
    if (!images) return [];
    if (activeFilter === 'all') return images;
    return images.filter(img =>
      img.type?.toLowerCase() === activeFilter ||
      (img.categories && Array.isArray(img.categories) && img.categories.some(cat => cat.toLowerCase() === activeFilter))
    );
  }, [images, activeFilter]);

  return (
    <section id="gallery" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Camera className="w-3.5 h-3.5 text-primary" />
              <span className="text-primary font-bold tracking-widest uppercase text-[10px]">The Addu Collection</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
              Visual <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400 italic">Diaries</span>
            </h2>
          </motion.div>

          {/* FILTER BUTTONS */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 mr-4 text-muted-foreground">
              <Filter className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-tighter">Filter by:</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                  activeFilter === cat 
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105" 
                  : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Container */}
        <motion.div 
          layout // This allows images to slide smoothly into new positions
          className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4"
        >
          <AnimatePresence mode='popLayout'>
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id || image.url} // Use URL or ID for stable keying
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                onClick={() => setSelectedImage(image)}
                className={`relative rounded-[2rem] overflow-hidden cursor-pointer group bg-muted border border-border
                  ${index % 7 === 0 ? 'md:col-span-2 md:row-span-2' : ''}
                `}
              >
                {image.type === 'video' ? (
                  <video
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={image.url}
                    muted
                  />
                ) : (
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={image.alt}
                    src={image.url}
                  />
                )}
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                  {image.type === 'video' ? (
                    <Play className="w-6 h-6 text-white" />
                  ) : (
                    <Maximize2 className="w-6 h-6 text-white" />
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Media Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-2xl max-h-[90vh] w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            {selectedImage.type === 'video' ? (
              <video
                src={selectedImage.url}
                controls
                className="w-full h-full object-contain rounded-lg"
              />
            ) : (
              <img
                src={selectedImage.url}
                alt={selectedImage.alt}
                className="w-full h-full object-contain rounded-lg"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;