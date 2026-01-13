import React, { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Waves, MapPin } from 'lucide-react';
import HeroImage from './HeroImage';
import { Link } from 'react-router-dom';
import { useWeather } from '@/hooks/useWeather';

const Hero = () => {
  const { visibility, loading } = useWeather();

  // Parallax effect for the background image
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);

  const bubbles = useMemo(() => 
    Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      duration: Math.random() * 15 + 20, // Slower for a more "underwater" feel
    })), []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      
      {/* 1. THEME-AWARE BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background transition-colors duration-700" />
        {/* Animated Glows */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[120px]" 
        />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[120px]" />
      </div>

      {/* 2. ENHANCED BUBBLE SYSTEM */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {bubbles.map((b) => (
          <motion.div
            key={b.id}
            initial={{ y: '110vh', opacity: 0 }}
            animate={{ y: '-20vh', opacity: [0, 0.3, 0] }}
            transition={{ 
              duration: b.duration, 
              repeat: Infinity, 
              delay: b.delay,
              ease: "linear" 
            }}
            className="absolute rounded-full bg-primary/10 border border-primary/20 backdrop-blur-[1px]"
            style={{ left: b.left, width: b.size, height: b.size }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-24 items-center">
          
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-4">
              <HeroImage className="text-primary w-5 h-5" /> {/* It will now be primary teal! */}
              <span className="text-xs font-bold tracking-widest uppercase text-primary">Explore Addu Atoll</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[1.05] mb-8 tracking-tight">
              Explore the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-primary-light italic font-serif">
                Deep Blue
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0 border-l-0 lg:border-l-4 border-primary/30 lg:pl-6">
              "In the silence of the ocean, you find the voice of your soul."
              <span className="block mt-2 text-sm not-italic font-medium opacity-60">— Discover Addu's Pristine Reefs</span>
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link to="/contact">
                <Button size="xl" className="rounded-full bg-primary text-primary-foreground hover:scale-105 transition-all shadow-xl shadow-primary/25 px-10 h-16 text-lg font-bold group">
                  Start Adventure
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="xl" variant="outline" className="rounded-full border-primary/20 hover:bg-primary/10 px-10 h-16 text-lg">
                  <Waves className="mr-2 w-5 h-5 text-primary" />
                  Our Packages
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* RIGHT VISUAL - PARALLAX CARD */}
          <motion.div
            style={{ y: y2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden border border-primary/10 shadow-2xl rotate-2 group">
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
              
              <motion.img 
                style={{ y: y1 }}
                src="https://images.unsplash.com/photo-1682687982470-8f1b0e79151a" 
                className="w-full h-[700px] object-cover scale-110"
                alt="Underwater World"
              />
              
              {/* Stats Overlay */}
              <div className="absolute top-8 right-8 z-20">
                <div className="bg-background/40 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl flex items-center gap-3">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                    {loading ? "Calculating..." : `Visibility ${visibility}`}
                  </span>
                </div>
              </div>

              {/* Bottom Card Detail */}
              <div className="absolute bottom-8 left-8 right-8 z-20">
                <div className="p-8 rounded-[2rem] bg-background/20 backdrop-blur-2xl border border-white/10 shadow-inner">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2 text-primary-light mb-1">
                        <MapPin className="w-3 h-3" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">British Loyalty Wreck</span>
                      </div>
                      <h3 className="text-3xl font-bold text-white tracking-tight">Addu Atoll</h3>
                    </div>
                    <div className="h-12 w-12 rounded-full border border-primary/30 flex items-center justify-center bg-primary/10">
                       <Waves className="w-6 h-6 text-primary-light" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Backglow and Ring */}
            <div className="absolute -inset-4 border border-primary/10 rounded-[3.5rem] rotate-2 -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-primary/10 rounded-full blur-[100px] -z-20" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;