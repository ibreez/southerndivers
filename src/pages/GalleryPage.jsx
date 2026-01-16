import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Camera, PlayCircle, Instagram, Maximize } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Gallery from '@/components/Gallery';

const GalleryPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => setDarkMode(!darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 transition-colors duration-500 overflow-hidden">
      <Helmet>
        <title>Visual Journey | Southern Maldives Divers</title>
        <meta name="description" content="Witness the majesty of Addu Atoll. A curated gallery of manta rays, shipwrecks, and coral life." />
      </Helmet>
      
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      
      <main className="relative">
        {/* Cinematic Header - The "Viewing Port" */}
        <section className="relative pt-40 pb-16 lg:pt-52 lg:pb-24">
          <div className="absolute inset-0 z-0 pointer-events-none">
            {/* Deep Sea Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-100/20 via-transparent to-transparent dark:from-blue-900/10" />
            
            {/* Floating Particles (Marine Snow) */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [-20, 20],
                  opacity: [0.2, 0.5, 0.2],
                  x: i % 2 === 0 ? [-10, 10] : [10, -10]
                }}
                transition={{
                  duration: 5 + i,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute w-1 h-1 bg-cyan-400 dark:bg-primary/40 rounded-full blur-[1px]"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter mb-6">
                THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-400 italic">SILENT</span> WORLD
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                Capturing the ephemeral beauty of the deep south. Every frame is a tribute to the vibrant life of the Addu Biosphere Reserve.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Media Controls / Filter Bar Placeholder (matches About Page values bar style) */}
        <section className="container mx-auto px-6 mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            <button className="flex items-center gap-2 px-6 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-cyan-500 transition-colors">
              <Camera className="w-4 h-4" /> Photography
            </button>
            <button className="flex items-center gap-2 px-6 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-cyan-500 transition-colors">
              <PlayCircle className="w-4 h-4" /> Expeditions
            </button>
          </div>
        </section>

        {/* Main Gallery Component */}
        <section className="container mx-auto px-6 pb-24">
          <div className="rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-slate-900/30 p-2 md:p-4 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-cyan-900/5">
            <Gallery />
          </div>
        </section>

        {/* Social Integration - "The Reef Feed" */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-6 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Instagram className="w-12 h-12 mx-auto text-pink-500/80" />
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                Follow the <span className="text-cyan-600">Daily Descent</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
                We post daily sightings from our morning dives. Join our community on Instagram to see what's swimming today.
              </p>
              <a 
                href="https://www.instagram.com/southern_maldives/" target="_blank" 
                className="inline-block mt-4 px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all"
              >
                @SouthernMaldivesDivers
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default GalleryPage;