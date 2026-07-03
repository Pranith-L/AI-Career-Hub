const axios = require("axios");
const Job = require("../models/Job");

// @desc    Search REAL jobs from Jsearch API (LinkedIn, Indeed, Glassdoor)
// @route   GET /api/jobs/search?q=react&location=india
exports.searchRealJobs = async (req, res, next) => {
  console.log("HIT /api/jobs/search!");
  try {
    const {
      q = "software engineer intern",
      location = "india",
      page = "1",
    } = req.query;

    if (
      !process.env.RAPIDAPI_KEY ||
      process.env.RAPIDAPI_KEY === "your_rapidapi_key_here"
    ) {
      // Fallback to our own DB jobs if no API key is set
      return res.redirect(`/api/jobs?search=${q}`);
    }

    const options = {
      method: "GET",
      url: "https://jsearch.p.rapidapi.com/search",
      params: {
        query: `${q} in ${location}`,
        page,
        num_pages: "1",
        date_posted: "month",
      },
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        "x-rapidapi-host": "jsearch.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    const jobs = response.data.data.map((job) => ({
      _id: job.job_id,
      title: job.job_title,
      company: job.employer_name,
      location: job.job_city
        ? `${job.job_city}, ${job.job_country}`
        : job.job_country,
      type: job.job_employment_type || "Full-time",
      salary: job.job_min_salary
        ? `$${Math.floor(job.job_min_salary / 1000)}k - $${Math.floor(job.job_max_salary / 1000)}k`
        : "Not disclosed",
      description: job.job_description?.substring(0, 200) + "...",
      tags: job.job_required_skills?.slice(0, 5) || [],
      applyLink: job.job_apply_link,
      logo: job.employer_logo,
      postedAt: job.job_posted_at_datetime_utc,
      source: job.job_publisher,
      isExternal: true,
    }));

    res.status(200).json({ success: true, count: jobs.length, data: jobs });
  } catch (err) {
    console.error(
      "External API failed, falling back to DB. Error:",
      err.message,
    );
    // Fallback to our own DB jobs if external API fails (like 404/rate limits)
    const { q = "" } = req.query;
    return res.redirect(`/api/jobs?search=${q}`);
  }
};

// @desc    Get jobs from our MongoDB (with search & filter)
// @route   GET /api/jobs
exports.getJobs = async (req, res, next) => {
  try {
    const { search, type, page = 1, limit = 12 } = req.query;
    const query = { isActive: true };

    if (type && type !== "All") query.type = type;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    const jobs = await Job.find(query)
      .sort({ postedAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Job.countDocuments(query);
    res
      .status(200)
      .json({ success: true, count: jobs.length, total, data: jobs });
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
      {
        title: "Frontend Engineer Intern",
        company: "TechBridge Labs",
        location: "Bangalore, India",
        type: "Internship",
        salary: "₹15,000/month",
        description:
          "Work with our frontend team to build interactive UI components for a learning platform. You'll collaborate with designers and engineers to deliver responsive web experiences.",
        requirements: [
          "Basic understanding of React and JavaScript",
          "Familiarity with HTML/CSS",
          "Good communication and problem-solving skills",
        ],
        tags: ["React", "JavaScript", "UI", "Internship"],
        applyLink: "https://techbridge.example.com/apply/frontend-intern",
        postedAt: "2026-06-20T10:00:00.000Z",
        isActive: true,
      },
      {
        title: "Junior Backend Developer",
        company: "Nexa Cloud",
        location: "Remote",
        type: "Full-time",
        salary: "₹35,000 - ₹45,000/month",
        description:
          "Build scalable API services and work with cloud databases. Ideal for developers with Node.js experience and a passion for building backend systems.",
        requirements: [
          "Experience with Node.js and Express",
          "Knowledge of RESTful APIs",
          "Familiarity with MongoDB or similar NoSQL databases",
        ],
        tags: ["Node.js", "Express", "MongoDB", "Remote"],
        applyLink: "https://nexacloud.example.com/careers/junior-backend",
        postedAt: "2026-06-18T09:30:00.000Z",
        isActive: true,
      },
      {
        title: "Product Design Intern",
        company: "Spark Studio",
        location: "Mumbai, India",
        type: "Internship",
        salary: "₹12,000/month",
        description:
          "Assist in designing product interfaces and user experiences for our mobile and web applications. This role is perfect for creative students with a strong design portfolio.",
        requirements: [
          "Familiarity with Figma or Adobe XD",
          "Basic understanding of UX research methods",
          "Strong visual design skills",
        ],
        tags: ["Design", "UX", "Figma", "Internship"],
        applyLink: "https://sparkstudio.example.com/internships/product-design",
        postedAt: "2026-06-16T14:15:00.000Z",
        isActive: true,
      },
      {
        title: "Data Analyst",
        company: "InsightWorks",
        location: "Hyderabad, India",
        type: "Full-time",
        salary: "₹40,000 - ₹55,000/month",
        description:
          "Analyze business metrics, build dashboards, and help translate data into product decisions. Strong Excel and SQL skills are required.",
        requirements: [
          "Proficiency in SQL",
          "Experience with data visualization tools",
          "Ability to interpret and present analytical findings",
        ],
        tags: ["Analytics", "SQL", "Dashboard", "Full-time"],
        applyLink: "https://insightworks.example.com/jobs/data-analyst",
        postedAt: "2026-06-14T11:00:00.000Z",
        isActive: true,
      },
      {
        title: "React Developer",
        company: "PixelForge",
        location: "Pune, India",
        type: "Full-time",
        salary: "₹45,000 - ₹60,000/month",
        description:
          "Develop and maintain React-based web applications with a focus on performance and accessibility.",
        requirements: [
          "Strong knowledge of React and hooks",
          "Experience with state management",
          "Understanding of frontend build tools and testing",
        ],
        tags: ["React", "Frontend", "Web", "Full-time"],
        applyLink: "https://pixelforge.example.com/careers/react-developer",
        postedAt: "2026-06-12T08:45:00.000Z",
        isActive: true,
      },
    ];
    const created = await Job.insertMany(jobs);
    res
      .status(201)
      .json({
        success: true,
        count: created.length,
        message: "Jobs seeded successfully!",
      });
  } catch (err) {
    next(err);
  }
};
