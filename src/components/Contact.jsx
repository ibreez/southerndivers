import React, { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, MessageCircle, MousePointer2 } from 'lucide-react';

const Contact = memo(() => {
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);

  // Listen for Ctrl key globally - optimized with passive listener
  useEffect(() => {
    const handleKeyDown = (e) => { 
      if (e.key === 'Control' && !isCtrlPressed) setIsCtrlPressed(true); 
    };
    const handleKeyUp = (e) => { 
      if (e.key === 'Control' && isCtrlPressed) setIsCtrlPressed(false); 
    };
    
    window.addEventListener('keydown', handleKeyDown, { passive: true });
    window.addEventListener('keyup', handleKeyUp, { passive: true });
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isCtrlPressed]);

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Base Location',
      content: ['South Palm Resort', 'Addu City, Maldives'],
      link: null
    },
    {
      icon: Phone,
      title: 'Direct Line',
      content: ['+960 793-9195', 'WhatsApp Active'],
      link: 'https://wa.me/9607939195'
    },
    {
      icon: Mail,
      title: 'Email Inquiries',
      content: ['info@southernmaldives.com'],
      link: 'mailto:info@southernmaldives.com'
    }
  ];

  return (
    <section id="contact" className="py-24 lg:py-32 relative overflow-hidden bg-background">
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span className="text-primary font-bold tracking-widest uppercase text-[10px]">Open Daily: 08:00 - 18:00</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Connect With <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400 italic">Us</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-md">
                Planning your next descent? Reach out for custom packages or local dive conditions.
              </p>
            </motion.div>

            <div className="grid gap-4">
              {contactInfo.map((item, idx) => (
                <motion.a
                  key={idx}
                  href={item.link}
                  target={item.link ? "_blank" : undefined}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-6 p-6 rounded-[2rem] bg-card/40 border border-border transition-all duration-300 ${item.link ? 'hover:border-primary/50 hover:bg-primary/[0.03] cursor-pointer' : 'cursor-default'}`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 mb-1">{item.title}</h4>
                    {item.content.map((line, i) => (
                      <p key={i} className="text-foreground font-medium">{line}</p>
                    ))}
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-4">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Facebook, label: 'Facebook' },
                { icon: MessageCircle, label: 'WhatsApp' }
              ].map((social, i) => (
                <button key={i} className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
                  <social.icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          {/* Map Column with Ctrl-Zoom Control */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[600px] w-full group"
          >
            <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />
            
            <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden border border-border shadow-2xl">
              
              {/* Overlay blocker for scroll/zoom */}
              {!isCtrlPressed && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute inset-0 z-20 bg-background/20 backdrop-blur-[2px] flex items-center justify-center pointer-events-auto"
                >
                  <div className="bg-background/90 border border-border px-4 py-2 rounded-full shadow-xl flex items-center gap-2">
                    <MousePointer2 className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold uppercase tracking-tighter">Hold <kbd className="bg-muted px-1.5 py-0.5 rounded border">Ctrl</kbd> to interact with map</span>
                  </div>
                </motion.div>
              )}

              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=73.2000%2C-0.6000%2C73.2400%2C-0.5600&layer=mapnik"
                width="100%"
                height="100%"
                className={`grayscale contrast-125 transition-all duration-700 ${isCtrlPressed ? 'opacity-100 grayscale-0' : 'opacity-100'}`}
                style={{ 
                  border: 0, 
                  filter: isCtrlPressed ? '' : 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)',
                  pointerEvents: isCtrlPressed ? 'auto' : 'none' 
                }}
                loading="lazy"
                title="South Palm Resort Map"
              ></iframe>
              
              <div className="absolute bottom-8 left-8 right-8 bg-background/80 backdrop-blur-md border border-border p-5 rounded-2xl flex items-center justify-between z-30">
                <div>
                  <p className="text-xs font-bold text-primary uppercase tracking-tighter">Coordinates</p>
                  <p className="text-sm font-medium text-foreground">0.6225° S, 73.2264° E</p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="text-right">
                  <p className="text-xs font-bold text-primary uppercase tracking-tighter">Atoll</p>
                  <p className="text-sm font-medium text-foreground">Seenu / Addu</p>
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