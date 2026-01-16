import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Eye, Waves, ArrowUpRight, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFilter } from '@/context/FilterContext';

const MarineLife = memo(() => {
  const { setFilterAndScroll } = useFilter();
  const navigate = useNavigate();

  const marineLife = [
    {
      name: 'Manta Rays',
      scientific: 'Mobula alfredi',
      description: 'Graceful giants gliding through the year-round currents of Addu Atoll.',
      image: 'https://images.unsplash.com/photo-1623468020653-b0682380e56b',
      tag: 'Year-Round'
    },
    {
      name: 'Sea Turtles',
      scientific: 'Cheloniidae',
      description: 'Ancient mariners frequenting our vibrant house reefs and seagrass beds.',
      image: 'https://images.unsplash.com/photo-1650428197113-1124a5437558',
      tag: 'Vibrant'
    },
    {
      name: 'Reef Sharks',
      scientific: 'Carcharhinus',
      description: 'Majestic blacktip and whitetip sharks patrolling the deeper drop-offs.',
      image: 'https://images.unsplash.com/photo-1672507505363-0340c9c97ec8',
      tag: 'Majestic'
    },
    {
      name: 'Coral Gardens',
      scientific: 'Anthozoa',
      description: 'Kaleidoscopic coral ecosystems teeming with macro life and schooling fish.',
      image: 'https://images.unsplash.com/photo-1694064416775-7ccd3235d2db',
      tag: 'Diverse'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 60, damping: 20 }
    }
  };

  return (
    <section id="marine-life" className="py-32 lg:py-56 relative overflow-hidden bg-background">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-primary" />
              <span className="text-primary font-black tracking-[0.4em] uppercase text-[10px]">The Addu Collection</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-6">
              Oceanic <br />
              <span className="text-primary italic font-serif">Legends</span>
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground max-w-sm mb-4 border-l border-primary/20 pl-6"
          >
            A curated encounter with the deep south’s most prestigious inhabitants. Year-round sightings in a sanctuary of crystal clarity.
          </motion.p>
        </div>

        {/* The Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {marineLife.map((creature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              onClick={() => setFilterAndScroll(creature.name)}
              className="group relative h-[650px] rounded-[2rem] overflow-hidden cursor-pointer bg-neutral-900"
            >
              {/* Image with subtle zoom & grayscale to color transition */}
              <img 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out grayscale group-hover:grayscale-0"
                alt={creature.name}
                src={creature.image}
              />
              
              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-700" />

              {/* Top Tag */}
              <div className="absolute top-8 left-8 flex items-center gap-2 overflow-hidden">
                <div className="h-px w-0 group-hover:w-6 bg-white transition-all duration-500" />
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                  {creature.tag}
                </span>
              </div>

              {/* Content Area */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="relative z-10">
                  <span className="text-[10px] font-serif italic text-primary mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    {creature.scientific}
                  </span>
                  
                  <h3 className="text-4xl font-bold text-primary-foreground/90 dark:text-white mb-4 tracking-tighter leading-none">
                    {creature.name.split(' ')[0]} <br />
                    <span className="text-primary-light">{creature.name.split(' ')[1]}</span>
                  </h3>

                  {/* Expandable description */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                    <div className="overflow-hidden">
                      <p className="text-sm text-white/70 leading-relaxed mb-6">
                        {creature.description}
                      </p>
                      <div className="flex items-center gap-4 text-white">
                         <div className="w-10 h-10 rounded-full text-white/70 border border-white/50 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                            <ArrowUpRight className="w-4 h-4" />
                         </div>
                         <span className="text-[10px] font-black uppercase tracking-widest text-white/70">Explore Species</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Borders */}
              <div className="absolute inset-0 border-[1px] border-white/0 group-hover:border-white/10 transition-colors duration-500 m-4 rounded-[1.5rem]" />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 flex flex-col items-center justify-center"
        >
          <div className="w-px h-24 bg-gradient-to-b from-primary to-transparent mb-8" />
          <button onClick={() => navigate('/gallery')} className="flex items-center gap-4 group">
             <span className="text-[11px] font-black uppercase tracking-[0.5em] text-muted-foreground group-hover:text-primary transition-colors">
               Dive into the Gallery
             </span>
             <Compass className="w-5 h-5 text-primary group-hover:rotate-180 transition-transform duration-1000" />
          </button>
        </motion.div>
      </div>
    </section>
  );
});

MarineLife.displayName = 'MarineLife';

export default MarineLife;