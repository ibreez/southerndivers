import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { X, Send, CheckCircle2 } from 'lucide-react';

const EnrollNow = memo(({ course, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: course || '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const courses = [
    'Open Water Course', 'Advanced Course', 'Divemaster Course',
    'Reef Dive', 'Manta Point', 'Night Dive', 'Wreck Diving',
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => onClose(), 3000);
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl mx-auto bg-card border border-primary/20 rounded-[3rem] p-12 text-center shadow-2xl"
      >
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-primary animate-bounce" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-4 tracking-tighter">Expedition Confirmed</h2>
        <p className="text-muted-foreground font-medium">We've received your request. Our dive master will contact you shortly to finalize your descent.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="max-w-4xl mx-auto bg-card/60 backdrop-blur-2xl rounded-[3rem] p-8 md:p-16 border border-primary/20 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden"
    >
      {/* Dynamic Background Ambience */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] -z-10 animate-pulse-glow" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] -z-10" />

      <button
        onClick={onClose}
        className="absolute top-8 right-8 text-muted-foreground hover:text-primary transition-all duration-300 hover:rotate-90"
      >
        <X className="w-8 h-8" />
      </button>

      <div className="text-center mb-12 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tighter">
          Ready to <span className="text-primary italic font-serif">Dive?</span>
        </h2>
        <p className="text-lg text-muted-foreground font-medium max-w-md mx-auto">
          Secure your spot in the crystal clear waters of Addu Atoll.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 ml-2">Full Name</Label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-6 py-4 rounded-2xl bg-background/50 border border-primary/10 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium"
              placeholder="E.g. Jacques Cousteau"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 ml-2">Email Address</Label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-6 py-4 rounded-2xl bg-background/50 border border-primary/10 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium"
              placeholder="diver@example.com"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 ml-2">Contact Number</Label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-6 py-4 rounded-2xl bg-background/50 border border-primary/10 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium"
              placeholder="+960 000-0000"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="course" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 ml-2">Selected Course</Label>
            <div className="relative">
              <select
                id="course"
                name="course"
                required
                value={formData.course}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-2xl bg-background/50 border border-primary/10 text-foreground appearance-none focus:ring-2 focus:ring-primary outline-none transition-all font-medium"
              >
                <option value="" className="bg-card">Choose your adventure...</option>
                {courses.map((c) => (
                  <option key={c} value={c} className="bg-card">{c}</option>
                ))}
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-primary/40">
                <Send className="w-4 h-4 rotate-90" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="message" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 ml-2">Special Requirements</Label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-6 py-4 rounded-2xl bg-background/50 border border-primary/10 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary outline-none transition-all resize-none font-medium"
            placeholder="Tell us about your dive experience or equipment needs..."
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-8 text-xl font-black uppercase tracking-[0.2em] bg-primary text-primary-foreground hover:scale-[1.02] active:scale-[0.98] rounded-2xl shadow-2xl shadow-primary/20 transition-all duration-300 group"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </span>
          ) : (
            <span className="flex items-center gap-3">
              Confirm Enrollment
              <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </span>
          )}
        </Button>
      </form>
    </motion.div>
  );
});

EnrollNow.displayName = 'EnrollNow';
export default EnrollNow;