# ClassTrack Pro - Static Demo

A simplified, static HTML version of the ClassTrack Pro Student Portal Dashboard. This version requires no installation and runs directly in any modern web browser.

## Features

- 📊 **Dashboard** - Overview with key metrics and upcoming schedule
- 📅 **Schedule** - Weekly class schedule with day filtering
- ✅ **Tasks** - Interactive task management with status tracking
- 📋 **Attendance** - Attendance records with progress visualization
- 📈 **Reports** - Performance insights and analytics
- ⚙️ **Settings** - Profile and notification settings

## Quick Start

1. **No installation required!** Simply open `index.html` in any modern web browser.

2. **Features:**
   - Responsive design (works on desktop, tablet, and mobile)
   - Smooth animations and hover effects
   - Interactive elements (task toggles, day selection)
   - Modern UI with clean design

## File Structure

```
StaticDemo/
├── index.html          # Main HTML file
├── style.css          # CSS styles and animations
├── script.js          # JavaScript functionality
└── README.md          # This file
```

## Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## Features in Detail

### Dashboard
- Welcome message with student name
- Key metrics cards (GPA, Attendance, Tasks Due, Announcements)
- Upcoming schedule preview table
- Smooth card animations on load

### Schedule
- Weekly class schedule with day-based filtering
- Interactive day selector buttons
- Subject details (time, room, professor)
- Responsive table design
- "No classes" message for free days

### Tasks
- Interactive task list with completion toggles
- Real-time statistics updates
- Visual status indicators
- Smooth toggle animations

### Attendance
- Subject-wise attendance tracking
- Animated progress bars
- Overall attendance statistics
- Color-coded performance indicators

### Reports
- Performance analytics dashboard
- Study progress visualization
- Trend indicators and insights
- Goal tracking cards

### Settings
- Profile management form
- Notification preferences with toggle switches
- Responsive form layout
- Interactive form elements

## Customization

### Colors
Edit the CSS variables in `style.css` to customize the color scheme:

```css
:root {
    --primary-color: #3b82f6;
    --secondary-color: #64748b;
    --success-color: #10b981;
    --warning-color: #f59e0b;
    --error-color: #ef4444;
}
```

### Animations
Modify animation durations and effects in the CSS:

```css
.transition {
    transition: all 0.2s ease;
}
```

### Data
Update the mock data in `script.js` to customize the content:

```javascript
const scheduleData = {
    monday: [
        { subject: 'Your Subject', time: '09:00-10:30', room: 'Room 101', professor: 'Dr. Name' }
    ]
};
```

## Responsive Design

The demo is fully responsive and adapts to different screen sizes:

- **Desktop** (1024px+): Full sidebar and multi-column layouts
- **Tablet** (768px-1023px): Adjusted grid layouts and spacing
- **Mobile** (below 768px): Single-column layout with touch-friendly elements

## Performance

- Lightweight (under 50KB total)
- Fast loading with optimized CSS and JavaScript
- Smooth 60fps animations
- No external dependencies (except Font Awesome icons)

## Browser Support

The demo uses modern CSS features and JavaScript, so it requires:

- CSS Grid and Flexbox support
- ES6 JavaScript features
- CSS Custom Properties (CSS Variables)

## Future Enhancements

This static demo can be enhanced with:

- Local storage for data persistence
- More interactive charts and graphs
- Additional animation effects
- Print-friendly styles
- Accessibility improvements

## License

This project is part of the ClassTrack Pro student portal system.
