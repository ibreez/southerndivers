import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ShieldCheck, Eye, Lock, Database, UserCheck, Mail, ChevronRight, Fingerprint } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PrivacyPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => setDarkMode(!darkMode);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const sections = [
    { id: "collection", title: "1. Information Collection" },
    { id: "usage", title: "2. How We Use Data" },
    { id: "tracking", title: "3. Cookies & Tracking" },
    { id: "security", title: "4. Data Security" },
    { id: "rights", title: "5. Your Rights" },
    { id: "contact", title: "6. Privacy Contact" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 transition-colors duration-500">
      <Helmet>
        <title>Privacy Policy | Southern Maldives Divers</title>
        <meta name="description" content="Southern Maldives Divers Privacy Policy - Learn how we protect your personal information" />
      </Helmet>

      <Header darkMode={darkMode} toggleTheme={toggleTheme} />

      <main className="relative overflow-hidden">
        {/* --- CINEMATIC HEADER --- */}
        <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-32">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-100/50 via-transparent to-transparent dark:from-blue-900/10" />
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-blue-900/30 border border-slate-200 dark:border-blue-800 mb-6 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span className="text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase text-[10px]">Data Protection Protocol</span>
              </div>
              
              <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter mb-6 uppercase">
                Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 italic font-black">Policy</span>
              </h1>

              {/* EFFECTIVE DATE SECTION */}
              <div className="flex flex-col items-center gap-2">
                <div className="h-px w-12 bg-blue-500/50 mb-2" />
                <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                  Effective from <span className="text-slate-900 dark:text-white font-black">23/03/2025</span>
                </p>
                <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em]">
                  Document Version 1.0.4
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- MAIN CONTENT GRID --- */}
        <section className="pb-32 container mx-auto px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16">
            
            {/* STICKY SIDEBAR */}
            <aside className="hidden lg:block lg:col-span-4">
              <div className="sticky top-32 space-y-4">
                <div className="p-8 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-6">Policy Sections</h4>
                  <nav className="space-y-2">
                    {sections.map((section) => (
                      <a 
                        key={section.id}
                        href={`#${section.id}`}
                        className="flex items-center justify-between group py-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"
                      >
                        {section.title}
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                      </a>
                    ))}
                  </nav>
                </div>

                <div className="p-8 rounded-[2rem] bg-cyan-100 text-white relative overflow-hidden group">
                  <Fingerprint className="w-12 h-12 mb-4 text-blue-500 opacity-50 group-hover:scale-110 transition-transform duration-500" />
                  <h5 className="font-black uppercase tracking-tight mb-2">Encrypted Browsing</h5>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    We use industry-standard SSL encryption to ensure your booking data remains private.
                  </p>
                </div>
              </div>
            </aside>

            {/* CONTENT AREA */}
            <div className="lg:col-span-8">
              <div className="prose prose-slate dark:prose-invert prose-lg max-w-none">
                
                <div id="collection" className="scroll-mt-32 mb-16">
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight italic flex items-center gap-3">
                    <span className="text-blue-600 not-italic font-light">01.</span> Data Collection
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
                    Southern Maldives Pvt Ltd operates the website <strong>www.southernmaldives.com</strong>. We collect information that identifies you ("Personal Data") when you interact with our dive center services.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mt-8">
                    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                      <Eye className="w-6 h-6 text-blue-500 mb-3" />
                      <h5 className="font-bold text-sm uppercase tracking-widest mb-2">Direct Contact</h5>
                      <p className="text-xs text-slate-500">Names, emails, and phone numbers provided via booking forms.</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                      <Database className="w-6 h-6 text-cyan-500 mb-3" />
                      <h5 className="font-bold text-sm uppercase tracking-widest mb-2">Technical Logs</h5>
                      <p className="text-xs text-slate-500">IP addresses, browser types, and session duration via Google Analytics.</p>
                    </div>
                  </div>
                </div>

                <div id="usage" className="scroll-mt-32 mb-16">
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight italic flex items-center gap-3">
                    <span className="text-blue-600 not-italic font-light">02.</span> Operational Usage
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">We utilize your information to fulfill our maritime service obligations:</p>
                  <ul className="space-y-4 list-none p-0">
                    {['Processing dive certifications & equipment rentals', 'Safety verification & medical clearance checks', 'Improving website telemetry & user interface', 'Spam prevention via Google reCAPTCHA'].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-400">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div id="tracking" className="scroll-mt-32 mb-16">
                  <div className="p-8 md:p-12 rounded-[3rem] bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800">
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight italic">
                      <span className="text-blue-600 not-italic font-light">03.</span> Cookies
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mt-4 leading-relaxed">
                      Our website uses cookies to distinguish you from other users. This helps us provide you with a smooth experience when you browse our dive packages. You can block cookies via browser settings, though this may impact booking functionality.
                    </p>
                  </div>
                </div>

                <div id="security" className="scroll-mt-32 mb-16">
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight italic flex items-center gap-3">
                    <span className="text-blue-600 not-italic font-light">04.</span> Data Security
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
                    We implement physical and electronic safeguards to secure your data. While we strive to use commercially acceptable means to protect your Personal Data, remember that no method of transmission over the Internet is 100% secure.
                  </p>
                </div>

                <div id="rights" className="scroll-mt-32 mb-16">
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight italic flex items-center gap-3">
                    <span className="text-blue-600 not-italic font-light">05.</span> Your Rights
                  </h3>
                  <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mt-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                      Under global data protection standards (including GDPR and local regulations), you hold the following rights regarding your data:
                    </p>
                    <div className="grid sm:grid-cols-2 gap-6">
                       <div className="flex gap-4">
                          <UserCheck className="w-5 h-5 text-blue-600 shrink-0" />
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Right to Access & Erasure</span>
                       </div>
                       <div className="flex gap-4">
                          <Lock className="w-5 h-5 text-blue-600 shrink-0" />
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Right to Data Portability</span>
                       </div>
                    </div>
                  </div>
                </div>

                <div id="contact" className="scroll-mt-32">
                   <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-[3rem] p-10 md:p-16 text-white text-center relative overflow-hidden">
                      <div className="relative z-10">
                        <Mail className="w-12 h-12 mx-auto mb-6 opacity-80" />
                        <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4">Privacy Concerns?</h3>
                        <p className="text-blue-100 max-w-md mx-auto mb-10 text-sm font-medium">
                          Our Data Protection Officer is available to discuss your privacy rights or handle data deletion requests.
                        </p>
                        <a 
                          href="mailto:info@southernmaldives.com"
                          className="inline-block bg-white text-blue-600 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-900 hover:text-white transition-all shadow-xl"
                        >
                          Contact DPO
                        </a>
                      </div>
                      {/* Decorative elements */}
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                   </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPage;