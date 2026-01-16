import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, ArrowUpRight, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useData } from '@/hooks/useData';

const Excursions = memo(({ showViewAllButton = false }) => {
  const { toast } = useToast();
  const { data: excursions = [] } = useData('excursions');

  const handleBookExcursion = (title) => {
    toast({
      title: "Navigation Locked",
      description: `Charting the course for ${title}. Booking agent will confirm shortly.`,
    });
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 70, damping: 15 }
    }
  };

  return (
    <section id="excursions" className="py-24 lg:py-40 relative overflow-hidden bg-background">
      {/* Dynamic Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10 animate-pulse-glow" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-primary/10 border border-primary/20">
            <Compass className="w-4 h-4 text-primary animate-spin-slow" />
            <span className="text-primary font-black tracking-[0.3em] uppercase text-[10px]">Expedition Log</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-8 tracking-tighter">
            Epic <span className="text-primary italic font-serif">Frontiers</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            Beyond the resort, Addu Atoll reveals a world of historic wrecks and vibrant megafauna waiting for those who look deeper.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {excursions.slice(0, 6).map((excursion, index) => (
            <motion.div
              key={excursion.id || index}
              variants={cardVariants}
              whileHover={{ y: -12 }}
              className="group relative flex flex-col rounded-[3rem] bg-card/40 backdrop-blur-xl border border-primary/10 overflow-hidden hover:border-primary/40 transition-all duration-500 shadow-2xl shadow-black/5"
            >
              {/* Image Container with Parallax Effect */}
              <div className="h-72 relative overflow-hidden">
                <img
                  src={excursion.image}
                  alt={excursion.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

                {/* Location Badge */}
                <div className="absolute bottom-6 left-6">
                  <div className="bg-background/80 backdrop-blur-md flex items-center gap-2 px-4 py-2 rounded-2xl text-[11px] font-black text-foreground border border-primary/10 uppercase tracking-widest">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    {excursion.location}
                  </div>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-10 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 tracking-tight leading-tight">
                    {excursion.title}
                  </h3>
                  <div className="p-3 rounded-full bg-primary/10 text-primary opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                <p className="text-muted-foreground mb-10 text-base font-medium leading-relaxed line-clamp-3">
                  {excursion.description}
                </p>

                <div className="mt-auto">
                  <div className="flex items-center justify-between py-6 border-t border-primary/5 mb-8">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em]">Duration</span>
                      <div className="flex items-center gap-2 text-sm font-bold text-foreground uppercase tracking-tighter">
                        <Clock className="w-4 h-4 text-primary" />
                        {excursion.duration}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em]">From</span>
                      <div className="text-3xl font-black text-foreground tracking-tighter">
                        {excursion.price}
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleBookExcursion(excursion.title)}
                    className="w-full py-8 rounded-[1.5rem] bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-primary/20 transition-all duration-300"
                  >
                    Reserve Expedition
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {showViewAllButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-24"
          >
            <Link
              to="/excursions"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-4 px-12 py-6 bg-primary/5 text-primary border border-primary/20 font-black uppercase tracking-[0.2em] rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
            >
              All Adventures
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
});

Excursions.displayName = 'Excursions';
export default Excursions;