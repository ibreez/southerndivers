import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Anchor, Ship, Zap } from 'lucide-react';

const HighlightItem = memo(({ item, index, length }) => {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
      className="bg-card/40 backdrop-blur-md hover:bg-primary/[0.05] flex flex-col items-center text-center p-10 lg:p-12 transition-all duration-500 group relative overflow-hidden"
    >
      {/* Animated Background Pulse */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Decorative Corner Element */}
      <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/20 transition-all" />

      <div className="relative z-10">
        <div className="w-16 h-16 rounded-[1.25rem] bg-background shadow-inner flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 border border-primary/10">
          <Icon className="w-8 h-8 text-primary" />
        </div>
      </div>

      <div className="relative z-10">
        <h3 className="text-3xl font-black text-foreground mb-2 tracking-tighter">
          {item.title}
        </h3>
        <div className="flex items-center justify-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.25em]">
            {item.description}
          </p>
        </div>
      </div>

      {/* Modern Divider Logic */}
      {index !== length - 1 && (
        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-16 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
      )}
    </motion.div>
  );
});

HighlightItem.displayName = 'HighlightItem';

const Highlights = memo(() => {
  const highlights = [
    {
      icon: Award,
      title: 'SSI Pro',
      description: 'Diamond Status',
    },
    {
      icon: Users,
      title: '12k+',
      description: 'Global Divers',
    },
    {
      icon: Anchor,
      title: '24+',
      description: 'Unique Sites',
    },
    {
      icon: Ship,
      title: '08+',
      description: 'Years Active',
    },
  ];

  return (
    <section className="relative z-40 -mt-20 mb-32">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-[3.5rem] overflow-hidden border border-primary/10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] bg-card/30 backdrop-blur-2xl"
        >
          {highlights.map((item, index) => (
            <HighlightItem key={index} item={item} index={index} length={highlights.length} />
          ))}
        </motion.div>
        
        {/* Sub-label for trust */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 flex items-center justify-center gap-4 text-primary/40"
        >
          <div className="h-px w-12 bg-primary/10" />
          <Zap className="w-3 h-3 fill-current" />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Authorized Exploration Center</span>
          <Zap className="w-3 h-3 fill-current" />
          <div className="h-px w-12 bg-primary/10" />
        </motion.div>
      </div>
    </section>
  );
});

Highlights.displayName = 'Highlights';

export default Highlights;