import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Waves } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CallToAction = memo(() => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 20 }
    }
  };

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      // requestAnimationFrame ensures smooth execution on the next repaint
      requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth' }));
    }
  };

  return (
    <section className="py-24 lg:py-40 relative overflow-hidden bg-background">
      {/* 1. DYNAMIC BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <motion.div 
          animate={{ 
            rotate: [12, 15, 12],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-24 -left-24 opacity-10"
        >
          <Waves className="w-[500px] h-[500px] text-primary" strokeWidth={1} />
        </motion.div>
        
        {/* Ambient Glow behind the card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-primary/10 blur-[120px] rounded-full animate-pulse-glow" />
      </div>

      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative rounded-[4rem] bg-gradient-to-br from-primary/10 via-card/80 to-background border border-primary/20 p-12 md:p-32 overflow-hidden text-center backdrop-blur-sm"
        >
          {/* Subtle Top "Border-Light" effect */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

          <div className="relative z-10 space-y-10">
            <motion.div variants={childVariants}>
              <h2 className="text-5xl md:text-8xl font-bold text-foreground tracking-tighter leading-[1] mb-2">
                Ready to <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-primary-light via-primary to-primary-dark italic font-serif">
                  Descend?
                </span>
              </h2>
            </motion.div>
            
            <motion.p 
              variants={childVariants}
              className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed"
            >
              Your Addu Atoll expedition is just a click away. Experience the silence of the deep with our expert crew.
            </motion.p>

            <motion.div 
              variants={childVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6"
            >
              <Button 
                size="xl" 
                className="bg-primary text-primary-foreground hover:scale-105 active:scale-95 rounded-full px-12 py-8 text-xl font-black uppercase tracking-widest group shadow-2xl shadow-primary/30 transition-all duration-300"
                onClick={() => handleScroll('booking')}
              >
                Plan Expedition
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
              
              <Button 
                variant="outline" 
                size="xl" 
                className="border-primary/20 text-foreground hover:bg-primary/5 hover:border-primary/40 rounded-full px-12 py-8 text-xl font-black uppercase tracking-widest transition-all duration-300"
                onClick={() => handleScroll('gallery')}
              >
                View Collection
              </Button>
            </motion.div>
          </div>

          {/* Decorative rotating ring - GPU optimized */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-[0.5px] border-primary/10 rounded-full -z-10 animate-[spin_60s_linear_infinite] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-[0.5px] border-primary/5 rounded-full -z-10 animate-[spin_40s_linear_reverse_infinite] pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
});

CallToAction.displayName = 'CallToAction';
export default CallToAction;