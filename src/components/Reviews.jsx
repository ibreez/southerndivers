import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useData } from '@/hooks/useData';

const Reviews = () => {
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
    <section id="reviews" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Quote className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary font-bold tracking-widest uppercase text-[10px]">Testimonials</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
            Diver <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400 italic">Stories</span>
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.05, y: -20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative bg-card/40 backdrop-blur-xl border border-border rounded-[3rem] p-10 md:p-16 shadow-2xl overflow-hidden"
              >
                {/* Decorative Giant Quote */}
                <Quote className="absolute -top-10 -right-10 w-48 h-48 text-primary/5 rotate-12" />

                <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
                  {/* Left Side: Reviewer Profile */}
                  <div className="flex flex-col items-center md:items-start shrink-0">
                    <div className="relative mb-6">
                      <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-primary/20">
                        {reviews[currentIndex].name.charAt(0)}
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-background border border-border p-2 rounded-xl">
                        <Globe className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                    
                    <div className="text-center md:text-left">
                      <h4 className="text-xl font-bold text-foreground">{reviews[currentIndex].name}</h4>
                      <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold mt-1">
                        {reviews[currentIndex].country}
                      </p>
                      <div className="flex gap-1 mt-4 justify-center md:justify-start">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < reviews[currentIndex].rating ? 'fill-primary text-primary' : 'text-muted/20'}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Quote Content */}
                  <div className="flex-grow">
                    <div className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-md w-fit mb-6">
                      {reviews[currentIndex].course}
                    </div>
                    <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-foreground leading-[1.3] tracking-tight italic">
                      "{reviews[currentIndex].text}"
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Premium Navigation Controls */}
            <div className="flex items-center justify-between mt-12 px-4">
              <div className="flex gap-2">
                {reviews.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 transition-all duration-500 rounded-full ${i === currentIndex ? 'w-12 bg-primary' : 'w-2 bg-primary/20'}`} 
                  />
                ))}
              </div>

              <div className="flex gap-4">
                <Button
                  variant="ghost"
                  onClick={prevReview}
                  className="rounded-full w-14 h-14 border border-border hover:bg-primary hover:text-white transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={nextReview}
                  className="rounded-full w-14 h-14 border border-border hover:bg-primary hover:text-white transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;