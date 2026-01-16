import React, { useState, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Camera, Filter, Play, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useData } from '@/hooks/useData';
import { useFilter } from '@/context/FilterContext';

const Gallery = memo(() => {
  const { activeFilter, setActiveFilter } = useFilter();
  const { data: images = [] } = useData('gallery');
  const [selectedImage, setSelectedImage] = useState(null);

  // Generate unique categories for filter tabs
  const categories = useMemo(() => {
    const allCategories = new Set(['all', 'photo', 'video']);
    images.forEach(img => {
      img.categories?.forEach(cat => allCategories.add(cat.toLowerCase()));
    });
    return Array.from(allCategories);
  }, [images]);

  // Filtering Logic
  const filteredImages = useMemo(() => {
    const filter = activeFilter.toLowerCase();
    if (filter === 'all') return images;

    return images.filter(img => {
      const typeMatch = img.type?.toLowerCase() === filter;
      const categoryMatch = img.categories?.some(cat => {
        const category = cat.toLowerCase();
        // Enhanced matching: matches "Manta Rays" to "Manta" or "Manta Rays"
        return category === filter || filter.includes(category) || category.includes(filter);
      });
      
      return typeMatch || categoryMatch;
    });
  }, [images, activeFilter]);

  return (
    <section id="gallery" className="py-24 lg:py-40 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6">
        
        {/* Header & Advanced Filter Bar */}
        <div className="flex flex-col gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Camera className="w-4 h-4 text-primary" />
              <span className="text-primary font-black tracking-[0.3em] uppercase text-[10px]">The Addu Collection</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-foreground tracking-tighter leading-none">
              Visual <span className="text-primary italic font-serif">Archives</span>
            </h2>
          </motion.div>

          <div className="flex flex-wrap items-center gap-3 bg-card/50 backdrop-blur-md p-2 rounded-[2rem] border border-primary/5 w-fit">
            <div className="flex items-center gap-2 px-4 text-primary/40">
              <Filter className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Sort</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${
                  activeFilter.toLowerCase() === cat.toLowerCase() 
                  ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20 scale-105" 
                  : "hover:bg-primary/10 text-muted-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Masonry Grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-4 auto-rows-[220px] gap-6"
        >
          <AnimatePresence mode='popLayout'>
            {filteredImages.map((image, index) => (
              <motion.div
                layout
                key={image.id || image.url}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                onClick={() => setSelectedImage(image)}
                className={`relative rounded-[2.5rem] overflow-hidden cursor-pointer group bg-card border border-primary/5
                  ${index % 7 === 0 ? 'md:col-span-2 md:row-span-2' : ''}
                  ${index % 9 === 0 ? 'md:col-span-2' : ''}
                `}
              >
                {image.type === 'video' ? (
                  <video
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    src={image.url}
                    muted
                    loop
                    playsInline
                    autoPlay
                  />
                ) : (
                  <img
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    alt={image.alt}
                    src={image.url}
                    loading="lazy"
                  />
                )}
                
                {/* Immersive Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 backdrop-blur-[2px]">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70 mb-1">{image.type}</p>
                      <h4 className="text-xl font-bold text-white tracking-tight">{image.alt || 'Ocean Encounter'}</h4>
                    </div>
                    <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white">
                      {image.type === 'video' ? <Play className="w-5 h-5 fill-current" /> : <Maximize2 className="w-5 h-5" />}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Cinematic Media Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-2xl z-[200] flex items-center justify-center p-4 md:p-12"
          >
            {/* Top Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 z-[210] p-4 bg-white/10 hover:bg-white text-white hover:text-black rounded-full transition-all duration-300 backdrop-blur-md"
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.div
              layoutId={selectedImage.id || selectedImage.url}
              className="group relative max-w-6xl w-full aspect-video rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-primary/10 bg-black flex items-center justify-center"
            >
              {selectedImage.type === 'video' ? (
                <video 
                  src={selectedImage.url} 
                  controls 
                  autoPlay 
                  className="w-full h-full object-contain relative z-0" 
                />
              ) : (
                <img src={selectedImage.url} alt={selectedImage.alt} className="w-full h-full object-contain" />
              )}
              
              {/* Modal Metadata Overlay 
                  pointer-events-none: Allows clicks to pass through to the video controls beneath.
                  pointer-events-auto: Re-enables interaction for the text/buttons specifically.
              */}
              <div className={`
                absolute inset-x-0 bottom-0 p-6 md:p-10 
                bg-gradient-to-t from-black/90 via-black/40 to-transparent 
                transition-opacity duration-500 pointer-events-none z-10 
                ${selectedImage.type === 'video' ? 'opacity-0 group-hover:opacity-100 mb-16' : 'opacity-100'}
              `}>
                <div className="flex justify-between items-end">
                  <div className="pointer-events-auto">
                    <h3 className="text-xl md:text-3xl font-black text-white mb-2 leading-tight">
                      {selectedImage.alt || 'Ocean Encounter'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedImage.categories?.map(cat => (
                        <span key={cat} className="px-2 py-1 bg-white/10 border border-white/20 rounded-md text-[9px] font-bold text-white uppercase tracking-widest backdrop-blur-sm">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pointer-events-auto hidden md:block">
                    <Button 
                      variant="outline" 
                      onClick={(e) => { e.stopPropagation(); }}
                      className="rounded-xl border-white/20 text-white hover:bg-white hover:text-black gap-2 backdrop-blur-md"
                    >
                      <Share2 className="w-4 h-4" /> Share
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
});

Gallery.displayName = 'Gallery';
export default Gallery;