import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiMapPin, FiExternalLink } from 'react-icons/fi';
import { fallbackJobs } from '../../data/homeData';

const logoColors = ['bg-blue-600', 'bg-yellow-500', 'bg-orange-500', 'bg-pink-500', 'bg-red-500', 'bg-purple-600'];

const JobsSection = () => {
  const [jobs, setJobs] = useState(fallbackJobs);

  useEffect(() => {
    axios.get('http://localhost:5000/api/jobs', { params: { limit: 3 } })
      .then((res) => { if (res.data.data?.length) setJobs(res.data.data.slice(0, 3)); })
      .catch(() => {});
  }, []);

  return (
    <section id="jobs" className="py-20 bg-gray-50 border-y border-gray-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Top <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">Job Opportunities</span>
          </h2>
          <p className="text-lg text-gray-500">Curated roles from top companies actively hiring freshers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {jobs.map((job, i) => (
            <motion.div key={job._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-11 h-11 ${logoColors[i % logoColors.length]} rounded-xl flex items-center justify-center text-white font-bold text-lg`}>
                  {job.company[0]}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{job.title}</h3>
                  <p className="text-sm text-gray-500">{job.company}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 flex items-center gap-1 mb-4"><FiMapPin className="text-gray-400" /> {job.location}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {job.tags?.map((tag) => (
                  <span key={tag} className="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{tag}</span>
                ))}
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${job.type === 'Internship' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                {job.type}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/jobs" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-white font-semibold bg-blue-600 hover:bg-blue-700 shadow-lg transition-all hover:-translate-y-0.5">
            <FiExternalLink /> View All Jobs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JobsSection;
