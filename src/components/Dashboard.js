import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import ResumeBuilder from './dashboard/ResumeBuilder';
import InterviewPrep from './dashboard/InterviewPrep';
import JobTracker from './dashboard/JobTracker';
import ResourceLibrary from './dashboard/ResourceLibrary';
import MockInterviews from './dashboard/MockInterviews';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const renderOverview = () => (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        {/* Quick Stats */}
        <motion.div 
          className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          variants={itemVariants}
        >
          <div className="p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <i className="fas fa-chart-line mr-2 text-blue-500"></i>
              Quick Stats
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-slate-600">Resume Completion</span>
                  <span className="text-sm font-medium text-blue-600">70%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-slate-600">Interview Practice</span>
                  <span className="text-sm font-medium text-green-600">45%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-slate-600">Job Applications</span>
                  <span className="text-sm font-medium text-purple-600">30%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div 
          className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
          variants={itemVariants}
        >
          <div className="p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <i className="fas fa-calendar mr-2 text-indigo-500"></i>
              Upcoming Events
            </h3>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-video text-indigo-600"></i>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-800">Mock Interview</p>
                    <p className="text-sm text-slate-500">Tomorrow, 2:00 PM</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-file-alt text-purple-600"></i>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-800">Resume Workshop</p>
                    <p className="text-sm text-slate-500">Next Monday, 11:00 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
          variants={itemVariants}
        >
          <div className="p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <i className="fas fa-bolt mr-2 text-amber-500"></i>
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button 
                onClick={() => setActiveTab('resume')}
                className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-colors duration-200"
              >
                <span className="flex items-center">
                  <i className="fas fa-file-alt mr-2"></i>
                  Update Resume
                </span>
                <i className="fas fa-chevron-right opacity-70"></i>
              </button>
              <button 
                onClick={() => setActiveTab('interview')}
                className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-green-50 to-green-100 text-green-700 rounded-xl hover:from-green-100 hover:to-green-200 transition-colors duration-200"
              >
                <span className="flex items-center">
                  <i className="fas fa-user-tie mr-2"></i>
                  Practice Interview
                </span>
                <i className="fas fa-chevron-right opacity-70"></i>
              </button>
              <button 
                onClick={() => setActiveTab('jobs')}
                className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-colors duration-200"
              >
                <span className="flex items-center">
                  <i className="fas fa-briefcase mr-2"></i>
                  Track Applications
                </span>
                <i className="fas fa-chevron-right opacity-70"></i>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div 
        className="bg-white rounded-2xl shadow-md p-6"
        variants={itemVariants}
      >
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
          <i className="fas fa-clock mr-2 text-slate-500"></i>
          Recent Activity
        </h3>
        <div className="space-y-4">
          <div className="flex items-center text-sm">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
              <i className="fas fa-file-alt"></i>
            </div>
            <div className="ml-3">
              <p className="text-slate-800">Updated your resume</p>
              <p className="text-slate-500 text-xs">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center text-sm">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="ml-3">
              <p className="text-slate-800">Completed mock interview</p>
              <p className="text-slate-500 text-xs">Yesterday</p>
            </div>
          </div>
          <div className="flex items-center text-sm">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
              <i className="fas fa-building"></i>
            </div>
            <div className="ml-3">
              <p className="text-slate-800">Applied to Software Developer position</p>
              <p className="text-slate-500 text-xs">2 days ago</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <motion.div 
        className="bg-white shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center">
              <i className="fas fa-user-circle text-2xl text-white"></i>
            </div>
            <div className="ml-7">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Welcome back!</h2>
              <p className="text-sm text-slate-500">{currentUser.email}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <nav className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <i className="fas fa-home mr-2"></i>
            Overview
          </button>
          <button
            onClick={() => setActiveTab('resume')}
            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
              activeTab === 'resume'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <i className="fas fa-file-alt mr-2"></i>
            Resume Builder
          </button>
          <button
            onClick={() => setActiveTab('interview')}
            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
              activeTab === 'interview'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <i className="fas fa-user-tie mr-2"></i>
            Interview Prep
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
              activeTab === 'jobs'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <i className="fas fa-briefcase mr-2"></i>
            Job Tracker
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
              activeTab === 'resources'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <i className="fas fa-book mr-2"></i>
            Resources
          </button>
          <button
            onClick={() => setActiveTab('mock')}
            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
              activeTab === 'mock'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <i className="fas fa-video mr-2"></i>
            Mock Interviews
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'resume' && <ResumeBuilder />}
        {activeTab === 'interview' && <InterviewPrep />}
        {activeTab === 'jobs' && <JobTracker />}
        {activeTab === 'resources' && <ResourceLibrary />}
        {activeTab === 'mock' && <MockInterviews />}
      </div>
    </div>
  );
}
