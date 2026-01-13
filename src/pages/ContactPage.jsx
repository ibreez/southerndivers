import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageCircle, Send } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Booking from '@/components/Booking';
import Contact from '@/components/Contact';

const ContactPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => setDarkMode(!darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const contactMethods = [
    { icon: Phone, label: "WhatsApp & Call", value: "+960 793-9195" },
    { icon: Mail, label: "Inquiries", value: "info@southernmaldives.com" },
    { icon: MapPin, label: "Dive Base", value: "South Palm Resort, Addu" }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 transition-colors duration-500">
      <Helmet>
        <title>Contact Us | Southern Maldives Divers</title>
      </Helmet>
      
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      
      <main className="relative overflow-hidden">
        {/* --- HERO SECTION --- */}
        <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-32">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-100/50 via-transparent to-transparent dark:from-primary/10" />
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-cyan-900/30 border border-slate-200 dark:border-cyan-800 mb-6 shadow-sm">
                <Send className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span className="text-cyan-600 dark:text-cyan-400 font-bold tracking-widest uppercase text-[10px]">Open Daily 08:00 - 18:00</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter mb-6">
                GET IN <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 italic">TOUCH</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                Whether you’re a pro diver or a first-timer, our concierge team is ready to tailor your Maldivian underwater experience.
              </p>
            </motion.div>
          </div>
        </section>

        {/* --- QUICK CONTACT GRID --- */}
        <section className="py-24 bg-white dark:bg-slate-900/50 backdrop-blur-sm border-y border-slate-200 dark:border-slate-800 transition-colors">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12">
              {contactMethods.map((method, i) => (
                <div key={i} className="flex flex-col items-center text-center space-y-4 group">
                  <div className="w-16 h-16 bg-cyan-50 dark:bg-cyan-950/50 rounded-2xl flex items-center justify-center text-cyan-600 dark:text-cyan-400 border border-cyan-100 dark:border-cyan-800 transition-transform group-hover:scale-110">
                    <method.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">{method.label}</h3>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{method.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION 1: RESERVATIONS (Stacked, Full Width) --- */}
        <section className="py-24 bg-white dark:bg-slate-950 transition-colors">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-12">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic"
                >
                  01. <span className="text-cyan-600">Reservations</span>
                </motion.h2>
                <div className="w-full h-px bg-slate-200 dark:bg-slate-800 mt-6" />
              </div>

              <div className="relative group">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-cyan-500/5 dark:bg-cyan-500/10 blur-3xl rounded-full translate-y-10" />
                
                <div className="relative rounded-[4rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 md:p-20 shadow-2xl shadow-slate-200/50 dark:shadow-none transition-all duration-500">
                  <div className="w-full">
                    <Booking />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 2: CONNECT WITH US (Stacked, Full Width) --- */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900/30 border-y border-slate-200 dark:border-slate-800 transition-colors">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div className="max-w-2xl">
                  <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic"
                  >
                    02. <span className="text-cyan-600">Connect</span>
                  </motion.h2>
                  <p className="text-xl text-slate-500 dark:text-slate-400 mt-4 font-light leading-relaxed">
                    General inquiries regarding dive sites, logistics, and customized atoll expeditions.
                  </p>
                </div>
                <div className="px-6 py-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold tracking-widest text-xs uppercase">Avg Response: 2 hours</span>
                </div>
              </div>

              <div className="rounded-[4rem] bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/5 p-10 md:p-20 shadow-2xl shadow-slate-200/50 dark:shadow-none transition-all">
                <div className="w-full">
                  <Contact />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 3: DIRECT SUPPORT (WhatsApp Banner) --- */}
        <section className="py-24 bg-white dark:bg-slate-950 transition-colors">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="relative overflow-hidden rounded-[4rem] bg-gradient-to-r from-cyan-600 to-blue-700 p-12 md:p-20 group shadow-2xl shadow-cyan-200/50 dark:shadow-none">
                {/* Decorative Pattern Overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] invert dark:invert-0 transition-opacity" />
                
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                  <div className="text-center lg:text-left">
                    <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-6">
                      Need Fast <br/> Assistance?
                    </h3>
                    <p className="text-cyan-50 text-xl max-w-md font-light opacity-90">
                      Skip the forms and message our dive masters directly via WhatsApp for urgent bookings.
                    </p>
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open('https://wa.me/9607939195', '_blank')}
                    className="group relative flex items-center gap-6 rounded-full bg-white px-12 py-8 text-lg font-black uppercase tracking-widest text-cyan-700 transition-all shadow-xl overflow-hidden"
                  >
                    <MessageCircle className="h-6 w-6" />
                    <span className="relative z-10">Open WhatsApp Chat</span>
                    <div className="absolute inset-0 bg-cyan-50 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </motion.button>
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

export default ContactPage;