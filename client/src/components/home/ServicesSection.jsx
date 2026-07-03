import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { services } from '../../data/homeData';

const ServicesSection = () => (
  <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
    <div className="text-center mb-14">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">AI-Powered</span> Services
      </h2>
      <p className="text-lg text-gray-500 max-w-xl mx-auto">Everything you need to kickstart your career, all in one place.</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {services.map((s, i) => (
        <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
          <div className="block group h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-6">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform`}>
              <s.icon className="text-white text-xl" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">{s.desc}</p>
            <Link to={s.link} className="text-sm font-semibold text-blue-600 hover:text-blue-700">Learn more →</Link>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default ServicesSection;
