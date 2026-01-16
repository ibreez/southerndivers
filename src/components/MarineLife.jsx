import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Fish, Eye, Waves } from 'lucide-react';
import { useFilter } from '@/context/FilterContext';

const MarineLife = memo(() => {
  const { setFilterAndScroll } = useFilter();

  const marineLife = [
    {
      name: 'Manta Rays',
      description: 'Graceful giants gliding through the year-round currents of Addu Atoll.',
      image: 'https://images.unsplash.com/photo-1623468020653-b0682380e56b',
    },
    {
      name: 'Sea Turtles',
      description: 'Ancient mariners frequenting our vibrant house reefs and seagrass beds.',
      image: 'https://images.unsplash.com/photo-1650428197113-1124a5437558',
    },
    {
      name: 'Reef Sharks',
      description: 'Majestic blacktip and whitetip sharks patrolling the deeper drop-offs.',
      image: 'https://images.unsplash.com/photo-1672507505363-0340c9c97ec8',
    },
    {
      name: 'Marine Life',
      description: 'Kaleidoscopic coral ecosystems teeming with macro life and schooling fish.',
      image: 'https://images.unsplash.com/photo-1694064416775-7ccd3235d2db',
    },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 }
    }
  };

  return (
    <section id="marine-life" className="py-24 lg:py-40 relative overflow-hidden bg-background">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -z-10 animate-pulse-glow" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Waves className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span className="text-primary font-black tracking-[0.3em] uppercase text-[10px]">Pristine Ecosystems</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tighter">
            Oceanic <span className="text-primary italic font-serif">Legends</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Addu is one of the few places on Earth where manta rays can be seen year-round. 
            Discover the giants of the deep south.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {marineLife.map((creature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              onClick={() => setFilterAndScroll(creature.name)}
              className="relative h-[600px] rounded-[3rem] overflow-hidden group cursor-pointer border border-primary/5 bg-card shadow-2xl transition-all duration-500"
            >
              {/* Background Image with Parallax-like hover */}
              <img 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                alt={creature.name}
                src={creature.image}
                loading="lazy"
              />
              
              {/* Multilayered Gradient for Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
              
              {/* Interaction Border */}
              <div className="absolute inset-4 border border-white/0 group-hover:border-white/20 rounded-[2.5rem] transition-all duration-500 pointer-events-none" />

              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <div className="mb-6 w-12 h-12 rounded-2xl bg-primary/20 backdrop-blur-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-4xl font-bold text-white mb-4 tracking-tighter">
                    {creature.name}
                  </h3>
                  
                  <p className="text-primary-light/90 text-sm font-semibold leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                    {creature.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                    <div className="w-8 h-px bg-white/20" />
                    View in Gallery
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

MarineLife.displayName = 'MarineLife';

export default MarineLife;