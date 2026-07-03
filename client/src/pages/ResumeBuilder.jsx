import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiUpload, FiFileText, FiCpu, FiCheckCircle } from 'react-icons/fi';

const ResumeBuilder = () => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResume, setGeneratedResume] = useState(null);

  const handleGenerate = async () => {
    if (!resumeText || !jobDescription) return alert('Please fill in both fields.');
    
    setIsGenerating(true);
    try {
      // Pointing to local backend. Assuming backend runs on 5000
      const res = await axios.post('http://localhost:5000/api/ai/resume', {
        currentResumeText: resumeText,
        targetJobDescription: jobDescription
      });
      
      setGeneratedResume(res.data.data);
    } catch (error) {
      console.error(error);
      alert('Error generating resume. Make sure the backend server is running and API key is set.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">AI Resume Builder</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">Upload your current details and let our AI optimize your resume for your dream job.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Input Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8"
        >
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <FiFileText className="text-blue-600" /> Current Resume / Experience
            </label>
            <textarea 
              rows="6"
              className="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 p-4 border"
              placeholder="Paste your current resume content, or briefly describe your experience..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            ></textarea>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <FiCheckCircle className="text-green-500" /> Target Job Description
            </label>
            <textarea 
              rows="6"
              className="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 p-4 border"
              placeholder="Paste the job description you are applying for..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            ></textarea>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full flex items-center justify-center gap-2 px-8 py-4 text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 shadow-lg shadow-blue-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Analyzing with AI...
              </>
            ) : (
              <>
                <FiCpu className="text-xl" /> Generate AI Resume
              </>
            )}
          </button>
        </motion.div>

        {/* Output Preview */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col"
        >
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Live Preview</h3>
            {generatedResume && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                ATS Optimized
              </span>
            )}
          </div>
          
          <div className="p-6 md:p-8 flex-grow bg-gray-50/50">
            {!generatedResume ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 space-y-4">
                <FiFileText className="text-6xl text-gray-300" />
                <p>Your optimized resume preview will appear here.</p>
              </div>
            ) : (
              <div className="prose prose-sm md:prose-base max-w-none text-gray-800 bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-4">Professional Summary</h2>
                <p className="mb-6">{generatedResume.summary}</p>
                
                <h3 className="text-xl font-bold text-gray-900 border-b pb-2 mb-4">Experience</h3>
                <div className="space-y-6">
                  {generatedResume.experience?.map((exp, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-baseline">
                        <h4 className="text-lg font-semibold text-gray-900">{exp.title}</h4>
                        <span className="text-sm font-medium text-gray-500">{exp.company}</span>
                      </div>
                      <p className="mt-2 text-gray-600 text-sm md:text-base leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-gray-900 border-b pb-2 mt-8 mb-4">Core Competencies</h3>
                <div className="flex flex-wrap gap-2">
                  {generatedResume.skills?.map((skill, idx) => (
                    <span key={idx} className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {generatedResume && (
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <button className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors">
                <FiUpload /> Download PDF
              </button>
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
};

export default ResumeBuilder;
