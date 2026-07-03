import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FiFileText, FiMic, FiBriefcase, FiBook, FiTrendingUp, FiAward, FiChevronRight } from 'react-icons/fi';

const statCards = [
  { label: 'Resumes Created', value: '3', icon: FiFileText, color: 'blue' },
  { label: 'Mock Interviews', value: '7', icon: FiMic, color: 'green' },
  { label: 'Jobs Applied', value: '12', icon: FiBriefcase, color: 'purple' },
  { label: 'Skills Learned', value: '5', icon: FiBook, color: 'orange' },
];

const featureCards = [
  { title: 'AI Resume Builder', desc: 'Create ATS-optimized resumes in seconds with Gemini AI.', icon: FiFileText, link: '/resume-builder', color: 'from-blue-500 to-blue-600' },
  { title: 'Mock Interviews', desc: 'Practice with AI-powered technical and behavioral questions.', icon: FiMic, link: '/interviews', color: 'from-green-500 to-green-600' },
  { title: 'Job Opportunities', desc: 'Discover thousands of curated job openings for you.', icon: FiBriefcase, link: '/jobs', color: 'from-purple-500 to-purple-600' },
  { title: 'Career Roadmaps', desc: 'Get a personalized step-by-step career growth plan.', icon: FiTrendingUp, link: '/roadmap', color: 'from-orange-500 to-orange-600' },
];

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-green-500 rounded-3xl p-8 mb-10 shadow-xl"
      >
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full"></div>
        <div className="absolute -right-4 -bottom-10 w-40 h-40 bg-white/10 rounded-full"></div>
        <div className="relative z-10">
          <p className="text-blue-100 font-medium mb-1">Welcome back 👋</p>
          <h1 className="text-3xl font-extrabold text-white mb-2">{user?.name || 'Student'}</h1>
          <p className="text-blue-100 text-sm max-w-md">Your career journey continues. Here's a quick overview of your progress.</p>
        </div>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4"
          >
            <div className={`w-12 h-12 rounded-xl bg-${card.color}-50 flex items-center justify-center flex-shrink-0`}>
              <card.icon className={`text-2xl text-${card.color}-600`} />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-gray-900">{card.value}</div>
              <div className="text-xs font-medium text-gray-500">{card.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Feature Cards */}
      <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
        <FiAward className="text-blue-600" /> AI-Powered Features
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {featureCards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => navigate(card.link)}
            className="group cursor-pointer bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform`}>
              <card.icon className="text-white text-xl" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">{card.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{card.desc}</p>
            <div className="flex items-center text-sm font-semibold text-blue-600 group-hover:gap-2 transition-all">
              Get Started <FiChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-5">Recent Activity</h2>
        <div className="divide-y divide-gray-50">
          {[
            { text: 'Generated AI resume for "Frontend Developer" role', time: '2 hours ago', icon: FiFileText, color: 'blue' },
            { text: 'Completed Mock Interview: Advanced React questions', time: '1 day ago', icon: FiMic, color: 'green' },
            { text: 'Applied to 3 new jobs at Google, Amazon, Flipkart', time: '2 days ago', icon: FiBriefcase, color: 'purple' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 py-4">
              <div className={`w-9 h-9 rounded-full bg-${item.color}-50 flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <item.icon className={`text-${item.color}-600 text-sm`} />
              </div>
              <div className="flex-grow min-w-0">
                <p className="text-sm font-medium text-gray-800">{item.text}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
