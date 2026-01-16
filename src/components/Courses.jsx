import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Award, CheckCircle2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '@/hooks/useData';
import EnrollNowModal from '@/components/EnrollNowModal';

const Courses = memo(({ showViewAllButton = false }) => {
  const { data: courses = [] } = useData('courses');

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 }
    }
  };

  return (
    <section id="courses" className="py-24 lg:py-40 relative overflow-hidden bg-background">
      {/* High-Performance Decorative Layer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute -top-48 -left-48 w-[600px] h-[600px] bg-primary/5 blur-[140px] rounded-full -z-10 animate-pulse-glow" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <motion.div 
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Award className="w-4 h-4 text-primary" />
            <span className="text-primary font-black tracking-[0.2em] uppercase text-[10px]">PADI & SSI Authorized Center</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-bold text-foreground tracking-tighter mb-6">
            Elite <span className="text-primary italic font-serif">Training</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            From your first breath underwater to professional mastery, our globally recognized certifications set the gold standard.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {courses.slice(0, 3).map((course, index) => (
            <motion.div
              key={course.id || index}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group relative flex flex-col h-full bg-card/30 backdrop-blur-md border border-primary/10 rounded-[3rem] p-10 hover:border-primary/40 hover:bg-primary/[0.02] transition-all duration-500 overflow-hidden shadow-2xl shadow-black/5"
            >
              {/* Dynamic Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-cyan-400 to-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

              {/* Header Info */}
              <div className="flex items-center justify-between mb-10">
                <div className="px-4 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                  {course.level}
                </div>
                <div className="w-10 h-10 rounded-full bg-background/50 flex items-center justify-center border border-primary/5 group-hover:border-primary/20 transition-colors">
                   <Award className="w-5 h-5 text-muted-foreground/40 group-hover:text-primary transition-colors duration-500" />
                </div>
              </div>

              {/* Title & Description */}
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-foreground mb-4 tracking-tight group-hover:text-primary transition-colors duration-300">
                  {course.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed font-medium">
                  {course.description}
                </p>
              </div>

              {/* Hardware Specs Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex flex-col gap-1 bg-background/60 border border-primary/5 rounded-2xl p-4 group-hover:bg-background transition-colors">
                  <Clock className="w-4 h-4 text-primary mb-1" />
                  <span className="text-[10px] font-black text-primary/60 uppercase tracking-widest">Duration</span>
                  <span className="text-sm font-bold text-foreground">{course.duration}</span>
                </div>
                <div className="flex flex-col gap-1 bg-background/60 border border-primary/5 rounded-2xl p-4 group-hover:bg-background transition-colors">
                  <Users className="w-4 h-4 text-primary mb-1" />
                  <span className="text-[10px] font-black text-primary/60 uppercase tracking-widest">Depth</span>
                  <span className="text-sm font-bold text-foreground">{course.maxDepth}</span>
                </div>
              </div>

              {/* Highlight Checklist */}
              <div className="space-y-4 mb-12 flex-grow">
                <p className="text-[10px] font-black text-primary/40 uppercase tracking-[0.3em] mb-4">Mastery Syllabus</p>
                {course.includes?.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 group/item">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5 opacity-60 group-hover/item:opacity-100 transition-opacity" />
                    <span className="text-xs text-muted-foreground font-semibold group-hover:text-foreground transition-colors">{item}</span>
                  </div>
                ))}
              </div>

              {/* Footer: Price & Modal */}
              <div className="pt-8 border-t border-primary/5 flex items-center justify-between mt-auto">
                <div>
                  <p className="text-4xl font-black text-foreground tracking-tighter">
                    {course.price}
                  </p>
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mt-1">Full Certification</p>
                </div>
                <EnrollNowModal course={course.title} />
              </div>

              {/* Floating Decorative Label */}
              <div className="absolute -bottom-6 -right-6 text-9xl font-black text-primary/[0.02] select-none pointer-events-none uppercase italic group-hover:text-primary/[0.04] transition-colors duration-700">
                {course.level?.split(' ')[0]}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {showViewAllButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <Link
              to="/courses"
              onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
              className="inline-flex items-center gap-4 px-12 py-6 bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] rounded-full hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl shadow-primary/20 group"
            >
              Explore All Programs
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
});

Courses.displayName = 'Courses';
export default Courses;