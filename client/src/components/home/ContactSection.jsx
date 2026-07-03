import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';

const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="py-20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">Touch</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Have a question or need support? Drop us a message and our team will get back to you within 24 hours.
            </p>
            <div className="space-y-4">
              {[
                { icon: FiMail, label: 'support@aicareerhub.in', color: 'text-blue-600 bg-blue-50' },
                { icon: FiPhone, label: '+91 98765 43210', color: 'text-green-600 bg-green-50' },
                { icon: FiMapPin, label: 'Bangalore, Karnataka, India', color: 'text-purple-600 bg-purple-50' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center`}>
                    <item.icon />
                  </div>
                  <span className="text-gray-700 font-medium">{item.label}</span>
                </div>
              ))}
            </div>
            <Link to="/contact" className="inline-block mt-8 text-sm font-semibold text-blue-600 hover:text-blue-700">
              Go to full contact page →
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8"
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <FiSend className="text-green-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-500 text-sm">We'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                  <input type="text" required placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                  <input type="email" required placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message</label>
                  <textarea rows="4" required placeholder="How can we help you?"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                </div>
                <button type="submit" className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 shadow-lg transition-all hover:-translate-y-0.5">
                  <FiSend /> Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
