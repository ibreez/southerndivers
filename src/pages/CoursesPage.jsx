import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Waves, Award, Anchor, BookOpen } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Courses from '@/components/Courses';

const CoursesPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => setDarkMode(!darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Visual highlights for the course levels
  const stats = [
    { icon: Award, label: "PADI Certified", detail: "Global Recognition" },
    { icon: BookOpen, label: "All Levels", detail: "Beginner to Pro" },
    { icon: Anchor, label: "Deep Training", detail: "30m+ Specialities" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 transition-colors duration-500 overflow-hidden">
      <Helmet>
        <title>Professional Courses | Southern Maldives Divers</title>
        <meta name="description" content="Master the art of diving in the Maldives. PADI certified training from Open Water to professional levels." />
      </Helmet>
      
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      
      <main className="relative">
        {/* Cinematic Hero Section - Immersive Depth */}
        <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-32">
          {/* Animated Background Layers */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-100/40 via-transparent to-transparent dark:from-blue-600/10" />
            
            {/* Ambient "Light Rays" effect */}
            <motion.div 
              animate={{ 
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute -top-24 -left-24 w-[600px] h-[600px] bg-cyan-200/30 dark:bg-primary/5 blur-[120px] rounded-full" 
            />
          </div>

          {/* Animated Background Layers */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Base Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-100/60 via-transparent to-transparent dark:from-blue-900/20" />
            
            {/* Primary Ambient Light (Top Left) */}
            <motion.div 
              animate={{ 
                opacity: [0.4, 0.6, 0.4],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-cyan-300/40 dark:bg-blue-600/20 blur-[100px] rounded-full" 
            />

            {/* Secondary Ambient Light (Center Right) - Adds Depth */}
            <motion.div 
              animate={{ 
                opacity: [0.2, 0.4, 0.2],
                x: [0, 50, 0],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-blue-400/20 dark:bg-cyan-500/10 blur-[120px] rounded-full" 
            />
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100/50 dark:bg-primary/10 border border-cyan-200 dark:border-primary/20 text-cyan-700 dark:text-primary-foreground text-xs font-bold uppercase tracking-widest mb-8">
                <Waves className="w-4 h-4 animate-pulse" />
                Unlock the Blue
              </div>
              
              <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter mb-8">
                EVOLVE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 italic">SKILLS</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                From your first breath underwater to professional mastery. Experience world-class PADI training in the crystal clear depths of Addu Atoll.
              </p>
            </motion.div>
          </div>

        </section>

        {/* Course Stats / Quick Info */}
        <section className="relative z-10 -mt-10 mb-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-6 rounded-3xl flex items-center gap-5 shadow-xl shadow-slate-200/50 dark:shadow-none"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white leading-tight">{item.label}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* The Main Courses Component */}
        <section className="pb-24">
          <Courses />
        </section>

        {/* Professional Path CTA - Matches the "Conservation Block" on About page */}
        <section className="py-24 container mx-auto px-6">
  <motion.div 
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="relative rounded-[3rem] overflow-hidden group"
  >
    {/* High-End Border Glow Effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-600/20 dark:from-primary/10 dark:to-transparent" />

    <div className="relative bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 dark:border-slate-800 rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl">
      
      {/* Content Section */}
      <div className="max-w-xl text-left z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-8 bg-cyan-500" />
          <span className="text-cyan-600 dark:text-primary font-bold tracking-[0.2em] text-[10px] uppercase">
            Professional Career Path
          </span>
        </div>
        
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mt-4 mb-6 leading-[1.1]">
          Ready to lead the <br />
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
            Adventure?
          </span>
        </h2>
        
        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-10">
          Become a PADI Divemaster or Instructor with our elite internship programs. 
          Transform your passion into a career in the world's most beautiful office.
        </p>

        <button className="group relative px-8 py-4 bg-primary hover:bg-primary-dark hover:text-white text-white dark:text-slate-900 rounded-2xl font-bold overflow-hidden transition-all hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.5)]">
          <span className="relative z-10">Inquire for Pro Training</span>
          <motion.div 
            className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" 
          />
        </button>
      </div>
      
      {/* Restyled Sonar / Viewport Element */}
      <div className="relative w-full lg:w-[40%] aspect-square flex items-center justify-center">
        {/* Outer Ring */}
        <div className="absolute inset-0 border-[12px] border-slate-100/50 dark:border-slate-800/50 rounded-full shadow-inner" />
        
        {/* Animated Sonar Ping */}
        <motion.div
          animate={{ 
            scale: [1, 2],
            opacity: [0.5, 0]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
          className="absolute w-32 h-32 bg-cyan-500/20 dark:bg-primary/20 rounded-full"
        />

        {/* Rotating Radar Sweep */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute w-[80%] h-[80%] rounded-full border border-cyan-500/10 dark:border-primary/5 bg-gradient-to-tr from-cyan-500/20 via-transparent to-transparent"
        />

        {/* Center Hub */}
        <div className="relative z-10 w-32 h-32 bg-white dark:bg-slate-800 rounded-full shadow-2xl flex items-center justify-center border border-slate-200 dark:border-slate-700">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Anchor className="w-12 h-12 text-cyan-600 dark:text-primary" />
          </motion.div>
        </div>

        {/* Decorative Grid Lines mimicking a navigation screen */}
        <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-0 w-full h-px bg-slate-500" />
          <div className="absolute left-1/2 top-0 w-px h-full bg-slate-500" />
        </div>
      </div>

    </div>
  </motion.div>
</section>
      </main>

      <Footer />
    </div>
  );
};

export default CoursesPage;