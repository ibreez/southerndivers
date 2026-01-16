import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote, Globe, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useData } from '@/hooks/useData';

const Reviews = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: reviews = [] } = useData('reviews');

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  if (reviews.length === 0) return null;

  return (
    <section id="reviews" className="py-24 lg:py-40 relative overflow-hidden bg-background">
      {/* Immersive Background Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[160px] rounded-full -z-10" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Quote className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary font-black tracking-[0.3em] uppercase text-[10px]">Verified Logbooks</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-foreground tracking-tighter leading-none">
            Diver <span className="text-primary italic font-serif">Narratives</span>
          </h2>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.98 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className="relative bg-card/40 backdrop-blur-3xl border border-primary/5 rounded-[4rem] p-12 md:p-20 shadow-[0_32px_120px_-20px_rgba(0,0,0,0.3)] overflow-hidden"
              >
                {/* Decorative Elements */}
                <Quote className="absolute -top-12 -right-12 w-64 h-64 text-primary/5 -rotate-12 pointer-events-none" />
                <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-br-[4rem]" />

                <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-start relative z-10">
                  {/* Left Side: Professional Profile Card */}
                  <div className="flex flex-col items-center lg:items-start shrink-0">
                    <div className="relative mb-8">
                      <div className="w-32 h-32 rounded-[3rem] bg-gradient-to-br from-primary via-cyan-500 to-blue-600 flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-primary/20 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                        {reviews[currentIndex].name.charAt(0)}
                      </div>
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -bottom-2 -right-2 bg-background border-2 border-primary/20 p-3 rounded-2xl shadow-xl"
                      >
                        <Globe className="w-5 h-5 text-primary" />
                      </motion.div>
                    </div>
                    
                    <div className="text-center lg:text-left">
                      <h4 className="text-2xl font-black text-foreground tracking-tight">{reviews[currentIndex].name}</h4>
                      <p className="text-primary font-bold text-[10px] uppercase tracking-[0.3em] mt-2 bg-primary/10 px-3 py-1 rounded-lg inline-block">
                        {reviews[currentIndex].country}
                      </p>
                      <div className="flex gap-1.5 mt-6 justify-center lg:justify-start">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < reviews[currentIndex].rating ? 'fill-primary text-primary' : 'text-primary/10'}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Side: The Story */}
                  <div className="flex-grow flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="h-px w-8 bg-primary/30" />
                      <span className="text-[10px] font-black text-primary/50 uppercase tracking-[0.4em]">
                        {reviews[currentIndex].course || 'Expedition Experience'}
                      </span>
                    </div>
                    <p className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground leading-[1.15] tracking-tight italic font-serif">
                      "{reviews[currentIndex].text}"
                    </p>
                    
                    <div className="mt-12 flex items-center gap-4 text-muted-foreground/60">
                      <ArrowRight className="w-4 h-4 text-primary" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Verified Guest Log</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* High-End Navigation Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between mt-16 gap-8 px-8">
              <div className="flex items-center gap-3">
                {reviews.map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-1.5 transition-all duration-700 rounded-full ${
                      i === currentIndex ? 'w-16 bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]' : 'w-3 bg-primary/20 hover:bg-primary/40'
                    }`} 
                  />
                ))}
              </div>

              <div className="flex gap-6">
                <button
                  onClick={prevReview}
                  className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-colors"
                >
                  <div className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center group-hover:border-primary transition-all">
                    <ChevronLeft className="w-5 h-5" />
                  </div>
                  Prev
                </button>
                <div className="w-px h-12 bg-primary/10" />
                <button
                  onClick={nextReview}
                  className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-colors"
                >
                  Next
                  <div className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center group-hover:border-primary transition-all">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Reviews.displayName = 'Reviews';
export default Reviews;