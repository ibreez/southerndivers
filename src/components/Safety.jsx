import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Heart, Wrench } from 'lucide-react';

const Safety = () => {
  const safetyFeatures = [
    {
      icon: Shield,
      title: 'Certified Pros',
      description: 'PADI & SSI Elite Team',
    },
    {
      icon: Award,
      title: '5-Star Center',
      description: 'Premium Dive Facility',
    },
    {
      icon: Heart,
      title: 'Emergency Ready',
      description: 'Medical Support & O2',
    },
    {
      icon: Wrench,
      title: 'Top Gear',
      description: 'Premium Serviced Kits',
    },
  ];

  return (
    <section className="py-16 relative overflow-hidden border-y border-primary/10 bg-card/30 backdrop-blur-md">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-full bg-primary/5 blur-[100px] -z-10" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {safetyFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-start lg:items-center gap-5 group"
              >
                {/* Icon with circular "sonar" effect */}
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-[360deg]">
                    <Icon className="w-6 h-6" />
                  </div>
                  {/* Decorative sonar ring */}
                  <div className="absolute inset-0 rounded-2xl border border-primary/20 animate-ping opacity-0 group-hover:opacity-40" />
                </div>

                <div className="text-left">
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-widest mb-1 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-muted-foreground font-medium leading-tight">
                    {feature.description}
                  </p>
                </div>

                {/* Vertical Divider for Desktop */}
                {index !== safetyFeatures.length - 1 && (
                  <div className="hidden lg:block h-8 w-px bg-border ml-auto" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Safety;