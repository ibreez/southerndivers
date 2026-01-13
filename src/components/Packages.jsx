import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Star, Sparkles, Trophy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useData } from '@/hooks/useData';

const Packages = () => {
  const { toast } = useToast();
  const { data: packages = [] } = useData('packages');

  const handleSelectPackage = (packageName) => {
    toast({
      title: "Expedition Inquiry Started",
      description: `Connecting you with an agent for the ${packageName}...`,
    });
  };

  return (
    <section id="packages" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary font-bold tracking-widest uppercase text-[10px]">Exclusive Offers</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
            Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400 italic">Expeditions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
            Pre-designed diving itineraries that balance exploration, luxury, and value in the heart of the Maldives.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative flex flex-col rounded-[2.5rem] p-1 transition-all duration-500 ${
                pkg.popular 
                  ? 'bg-gradient-to-b from-primary to-blue-600 shadow-[0_20px_50px_rgba(6,182,212,0.15)]' 
                  : 'bg-border hover:bg-primary/40'
              }`}
            >
              {/* Card Inner Content */}
              <div className="bg-card rounded-[2.3rem] p-8 flex flex-col h-full overflow-hidden relative">
                
                {pkg.popular && (
                  <div className="absolute top-6 right-6">
                    <div className="bg-primary/10 text-primary p-2 rounded-xl border border-primary/20">
                      <Trophy className="w-5 h-5" />
                    </div>
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-2xl font-black uppercase tracking-tight text-foreground mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pkg.description}
                  </p>
                </div>

                {/* Price Display */}
                <div className="mb-8 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-foreground tracking-tighter">
                    {pkg.price}
                  </span>
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">/ Total</span>
                </div>

                {/* Feature List */}
                <div className="space-y-4 mb-10 flex-grow">
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Package Inclusions</p>
                  <ul className="space-y-3">
                    {pkg.features?.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="mt-1 bg-primary/20 rounded-full p-0.5 shrink-0">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-sm text-muted-foreground font-medium leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Selection Button */}
                <Button
                  onClick={() => handleSelectPackage(pkg.name)}
                  className={`w-full py-8 text-xs font-black uppercase tracking-[0.2em] rounded-2xl transition-all duration-300 ${
                    pkg.popular
                      ? 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20'
                      : 'bg-secondary text-foreground hover:bg-primary hover:text-white'
                  }`}
                >
                  Explore Tier
                </Button>

                {/* Ambient Highlight for Popular card */}
                {pkg.popular && (
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;