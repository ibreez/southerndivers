import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Waves } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Wave Pattern Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <Waves className="absolute -bottom-20 -left-20 w-96 h-96 text-primary rotate-12" />
      </div>

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] bg-gradient-to-br from-primary/20 via-card to-background border border-primary/20 p-12 md:p-24 overflow-hidden text-center"
        >
          {/* Subtle Inner Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative z-10 space-y-8"
          >
            <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter leading-[1.1]">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 to-primary italic">Descend?</span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-xl mx-auto font-light">
              Your Addu adventure begins the moment you dive in. Let's turn your underwater dreams into reality.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary-dark text-white rounded-full px-10 py-8 text-lg font-bold group shadow-2xl shadow-primary/20"
                onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Plan Your Expedition
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/10 text-white hover:bg-white/5 rounded-full px-10 py-8 text-lg font-bold"
                onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View The Collection
              </Button>
            </div>
          </motion.div>

          {/* Background Decorative Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/5 rounded-full -z-10 animate-[spin_20s_linear_infinite]" />
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;