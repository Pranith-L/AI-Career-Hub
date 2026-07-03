import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { featureHighlights } from '../../data/homeData';
import { FiCheck } from 'react-icons/fi';

const FeatureHighlight = ({ feature, index }) => (
  <section id={feature.id} className={`py-20 scroll-mt-20 ${index % 2 === 1 ? 'bg-gray-50 border-y border-gray-100' : ''}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${feature.reverse ? 'lg:flex-row-reverse' : ''}`}>
        <motion.div
          initial={{ opacity: 0, x: feature.reverse ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className={feature.reverse ? 'lg:order-2' : ''}
        >
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${feature.color} mb-4`}>
            {feature.subtitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{feature.title}</h2>
          <p className="text-gray-600 leading-relaxed mb-6">{feature.desc}</p>
          <ul className="space-y-3 mb-8">
            {feature.bullets.map((b) => (
              <li key={b} className="flex items-center gap-3 text-gray-700">
                <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <FiCheck className="text-green-600 text-xs" />
                </span>
                {b}
              </li>
            ))}
          </ul>
          <Link to={feature.link}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r ${feature.color} shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all`}
          >
            <feature.icon /> {feature.cta}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: feature.reverse ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className={feature.reverse ? 'lg:order-1' : ''}
        >
          <div className={`aspect-[4/3] rounded-3xl bg-gradient-to-br ${feature.color} p-8 flex items-center justify-center shadow-2xl relative overflow-hidden`}>
            <div className="absolute inset-0 bg-white/10 rounded-3xl"></div>
            <feature.icon className="text-white/90 text-8xl relative z-10" />
            <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-white text-sm font-medium">
              Powered by Gemini AI
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const FeatureHighlights = () => (
  <>
    {featureHighlights.map((f, i) => <FeatureHighlight key={f.id} feature={f} index={i} />)}
  </>
);

export default FeatureHighlights;
