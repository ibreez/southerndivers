import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Globe } from 'lucide-react';
import { useData } from '@/hooks/useData';

const About = memo(({ showStory = true }) => {
  const { data: team } = useData('team');
  
  // Animation Variants for consistency
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 20 } 
    }
  };

  const features = [
    { icon: Heart, title: 'Passionate Team', description: 'Our experienced instructors are dedicated to sharing their love for the ocean.', color: 'from-pink-500 to-rose-500' },
    { icon: Shield, title: 'Safety First', description: 'State-of-the-art equipment and strict safety protocols ensure your well-being.', color: 'from-blue-500 to-cyan-500' },
    { icon: Globe, title: 'Eco-Friendly', description: 'Committed to marine conservation and sustainable diving practices.', color: 'from-emerald-500 to-green-500' },
  ];

  return (
    <section id="about" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* TOP SECTION: IMAGE & FEATURES */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 group">
              <img 
                className="w-full h-[550px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                alt="Diving instructor"
                src="https://images.unsplash.com/photo-1595323397978-65433d24fc23?w=1200&auto=format&q=70" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
            </div>
            {/* Experience Badge - Using pulse-glow from tailwind config */}
            <div className="absolute -bottom-6 -right-6 glass-card p-8 rounded-3xl border border-primary/20 animate-pulse-glow hidden md:block">
               <div className="text-4xl font-bold text-primary">7+</div>
               <div className="text-xs font-black uppercase tracking-widest opacity-70">Years Experience</div>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
               <div className="h-1 w-12 bg-primary"></div>
               <span className="text-primary font-black uppercase tracking-[0.2em] text-sm">Why Choose Us</span>
            </motion.div>

            <motion.h3 variants={itemVariants} className="text-4xl font-bold text-foreground mb-10 tracking-tight">
              Crafting Unforgettable <br/><span className="text-primary">Underwater Stories</span>
            </motion.h3>

            <div className="space-y-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex gap-6 p-6 rounded-2xl hover:bg-primary/5 transition-all duration-300 border border-transparent hover:border-primary/10 group"
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* STORY SECTION */}
        {showStory && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-32"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-8 tracking-tighter">
              Exploring the <span className="text-primary italic font-serif">Deep Blue</span> Since 2019
            </h2>
            <div className="text-lg text-muted-foreground mb-16 leading-relaxed space-y-6 max-w-3xl mx-auto">
              <p>Southern Maldives Divers is a premier dive center established in 2019, operating from the stunning <strong>South Palm Resort</strong>.</p>
              <p>We combine high-end marine education with authentic Maldivian hospitality to ensure your journey into the abyss is safe, sustainable, and soulful.</p>
            </div>

            {/* Official Registry Card */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-1 md:p-12 bg-gradient-to-b from-primary/10 to-transparent backdrop-blur-sm rounded-[3rem] border border-primary/20 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-primary/30" />
              <h3 className="text-xs font-black text-primary uppercase tracking-[0.4em] mb-12">Official Registry</h3>
              
              <div className="flex flex-col items-center">
                <h4 className="text-3xl md:text-5xl font-black text-foreground mb-12 tracking-tighter">
                  SOUTHERN MALDIVES <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">DIVERS</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                  <div className="p-8 rounded-3xl bg-background/50 border border-primary/10 transition-all hover:border-primary/30">
                    <p className="text-[10px] text-primary uppercase font-black tracking-[0.2em] mb-3">Lead Director</p>
                    <p className="text-2xl font-bold text-foreground tracking-tight">ABDULLA WASEEM</p>
                  </div>
                  <div className="p-8 rounded-3xl bg-background/50 border border-primary/10 transition-all hover:border-primary/30">
                    <p className="text-[10px] text-primary uppercase font-black tracking-[0.2em] mb-3">Registration No.</p>
                    <p className="text-2xl font-mono font-bold text-primary tracking-widest">BN30472019</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* TEAM SECTION */}
        {team.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="pt-10"
          >
            <div className="flex flex-col items-center mb-16">
               <div className="h-1 w-12 bg-primary mb-4"></div>
               <h3 className="text-4xl font-bold text-center text-foreground tracking-tight">Meet The Crew</h3>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {team.map((member, index) => (
                <motion.div
                  key={member.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -12 }}
                  className="relative group"
                >
                  <div className="h-[400px] rounded-[2rem] overflow-hidden relative shadow-xl">
                    <img 
                      src={`${member.image}?w=800&auto=format&q=70`} 
                      alt={member.name} 
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 p-6 glass-card-1 rounded-2xl border border-white/10 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h4 className="text-xl font-bold text-foreground mb-1">{member.name}</h4>
                    <p className="text-primary font-black uppercase tracking-widest text-[10px]">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
});

About.displayName = 'About';
export default About;