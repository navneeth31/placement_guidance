import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { userService } from '../../services/firebase';
import { motion } from 'framer-motion';

export default function JobTracker() {
  const { currentUser } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newJob, setNewJob] = useState({
    company: '',
    position: '',
    location: '',
    status: 'applied',
    appliedDate: '',
    link: '',
    notes: ''
  });

  const loadJobs = useCallback(async () => {
    try {
      const jobsData = await userService.getJobApplications(currentUser.uid);
      setJobs(jobsData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading jobs:', error);
      setLoading(false);
    }
  }, [currentUser.uid]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const handleAddJob = async (e) => {
    e.preventDefault();
    try {
      await userService.addJobApplication(currentUser.uid, {
        ...newJob,
        appliedDate: newJob.appliedDate || new Date().toISOString().split('T')[0]
      });
      setNewJob({
        company: '',
        position: '',
        location: '',
        status: 'applied',
        appliedDate: '',
        link: '',
        notes: ''
      });
      loadJobs();
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  const handleUpdateStatus = async (jobId, newStatus) => {
    try {
      await userService.updateJobApplication(currentUser.uid, jobId, { status: newStatus });
      loadJobs();
    } catch (error) {
      console.error('Error updating job status:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      applied: 'bg-blue-100 text-blue-800',
      interviewing: 'bg-yellow-100 text-yellow-800',
      offered: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      accepted: 'bg-purple-100 text-purple-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Add New Job Form */}
      <motion.section
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-white rounded-2xl shadow-md p-6"
      >
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Add New Job Application</h2>
        <form onSubmit={handleAddJob} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Company Name"
            className="input-field"
            value={newJob.company}
            onChange={(e) => setNewJob(prev => ({ ...prev, company: e.target.value }))}
            required
          />
          <input
            type="text"
            placeholder="Position"
            className="input-field"
            value={newJob.position}
            onChange={(e) => setNewJob(prev => ({ ...prev, position: e.target.value }))}
            required
          />
          <input
            type="text"
            placeholder="Location"
            className="input-field"
            value={newJob.location}
            onChange={(e) => setNewJob(prev => ({ ...prev, location: e.target.value }))}
          />
          <input
            type="url"
            placeholder="Job Posting Link"
            className="input-field"
            value={newJob.link}
            onChange={(e) => setNewJob(prev => ({ ...prev, link: e.target.value }))}
          />
          <input
            type="date"
            placeholder="Applied Date"
            className="input-field"
            value={newJob.appliedDate}
            onChange={(e) => setNewJob(prev => ({ ...prev, appliedDate: e.target.value }))}
            required
            max={new Date().toISOString().split('T')[0]}
          />
          <select
            className="input-field"
            value={newJob.status}
            onChange={(e) => setNewJob(prev => ({ ...prev, status: e.target.value }))}
          >
            <option value="applied">Applied</option>
            <option value="interviewing">Interviewing</option>
            <option value="offered">Offered</option>
            <option value="rejected">Rejected</option>
            <option value="accepted">Accepted</option>
          </select>
          <textarea
            placeholder="Notes"
            className="input-field md:col-span-2"
            rows="3"
            value={newJob.notes}
            onChange={(e) => setNewJob(prev => ({ ...prev, notes: e.target.value }))}
          />
          <button
            type="submit"
            className="md:col-span-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Job Application
          </button>
        </form>
      </motion.section>

      {/* Job Applications List */}
      <motion.section
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-white rounded-2xl shadow-md p-6"
      >
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Your Job Applications</h2>
        <div className="space-y-4">
          {jobs.length === 0 ? (
            <p className="text-slate-500 text-center py-4">No job applications yet. Start by adding one above!</p>
          ) : (
            jobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="font-medium text-slate-800">{job.position}</h3>
                    <p className="text-slate-600">{job.company}</p>
                    <p className="text-sm text-slate-500">{job.location}</p>
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-slate-500">Applied: {new Date(job.appliedDate).toLocaleDateString()}</span>
                      {job.link && (
                        <a
                          href={job.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          View Posting
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <select
                      value={job.status}
                      onChange={(e) => handleUpdateStatus(job.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job.status)}`}
                    >
                      <option value="applied">Applied</option>
                      <option value="interviewing">Interviewing</option>
                      <option value="offered">Offered</option>
                      <option value="rejected">Rejected</option>
                      <option value="accepted">Accepted</option>
                    </select>
                  </div>
                </div>
                {job.notes && (
                  <p className="mt-2 text-sm text-slate-600 bg-white p-2 rounded">
                    {job.notes}
                  </p>
                )}
              </motion.div>
            ))
          )}
        </div>
      </motion.section>
    </motion.div>
  );
}
