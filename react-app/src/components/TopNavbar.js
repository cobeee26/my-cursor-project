import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TopNavbar = ({ student, onMenuToggle, onLogout }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <motion.div 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 right-0 left-0 lg:left-64 bg-white shadow-sm border-b border-gray-200 z-30"
    >
      <div className="flex items-center justify-between px-4 lg:px-6 py-4">
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <i className="fas fa-bars text-gray-600"></i>
          </motion.button>
          
          {/* Search Bar */}
          <div className="relative hidden lg:block">
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-80 px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-gray-50"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <i className="fas fa-search"></i>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notification Bell */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <i className="fas fa-bell text-gray-600"></i>
          </motion.button>
          
          {/* User Profile */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <img 
                src={student?.avatar || "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"} 
                alt="Profile" 
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium text-gray-700 hidden lg:block">{student?.name || 'Saira Goodman'}</span>
              <motion.span
                animate={{ rotate: isProfileOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="hidden lg:block"
              >
                <i className="fas fa-chevron-down text-gray-400"></i>
              </motion.span>
            </motion.button>
          
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                >
                  <motion.button
                    whileHover={{ backgroundColor: '#f3f4f6' }}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <i className="fas fa-user mr-2"></i>Profile
                  </motion.button>
                  <motion.button
                    whileHover={{ backgroundColor: '#f3f4f6' }}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <i className="fas fa-cog mr-2"></i>Settings
                  </motion.button>
                  <hr className="my-2" />
                  <motion.button
                    whileHover={{ backgroundColor: '#fef2f2' }}
                    onClick={() => {
                      console.log('Logout button clicked in TopNavbar');
                      onLogout();
                    }}
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i>Logout
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TopNavbar;
