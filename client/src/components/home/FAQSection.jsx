import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { faqs } from '../../data/homeData';

const FAQItem = ({ faq, index }) => {
  const [open, setOpen] = useState(index === 0);
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}
      className="border border-gray-200 rounded-2xl overflow-hidden bg-white"
    >
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center px-6 py-5 text-left hover:bg-gray-50 transition-colors">
        <span className="text-base font-semibold text-gray-900 pr-4">{faq.q}</span>
        {open ? <FiChevronUp className="text-blue-600 text-lg flex-shrink-0" /> : <FiChevronDown className="text-gray-400 text-lg flex-shrink-0" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <p className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQSection = () => (
  <section id="faq" className="py-20 bg-gray-50 border-y border-gray-100 scroll-mt-20">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">Questions</span>
        </h2>
        <p className="text-lg text-gray-500">Got questions? We've got answers.</p>
      </div>
      <div className="space-y-4 mb-8">
        {faqs.map((faq, i) => <FAQItem key={i} faq={faq} index={i} />)}
      </div>
      <div className="text-center">
        <Link to="/faq" className="text-sm font-semibold text-blue-600 hover:text-blue-700">View all FAQs →</Link>
      </div>
    </div>
  </section>
);

export default FAQSection;
