import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const faqs = [
  { q: 'Is AI CareerHub free to use?', a: 'Yes! The core features — Resume Builder, Mock Interviews, Job Board, and Dashboard — are completely free. We may introduce premium plans for advanced analytics and unlimited AI sessions in the future.' },
  { q: 'How does the AI Resume Builder work?', a: 'You paste your current experience or resume text, then paste the job description you\'re targeting. Our Gemini AI analyzes both and rewrites your resume with ATS-friendly keywords, professional language, and impact-focused bullet points.' },
  { q: 'Which AI powers the platform?', a: 'We use Google\'s Gemini 2.5 Flash model — one of the most capable AI models available — to power resume generation, interview question creation, and career guidance.' },
  { q: 'Is my data safe?', a: 'Absolutely. Your data is stored securely in MongoDB Atlas with industry-standard encryption. Passwords are hashed with bcrypt. JWT tokens expire after 30 days for your protection.' },
  { q: 'Can I use this for non-technical roles?', a: 'Yes! The AI works for any role — marketing, design, finance, data analysis, operations, and more. Just mention your target role and the AI adapts accordingly.' },
  { q: 'How do I upload my profile picture?', a: 'Go to your Profile page after logging in, click the camera icon on your avatar, and upload any image. It\'s automatically optimized and stored in Cloudinary.' },
];

const FAQItem = ({ faq, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}
      className="border border-gray-200 rounded-2xl overflow-hidden"
    >
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors">
        <span className="text-base font-semibold text-gray-900">{faq.q}</span>
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

const FAQ = () => (
  <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div className="text-center mb-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Frequently Asked Questions</h1>
      <p className="text-lg text-gray-500">Everything you need to know about AI CareerHub.</p>
    </div>
    <div className="space-y-4">
      {faqs.map((faq, i) => <FAQItem key={i} faq={faq} index={i} />)}
    </div>
  </div>
);

export default FAQ;
