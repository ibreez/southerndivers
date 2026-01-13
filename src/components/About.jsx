import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Globe } from 'lucide-react';
import { useData } from '@/hooks/useData';

const About = ({ showStory = true }) => {
  const { data: team } = useData('team');
  
  const features = [
    {
      icon: Heart,
      title: 'Passionate Team',
      description: 'Our experienced instructors are dedicated to sharing their love for the ocean.',
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'State-of-the-art equipment and strict safety protocols ensure your well-being.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Globe,
      title: 'Eco-Friendly',
      description: 'Committed to marine conservation and sustainable diving practices.',
      color: 'from-emerald-500 to-green-500',
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
              <img 
                className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Diving instructor with students"
               src="https://images.unsplash.com/photo-1595323397978-65433d24fc23" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 glass-card p-6 rounded-2xl border border-white/10 animate-float hidden md:block">
               <div className="text-3xl font-bold text-cyan-400">7+</div>
               <div className="text-sm text-slate-300">Years Experience</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
               <div className="h-1 w-16 bg-cyan-500"></div>
               <span className="text-cyan-400 font-bold uppercase tracking-wider text-lg">Our Story</span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-6">Why Choose Us</h3>

            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, duration: 1.0, ease: "easeOut" }}
                    className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                  >
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-slate-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {showStory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Exploring the <span className="text-cyan-400">Deep Blue</span> Since 2019
            </h2>
            <div className="text-lg text-slate-300 mb-10 leading-relaxed space-y-4 max-w-4xl mx-auto">
              <p>
                Southern Maldives Divers is a dive center and local tourism operator established in the most southern part of the Maldives in 2019. Operating from our base in South Palm Resort Maldives, we provide extended diving services to customers within our reach who want to have a pleasant and unforgettable diving experience.
              </p>
              <p>
                We also thrive to make it easy for our guests to reach out and stay near to our remote location by providing local accommodation options and hotels.
              </p>
              <p>
                Southern Maldives Divers consists of certified professionals who excel in marine education, responsibility and safety along with friendly native representatives who can help you with anything ranging from local tours, accommodation assistance and transportation.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="mt-16 p-8 md:p-12 bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-md rounded-3xl border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.1)] relative overflow-hidden group"
              >
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-cyan-500/10 blur-3xl rounded-full group-hover:bg-cyan-500/20 transition-colors" />

                <h3 className="text-sm font-black text-cyan-400 uppercase tracking-[0.3em] mb-8">
                  Official Registry
                </h3>

                <div className="flex flex-col items-center">
                  <motion.h4
                    initial={{ letterSpacing: "0.05em" }}
                    whileInView={{ letterSpacing: "0.1em" }}
                    transition={{ duration: 1.5 }}
                    className="text-3xl md:text-5xl font-black text-white mb-10 tracking-tight leading-tight"
                  >
                    SOUTHERN MALDIVES <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">DIVERS</span>
                  </motion.h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
                    <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 transition-all hover:bg-white/10">
                      <p className="text-xs text-cyan-500 uppercase font-bold tracking-widest mb-2">Lead Director</p>
                      <p className="text-2xl font-bold text-white tracking-wide">ABDULLA WASEEM</p>
                    </div>

                    <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 transition-all hover:bg-white/10">
                      <p className="text-xs text-cyan-500 uppercase font-bold tracking-widest mb-2">Registration No.</p>
                      <p className="text-2xl font-mono font-bold text-white tracking-wider text-cyan-50">BN30472019</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {team.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-center text-white mb-12">Meet The Crew</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.id || index}
                  whileHover={{ y: -10 }}
                  className="glass-card rounded-2xl overflow-hidden group"
                >
                  <div className="h-80 overflow-hidden relative">
                    <div className="absolute inset-0 bg-cyan-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-6 text-center relative z-20 bg-slate-900/80 backdrop-blur-sm -mt-10 mx-4 rounded-xl border border-white/5 shadow-lg">
                    <h4 className="text-xl font-bold team-member-name mb-1">{member.name}</h4>
                    <p className="text-cyan-400 font-medium tracking-wide uppercase text-xs">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default About;