import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Sparkles, Trophy, Anchor, Zap } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useData } from '@/hooks/useData';

const Packages = memo(() => {
  const { toast } = useToast();
  const { data: packages = [] } = useData('packages');

  const handleSelectPackage = (packageName) => {
    toast({
      title: "Inquiry Logged",
      description: `Charting your personalized ${packageName} itinerary...`,
    });
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 }
    }
  };

  return (
    <section id="packages" className="py-24 lg:py-40 relative overflow-hidden bg-background">
      {/* High-Performance Decorative Layer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute -bottom-48 -right-48 w-[600px] h-[600px] bg-secondary/5 blur-[140px] rounded-full -z-10 animate-pulse-glow" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary font-black tracking-[0.2em] uppercase text-[10px]">Strategic Pricing</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-foreground tracking-tighter mb-8">
            Curated <span className="text-primary italic font-serif">Valuation</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            Professional diving experiences engineered for maximum discovery and world-class safety standards.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id || index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className={`group relative flex flex-col rounded-[3rem] p-0.5 transition-all duration-500 h-full ${
                pkg.popular 
                  ? 'bg-gradient-to-br from-primary via-cyan-400 to-blue-600 shadow-2xl shadow-primary/20' 
                  : 'bg-primary/10 hover:bg-primary/30'
              }`}
            >
              {/* Card Inner Content */}
              <div className="bg-card rounded-[2.9rem] p-10 flex flex-col h-full overflow-hidden relative">
                
                {/* Popular Badge & Icon */}
                <div className="flex justify-between items-start mb-10">
                  <div className={`p-4 rounded-2xl ${pkg.popular ? 'bg-primary/10' : 'bg-muted'}`}>
                    {pkg.popular ? (
                      <Trophy className="w-6 h-6 text-primary" />
                    ) : index === 0 ? (
                      <Anchor className="w-6 h-6 text-muted-foreground" />
                    ) : (
                      <Zap className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                  {pkg.popular && (
                    <div className="bg-primary px-4 py-1.5 rounded-full">
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary-foreground">Recommendation</span>
                    </div>
                  )}
                </div>

                <div className="mb-8">
                  <h3 className="text-3xl font-black uppercase tracking-tighter text-foreground mb-4">
                    {pkg.name}
                  </h3>
                  <p className="text-muted-foreground font-medium leading-relaxed text-sm">
                    {pkg.description}
                  </p>
                </div>

                {/* Price Display */}
                <div className="mb-10 flex items-baseline gap-2">
                  <span className="text-5xl font-black text-foreground tracking-tighter">
                    {pkg.price}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">USD</span>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">All-In</span>
                  </div>
                </div>

                {/* Feature List */}
                <div className="space-y-4 mb-12 flex-grow">
                  <p className="text-[10px] font-black text-primary/40 uppercase tracking-[0.3em] mb-6">Mission Checklist</p>
                  <ul className="space-y-4">
                    {pkg.features?.map((feature, i) => (
                      <li key={i} className="flex items-start gap-4 group/item">
                        <div className={`mt-0.5 rounded-full p-1 shrink-0 ${pkg.popular ? 'bg-primary/20' : 'bg-muted'}`}>
                          <Check className={`w-3.5 h-3.5 ${pkg.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                        </div>
                        <span className="text-sm text-muted-foreground font-semibold leading-snug group-hover/item:text-foreground transition-colors">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Selection Button */}
                <Button
                  onClick={() => handleSelectPackage(pkg.name)}
                  className={`w-full py-8 text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl transition-all duration-500 ${
                    pkg.popular
                      ? 'bg-primary text-primary-foreground hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-primary/30'
                      : 'bg-background border border-primary/20 text-foreground hover:bg-primary hover:text-primary-foreground'
                  }`}
                >
                  Configure Tier
                </Button>

                {/* Visual Flair for Popular Card */}
                {pkg.popular && (
                  <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-primary/10 blur-[60px] rounded-full pointer-events-none" />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

Packages.displayName = 'Packages';
export default Packages;