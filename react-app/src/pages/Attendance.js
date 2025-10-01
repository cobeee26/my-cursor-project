import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchAttendanceData } from '../utils/api';

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAttendance = async () => {
      try {
        const data = await fetchAttendanceData();
        setAttendanceData(data);
      } catch (error) {
        console.error('Error loading attendance data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAttendance();
  }, []);

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAttendanceBgColor = (percentage) => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const overallAttendance = attendanceData.length > 0 
    ? Math.round(attendanceData.reduce((sum, item) => sum + item.percentage, 0) / attendanceData.length)
    : 0;

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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Attendance Records</h1>
        <p className="text-gray-600">Track your attendance across all subjects.</p>
      </motion.div>

      {/* Overall Stats */}
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
              <p className="text-sm font-medium text-gray-600 mb-1">Overall Attendance</p>
              <p className="text-2xl font-bold text-blue-600">{overallAttendance}%</p>
            </div>
            <div className="text-3xl">📊</div>
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
              <p className="text-sm font-medium text-gray-600 mb-1">Total Classes</p>
              <p className="text-2xl font-bold text-green-600">
                {attendanceData.reduce((sum, item) => sum + item.totalClasses, 0)}
              </p>
            </div>
            <div className="text-3xl">📚</div>
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
              <p className="text-sm font-medium text-gray-600 mb-1">Classes Attended</p>
              <p className="text-2xl font-bold text-purple-600">
                {attendanceData.reduce((sum, item) => sum + item.attended, 0)}
              </p>
            </div>
            <div className="text-3xl">✅</div>
          </div>
        </motion.div>
      </div>

      {/* Subject-wise Attendance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-6">Subject-wise Attendance</h2>
        
        <div className="space-y-6">
          {attendanceData.map((subject, index) => (
            <motion.div
              key={subject.subject}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800">{subject.subject}</h3>
                  <p className="text-sm text-gray-600">
                    {subject.attended} of {subject.totalClasses} classes attended
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${getAttendanceColor(subject.percentage)}`}>
                    {subject.percentage}%
                  </p>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${subject.percentage}%` }}
                  transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                  className={`h-3 rounded-full ${getAttendanceBgColor(subject.percentage)}`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Attendance Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="card bg-yellow-50 border-yellow-200">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">💡</div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Attendance Tips</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Aim for 90%+ attendance for better grades</li>
                <li>• Set reminders for important classes</li>
                <li>• Communicate with professors if you'll be absent</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="card bg-blue-50 border-blue-200">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">📈</div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Performance Impact</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Regular attendance improves understanding</li>
                <li>• Better participation in class discussions</li>
                <li>• Stronger relationships with professors</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="mt-8 flex flex-wrap gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary"
        >
          📊 Download Report
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-secondary"
        >
          📧 Email to Professor
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Attendance;
