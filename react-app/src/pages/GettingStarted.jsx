import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const GettingStarted = () => {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    switch (role) {
      case 'student':
        navigate('/student-login');
        break;
      case 'teacher':
        navigate('/teacher/login');
        break;
      case 'admin':
        navigate('/admin/login');
        break;
      default:
        break;
    }
  };

  const roleCards = [
    {
      id: 'student',
      title: 'Student',
      description: 'Access your academic records, schedules, and student services',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      ),
      bgColor: 'bg-gradient-to-br from-blue-600 to-blue-700',
      hoverColor: 'hover:from-blue-700 hover:to-blue-800',
      textColor: 'text-white',
      borderColor: 'border-blue-400/40'
    },
    {
      id: 'teacher',
      title: 'Teacher',
      description: 'Manage classes, grades, and academic resources',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      bgColor: 'bg-gradient-to-br from-green-600 to-green-700',
      hoverColor: 'hover:from-green-700 hover:to-green-800',
      textColor: 'text-white',
      borderColor: 'border-green-400/40'
    },
    {
      id: 'admin',
      title: 'Admin',
      description: 'Access administrative tools and system management',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      bgColor: 'bg-[#ff5252]',
      hoverColor: 'hover:bg-[#ff4444]',
      textColor: 'text-white',
      borderColor: 'border-red-400/40'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Google Fonts Import */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      
      {/* Background Image with Enhanced Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/PLMUNLPBG.png')`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/60" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-7xl"
        >
          {/* Header Section with Enhanced Styling */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            {/* PLMun Logo - Emphasized */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center mb-8 sm:mb-10"
            >
              <div className="p-4 sm:p-6 bg-white/15 backdrop-blur-sm rounded-2xl sm:rounded-3xl border-2 border-white/30 shadow-2xl">
                <img 
                  src="/images/PLMUNlogi.png" 
                  alt="PLMun Logo" 
                  className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain"
                />
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 leading-tight"
              style={{ fontFamily: 'Lato, system-ui, sans-serif' }}
            >
              Welcome to PLMun
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-base sm:text-lg md:text-xl text-gray-200 max-w-lg sm:max-w-xl mx-auto leading-relaxed px-4"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              Please select your role to continue
            </motion.p>
          </motion.div>

          {/* Role Selection Cards with Enhanced Flexible Design */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 px-2 sm:px-4 lg:px-0"
          >
            {roleCards.map((role, index) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.03, 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleRoleSelection(role.id)}
                className={`
                  ${role.bgColor} ${role.hoverColor} ${role.textColor}
                  rounded-2xl cursor-pointer transition-all duration-500
                  shadow-lg hover:shadow-2xl transform
                  border-2 ${role.borderColor} hover:border-white/60
                  backdrop-blur-sm bg-white/10 hover:bg-white/20
                  group
                  flex-1 min-w-[280px] max-w-[320px] sm:min-w-[300px] sm:max-w-[350px] 
                  lg:min-w-[320px] lg:max-w-[380px]
                  flex flex-col justify-between
                  p-4 sm:p-6 lg:p-8
                  min-h-[200px] sm:min-h-[240px] lg:min-h-[280px]
                `}
              >
                {/* Icon Section */}
                <motion.div 
                  className="flex justify-center mb-3 sm:mb-4 lg:mb-6"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="p-3 sm:p-4 lg:p-5 bg-white/20 rounded-full group-hover:bg-white/30 transition-all duration-300 shadow-lg">
                    {role.icon}
                  </div>
                </motion.div>
                
                {/* Content Section */}
                <div className="text-center flex-1 flex flex-col justify-center">
                  <h3 
                    className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 group-hover:text-white transition-colors leading-tight"
                    style={{ fontFamily: 'Lato, system-ui, sans-serif' }}
                  >
                    {role.title}
                  </h3>
                  
                  <p 
                    className="text-white/90 text-xs sm:text-sm lg:text-base leading-relaxed group-hover:text-white transition-colors mb-3 sm:mb-4"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    {role.description}
                  </p>
                </div>
                
                {/* Action Section */}
                <motion.div
                  className="opacity-0 group-hover:opacity-100 transition-all duration-300 mt-auto"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <div className="flex items-center justify-center text-white/80 bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
                    <span className="text-xs sm:text-sm font-medium">Click to continue</span>
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Footer */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="text-center mt-12 sm:mt-16 lg:mt-20 px-4"
          >
            <div className="bg-gradient-to-r from-blue-500/10 via-green-500/10 to-red-500/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 max-w-4xl mx-auto">
              <p 
                className="text-white text-base sm:text-lg font-medium mb-1 sm:mb-2"
                style={{ fontFamily: 'Lato, system-ui, sans-serif' }}
              >
                © 2024 Pamantasan ng Lungsod ng Muntinlupa
              </p>
              <p 
                className="text-gray-300 text-xs sm:text-sm"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                Empowering Education Through Technology
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default GettingStarted;