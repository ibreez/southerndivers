import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calendar, Users, MessageCircle, Info, Compass, Anchor } from 'lucide-react'; // Changed icons

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '1',
    service: '',
    message: '',
  });

  const services = [
    'Open Water Course',
    'Advanced Course',
    'Divemaster Course',
    'Reef Dive',
    'Manta Point',
    'Night Dive',
    'Wreck Diving',
    'Beginner Package',
    'Adventure Package',
    'Pro Package',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const phoneNumber = '9607345678';
    const message = `🌊 *New Dive Booking Request* 🌊\n\n👤 *Name:* ${formData.name}\n📧 *Email:* ${formData.email}\n📞 *Phone:* ${formData.phone}\n🗓️ *Date:* ${formData.date}\n👥 *Guests:* ${formData.guests}\n🤿 *Service:* ${formData.service}\n\n📝 *Message:* ${formData.message}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="booking" className="py-24 lg:py-32 relative overflow-hidden">
      
      {/* Decorative Nautical Watermarks */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
        {/* Large Compass in Top Left */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20"
        >
          <Compass className="w-[500px] h-[500px] text-primary" strokeWidth={1} />
        </motion.div>

        {/* Anchor in Bottom Right */}
        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-10 -right-10"
        >
          <Anchor className="w-[400px] h-[400px] text-cyan-500" strokeWidth={1} />
        </motion.div>
      </div>

      {/* Background Orbs */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Header Area */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-primary font-bold tracking-widest uppercase text-[10px]">Reservations Open</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Book Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400 italic">Adventure</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Ready to explore the depths? Share your details and we'll coordinate your expedition via WhatsApp.
            </p>
          </div>

          <div className="relative group">
            {/* Form Container */}
            <div className="relative z-10 bg-card/40 backdrop-blur-2xl border border-border rounded-[2.5rem] p-8 md:p-14 shadow-2xl">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Form fields remain exactly the same as your original code */}
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-primary ml-1">Full Name</Label>
                  <input
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-background/50 border border-border rounded-2xl px-5 py-4 text-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all placeholder:text-muted-foreground/30"
                    placeholder="e.g. Jacques Cousteau"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-primary ml-1">Email</Label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-background/50 border border-border rounded-2xl px-5 py-4 text-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all placeholder:text-muted-foreground/30"
                    placeholder="explorer@ocean.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-primary ml-1">Phone Number</Label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-background/50 border border-border rounded-2xl px-5 py-4 text-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                    placeholder="+960 000-0000"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-primary ml-1">Preferred Date</Label>
                  <div className="relative">
                    <input
                      name="date"
                      type="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full bg-background/50 border border-border rounded-2xl px-5 py-4 text-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all appearance-none"
                    />
                    <Calendar className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-primary ml-1">Group Size</Label>
                  <div className="relative">
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full bg-background/50 border border-border rounded-2xl px-5 py-4 text-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all appearance-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                        <option key={n} value={n} className="bg-card">{n} {n === 1 ? 'Diver' : 'Divers'}</option>
                      ))}
                    </select>
                    <Users className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-primary ml-1">Select Experience</Label>
                  <select
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-background/50 border border-border rounded-2xl px-5 py-4 text-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all appearance-none"
                  >
                    <option value="" className="bg-card">Choose an activity...</option>
                    {services.map(s => <option key={s} value={s} className="bg-card">{s}</option>)}
                  </select>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-primary ml-1">Special Requirements</Label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-background/50 border border-border rounded-2xl px-5 py-4 text-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all resize-none"
                    placeholder="Tell us about your certification level or any equipment needs..."
                  />
                </div>

                <div className="md:col-span-2 pt-4">
                  <Button
                    type="submit"
                    className="w-full py-8 rounded-[1.5rem] bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group/btn transition-all active:scale-95"
                  >
                    <span className="text-lg font-bold">Request Reservation</span>
                    <MessageCircle className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </Button>
                  <p className="flex items-center justify-center gap-2 mt-6 text-[11px] text-muted-foreground font-medium uppercase tracking-tighter">
                    <Info className="w-3 h-3 text-primary" />
                    This request will be sent to our dive center via WhatsApp
                  </p>
                </div>
              </form>
            </div>
            
            <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] -z-10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Booking;