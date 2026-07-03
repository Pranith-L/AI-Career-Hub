import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, this would POST to /api/contact
    setSent(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-14">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Get In Touch</h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">Have a question or feedback? We'd love to hear from you.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Info Cards */}
        <div className="space-y-6">
          {[
            { icon: FiMail, title: 'Email Us', value: 'support@aicareerhub.in', color: 'blue' },
            { icon: FiPhone, title: 'Call Us', value: '+91 98765 43210', color: 'green' },
            { icon: FiMapPin, title: 'Our Office', value: 'Bangalore, Karnataka, India', color: 'purple' },
          ].map((item) => (
            <motion.div key={item.title} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="flex items-start gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
            >
              <div className={`w-11 h-11 rounded-xl bg-${item.color}-50 flex items-center justify-center flex-shrink-0`}>
                <item.icon className={`text-${item.color}-600 text-xl`} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{item.title}</p>
                <p className="text-sm font-medium text-gray-800 mt-0.5">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-8"
        >
          {sent ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <FiSend className="text-green-600 text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
              <p className="text-gray-500">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Name</label>
                  <input type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Doe" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                  <input type="email" required className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Subject</label>
                <input type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="How can we help?" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message</label>
                <textarea rows="5" required className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell us more..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
              </div>
              <button type="submit" className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 shadow-lg transition-all hover:-translate-y-0.5">
                <FiSend /> Send Message
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
