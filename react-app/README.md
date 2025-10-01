# ClassTrack Pro - Student Portal Dashboard

A modern, responsive student portal dashboard built with React, featuring smooth animations and a clean UI.

## Features

- 📊 **Dashboard** - Overview of academic performance with key metrics
- 📅 **Schedule** - Weekly class schedule with day filtering
- ✅ **Tasks** - Task management with status tracking
- 📋 **Attendance** - Attendance records with progress visualization
- 📈 **Reports** - Performance insights and analytics
- ⚙️ **Settings** - Profile and account management

## Tech Stack

- **React** - Frontend framework
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **n8n Integration Ready** - Backend webhook support

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Backend Integration

The app is configured to work with n8n webhooks. By default, it tries to fetch data from:
- `http://localhost:5678/webhook/mock-student-data`

If the webhook is not available, the app falls back to mock data for immediate functionality.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Sidebar.js      # Navigation sidebar
│   └── TopNavbar.js    # Top navigation bar
├── pages/              # Page components
│   ├── Dashboard.js    # Main dashboard
│   ├── Schedule.js     # Class schedule
│   ├── Tasks.js        # Task management
│   ├── Attendance.js   # Attendance tracking
│   ├── Reports.js     # Performance reports
│   └── Settings.js     # User settings
├── utils/              # Utility functions
│   └── api.js          # API integration & mock data
├── App.js              # Main app component
└── index.js            # App entry point
```

## Features in Detail

### Dashboard
- Welcome message with student name
- Key metrics cards (GPA, Attendance, Tasks Due, Announcements)
- Upcoming schedule preview
- Smooth card animations on load

### Schedule
- Weekly class schedule
- Day-based filtering
- Subject details (time, room, professor)
- Responsive table design

### Tasks
- Task list with status management
- Filter by status (All, Pending, Completed)
- Toggle task completion with animations
- Progress statistics

### Attendance
- Subject-wise attendance tracking
- Progress bars and percentages
- Overall attendance statistics
- Performance tips and insights

### Reports
- Performance analytics
- Study progress visualization
- Trend indicators
- Goal tracking

### Settings
- Profile management
- Account settings
- Notification preferences
- Privacy controls

## Customization

The app uses Tailwind CSS for styling. You can customize:
- Colors in `tailwind.config.js`
- Component styles in `src/index.css`
- Animation timing in Framer Motion components

## Deployment

Build the app for production:
```bash
npm run build
```

The build folder contains the production-ready files.

## License

This project is part of the ClassTrack Pro student portal system.
