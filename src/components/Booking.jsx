import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calendar, Users, MessageCircle, Info, Compass, Anchor } from 'lucide-react';

const Booking = memo(() => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '1',
    service: '',
    message: '',
  });

  // Animation Variants
  const formContainerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 80, 
        damping: 20,
        staggerChildren: 0.05,
        delayChildren: 0.2
      } 
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const services = [
    'Open Water Course', 'Advanced Course', 'Divemaster Course',
    'Reef Dive', 'Manta Point', 'Night Dive', 'Wreck Diving',
    'Beginner Package', 'Adventure Package', 'Pro Package',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const phoneNumber = '9607939195';

    // Using Unicode escape sequences for maximum compatibility
    const icons = {
      wave: '\uD83C\uDF0A',
      user: '\uD83D\uDC64',
      email: '\uD83D\uDCE7',
      phone: '\uD83D\uDCDE',
      calendar: '\uD83D\uDDD3',
      group: '\uD83D\uDC65',
      scuba: '\uD83E\uDDBF',
      memo: '\uD83D\uDCDD'
    };

    const message = `${icons.wave} *New Dive Booking Request* ${icons.wave}

      ${icons.user} *Name:* ${formData.name}
      ${icons.email} *Email:* ${formData.email}
      ${icons.phone} *Phone:* ${formData.phone}
      ${icons.calendar} *Date:* ${formData.date}
      ${icons.group} *Guests:* ${formData.guests}
      ${icons.scuba} *Service:* ${formData.service}

      ${icons.memo} *Message:* ${formData.message}`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURL(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="booking" className="py-24 lg:py-40 relative overflow-hidden bg-background">
      
      {/* 1. HIGH-PERFORMANCE DECORATIVE LAYER */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none select-none overflow-hidden">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -left-32"
        >
          <Compass className="w-[600px] h-[600px] text-primary" strokeWidth={0.5} />
        </motion.div>

        <motion.div 
          animate={{ y: [0, -30, 0], rotate: [5, -5, 5] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 -right-20"
        >
          <Anchor className="w-[500px] h-[500px] text-primary" strokeWidth={0.5} />
        </motion.div>
      </div>

      {/* 2. AMBIENT GLOWS */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-primary/5 rounded-full blur-[140px] -z-10 animate-pulse-glow" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={formContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div variants={inputVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-primary font-black tracking-[0.2em] uppercase text-[10px]">Reservations Open</span>
            </motion.div>
            
            <motion.h2 variants={inputVariants} className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tighter">
              Ready to <span className="text-primary italic font-serif">Dive In?</span>
            </motion.h2>
            
            <motion.p variants={inputVariants} className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
              Fill out your expedition details below. Our team will contact you instantly via WhatsApp to finalize your dive.
            </motion.p>
          </div>

          <div className="relative group">
            {/* Form Glass Container */}
            <div className="relative z-10 bg-card/30 backdrop-blur-3xl border border-primary/10 rounded-[3rem] p-8 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 group-hover:border-primary/20">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                
                {[ 
                  { label: "Full Name", name: "name", type: "text", placeholder: "e.g. Jacques Cousteau" },
                  { label: "Email Address", name: "email", type: "email", placeholder: "explorer@ocean.com" },
                  { label: "Phone Number", name: "phone", type: "tel", placeholder: "+960 000-0000" },
                ].map((field) => (
                  <motion.div key={field.name} variants={inputVariants} className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/80 ml-1">{field.label}</Label>
                    <input
                      name={field.name}
                      type={field.type}
                      required
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="w-full bg-background/40 border border-primary/10 rounded-2xl px-6 py-4 text-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary/40 outline-none transition-all placeholder:text-muted-foreground/30"
                      placeholder={field.placeholder}
                    />
                  </motion.div>
                ))}

                <motion.div variants={inputVariants} className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/80 ml-1">Preferred Date</Label>
                  <div className="relative">
                    <input
                      name="date"
                      type="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full bg-background/40 border border-primary/10 rounded-2xl px-6 py-4 text-foreground focus:ring-2 focus:ring-primary/40 outline-none transition-all appearance-none"
                    />
                    <Calendar className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50 pointer-events-none" />
                  </div>
                </motion.div>

                <motion.div variants={inputVariants} className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/80 ml-1">Group Size</Label>
                  <div className="relative">
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full bg-background/40 border border-primary/10 rounded-2xl px-6 py-4 text-foreground focus:ring-2 focus:ring-primary/40 outline-none transition-all appearance-none"
                    >
                      {[1, 2, 3, 4, 5, 6].map(n => (
                        <option key={n} value={n} className="bg-card text-foreground">{n} {n === 1 ? 'Diver' : 'Divers'}</option>
                      ))}
                    </select>
                    <Users className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50 pointer-events-none" />
                  </div>
                </motion.div>

                <motion.div variants={inputVariants} className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/80 ml-1">Experience Type</Label>
                  <div className="relative">
                    <select
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-background/40 border border-primary/10 rounded-2xl px-6 py-4 text-foreground focus:ring-2 focus:ring-primary/40 outline-none transition-all appearance-none"
                    >
                      <option value="" className="bg-card">Select Adventure...</option>
                      {services.map(s => <option key={s} value={s} className="bg-card">{s}</option>)}
                    </select>
                    <Anchor className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50 pointer-events-none" />
                  </div>
                </motion.div>

                <motion.div variants={inputVariants} className="md:col-span-2 space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/80 ml-1">Special Notes</Label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-background/40 border border-primary/10 rounded-2xl px-6 py-4 text-foreground focus:ring-2 focus:ring-primary/40 outline-none transition-all resize-none"
                    placeholder="Certifications, equipment sizes, or special requests..."
                  />
                </motion.div>

                <motion.div variants={inputVariants} className="md:col-span-2 pt-6">
                  <Button
                    type="submit"
                    className="w-full py-10 rounded-3xl bg-primary text-primary-foreground hover:scale-[1.02] active:scale-95 shadow-2xl shadow-primary/30 flex items-center justify-center gap-4 group/btn transition-all duration-300"
                  >
                    <span className="text-xl font-black uppercase tracking-widest">Confirm via WhatsApp</span>
                    <MessageCircle className="w-6 h-6 group-hover/btn:rotate-12 transition-transform" />
                  </Button>
                  
                  <div className="flex items-center justify-center gap-2 mt-8 py-3 px-6 rounded-full bg-primary/5 w-fit mx-auto border border-primary/10">
                    <Info className="w-3 h-3 text-primary" />
                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-tighter">
                      Secure Direct-to-Center Booking
                    </p>
                  </div>
                </motion.div>
              </form>
            </div>
            
            {/* Soft background glow on hover */}
            <div className="absolute -inset-4 bg-primary/5 rounded-[4rem] -z-10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          </div>
        </motion.div>
      </div>
    </section>
  );
});

Booking.displayName = 'Booking';
export default Booking;