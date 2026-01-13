import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { X } from 'lucide-react';

const EnrollNow = ({ course, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: course || '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    // ... logic remains the same
    setIsSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      /* FIXED: Border and Shadow now use semantic theme colors */
      className="max-w-4xl mx-auto glass-card-1 rounded-3xl p-8 md:p-12 border border-primary/20 shadow-lg shadow-primary/10 relative overflow-hidden"
    >
      {/* Decorative Background Bubbles - bg-primary and bg-secondary are already theme-aware */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-[80px] -z-10"></div>

      <button
        onClick={onClose}
        /* FIXED: Using text-muted-foreground instead of hardcoded white hover */
        className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors z-10"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="text-center mb-12 relative z-10">
        {/* FIXED: text-foreground handles the dark-to-light swap automatically */}
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Enroll Now
        </h2>
        {/* FIXED: Removed text-slate-400 which was being blocked by your index.css override */}
        <p className="text-muted-foreground">
          Fill out the form below to start your diving adventure. We'll confirm availability via email.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground ml-1">Full Name</Label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              /* These classes already use your background/border variables */
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground ml-1">Email Address</Label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-foreground ml-1">Phone Number</Label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="+1 234 567 8900"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="course" className="text-foreground ml-1">Course</Label>
            <select
              id="course"
              name="course"
              required
              value={formData.course}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none"
            >
              <option value="" className="bg-card text-foreground">Select a course...</option>
              {courses.map((course) => (
                <option key={course} value={course} className="bg-card text-foreground">
                  {course}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-foreground ml-1">Additional Message</Label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
            placeholder="Any special requests or questions?"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          /* FIXED: Primary button now uses primary-foreground for text color */
          className="w-full py-6 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-lg shadow-primary/20"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Submit Enrollment'}
        </Button>
      </form>
    </motion.div>
  );
};

export default EnrollNow;