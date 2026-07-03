import { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiMenu, FiX, FiLayout } from 'react-icons/fi';

const navLinks = [
  { href: '/#about', label: 'About' },
  { href: '/#services', label: 'Services' },
  { href: '/#resume-builder', label: 'Resume' },
  { href: '/#mock-interview', label: 'Interviews' },
  { href: '/#career-guidance', label: 'Guidance' },
  { href: '/#jobs', label: 'Jobs' },
  { href: '/#testimonials', label: 'Reviews' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/#contact', label: 'Contact' },
];

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  const handleNavClick = (href) => {
    setMobileOpen(false);
    if (href.startsWith('/#')) {
      const hash = href.slice(1);
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      } else {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          <Link to="/" className="flex-shrink-0 flex items-center gap-2 group" onClick={() => setMobileOpen(false)}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-green-500 flex items-center justify-center text-white font-bold text-sm transition-transform group-hover:scale-105">AI</div>
            <span className="font-bold text-xl tracking-tight text-gray-900">Career<span className="text-blue-600">Hub</span></span>
          </Link>

          <div className="hidden lg:flex space-x-0.5">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => handleNavClick(link.href)}
                className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2.5 py-2 rounded-lg text-xs font-medium transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex gap-3 items-center">
            {user ? (
              <>
                <Link to="/dashboard" className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                  <FiLayout /> Dashboard
                </Link>
                <Link to="/profile" className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-green-500 flex items-center justify-center text-white font-bold text-sm hover:shadow-md transition-all" title={user.name}>
                  {user.name?.[0]?.toUpperCase()}
                </Link>
                <button onClick={handleLogout} className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors px-3 py-2">Log in</Link>
                <Link to="/register" className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white shadow-lg max-h-[70vh] overflow-y-auto">
          <div className="px-4 py-3 space-y-1">
            <Link to="/" onClick={() => setMobileOpen(false)} className="block px-3 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600">Home</Link>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => handleNavClick(link.href)}
                className="block px-3 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              >
                {link.label}
              </a>
            ))}
            <Link to="/resume-builder" onClick={() => setMobileOpen(false)} className="block px-3 py-3 rounded-xl text-sm font-medium text-blue-600 hover:bg-blue-50">Resume Builder App</Link>
            <Link to="/interviews" onClick={() => setMobileOpen(false)} className="block px-3 py-3 rounded-xl text-sm font-medium text-blue-600 hover:bg-blue-50">Mock Interview App</Link>
            <Link to="/roadmap" onClick={() => setMobileOpen(false)} className="block px-3 py-3 rounded-xl text-sm font-medium text-blue-600 hover:bg-blue-50">Career Roadmap</Link>
            <Link to="/jobs" onClick={() => setMobileOpen(false)} className="block px-3 py-3 rounded-xl text-sm font-medium text-blue-600 hover:bg-blue-50">All Jobs</Link>
          </div>
          <div className="px-4 py-3 border-t border-gray-100 flex flex-col gap-2">
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-50">Dashboard</Link>
                <Link to="/profile" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-50">Profile</Link>
                <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="block text-center py-3 rounded-xl text-sm font-medium text-gray-700 border border-gray-200 hover:bg-gray-50">Log in</Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="block text-center py-3 rounded-xl text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">Get Started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
