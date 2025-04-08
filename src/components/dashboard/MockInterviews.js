import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { userService } from '../../services/firebase';
import { motion } from 'framer-motion';

export default function MockInterviews() {
  const { currentUser } = useAuth();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newInterview, setNewInterview] = useState({
    type: 'technical',
    date: '',
    time: '',
    duration: '60',
    notes: ''
  });

  const cleanupOldInterviews = useCallback(async (interviewsList) => {
    const now = new Date();
    const outdatedInterviews = interviewsList.filter(interview => {
      const interviewTime = new Date(interview.datetime);
      const oneHourAfter = new Date(interviewTime.getTime() + 60 * 60 * 1000);
      return now > oneHourAfter;
    });

    // Delete outdated interviews
    for (const interview of outdatedInterviews) {
      try {
        await userService.deleteMockInterview(currentUser.uid, interview.id);
        console.log(`Deleted interview scheduled for ${interview.datetime}`);
      } catch (error) {
        console.error('Error deleting old interview:', error);
      }
    }

    // Return only current interviews
    return interviewsList.filter(interview => {
      const interviewTime = new Date(interview.datetime);
      const oneHourAfter = new Date(interviewTime.getTime() + 60 * 60 * 1000);
      return now <= oneHourAfter;
    });
  }, [currentUser.uid]);

  const loadInterviews = useCallback(async () => {
    try {
      const data = await userService.getMockInterviews(currentUser.uid);
      const currentInterviews = await cleanupOldInterviews(data);
      setInterviews(currentInterviews);
      setLoading(false);
    } catch (error) {
      console.error('Error loading interviews:', error);
      setLoading(false);
    }
  }, [currentUser.uid, cleanupOldInterviews]);

  useEffect(() => {
    loadInterviews();
  }, [loadInterviews]);

  // Check for old interviews every minute
  useEffect(() => {
    const interval = setInterval(() => {
      loadInterviews();
    }, 60000); // 60000 ms = 1 minute

    return () => clearInterval(interval);
  }, [loadInterviews]);

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const handleSchedule = async (e) => {
    e.preventDefault();
    const selectedDateTime = new Date(`${newInterview.date}T${newInterview.time}`);
    const now = new Date();

    if (selectedDateTime <= now) {
      alert('Please select a future date and time for the interview');
      return;
    }

    try {
      await userService.scheduleMockInterview(currentUser.uid, {
        ...newInterview,
        datetime: `${newInterview.date}T${newInterview.time}`
      });
      setNewInterview({
        type: 'technical',
        date: '',
        time: '',
        duration: '60',
        notes: ''
      });
      loadInterviews();
    } catch (error) {
      console.error('Error scheduling interview:', error);
    }
  };

  const handleUpdateStatus = async (interviewId, newStatus) => {
    try {
      await userService.updateMockInterview(currentUser.uid, interviewId, { status: newStatus });
      loadInterviews();
    } catch (error) {
      console.error('Error updating interview status:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      scheduled: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      'in-progress': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getTimeRemaining = (datetime) => {
    const interviewTime = new Date(datetime);
    const now = new Date();
    const oneHourAfter = new Date(interviewTime.getTime() + 60 * 60 * 1000);
    const msRemaining = oneHourAfter - now;
    
    if (msRemaining <= 0) return 'Expired';
    
    const minutesRemaining = Math.floor(msRemaining / (1000 * 60));
    if (minutesRemaining < 60) {
      return `${minutesRemaining} min remaining`;
    }
    return 'More than 1 hour';
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
      {/* Schedule Interview Form */}
      <motion.section
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-white rounded-2xl shadow-md p-6"
      >
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Schedule Mock Interview</h2>
        <form onSubmit={handleSchedule} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            className="input-field"
            value={newInterview.type}
            onChange={(e) => setNewInterview(prev => ({ ...prev, type: e.target.value }))}
            required
          >
            <option value="technical">Technical Interview</option>
            <option value="behavioral">Behavioral Interview</option>
            <option value="system-design">System Design Interview</option>
            <option value="hr">HR Interview</option>
          </select>
          <select
            className="input-field"
            value={newInterview.duration}
            onChange={(e) => setNewInterview(prev => ({ ...prev, duration: e.target.value }))}
            required
          >
            <option value="30">30 minutes</option>
            <option value="45">45 minutes</option>
            <option value="60">60 minutes</option>
            <option value="90">90 minutes</option>
          </select>
          <input
            type="date"
            className="input-field"
            value={newInterview.date}
            onChange={(e) => setNewInterview(prev => ({ ...prev, date: e.target.value }))}
            required
            min={getTomorrowDate()}
          />
          <input
            type="time"
            className="input-field"
            value={newInterview.time}
            onChange={(e) => setNewInterview(prev => ({ ...prev, time: e.target.value }))}
            required
          />
          <textarea
            placeholder="Additional Notes or Topics to Focus"
            className="input-field md:col-span-2"
            rows="3"
            value={newInterview.notes}
            onChange={(e) => setNewInterview(prev => ({ ...prev, notes: e.target.value }))}
          />
          <button
            type="submit"
            className="md:col-span-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Schedule Interview
          </button>
        </form>
      </motion.section>

      {/* Interviews List */}
      <motion.section
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-white rounded-2xl shadow-md p-6"
      >
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Your Mock Interviews</h2>
        <div className="space-y-4">
          {interviews.length === 0 ? (
            <p className="text-slate-500 text-center py-4">No mock interviews scheduled yet. Schedule one above!</p>
          ) : (
            interviews.map((interview) => (
              <motion.div
                key={interview.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="font-medium text-slate-800">
                      {interview.type.charAt(0).toUpperCase() + interview.type.slice(1)} Interview
                    </h3>
                    <p className="text-slate-600">
                      {new Date(interview.datetime).toLocaleDateString()} at{' '}
                      {new Date(interview.datetime).toLocaleTimeString()}
                    </p>
                    <p className="text-sm text-slate-500">Duration: {interview.duration} minutes</p>
                    <p className="text-sm font-medium text-blue-600">{getTimeRemaining(interview.datetime)}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <select
                      value={interview.status}
                      onChange={(e) => handleUpdateStatus(interview.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(interview.status)}`}
                    >
                      <option value="scheduled">Scheduled</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
                {interview.notes && (
                  <p className="mt-2 text-sm text-slate-600 bg-white p-2 rounded">
                    {interview.notes}
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
