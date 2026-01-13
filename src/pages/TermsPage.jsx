import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Scale, ShieldCheck, Copyright, Mail, Phone, MapPin, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TermsPage = () => {
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
    { id: "acceptance", title: "1. Acceptance of Terms" },
    { id: "ownership", title: "2. Ownership of Content" },
    { id: "third-party", title: "3. Third-Party Content" },
    { id: "permitted", title: "4. Permitted Use" },
    { id: "links", title: "5. External Links" },
    { id: "liability", title: "6. Limitation of Liability" },
    { id: "contact", title: "7. Contact Information" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 transition-colors duration-500">
      <Helmet>
        <title>Terms of Use | Southern Maldives Divers</title>
        <meta name="description" content="Terms of Use for Southern Maldives Divers website." />
      </Helmet>

      <Header darkMode={darkMode} toggleTheme={toggleTheme} />

      <main className="relative overflow-hidden">
        {/* --- CINEMATIC HEADER --- */}
        <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-32">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-100/50 via-transparent to-transparent dark:from-primary/10" />
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-cyan-900/30 border border-slate-200 dark:border-cyan-800 mb-6 shadow-sm">
                <Scale className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span className="text-cyan-600 dark:text-cyan-400 font-bold tracking-widest uppercase text-[10px]">Legal Documentation</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter mb-6">
                TERMS <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 italic">OF USE</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                Effective Date: <span className="font-bold text-slate-900 dark:text-white">March 23, 2025</span>
              </p>
            </motion.div>
          </div>
        </section>

        {/* --- CONTENT SECTION --- */}
        <section className="pb-32 container mx-auto px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16">
            
            {/* Sidebar Navigation (Sticky) */}
            <aside className="hidden lg:block lg:col-span-4">
              <div className="sticky top-32 space-y-4">
                <div className="p-8 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <h4 className="text-xs font-black text-cyan-600 uppercase tracking-widest mb-6">Quick Navigation</h4>
                  <nav className="space-y-2">
                    {sections.map((section) => (
                      <a 
                        key={section.id}
                        href={`#${section.id}`}
                        className="flex items-center justify-between group py-2 text-sm font-bold text-slate-500 hover:text-cyan-600 transition-colors"
                      >
                        {section.title}
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                      </a>
                    ))}
                  </nav>
                </div>

                <div className="p-8 rounded-[2rem] bg-gradient-to-br from-cyan-600 to-blue-700 text-white">
                  <ShieldCheck className="w-8 h-8 mb-4 opacity-80" />
                  <p className="text-sm font-medium leading-relaxed opacity-90">
                    Your safety and privacy are our priority. For information on data handling, please view our Privacy Policy.
                  </p>
                </div>
              </div>
            </aside>

            {/* Terms Content */}
            <div className="lg:col-span-8">
              <div className="prose prose-slate dark:prose-invert prose-lg max-w-none">
                
                <div id="acceptance" className="scroll-mt-32 mb-12">
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight italic flex items-center gap-3">
                    <span className="text-cyan-600 not-italic font-light">01.</span> Acceptance
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
                    By accessing or using <strong>www.southernmaldives.com</strong> (“Website”), you agree to comply with and be bound by these Terms of Use. These terms act as a legal agreement between you and Southern Maldives Divers. If you do not agree to these terms, please discontinue use of the site immediately.
                  </p>
                </div>

                <div id="ownership" className="scroll-mt-32 mb-12">
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight italic flex items-center gap-3">
                    <span className="text-cyan-600 not-italic font-light">02.</span> Intellectual Property
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
                    All content on this Website, including text, graphics, logos, design code, and original media, is the exclusive property of <strong>Southern Maldives Pvt Ltd</strong> unless otherwise stated. Unauthorized reproduction or "scraping" of this content is strictly prohibited.
                  </p>
                </div>

                <div id="third-party" className="scroll-mt-32 mb-12">
                  <div className="p-8 md:p-12 rounded-[3rem] bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight italic flex items-center gap-3">
                      <span className="text-cyan-600 not-italic font-light">03.</span> Third-Party Media
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
                      This Website may feature images, videos, and other media that are publicly or freely available from external sources (such as Pexels, Unsplash, or Creative Commons). 
                    </p>
                    <ul className="mt-6 space-y-4">
                      <li className="flex gap-4">
                        <Copyright className="w-5 h-5 text-cyan-600 shrink-0" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">Content remains the intellectual property of its respective owners.</span>
                      </li>
                      <li className="flex gap-4">
                        <Copyright className="w-5 h-5 text-cyan-600 shrink-0" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">Use of third-party content is subject to the original copyright holder’s terms.</span>
                      </li>
                    </ul>
                    <div className="mt-8 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        <strong>Copyright Owner?</strong> If you believe your work is used improperly, contact us at <span className="text-cyan-600">info@southernmaldives.com</span> for immediate removal or attribution correction.
                      </p>
                    </div>
                  </div>
                </div>

                <div id="permitted" className="scroll-mt-32 mb-12">
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight italic flex items-center gap-3">
                    <span className="text-cyan-600 not-italic font-light">04.</span> Permitted Use
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
                    You may use our Website for personal and non-commercial purposes. You are strictly prohibited from using this Website to distribute malware, harvest data, or engage in any activity that disrupts our server performance.
                  </p>
                </div>

                <div id="liability" className="scroll-mt-32 mb-12">
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight italic flex items-center gap-3">
                    <span className="text-cyan-600 not-italic font-light">05.</span> Limitation of Liability
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
                    While we strive for 100% accuracy, Southern Maldives Pvt Ltd provides this website "as is." We are not liable for any technical inaccuracies or typographical errors regarding dive schedules or pricing. Final pricing is always confirmed at the time of booking.
                  </p>
                </div>

                <div id="contact" className="scroll-mt-32">
                  <div className="relative overflow-hidden rounded-[3rem] bg-slate-900 dark:bg-slate-900 p-10 md:p-16 text-white group">
                    <div className="relative z-10">
                      <h3 className="text-3xl font-black uppercase tracking-tighter mb-8">Questions Regarding <br/> These Terms?</h3>
                      
                      <div className="grid sm:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <div className="flex items-center gap-4 text-slate-400">
                            <MapPin className="w-5 h-5 text-cyan-500" />
                            <span className="text-sm uppercase font-bold tracking-widest">Addu City, Maldives</span>
                          </div>
                          <div className="flex items-center gap-4 text-slate-400">
                            <Mail className="w-5 h-5 text-cyan-500" />
                            <span className="text-sm font-bold">info@southernmaldives.com</span>
                          </div>
                        </div>
                        <div className="flex flex-col justify-end">
                          <button 
                            onClick={() => window.location.href = 'mailto:info@southernmaldives.com'}
                            className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-cyan-500 hover:text-white transition-all"
                          >
                            Email Legal Dept
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Abstract background element */}
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-cyan-600/20 rounded-full blur-3xl" />
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

export default TermsPage;