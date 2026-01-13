import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Coffee, CreditCard } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Packages from '@/components/Packages';

const PackagesPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => setDarkMode(!darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Package Benefits
  const benefits = [
    { icon: Calendar, text: "Flexible Booking" },
    { icon: Coffee, text: "Resort Transfers" },
    { icon: Sparkles, text: "Equipment Included" },
    { icon: CreditCard, text: "No Hidden Fees" }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 transition-colors duration-500 overflow-hidden">
      <Helmet>
        <title>Curated Dive Packages | Southern Maldives Divers</title>
        <meta name="description" content="Exclusive stay-and-dive packages in Addu Atoll. Discover all-inclusive underwater experiences tailored for every diver." />
      </Helmet>
      
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      
      <main className="relative">
        {/* Cinematic Header - "The Shallows" Light Effect */}
        <section className="relative pt-40 pb-16 lg:pt-52 lg:pb-28">
          <div className="absolute inset-0 z-0 overflow-hidden">
            {/* Caustic water light effect */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 dark:opacity-5" />
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-50 via-white to-blue-100 dark:from-slate-950 dark:via-slate-950 dark:to-blue-900/20" />
            
            {/* Animated Light Ray */}
            <motion.div 
              initial={{ rotate: -45, x: -500 }}
              animate={{ x: 500 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-1/2 w-[200px] h-[1000px] bg-gradient-to-r from-transparent via-white/40 dark:via-primary/5 to-transparent blur-3xl transform -translate-x-1/2"
            />
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter mb-6">
                TAILORED <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-emerald-500 italic">ESCAPES</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light leading-relaxed mb-10">
                Experience the deep south without the stress. We’ve bundled our finest dive sites with premium local hospitality for the ultimate atoll adventure.
              </p>

              {/* Quick Benefits Bar */}
              <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                {benefits.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <item.icon className="w-4 h-4 text-cyan-500" />
                    <span className="text-xs font-bold uppercase tracking-widest">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Packages Component with "Floating" Container */}
        <section className="relative z-10 pb-24">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Packages />
            </motion.div>
          </div>
        </section>

        {/* Custom Experience Section - Layered Visuals */}
        <section className="py-24 relative">
          <div className="container mx-auto px-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl shadow-cyan-900/5">
              {/* Decorative "Depth" circle */}
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-cyan-500/10 dark:bg-primary/5 rounded-full blur-3xl" />
              
              <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                    Don’t see your <span className="italic">Perfect Trip?</span>
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">
                    Every diver is different. Whether you're planning a honeymoon, a photographic expedition, or a large group retreat, our team can build a bespoke itinerary just for you.
                  </p>
                  <button className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-2xl hover:scale-105 transition-all shadow-lg shadow-cyan-600/20">
                    Request a Custom Quote
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-48 bg-slate-100 dark:bg-slate-800 rounded-3xl animate-pulse" />
                  <div className="h-48 mt-8 bg-slate-200 dark:bg-slate-800 rounded-3xl animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PackagesPage;