// Mock data for fallback when API is not available
const mockData = {
  student: {
    name: "Saira Goodman",
    email: "saira.goodman@university.edu",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    gpa: 4.7,
    attendance: 96,
    tasksDue: 2,
    announcements: 1
  },
  schedule: [
    { id: 1, subject: "Mathematics", day: "Monday", time: "09:00-10:30", room: "Room 101", professor: "Dr. Smith" },
    { id: 2, subject: "Physics", day: "Monday", time: "11:00-12:30", room: "Room 102", professor: "Dr. Brown" },
    { id: 3, subject: "Chemistry", day: "Tuesday", time: "09:00-10:30", room: "Room 103", professor: "Dr. Wilson" },
    { id: 4, subject: "Biology", day: "Wednesday", time: "10:00-11:30", room: "Room 104", professor: "Dr. Davis" },
    { id: 5, subject: "English", day: "Thursday", time: "14:00-15:30", room: "Room 105", professor: "Dr. Taylor" }
  ],
  tasks: [
    { id: 1, title: "Complete Math Assignment", status: "pending", dueDate: "2024-01-15" },
    { id: 2, title: "Physics Lab Report", status: "completed", dueDate: "2024-01-12" },
    { id: 3, title: "Chemistry Quiz Preparation", status: "pending", dueDate: "2024-01-18" }
  ],
  attendance: [
    { subject: "Mathematics", percentage: 92, totalClasses: 25, attended: 23 },
    { subject: "Physics", percentage: 88, totalClasses: 24, attended: 21 },
    { subject: "Chemistry", percentage: 95, totalClasses: 22, attended: 21 },
    { subject: "Biology", percentage: 85, totalClasses: 26, attended: 22 },
    { subject: "English", percentage: 90, totalClasses: 20, attended: 18 }
  ],
  reports: [
    { title: "Performance Improvement", description: "Your GPA has improved by 0.2 points compared to last semester", trend: "up" },
    { title: "Attendance Trend", description: "Your attendance is 5% higher than the class average", trend: "up" },
    { title: "Task Completion", description: "You've completed 85% of assigned tasks on time", trend: "stable" }
  ]
};

// API configuration
const API_BASE_URL = 'http://localhost:5678/webhook/mock-student-data';

// Fetch data from API with fallback to mock data
export const fetchStudentData = async () => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('API request failed');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('API not available, using mock data:', error.message);
    return mockData;
  }
};

// Individual data fetchers
export const fetchDashboardData = async () => {
  const data = await fetchStudentData();
  return {
    student: data.student,
    stats: {
      gpa: data.student.gpa,
      attendance: data.student.attendance,
      tasksDue: data.student.tasksDue,
      announcements: data.student.announcements
    }
  };
};

export const fetchScheduleData = async () => {
  const data = await fetchStudentData();
  return data.schedule;
};

export const fetchTasksData = async () => {
  const data = await fetchStudentData();
  return data.tasks;
};

export const fetchAttendanceData = async () => {
  const data = await fetchStudentData();
  return data.attendance;
};

export const fetchReportsData = async () => {
  const data = await fetchStudentData();
  return data.reports;
};

// Update task status
export const updateTaskStatus = async (taskId, status) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update task');
    }
    
    return await response.json();
  } catch (error) {
    console.warn('API not available, task update simulated:', error.message);
    // Simulate successful update for demo
    return { success: true, taskId, status };
  }
};
