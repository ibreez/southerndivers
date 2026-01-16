import React, { useState, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Camera, Filter, Play, Share2 } from 'lucide-react';
import { useData } from '@/hooks/useData';
import { useFilter } from '@/context/FilterContext';

const Gallery = memo(() => {
  const { activeFilter, setActiveFilter } = useFilter();
  const { data: images = [] } = useData('gallery');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = useMemo(() => {
    const defaults = ['all', 'photo', 'video'];
    const dynamic = new Set();
    images.forEach(img => {
      img.categories?.forEach(cat => dynamic.add(cat.toLowerCase()));
    });
    return [...defaults, ...Array.from(dynamic)];
  }, [images]);

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
                  activeFilter === cat 
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
            className="fixed inset-0 bg-background/95 backdrop-blur-2xl z-[200] flex items-center justify-center p-6 md:p-12"
          >
            <motion.button
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute top-10 right-10 z-10 p-4 bg-primary/10 hover:bg-primary text-foreground hover:text-primary-foreground rounded-full transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.div 
              layoutId={selectedImage.id || selectedImage.url}
              className="relative max-w-6xl w-full aspect-video rounded-[3rem] overflow-hidden shadow-[0_0_100px_-20px_rgba(var(--primary),0.4)] border border-primary/20 bg-black"
            >
              {selectedImage.type === 'video' ? (
                <video src={selectedImage.url} controls autoPlay className="w-full h-full object-contain" />
              ) : (
                <img src={selectedImage.url} alt={selectedImage.alt} className="w-full h-full object-contain" />
              )}
              
              {/* Modal Metadata Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-3xl font-black text-white mb-2">{selectedImage.alt}</h3>
                    <div className="flex gap-2">
                      {selectedImage.categories?.map(cat => (
                        <span key={cat} className="px-3 py-1 bg-primary/20 border border-primary/30 rounded-lg text-[10px] font-bold text-primary uppercase tracking-widest">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" className="rounded-2xl border-white/20 text-white hover:bg-white hover:text-black gap-2">
                    <Share2 className="w-4 h-4" /> Share
                  </Button>
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