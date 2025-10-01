import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import TopNavbar from './components/TopNavbar';
import GettingStarted from './pages/GettingStarted';
import LoginPage from './pages/LoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import TeacherLoginPage from './pages/TeacherLoginPage';
import Dashboard from './pages/Dashboard';
import Schedule from './pages/Schedule';
import Tasks from './pages/Tasks';
import Tests from './pages/Tests';
import Reports from './pages/Reports';
import Chat from './pages/Chat';
import Notes from './pages/Notes';
import Settings from './pages/Settings';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AuthLayout from './components/auth/AuthLayout';
import { fetchDashboardData } from './utils/api';
import './index.css';

// Authenticated Routes Component
const AuthenticatedRoutes = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const loadStudentData = async () => {
      try {
        const data = await fetchDashboardData();
        setStudent(data.student);
      } catch (error) {
        console.error('Error loading student data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStudentData();
  }, []);

  const handleLogout = () => {
    console.log('Logout button clicked!');
    localStorage.removeItem('plmun_authenticated');
    localStorage.removeItem('plmun_student_number');
    console.log('Authentication cleared, navigating to login...');
    navigate('/', { replace: true });
  };

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-gray-200 border-t-gray-600 rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-700">Loading ClassTrack Pro...</h2>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
      
      {/* Main Content Area */}
      <div className="lg:ml-64">
        {/* Top Navbar */}
        <TopNavbar student={student} onMenuToggle={handleMenuToggle} onLogout={handleLogout} />
        
        {/* Page Content */}
        <div className="pt-16">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tests" element={<Tests />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const isAuth = localStorage.getItem('plmun_authenticated');
      setIsAuthenticated(isAuth === 'true');
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-gray-200 border-t-gray-600 rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-700">Loading ClassTrack Pro...</h2>
        </motion.div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <AnimatePresence mode="wait">
          <Routes>
            <Route 
              path="/" 
              element={<GettingStarted />} 
            />
            <Route 
              path="/student-login" 
              element={
                <AuthLayout>
                  <LoginPage />
                </AuthLayout>
              } 
            />
            <Route 
              path="/admin/login" 
              element={
                <AuthLayout>
                  <AdminLoginPage />
                </AuthLayout>
              } 
            />
            <Route 
              path="/teacher/login" 
              element={
                <AuthLayout>
                  <TeacherLoginPage />
                </AuthLayout>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <AuthenticatedRoutes />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/*" 
              element={
                <ProtectedRoute>
                  <AuthenticatedRoutes />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
