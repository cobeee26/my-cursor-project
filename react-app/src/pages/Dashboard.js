import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchDashboardData, fetchScheduleData } from '../utils/api';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [dashboard, schedule] = await Promise.all([
          fetchDashboardData(),
          fetchScheduleData()
        ]);
        setDashboardData(dashboard);
        setScheduleData(schedule);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

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

  const stats = [
    {
      title: 'GPA',
      value: dashboardData?.stats?.gpa || 3.25,
      icon: '🎓',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Attendance',
      value: `${dashboardData?.stats?.attendance || 88}%`,
      icon: '📊',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Tasks Due',
      value: dashboardData?.stats?.tasksDue || 2,
      icon: '📝',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Announcements',
      value: dashboardData?.stats?.announcements || 1,
      icon: '📢',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      {/* Top Section - Three Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* GPA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          className="metric-card"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <i className="fas fa-chart-line text-gray-600"></i>
              <h3 className="text-lg font-semibold text-gray-900">GPA</h3>
            </div>
            <span className="status-badge status-high">High</span>
          </div>
          <div className="text-4xl font-bold text-gray-900 mb-2">4.7</div>
          <p className="text-sm text-gray-600">Your performance has increased by 2% compared to last semester.</p>
        </motion.div>

        {/* On-time Rate Card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          className="metric-card"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <i className="fas fa-clock text-gray-600"></i>
              <h3 className="text-lg font-semibold text-gray-900">On-time rate</h3>
            </div>
            <span className="status-badge status-high">High</span>
          </div>
          <div className="text-4xl font-bold text-gray-900 mb-2">96%</div>
          <p className="text-sm text-gray-600">Your tasks have increased by 10% compared to last semester.</p>
        </motion.div>

        {/* Class Attendance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          className="metric-card md:col-span-2 lg:col-span-1"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <i className="fas fa-calendar text-gray-600"></i>
              <h3 className="text-lg font-semibold text-gray-900">Class attendance</h3>
            </div>
            <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent">
              <option>month</option>
            </select>
          </div>
          
          {/* Attendance Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(day => (
              <div key={day} className="text-center text-xs font-semibold text-gray-600 py-1">
                {day}
              </div>
            ))}
            {[
              { status: 'present' }, { status: 'present' }, { status: 'absent' }, 
              { status: 'present' }, { status: 'present' }, { status: 'no-class' }, { status: 'no-class' }
            ].map((day, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className={`attendance-day ${
                  day.status === 'present' ? 'attendance-present' :
                  day.status === 'absent' ? 'attendance-absent' :
                  'attendance-no-class'
                }`}
              >
                {day.status === 'present' ? '✓' : day.status === 'absent' ? '✗' : '-'}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Section - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">My tasks</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200"
            >
              +
            </motion.button>
          </div>
          
          {/* Task Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['All tasks', 'To do', 'In progress', 'Done'].map((filter, index) => (
              <motion.button
                key={filter}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`task-chip ${
                  index === 0 ? 'active' : 'inactive'
                }`}
              >
                {filter}
              </motion.button>
            ))}
          </div>

          {/* Task List */}
          <div className="space-y-4">
            {[
              { title: "Read poem & answer questions", subject: "English Literature", date: "Apr 28, 2025", status: "In progress", progress: 60, comments: 12 },
              { title: "Create a comic strip with a story", subject: "Social Studies", date: "May 17, 2025", status: "To do", comments: 0 },
              { title: "Prepare for the math test", subject: "Math", date: "May 11, 2025", status: "To do", comments: 2 },
              { title: "Read the chapter about plant and animal", subject: "Biology", date: "Apr 22, 2025", status: "To do", comments: 1 }
            ].map((task, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{task.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{task.subject} • {task.date}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className={`status-badge ${
                          task.status === 'Done' ? 'status-completed' :
                          task.status === 'In progress' ? 'status-in-progress' :
                          'status-todo'
                        }`}>
                          {task.status}
                        </span>
                        <span className="text-xs text-gray-500">
                          {task.comments === 0 ? 'No comments' : `${task.comments} comments`}
                        </span>
                      </div>
                    </div>
                    
                    {task.progress && task.status === 'In progress' && (
                      <div className="mt-3">
                        <div className="progress-bar">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${task.progress}%` }}
                            transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                            className="progress-fill-orange"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 py-2 text-gray-600 hover:text-gray-700 font-medium"
          >
            View all tasks
          </motion.button>
        </motion.div>

        {/* My Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">My schedule</h2>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent">
              <option>today</option>
            </select>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Time</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Lesson</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Teacher</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Location</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { time: '8:30 AM', lesson: 'Math', teacher: 'Mrs. Goodman', location: 'B3, Room 124' },
                  { time: '10:30 AM', lesson: 'ELA', teacher: 'Ms. Melton', location: 'B2, Room 150' },
                  { time: '12:00 PM', lesson: 'Biology', teacher: 'Mr. Hodge', location: 'B3, Room 210' },
                  { time: '02:00 PM', lesson: 'Social Studies', teacher: 'Mrs. Murray', location: 'B1, Room 112' }
                ].map((schedule, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="schedule-row"
                  >
                    <td className="py-4 px-4 font-semibold text-gray-900">{schedule.time}</td>
                    <td className="py-4 px-4 font-semibold text-gray-900">{schedule.lesson}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={`https://images.unsplash.com/photo-${1500000000000 + index * 100000000}?w=32&h=32&fit=crop&crop=face`}
                          alt={schedule.teacher}
                          className="teacher-avatar"
                        />
                        <span className="font-medium text-gray-900">{schedule.teacher}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600 font-medium">{schedule.location}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
