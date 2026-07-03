import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiMic, FiVideo, FiPlayCircle, FiCheckSquare } from 'react-icons/fi';

const MockInterview = () => {
  const [role, setRole] = useState('Software Engineer');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [isInterviewing, setIsInterviewing] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const startInterview = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/ai/interview/question', {
        targetRole: role,
        difficulty: difficulty,
        previousQuestions: history
      });
      setCurrentQuestion(res.data.data.question);
      setHistory([...history, res.data.data.question]);
      setIsInterviewing(true);
    } catch (error) {
      console.error(error);
      alert('Error generating question.');
    } finally {
      setIsLoading(false);
    }
  };

  const nextQuestion = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/ai/interview/question', {
        targetRole: role,
        difficulty: difficulty,
        previousQuestions: history
      });
      setCurrentQuestion(res.data.data.question);
      setHistory([...history, res.data.data.question]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">AI Mock Interview</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">Practice your interview skills with our real-time AI simulation. Get dynamic questions tailored to your target role.</p>
      </div>

      {!isInterviewing ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
        >
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Target Role</label>
            <input 
              type="text" 
              className="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-4 border"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Frontend Developer, Data Analyst"
            />
          </div>
          
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty Level</label>
            <select 
              className="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-4 border bg-white"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <button 
            onClick={startInterview}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 px-8 py-4 text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all disabled:opacity-70"
          >
            {isLoading ? 'Preparing AI Interviewer...' : <><FiPlayCircle className="text-xl" /> Start Mock Interview</>}
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Simulation Area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="col-span-2 bg-gray-900 rounded-3xl overflow-hidden shadow-2xl relative aspect-video flex flex-col"
          >
            {/* AI Avatar / Status */}
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white text-sm px-4 py-2 rounded-full flex items-center gap-2 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Recording Session
            </div>
            
            <div className="flex-grow flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20">
                  <FiVideo className="text-4xl text-white" />
                </div>
                <h3 className="text-white text-xl font-medium">AI Interviewer Active</h3>
              </div>
            </div>

            {/* Subtitles / Question display */}
            <div className="bg-black/80 backdrop-blur-md border-t border-white/10 p-6">
              <h4 className="text-blue-400 text-sm font-semibold mb-2 flex items-center gap-2">
                <FiMic /> AI Interviewer is asking:
              </h4>
              <p className="text-white text-lg lg:text-xl font-medium leading-relaxed">
                {isLoading ? (
                  <span className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{animationDelay: '0.2s'}}></span>
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{animationDelay: '0.4s'}}></span>
                  </span>
                ) : currentQuestion}
              </p>
            </div>
          </motion.div>

          {/* Controls & History */}
          <div className="flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex-grow"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FiCheckSquare className="text-green-500" /> Controls
              </h3>
              
              <div className="space-y-4">
                <button className="w-full py-3 rounded-xl border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition-colors">
                  Record Answer (Hold Space)
                </button>
                <button 
                  onClick={nextQuestion}
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  Skip / Next Question
                </button>
                <button 
                  onClick={() => setIsInterviewing(false)}
                  className="w-full py-3 rounded-xl text-red-600 font-semibold hover:bg-red-50 transition-colors"
                >
                  End Interview Early
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <h4 className="font-semibold text-gray-700 mb-4">Interview Progress</h4>
                <div className="space-y-3">
                  {history.map((q, i) => (
                    <div key={i} className="text-sm p-3 rounded-lg bg-gray-50 border border-gray-100 text-gray-600">
                      <span className="font-bold text-gray-900">Q{i+1}:</span> {q}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MockInterview;
