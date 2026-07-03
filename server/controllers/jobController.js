const axios = require('axios');
const Job = require('../models/Job');

// @desc    Search REAL jobs from Jsearch API (LinkedIn, Indeed, Glassdoor)
// @route   GET /api/jobs/search?q=react&location=india
exports.searchRealJobs = async (req, res, next) => {
  console.log('HIT /api/jobs/search!');
  try {
    const { q = 'software engineer intern', location = 'india', page = '1' } = req.query;

    if (!process.env.RAPIDAPI_KEY || process.env.RAPIDAPI_KEY === 'your_rapidapi_key_here') {
      // Fallback to our own DB jobs if no API key is set
      return res.redirect(`/api/jobs?search=${q}`);
    }

    const options = {
      method: 'GET',
      url: 'https://jsearch.p.rapidapi.com/search',
      params: {
        query: `${q} in ${location}`,
        page,
        num_pages: '1',
        date_posted: 'month'
      },
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'jsearch.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    const jobs = response.data.data.map(job => ({
      _id: job.job_id,
      title: job.job_title,
      company: job.employer_name,
      location: job.job_city ? `${job.job_city}, ${job.job_country}` : job.job_country,
      type: job.job_employment_type || 'Full-time',
      salary: job.job_min_salary
        ? `$${Math.floor(job.job_min_salary / 1000)}k - $${Math.floor(job.job_max_salary / 1000)}k`
        : 'Not disclosed',
      description: job.job_description?.substring(0, 200) + '...',
      tags: job.job_required_skills?.slice(0, 5) || [],
      applyLink: job.job_apply_link,
      logo: job.employer_logo,
      postedAt: job.job_posted_at_datetime_utc,
      source: job.job_publisher,
      isExternal: true
    }));

    res.status(200).json({ success: true, count: jobs.length, data: jobs });
  } catch (err) {
    console.error('External API failed, falling back to DB. Error:', err.message);
    // Fallback to our own DB jobs if external API fails (like 404/rate limits)
    const { q = '' } = req.query;
    return res.redirect(`/api/jobs?search=${q}`);
  }
};

// @desc    Get jobs from our MongoDB (with search & filter)
// @route   GET /api/jobs
exports.getJobs = async (req, res, next) => {
  try {
    const { search, type, page = 1, limit = 12 } = req.query;
    const query = { isActive: true };

    if (type && type !== 'All') query.type = type;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const jobs = await Job.find(query)
      .sort({ postedAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Job.countDocuments(query);
    res.status(200).json({ success: true, count: jobs.length, total, data: jobs });
  } catch (err) {
    next(err);
  }
};

// @desc    Seed initial job data
// @route   POST /api/jobs/seed
exports.seedJobs = async (req, res, next) => {
  try {
    await Job.deleteMany({});
    const jobs = [
      { title: 'Frontend Developer Intern', company: 'Google', location: 'Bangalore, India', type: 'Internship', salary: '₹50,000/mo', tags: ['React', 'TypeScript', 'CSS'], description: 'Work on cutting-edge frontend projects at Google.' },
      { title: 'Full Stack Engineer', company: 'Flipkart', location: 'Hyderabad, India', type: 'Full-time', salary: '₹18 LPA', tags: ['Node.js', 'React', 'MongoDB'], description: 'Build scalable ecommerce features for millions of users.' },
      { title: 'Machine Learning Engineer', company: 'Amazon', location: 'Remote', type: 'Full-time', salary: '₹25 LPA', tags: ['Python', 'TensorFlow', 'AWS'], description: 'ML solutions powering Amazon products.' },
      { title: 'UI/UX Design Intern', company: 'Swiggy', location: 'Pune, India', type: 'Internship', salary: '₹30,000/mo', tags: ['Figma', 'Prototyping', 'User Research'], description: 'Design the future of food delivery UX.' },
      { title: 'Backend Engineer', company: 'Zomato', location: 'Delhi, India', type: 'Full-time', salary: '₹20 LPA', tags: ['Go', 'PostgreSQL', 'Kafka'], description: 'Build robust APIs serving millions of food orders.' },
      { title: 'Data Analyst', company: 'Infosys', location: 'Chennai, India', type: 'Full-time', salary: '₹12 LPA', tags: ['SQL', 'Python', 'Power BI'], description: 'Analyze large datasets for strategic business decisions.' },
      { title: 'DevOps Engineer', company: 'Microsoft', location: 'Hyderabad, India', type: 'Full-time', salary: '₹22 LPA', tags: ['Docker', 'Kubernetes', 'Azure', 'CI/CD'], description: 'Build and maintain cloud infrastructure at Microsoft.' },
      { title: 'React Native Developer', company: 'Paytm', location: 'Noida, India', type: 'Full-time', salary: '₹16 LPA', tags: ['React Native', 'JavaScript', 'Redux'], description: 'Develop mobile apps for Paytm\'s payment platform.' },
      { title: 'Data Science Intern', company: 'IBM', location: 'Bangalore, India', type: 'Internship', salary: '₹35,000/mo', tags: ['Python', 'Machine Learning', 'Pandas'], description: 'Work on real-world data science problems at IBM.' },
    ];
    const created = await Job.insertMany(jobs);
    res.status(201).json({ success: true, count: created.length, message: 'Jobs seeded successfully!' });
  } catch (err) {
    next(err);
  }
};
