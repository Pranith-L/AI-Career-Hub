import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { stats } from '../data/homeData';
import AboutSection from '../components/home/AboutSection';
import ServicesSection from '../components/home/ServicesSection';
import FeatureHighlights from '../components/home/FeatureHighlights';
import JobsSection from '../components/home/JobsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FAQSection from '../components/home/FAQSection';
import ContactSection from '../components/home/ContactSection';

const Home = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ animationDelay: '4s' }}></div>

        <div className="max-w-4xl mx-auto text-center z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-sm font-medium mb-8 shadow-sm"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            The Future of Career Growth
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-8 leading-tight"
          >
            Empowering Careers with <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">Artificial Intelligence</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto mb-10"
          >
            Designed for students and fresh graduates. Build winning resumes, ace mock interviews, and land your dream job faster.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link to="/register" className="px-8 py-4 text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all hover:shadow-blue-600/50 hover:-translate-y-1">
              Get Started Now
            </Link>
            <a href="#about" className="px-8 py-4 text-base font-medium rounded-xl text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm transition-all hover:-translate-y-1">
              Learn More
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-y border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label} className="p-4">
                <div className={`text-4xl font-extrabold ${s.color} mb-2`}>{s.value}</div>
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AboutSection />
      <ServicesSection />
      <FeatureHighlights />
      <JobsSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-green-500 rounded-3xl p-12 text-center shadow-2xl shadow-blue-500/20"
        >
          <h2 className="text-4xl font-extrabold text-white mb-4">Ready to Launch Your Career?</h2>
          <p className="text-blue-100 text-lg mb-8">Join 50,000+ students who are using AI to accelerate their career growth.</p>
          <Link to="/register" className="inline-block px-10 py-4 text-base font-bold rounded-xl text-blue-600 bg-white hover:bg-blue-50 shadow-lg transition-all hover:-translate-y-1">
            Start for Free Today
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
