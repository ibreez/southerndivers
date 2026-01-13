import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Award, CheckCircle2, Waves } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '@/hooks/useData';
import EnrollNowModal from '@/components/EnrollNowModal';

const Courses = ({ showViewAllButton = false }) => {
  const { data: courses = [] } = useData('courses');

  return (
    <section id="courses" className="py-24 lg:py-32 relative overflow-hidden bg-background">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Award className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary font-bold tracking-widest uppercase text-[10px]">PADI & SSI Authorized</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400 italic">Training</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
            Ascend through the ranks with our elite certification programs, 
            designed for both recreational explorers and aspiring professionals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.slice(0, 3).map((course, index) => (
            <motion.div
              key={course.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group relative flex flex-col h-full bg-card/40 backdrop-blur-xl border border-border rounded-[2.5rem] p-8 hover:border-primary/40 transition-all duration-500 overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Level Badge & Icon */}
              <div className="flex items-center justify-between mb-8">
                <div className="px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                  {course.level}
                </div>
                <Waves className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary transition-colors duration-500" />
              </div>

              {/* Title & Info */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {course.description}
                </p>
              </div>

              {/* Technical Specs Grid */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="flex items-center gap-3 bg-background/40 border border-border rounded-2xl p-3">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold text-foreground uppercase tracking-tighter">{course.duration}</span>
                </div>
                <div className="flex items-center gap-3 bg-background/40 border border-border rounded-2xl p-3">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold text-foreground uppercase tracking-tighter">{course.maxDepth}</span>
                </div>
              </div>

              {/* Feature List */}
              <div className="space-y-3 mb-10 flex-grow">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Curriculum Highlights</p>
                {course.includes?.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-xs text-muted-foreground font-medium">{item}</span>
                  </div>
                ))}
              </div>

              {/* Price & Action */}
              <div className="pt-6 border-t border-border flex items-center justify-between">
                <div>
                  <p className="text-3xl font-black text-foreground tracking-tighter">
                    {course.price}
                  </p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">All Inclusive</p>
                </div>
                <EnrollNowModal course={course.title} />
              </div>

              {/* Subtle Background Text */}
              <div className="absolute -bottom-4 -right-4 text-7xl font-black text-primary/[0.03] select-none pointer-events-none uppercase italic">
                {course.level?.split(' ')[0]}
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        {showViewAllButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/courses"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              View All Courses
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Courses;