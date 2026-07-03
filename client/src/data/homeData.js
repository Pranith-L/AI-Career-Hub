import { FiFileText, FiMic, FiTrendingUp, FiBriefcase, FiCheck, FiCpu, FiTarget, FiUsers } from 'react-icons/fi';

export const services = [
  { icon: FiFileText, title: 'AI Resume Builder', desc: 'Generate ATS-optimized resumes tailored to any job description in seconds.', color: 'from-blue-500 to-blue-600', link: '/resume-builder', anchor: '#resume-builder' },
  { icon: FiMic, title: 'AI Mock Interview', desc: 'Practice with dynamic AI-generated interview questions for any role or difficulty.', color: 'from-green-500 to-green-600', link: '/interviews', anchor: '#mock-interview' },
  { icon: FiTrendingUp, title: 'Career Guidance', desc: 'Get a personalized AI-generated learning path to reach your dream role.', color: 'from-orange-500 to-orange-600', link: '/roadmap', anchor: '#career-guidance' },
  { icon: FiBriefcase, title: 'Job Opportunities', desc: 'Curated job listings for freshers, with one-click applications and smart filters.', color: 'from-purple-500 to-purple-600', link: '/jobs', anchor: '#jobs' },
];

export const aboutFeatures = [
  'Data-driven career insights powered by Gemini AI',
  'Real-time industry feedback on resumes & interviews',
  'Tailored specifically for students and fresh graduates',
];

export const featureHighlights = [
  {
    id: 'resume-builder',
    icon: FiFileText,
    title: 'AI Resume Builder',
    subtitle: 'ATS-Optimized in Seconds',
    desc: 'Paste your experience and target job description — our Gemini AI rewrites your resume with impact-focused bullet points, industry keywords, and professional formatting that passes ATS filters.',
    bullets: ['Keyword optimization for any role', 'Professional tone & formatting', 'Instant download-ready output'],
    color: 'from-blue-500 to-blue-600',
    link: '/resume-builder',
    cta: 'Build Your Resume',
  },
  {
    id: 'mock-interview',
    icon: FiMic,
    title: 'AI Mock Interview',
    subtitle: 'Practice Like the Real Thing',
    desc: 'Face realistic AI-generated interview questions tailored to your target role and difficulty level. Build confidence and sharpen your answers before the actual interview.',
    bullets: ['Role-specific technical & behavioral Qs', 'Adjustable difficulty levels', 'Unlimited practice sessions'],
    color: 'from-green-500 to-green-600',
    link: '/interviews',
    cta: 'Start Mock Interview',
    reverse: true,
  },
  {
    id: 'career-guidance',
    icon: FiTrendingUp,
    title: 'Career Guidance',
    subtitle: 'Your Personalized Roadmap',
    desc: 'Not sure which path to take? Explore structured career roadmaps for Frontend, Full Stack, Data Science, and more — with skills broken down from foundation to expert level.',
    bullets: ['Step-by-step learning paths', 'Skills mapped to industry demand', 'Progress tracking on dashboard'],
    color: 'from-orange-500 to-orange-600',
    link: '/roadmap',
    cta: 'Explore Roadmaps',
  },
];

export const testimonials = [
  { name: 'Priya Sharma', role: 'SDE at Google', text: 'AI CareerHub helped me craft a perfect resume and ace my Google interview. Got placed in 3 weeks!', rating: 5 },
  { name: 'Rahul Verma', role: 'Frontend Intern at Flipkart', text: 'The mock interview tool is insanely good. The AI gave me tough questions that matched the real interview exactly.', rating: 5 },
  { name: 'Ananya Reddy', role: 'Data Analyst at Amazon', text: 'As a fresher, I was lost. This platform gave me direction, skills, and the confidence to land my first job!', rating: 5 },
];

export const faqs = [
  { q: 'Is AI CareerHub free to use?', a: 'Yes! The core features — Resume Builder, Mock Interviews, Job Board, and Dashboard — are completely free for students and fresh graduates.' },
  { q: 'How does the AI Resume Builder work?', a: 'You paste your current experience and the job description you\'re targeting. Our Gemini AI analyzes both and rewrites your resume with ATS-friendly keywords and impact-focused bullet points.' },
  { q: 'How does the AI Mock Interview work?', a: 'Select your target role and difficulty level. The AI generates realistic interview questions and you can practice unlimited sessions to build confidence.' },
  { q: 'Can I apply for jobs directly through the platform?', a: 'Yes! Our Job Opportunities section lists curated roles for freshers. You can browse, filter, and apply using your AI-generated resume.' },
  { q: 'Is my data safe?', a: 'Absolutely. Your data is stored securely in MongoDB Atlas. Passwords are hashed with bcrypt and JWT tokens expire after 30 days.' },
];

export const fallbackJobs = [
  { _id: '1', title: 'Frontend Developer Intern', company: 'Google', location: 'Bangalore, India', type: 'Internship', tags: ['React', 'TypeScript'] },
  { _id: '2', title: 'Full Stack Engineer', company: 'Flipkart', location: 'Hyderabad, India', type: 'Full-time', tags: ['Node.js', 'React'] },
  { _id: '3', title: 'Data Analyst', company: 'Amazon', location: 'Remote', type: 'Full-time', tags: ['SQL', 'Python'] },
];

export const stats = [
  { value: '50k+', label: 'Students Helped', icon: FiUsers, color: 'text-blue-600' },
  { value: '120k+', label: 'AI Sessions', icon: FiCpu, color: 'text-green-500' },
  { value: '85k+', label: 'Resumes Generated', icon: FiFileText, color: 'text-blue-600' },
  { value: '92%', label: 'Placement Rate', icon: FiTarget, color: 'text-green-500' },
];
