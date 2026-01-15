import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Fish, Eye } from 'lucide-react';
import { useFilter } from '@/context/FilterContext';

const MarineLife = memo(() => {
  const { setFilterAndScroll } = useFilter();

  const marineLife = [
    {
      name: 'Manta Rays',
      description: 'Graceful giants gliding through the currents of Addu.',
      image: 'https://images.unsplash.com/photo-1623468020653-b0682380e56b',
    },
    {
      name: 'Sea Turtles',
      description: 'Ancient mariners frequenting our vibrant house reefs.',
      image: 'https://images.unsplash.com/photo-1650428197113-1124a5437558',
    },
    {
      name: 'Reef Sharks',
      description: 'Majestic predators patrolling the deeper drop-offs.',
      image: 'https://images.unsplash.com/photo-1672507505363-0340c9c97ec8',
    },
    {
      name: 'Marine Life',
      description: 'Kaleidoscopic ecosystems teeming with life.',
      image: 'https://images.unsplash.com/photo-1694064416775-7ccd3235d2db',
    },
  ];

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-primary/[0.02]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Fish className="w-4 h-4 text-primary" />
            <span className="text-primary font-bold tracking-widest uppercase text-[10px]">Biodiversity</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Marine <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400 italic">Encounters</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Addu Atoll is a sanctuary for some of the ocean's most majestic residents. 
            Prepare for an unforgettable underwater meeting.
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
        >
          {marineLife.map((creature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
              }}
              onClick={() => setFilterAndScroll(creature.name)}
              className="relative h-[500px] rounded-[2.5rem] overflow-hidden group cursor-pointer border border-border bg-card shadow-lg hover:shadow-primary/20 transition-all duration-500"
            >
              {/* Background Image */}
              <img 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                alt={creature.name}
                src={creature.image}
                loading="lazy"
              />
              
              {/* Intelligent Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              
              {/* Hover Glow Border */}
              <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/40 rounded-[2.5rem] transition-all duration-300 m-2" />

              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="mb-4 p-2 w-fit rounded-xl bg-primary/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  
                  <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">
                    {creature.name}
                  </h3>
                  
                  <p className="text-primary-light text-sm font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {creature.description}
                  </p>
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