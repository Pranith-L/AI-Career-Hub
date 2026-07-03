import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FiUser, FiMail, FiCamera, FiSave, FiBook } from 'react-icons/fi';

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [skills, setSkills] = useState(user?.skills?.join(', ') || '');
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(user?.profilePicture || '');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('name', name);
      formData.append('bio', bio);
      formData.append('skills', JSON.stringify(skills.split(',').map(s => s.trim()).filter(Boolean)));
      if (photo) formData.append('profilePicture', photo);

      const res = await axios.put('http://localhost:5000/api/auth/update-profile', formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });

      updateUser(res.data.data);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

        {/* Header */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-green-500"></div>
        <div className="px-8 pb-8">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-14 mb-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-gradient-to-br from-blue-500 to-green-400 flex items-center justify-center">
                {preview ? (
                  <img src={preview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white font-bold text-3xl">{user?.name?.[0]?.toUpperCase()}</span>
                )}
              </div>
              <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors shadow-md">
                <FiCamera className="text-white text-sm" />
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              </label>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900">{user?.name}</h1>
              <p className="text-gray-500 text-sm">{user?.email}</p>
            </div>
          </div>

          {success && (
            <div className="mb-6 bg-green-50 text-green-700 px-4 py-3 rounded-xl text-sm font-medium border border-green-200">{success}</div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5"><FiUser className="text-blue-600" /> Full Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-blue-500 focus:border-blue-500" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5"><FiMail className="text-blue-600" /> Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 cursor-not-allowed text-gray-500" value={user?.email} disabled />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5"><FiBook className="text-blue-600" /> Bio</label>
              <textarea rows="3" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tell us about yourself..." value={bio} onChange={e => setBio(e.target.value)} />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Skills <span className="text-gray-400 font-normal">(comma separated)</span></label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="React, Node.js, Python, MongoDB..." value={skills} onChange={e => setSkills(e.target.value)} />
              {skills && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {skills.split(',').filter(Boolean).map((s, i) => (
                    <span key={i} className="text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full">{s.trim()}</span>
                  ))}
                </div>
              )}
            </div>

            <button type="submit" disabled={saving} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 shadow-lg transition-all disabled:opacity-70">
              {saving ? (
                <><svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg> Saving...</>
              ) : <><FiSave /> Save Profile</>}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
