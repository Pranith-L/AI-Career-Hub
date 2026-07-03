import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import { testimonials } from '../../data/homeData';

const TestimonialsSection = () => (
  <section id="testimonials" className="py-20 scroll-mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">Users Say</span>
        </h2>
        <p className="text-lg text-gray-500">Real results from real students who used AI CareerHub.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div key={t.name} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col"
          >
            <div className="flex mb-4">
              {[...Array(t.rating)].map((_, j) => <FiStar key={j} className="text-yellow-400 fill-current" />)}
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow italic">"{t.text}"</p>
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-green-400 flex items-center justify-center text-white font-bold text-sm">
                {t.name[0]}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{t.name}</p>
                <p className="text-xs text-gray-500">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
