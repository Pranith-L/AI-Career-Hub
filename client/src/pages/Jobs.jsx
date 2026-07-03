import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import BACKEND_URL from '../config';
import { FiSearch, FiMapPin, FiBriefcase, FiClock, FiExternalLink, FiGlobe, FiDatabase } from 'react-icons/fi';

const rapidApiKey = import.meta.env.VITE_RAPIDAPI_KEY;
const logoColors = ['bg-blue-600', 'bg-yellow-500', 'bg-orange-500', 'bg-pink-500', 'bg-red-500', 'bg-purple-600', 'bg-green-600', 'bg-indigo-600', 'bg-teal-600'];

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
    <div className="flex gap-3 mb-4">
      <div className="w-11 h-11 bg-gray-200 rounded-xl flex-shrink-0"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
    <div className="space-y-2 mb-4">
      <div className="h-3 bg-gray-200 rounded"></div>
      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
    </div>
    <div className="flex gap-2 mb-5">
      <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
      <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
      <div className="h-6 w-14 bg-gray-200 rounded-full"></div>
    </div>
    <div className="h-10 bg-gray-200 rounded-xl"></div>
  </div>
);

const Jobs = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState('db'); // 'db' = our curated | 'live' = real external

  const fetchJobs = async () => {
    setLoading(true);
    try {
      let res;
      if (mode === 'live') {
        // Real jobs from LinkedIn / Indeed via Jsearch
        res = await axios.get(`${BACKEND_URL}/api/jobs/search`, {
          params: { q: search || 'software engineer intern', location: 'india' }
        });
      } else {
        // Our curated MongoDB jobs
        const params = {};
        if (filter !== 'All') params.type = filter;
        if (search) params.search = search;
        res = await axios.get(`${BACKEND_URL}/api/jobs`, { params });
      }
      setJobs(res.data.data || []);
    } catch (err) {
      console.error('Failed to fetch jobs', err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchJobs, 400);
    return () => clearTimeout(timer);
  }, [search, filter, mode]);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Recently';
    const diff = Math.floor((Date.now() - new Date(dateStr)) / (1000 * 60 * 60));
    if (diff < 1) return 'Just now';
    if (diff < 24) return `${diff}h ago`;
    const days = Math.floor(diff / 24);
    return days === 1 ? '1 day ago' : `${days} days ago`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Job Opportunities</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Find your dream role. Browse curated listings or search live jobs from LinkedIn, Indeed & more.
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex bg-gray-100 rounded-xl p-1 gap-1">
          <button onClick={() => setMode('db')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${mode === 'db' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
            <FiDatabase /> Curated Jobs
          </button>
          <button onClick={() => setMode('live')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${mode === 'live' ? 'bg-white shadow-sm text-green-600' : 'text-gray-500 hover:text-gray-700'}`}>
            <FiGlobe /> Live Jobs (LinkedIn/Indeed)
          </button>
        </div>
      </div>

      {/* Live Jobs Notice */}
      {mode === 'live' && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-5 py-3 rounded-xl text-sm flex items-center gap-2">
          <FiGlobe className="flex-shrink-0" />
          <span>Showing real-time jobs from <strong>LinkedIn, Indeed, Glassdoor</strong> via Jsearch API. 
            {!rapidApiKey && ' Add your RapidAPI key in .env to enable this feature.'}
          </span>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search by title, company, or skill..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {mode === 'db' && (
          <div className="flex gap-2">
            {['All', 'Full-time', 'Internship'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all ${filter === f ? 'bg-blue-600 text-white shadow-sm' : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300'}`}>
                {f}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results count */}
      {!loading && (
        <p className="text-sm text-gray-500 mb-5">
          Found <span className="font-semibold text-gray-800">{jobs.length}</span> {mode === 'live' ? 'live' : 'curated'} job{jobs.length !== 1 ? 's' : ''}
          {search && ` for "${search}"`}
        </p>
      )}

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {loading
          ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
          : jobs.map((job, i) => (
            <motion.div key={job._id || i}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4 gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  {job.logo ? (
                    <img src={job.logo} alt={job.company} className="w-11 h-11 rounded-xl object-contain border border-gray-100 p-1 bg-white flex-shrink-0" onError={e => { e.target.style.display = 'none'; }} />
                  ) : (
                    <div className={`w-11 h-11 ${logoColors[i % logoColors.length]} rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                      {job.company?.[0]}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">{job.title}</h3>
                    <p className="text-sm text-gray-500 truncate">{job.company}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${job.type === 'Internship' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                    {job.type || 'Full-time'}
                  </span>
                  {job.isExternal && (
                    <span className="text-xs text-gray-400 font-medium">{job.source}</span>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mb-4">
                {job.location && <span className="flex items-center gap-1"><FiMapPin className="flex-shrink-0 text-gray-400" /> {job.location}</span>}
                {job.salary && job.salary !== 'Not disclosed' && <span className="flex items-center gap-1"><FiBriefcase className="flex-shrink-0 text-gray-400" /> {job.salary}</span>}
                <span className="flex items-center gap-1"><FiClock className="flex-shrink-0 text-gray-400" /> {formatDate(job.postedAt)}</span>
              </div>

              {/* Description */}
              {job.description && (
                <p className="text-xs text-gray-500 mb-3 line-clamp-2 leading-relaxed">{job.description}</p>
              )}

              {/* Tags */}
              {job.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5 flex-grow">
                  {job.tags.slice(0, 4).map(tag => (
                    <span key={tag} className="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
              )}

              {/* Apply Button */}
              <a href={job.applyLink || '#'} target="_blank" rel="noopener noreferrer"
                className="mt-auto w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-blue-600 text-blue-600 font-semibold text-sm hover:bg-blue-600 hover:text-white transition-all group-hover:bg-blue-600 group-hover:text-white">
                <FiExternalLink /> Apply Now
              </a>
            </motion.div>
          ))
        }
      </div>

      {!loading && jobs.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <FiBriefcase className="text-6xl mx-auto mb-4 text-gray-200" />
          <p className="text-lg font-medium">No jobs found.</p>
          <p className="text-sm mt-1">Try different keywords or switch to Live Jobs mode.</p>
        </div>
      )}
    </div>
  );
};

export default Jobs;
