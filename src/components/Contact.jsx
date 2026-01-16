import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, MessageCircle, MousePointer2, ExternalLink } from 'lucide-react';

const Contact = memo(() => {
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Control') setIsCtrlPressed(true); };
    const handleKeyUp = (e) => { if (e.key === 'Control') setIsCtrlPressed(false); };
    
    window.addEventListener('keydown', handleKeyDown, { passive: true });
    window.addEventListener('keyup', handleKeyUp, { passive: true });
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const contactInfo = [
    { icon: MapPin, title: 'Base Location', content: ['South Palm Resort', 'Addu City, Maldives'], link: null },
    { icon: Phone, title: 'Direct Line', content: ['+960 793-9195', 'WhatsApp Active'], link: 'https://wa.me/9607939195' },
    { icon: Mail, title: 'Email Inquiries', content: ['info@southernmaldives.com'], link: 'mailto:info@southernmaldives.com' }
  ];

  return (
    <section id="contact" className="py-24 lg:py-40 relative overflow-hidden bg-background">
      {/* Background Ambience */}
      <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10 animate-pulse-glow" />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Column: Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12"
          >
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-primary font-black tracking-[0.2em] uppercase text-[10px]">Open Daily: 08:00 - 18:00</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-8 tracking-tighter">
                Start Your <br />
                <span className="text-primary italic font-serif">Journey</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-md font-medium leading-relaxed">
                Ready to explore the southernmost tip of the Maldives? Our crew is standing by.
              </p>
            </motion.div>

            <div className="grid gap-4">
              {contactInfo.map((item, idx) => (
                <motion.a
                  key={idx}
                  variants={itemVariants}
                  href={item.link}
                  target={item.link ? "_blank" : undefined}
                  className={`flex items-center gap-6 p-8 rounded-[2.5rem] bg-card/30 backdrop-blur-sm border border-primary/5 transition-all duration-300 group ${
                    item.link ? 'hover:border-primary/40 hover:bg-primary/[0.04] cursor-pointer active:scale-[0.98]' : 'cursor-default'
                  }`}
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform duration-500">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">{item.title}</h4>
                    {item.content.map((line, i) => (
                      <p key={i} className="text-lg font-bold text-foreground tracking-tight">{line}</p>
                    ))}
                  </div>
                  {item.link && <ExternalLink className="w-4 h-4 text-primary/20 group-hover:text-primary transition-colors" />}
                </motion.a>
              ))}
            </div>

            <motion.div variants={itemVariants} className="flex items-center gap-4 pt-4">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Facebook, label: 'Facebook' },
                { icon: MessageCircle, label: 'WhatsApp' }
              ].map((social, i) => (
                <button key={i} className="w-14 h-14 rounded-full border border-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-all duration-300">
                  <social.icon className="w-6 h-6" />
                </button>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive Map */}
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            viewport={{ once: true }}
            className="relative h-[650px] w-full"
          >
            {/* Map Frame Decoration */}
            <div className="absolute -inset-6 bg-gradient-to-br from-primary/20 to-transparent rounded-[4rem] blur-3xl opacity-30" />
            
            <div className="relative h-full w-full rounded-[3.5rem] overflow-hidden border border-primary/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] bg-card">
              
              <AnimatePresence>
                {!isCtrlPressed && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 bg-background/40 backdrop-blur-[4px] flex flex-col items-center justify-center pointer-events-auto"
                  >
                    <motion.div 
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="bg-background border border-primary/20 px-6 py-4 rounded-[2rem] shadow-2xl flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <MousePointer2 className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm font-black uppercase tracking-widest">
                        Hold <kbd className="bg-primary/10 px-2 py-1 rounded text-primary">Ctrl</kbd> to explore
                      </span>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=73.2000%2C-0.6200%2C73.2400%2C-0.5800&layer=mapnik"
                width="100%"
                height="100%"
                className="transition-all duration-1000"
                style={{ 
                  border: 0, 
                  filter: isCtrlPressed ? 'grayscale(0.2) contrast(1.1)' : 'grayscale(1) contrast(1.2) invert(90%) hue-rotate(180deg) brightness(0.9)',
                  pointerEvents: isCtrlPressed ? 'auto' : 'none' 
                }}
                loading="lazy"
                title="South Palm Resort Location"
              />
              
              {/* Bottom Navigation Badge */}
              <div className="absolute bottom-10 left-10 right-10 bg-background/90 backdrop-blur-xl border border-primary/10 p-6 rounded-3xl flex items-center justify-between z-30 shadow-2xl">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Coordinates</p>
                  <p className="text-lg font-bold text-foreground tracking-tight">0.6225° S, 73.2264° E</p>
                </div>
                <div className="h-10 w-px bg-primary/10 mx-4" />
                <div className="text-right space-y-1">
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Location</p>
                  <p className="text-lg font-bold text-foreground tracking-tight">South Palm Resort</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';
export default Contact;