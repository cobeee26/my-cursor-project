import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Tests = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Simulate loading tests data
    const mockTests = [
      {
        id: 1,
        title: "Mathematics Midterm Exam",
        subject: "Mathematics",
        date: "2024-01-20",
        time: "09:00 AM",
        duration: "2 hours",
        status: "upcoming",
        score: null,
        totalMarks: 100
      },
      {
        id: 2,
        title: "Physics Quiz - Mechanics",
        subject: "Physics",
        date: "2024-01-15",
        time: "10:30 AM",
        duration: "45 minutes",
        status: "completed",
        score: 85,
        totalMarks: 100
      },
      {
        id: 3,
        title: "Chemistry Lab Test",
        subject: "Chemistry",
        date: "2024-01-18",
        time: "02:00 PM",
        duration: "1.5 hours",
        status: "upcoming",
        score: null,
        totalMarks: 50
      },
      {
        id: 4,
        title: "Biology Final Exam",
        subject: "Biology",
        date: "2024-01-12",
        time: "09:00 AM",
        duration: "3 hours",
        status: "completed",
        score: 92,
        totalMarks: 100
      }
    ];
    
    setTimeout(() => {
      setTests(mockTests);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredTests = tests.filter(test => {
    if (filter === 'all') return true;
    return test.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'missed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full"
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Tests & Exams</h1>
        <p className="text-gray-600">Manage your upcoming tests and view your results.</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02, y: -2 }}
          className="card bg-blue-50"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Upcoming Tests</p>
              <p className="text-2xl font-bold text-blue-600">
                {tests.filter(t => t.status === 'upcoming').length}
              </p>
            </div>
            <div className="text-3xl">📝</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02, y: -2 }}
          className="card bg-green-50"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Average Score</p>
              <p className="text-2xl font-bold text-green-600">
                {Math.round(tests.filter(t => t.score).reduce((sum, t) => sum + t.score, 0) / tests.filter(t => t.score).length) || 0}%
              </p>
            </div>
            <div className="text-3xl">📊</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02, y: -2 }}
          className="card bg-purple-50"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Tests Completed</p>
              <p className="text-2xl font-bold text-purple-600">
                {tests.filter(t => t.status === 'completed').length}
              </p>
            </div>
            <div className="text-3xl">✅</div>
          </div>
        </motion.div>
      </div>

      {/* Filter Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-6"
      >
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'all', label: 'All Tests' },
            { key: 'upcoming', label: 'Upcoming' },
            { key: 'completed', label: 'Completed' },
            { key: 'missed', label: 'Missed' }
          ].map((filterOption, index) => (
            <motion.button
              key={filterOption.key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(filterOption.key)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                filter === filterOption.key
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filterOption.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Tests List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="space-y-4"
      >
        {filteredTests.map((test, index) => (
          <motion.div
            key={test.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.9 + index * 0.1 }}
            whileHover={{ scale: 1.01, y: -2 }}
            className="card hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{test.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(test.status)}`}>
                    {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Subject:</span> {test.subject}
                  </div>
                  <div>
                    <span className="font-medium">Date:</span> {test.date}
                  </div>
                  <div>
                    <span className="font-medium">Time:</span> {test.time}
                  </div>
                  <div>
                    <span className="font-medium">Duration:</span> {test.duration}
                  </div>
                </div>

                {test.score && (
                  <div className="mt-3 p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-green-800">Score: {test.score}/{test.totalMarks}</span>
                      <div className="w-24 bg-green-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${(test.score / test.totalMarks) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {filteredTests.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">No tests found</h3>
            <p className="text-gray-500">
              {filter === 'all' ? 'You have no tests scheduled.' : `No ${filter} tests found.`}
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mt-8 flex flex-wrap gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary"
        >
          📝 Add New Test
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-secondary"
        >
          📊 View Analytics
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Tests;
