import { Link } from 'react-router-dom';
import { FiTwitter, FiLinkedin, FiGithub, FiMail } from 'react-icons/fi';

const footerSections = [
  {
    title: 'Platform',
    links: [
      { label: 'AI Resume Builder', href: '/#resume-builder' },
      { label: 'AI Mock Interview', href: '/#mock-interview' },
      { label: 'Career Guidance', href: '/#career-guidance' },
      { label: 'Job Opportunities', to: '/jobs' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/#about' },
      { label: 'Services', href: '/#services' },
      { label: 'Testimonials', href: '/#testimonials' },
      { label: 'Contact', href: '/#contact' },
      { label: 'FAQ', to: '/faq' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Resume Builder App', to: '/resume-builder' },
      { label: 'Mock Interview App', to: '/interviews' },
      { label: 'Career Roadmap', to: '/roadmap' },
      { label: 'Dashboard', to: '/dashboard' },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-green-400 flex items-center justify-center text-white font-bold text-sm">AI</div>
              <span className="font-bold text-lg text-white">CareerHub</span>
            </div>
            <p className="text-sm leading-relaxed mb-5 max-w-sm">
              Empowering the next generation of professionals with AI-driven career tools — resume building, mock interviews, career guidance, and job opportunities.
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="Twitter" className="hover:text-white transition-colors"><FiTwitter /></a>
              <a href="#" aria-label="LinkedIn" className="hover:text-white transition-colors"><FiLinkedin /></a>
              <a href="#" aria-label="GitHub" className="hover:text-white transition-colors"><FiGithub /></a>
              <a href="mailto:support@aicareerhub.in" aria-label="Email" className="hover:text-white transition-colors"><FiMail /></a>
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3 text-sm">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link to={link.to} className="hover:text-white transition-colors">{link.label}</Link>
                    ) : (
                      <a href={link.href} className="hover:text-white transition-colors">{link.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <p>© {new Date().getFullYear()} AI CareerHub. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
