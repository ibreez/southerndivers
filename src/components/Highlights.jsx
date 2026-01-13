import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Anchor, Ship } from 'lucide-react';

const Highlights = () => {
  const highlights = [
    {
      icon: Award,
      title: 'SSI Certified',
      description: '5-Star Excellence',
    },
    {
      icon: Users,
      title: '10,000+',
      description: 'Active Explorers',
    },
    {
      icon: Anchor,
      title: '20+',
      description: 'Pristine Sites',
    },
    {
      icon: Ship,
      title: '7+ Years',
      description: 'Local Expertise',
    },
  ];

  return (
    <section className="relative z-30 -mt-16 mb-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-primary/10 rounded-[2.5rem] overflow-hidden border border-primary/20 shadow-2xl backdrop-blur-xl">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card/80 dark:bg-card/40 hover:bg-primary/[0.03] flex flex-col items-center text-center p-8 lg:p-10 transition-all duration-500 group relative"
              >
                {/* Decorative Inner Light (Dark Mode Only) */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:rotate-[10deg] transition-transform duration-500">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  {/* Subtle sparkle effect behind icon */}
                  <div className="absolute -inset-1 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-1 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-xs font-bold uppercase tracking-[0.15em] opacity-70">
                  {item.description}
                </p>

                {/* Vertical Divider (Desktop Only) */}
                {index !== highlights.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-12 w-px bg-primary/20" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Highlights;