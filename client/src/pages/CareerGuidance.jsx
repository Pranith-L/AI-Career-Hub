import { motion } from 'framer-motion';
import { FiTarget, FiCode, FiTrendingUp, FiAward, FiChevronRight } from 'react-icons/fi';

const roadmaps = [
  {
    title: 'Frontend Developer',
    color: 'from-blue-500 to-blue-600',
    steps: [
      { level: 'Foundation', skills: ['HTML5 & CSS3', 'JavaScript ES6+', 'Responsive Design', 'Git & GitHub'] },
      { level: 'Intermediate', skills: ['React.js', 'Tailwind CSS', 'API Integration', 'TypeScript'] },
      { level: 'Advanced', skills: ['Next.js / Vite', 'Testing (Jest)', 'CI/CD', 'Web Performance'] },
      { level: 'Expert', skills: ['Micro-frontends', 'Design Systems', 'Open Source', 'System Design'] },
    ]
  },
  {
    title: 'Full Stack Developer',
    color: 'from-green-500 to-green-600',
    steps: [
      { level: 'Foundation', skills: ['HTML/CSS/JS', 'Node.js Basics', 'SQL Databases', 'REST APIs'] },
      { level: 'Intermediate', skills: ['React.js', 'Express.js', 'MongoDB / PostgreSQL', 'JWT Auth'] },
      { level: 'Advanced', skills: ['Docker & DevOps', 'Redis Caching', 'GraphQL', 'Cloud Deployment'] },
      { level: 'Expert', skills: ['System Design', 'Microservices', 'Kubernetes', 'Tech Leadership'] },
    ]
  },
  {
    title: 'Data Science / ML',
    color: 'from-purple-500 to-purple-600',
    steps: [
      { level: 'Foundation', skills: ['Python Basics', 'Statistics & Math', 'Pandas & NumPy', 'Data Visualization'] },
      { level: 'Intermediate', skills: ['Machine Learning', 'Scikit-Learn', 'SQL', 'Jupyter Notebooks'] },
      { level: 'Advanced', skills: ['Deep Learning', 'TensorFlow / PyTorch', 'Feature Engineering', 'MLOps'] },
      { level: 'Expert', skills: ['LLMs & GenAI', 'Model Deployment', 'Research Papers', 'Kaggle Competitions'] },
    ]
  },
];

const stepColors = ['bg-blue-100 text-blue-700', 'bg-green-100 text-green-700', 'bg-orange-100 text-orange-700', 'bg-purple-100 text-purple-700'];

const CareerGuidance = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-14">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Career Roadmaps</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">Follow structured, step-by-step learning paths to land your dream role in tech.</p>
      </div>

      <div className="space-y-10">
        {roadmaps.map((roadmap, ri) => (
          <motion.div key={roadmap.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: ri * 0.1 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className={`bg-gradient-to-r ${roadmap.color} px-8 py-5 flex items-center gap-3`}>
              <FiTarget className="text-white text-2xl" />
              <h2 className="text-xl font-bold text-white">{roadmap.title} Roadmap</h2>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {roadmap.steps.map((step, si) => (
                  <div key={step.level} className="relative">
                    {si < roadmap.steps.length - 1 && (
                      <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-gray-200 z-0 -translate-x-2.5">
                        <FiChevronRight className="absolute -top-2.5 right-0 text-gray-300 text-lg" />
                      </div>
                    )}
                    <div className="relative z-10 bg-gray-50 rounded-2xl border border-gray-100 p-5">
                      <span className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full mb-4 ${stepColors[si]}`}>
                        {si === 0 ? <FiCode /> : si === 3 ? <FiAward /> : <FiTrendingUp />} {step.level}
                      </span>
                      <ul className="space-y-2">
                        {step.skills.map(skill => (
                          <li key={skill} className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CareerGuidance;
