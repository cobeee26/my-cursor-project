import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchReportsData, fetchDashboardData } from '../utils/api';

const Reports = () => {
  const [reportsData, setReportsData] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const [reports, dashboard] = await Promise.all([
          fetchReportsData(),
          fetchDashboardData()
        ]);
        setReportsData(reports);
        setDashboardData(dashboard);
      } catch (error) {
        console.error('Error loading reports data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, []);

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-green-600 bg-green-50';
      case 'down': return 'text-red-600 bg-red-50';
      default: return 'text-blue-600 bg-blue-50';
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Performance Reports</h1>
        <p className="text-gray-600">Track your academic progress and performance insights.</p>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02, y: -2 }}
          className="card bg-gradient-to-br from-blue-50 to-blue-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Current GPA</p>
              <p className="text-2xl font-bold text-blue-600">{dashboardData?.stats?.gpa || 3.25}</p>
            </div>
            <div className="text-3xl">🎓</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02, y: -2 }}
          className="card bg-gradient-to-br from-green-50 to-green-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Attendance Rate</p>
              <p className="text-2xl font-bold text-green-600">{dashboardData?.stats?.attendance || 88}%</p>
            </div>
            <div className="text-3xl">📊</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02, y: -2 }}
          className="card bg-gradient-to-br from-orange-50 to-orange-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Tasks Completed</p>
              <p className="text-2xl font-bold text-orange-600">85%</p>
            </div>
            <div className="text-3xl">✅</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02, y: -2 }}
          className="card bg-gradient-to-br from-purple-50 to-purple-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Study Hours</p>
              <p className="text-2xl font-bold text-purple-600">42h</p>
            </div>
            <div className="text-3xl">⏰</div>
          </div>
        </motion.div>
      </div>

      {/* Performance Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mb-8"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-6">Performance Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportsData.map((report, index) => (
            <motion.div
              key={report.title}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className={`card ${getTrendColor(report.trend)}`}
            >
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{getTrendIcon(report.trend)}</div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">{report.title}</h3>
                  <p className="text-sm text-gray-600">{report.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Study Progress Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="card mb-8"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-6">Study Progress</h2>
        <div className="space-y-4">
          {[
            { subject: 'Mathematics', progress: 85, color: 'bg-blue-500' },
            { subject: 'Physics', progress: 78, color: 'bg-green-500' },
            { subject: 'Chemistry', progress: 92, color: 'bg-purple-500' },
            { subject: 'Biology', progress: 88, color: 'bg-orange-500' },
            { subject: 'English', progress: 95, color: 'bg-pink-500' }
          ].map((item, index) => (
            <motion.div
              key={item.subject}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 + index * 0.1 }}
              className="flex items-center justify-between"
            >
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-700">{item.subject}</span>
                  <span className="text-sm text-gray-600">{item.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.progress}%` }}
                    transition={{ duration: 1, delay: 1.2 + index * 0.1 }}
                    className={`h-2 rounded-full ${item.color}`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
      >
        <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">💡</div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Recommendations</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Focus more on Physics to improve overall GPA</li>
                <li>• Maintain current attendance rate</li>
                <li>• Consider study groups for difficult subjects</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">🎯</div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Goals</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Achieve 3.5+ GPA by end of semester</li>
                <li>• Maintain 90%+ attendance</li>
                <li>• Complete all assignments on time</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
        className="flex flex-wrap gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary"
        >
          📊 Generate Full Report
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-secondary"
        >
          📧 Share with Advisor
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-secondary"
        >
          📱 Export Data
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Reports;
