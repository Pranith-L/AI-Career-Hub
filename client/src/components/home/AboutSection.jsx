import { motion } from 'framer-motion';
import { FiCheck, FiGlobe } from 'react-icons/fi';
import { aboutFeatures } from '../../data/homeData';

const AboutSection = () => (
  <section id="about" className="py-20 bg-gray-50 border-y border-gray-100 scroll-mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-square max-w-md mx-auto rounded-3xl bg-gradient-to-br from-blue-100 via-white to-green-100 flex items-center justify-center shadow-lg border border-gray-100">
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-600 to-green-500 flex items-center justify-center shadow-xl">
              <FiGlobe className="text-white text-6xl" />
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-lg border border-gray-100 px-5 py-3 hidden sm:block">
            <p className="text-2xl font-extrabold text-blue-600">10k+</p>
            <p className="text-xs text-gray-500 font-medium">Students Placed</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">AI CareerHub</span>
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We believe every student deserves a personalized roadmap to success. By combining advanced Artificial Intelligence with proven career strategies, we bridge the gap between academic learning and professional expectations.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            Our platform analyzes your skills, understands market demands, and provides actionable insights to help you stand out in a competitive job market.
          </p>
          <ul className="space-y-3">
            {aboutFeatures.map((f) => (
              <li key={f} className="flex items-center gap-3 text-gray-700 font-medium">
                <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <FiCheck className="text-green-600 text-sm" />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutSection;
