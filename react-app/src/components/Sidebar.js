import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Create logout handler function
  const handleLogout = () => {
    // Step 1: Clear the token to invalidate the session
    localStorage.removeItem('plmun_authenticated');
    localStorage.removeItem('plmun_student_number');
    
    // Step 2: Navigate to the Login Page
    navigate('/');
  };

  const mainMenuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'fas fa-chart-bar' },
    { path: '/schedule', label: 'Schedule', icon: 'fas fa-calendar' },
    { path: '/tasks', label: 'Tasks', icon: 'fas fa-tasks', badge: 3 },
    { path: '/tests', label: 'Tests', icon: 'fas fa-file-alt' },
    { path: '/reports', label: 'Reports', icon: 'fas fa-chart-line' },
    { path: '/chat', label: 'Chat', icon: 'fas fa-comments' },
    { path: '/notes', label: 'Notes', icon: 'fas fa-sticky-note', badge: 2 }
  ];

  const footerMenuItems = [
    { path: '/settings', label: 'Settings', icon: 'fas fa-cog' },
    { label: 'Logout', icon: 'fas fa-sign-out-alt', isLogout: true }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        />
      )}
      
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed left-0 top-0 h-full w-64 bg-gray-800 shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-700">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center"
            >
              <h2 className="text-xl font-bold text-white">
                ClassTrack Pro
              </h2>
            </motion.div>
          </div>
          
          {/* Main Navigation */}
          <nav className="flex-1 px-4 py-6">
            <div className="space-y-2">
              {mainMenuItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Link to={item.path} onClick={onClose}>
                    <motion.div
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`sidebar-item ${
                        location.pathname === item.path ? 'active' : ''
                      }`}
                    >
                      <i className={`${item.icon} w-5 text-center mr-3`}></i>
                      <span className="font-medium">{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full font-semibold">
                          {item.badge}
                        </span>
                      )}
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </nav>
          
          {/* Footer Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="p-6 border-t border-gray-700"
          >
            <div className="space-y-2">
              {footerMenuItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                >
                  {item.isLogout ? (
                    <motion.button
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleLogout}
                      className="sidebar-item w-full text-red-400 hover:text-red-300 hover:bg-gray-700"
                    >
                      <i className={`${item.icon} w-5 text-center mr-3`}></i>
                      <span className="font-medium">{item.label}</span>
                    </motion.button>
                  ) : (
                    <Link to={item.path} onClick={onClose}>
                      <motion.div
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className={`sidebar-item ${
                          location.pathname === item.path ? 'active' : ''
                        }`}
                      >
                        <i className={`${item.icon} w-5 text-center mr-3`}></i>
                        <span className="font-medium">{item.label}</span>
                      </motion.div>
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
