import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useData } from '@/hooks/useData';

const Excursions = memo(({ showViewAllButton = false }) => {
  const { toast } = useToast();
  const { data: excursions } = useData('excursions');

  const handleBookExcursion = (title) => {
    toast({
      title: "🚧 Booking System Initializing",
      description: `We are preparing the excursion portal for ${title}.`,
    });
  };

  return (
    <section id="excursions" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px]">Daily Adventures</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Expeditions & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">Trips</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From the historic British Loyalty Wreck to the cleaning stations of Manta Point,
            discover why Addu is the Maldives' best-kept diving secret.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {excursions.slice(0, 6).map((excursion, index) => (
            <motion.div
              key={excursion.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative flex flex-col rounded-[2rem] bg-card border border-border overflow-hidden hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/5"
            >
              {/* Image Container */}
              <div className="h-64 relative overflow-hidden">
                <img
                  src={excursion.image}
                  alt={excursion.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />

                {/* Location Badge */}
                <div className="absolute bottom-4 left-4">
                  <div className="glass-card-1 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold text-white border border-white/20">
                    <MapPin className="w-3 h-3 text-primary-light" />
                    {excursion.location}
                  </div>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {excursion.title}
                  </h3>
                  <div className="p-2 rounded-full bg-primary/5 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                <p className="text-muted-foreground mb-8 text-sm leading-relaxed line-clamp-3">
                  {excursion.description}
                </p>

                <div className="mt-auto">
                  <div className="flex items-center justify-between py-4 border-t border-border mb-6">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Clock className="w-4 h-4 text-primary" />
                      {excursion.duration}
                    </div>
                    <div className="text-2xl font-bold text-foreground tracking-tight">
                      {excursion.price}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleBookExcursion(excursion.title)}
                    className="w-full py-6 rounded-xl bg-primary text-primary-foreground hover:bg-primary-dark shadow-lg shadow-primary/10 transition-all active:scale-[0.98]"
                  >
                    Reserve Spot
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        {showViewAllButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/excursions"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              View All Excursions
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
});

Excursions.displayName = 'Excursions';

export default Excursions;
