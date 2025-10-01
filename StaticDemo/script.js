// DOM Elements
const menuItems = document.querySelectorAll('.menu-item');
const contentSections = document.querySelectorAll('.content-section');
const dayButtons = document.querySelectorAll('.day-btn');
const taskCheckboxes = document.querySelectorAll('.task-checkbox');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    animateOnLoad();
});

// Initialize the application
function initializeApp() {
    // Set the first menu item as active
    if (menuItems.length > 0) {
        menuItems[0].classList.add('active');
    }
    
    // Set the first content section as active
    if (contentSections.length > 0) {
        contentSections[0].classList.add('active');
    }
    
    // Set the first day button as active
    if (dayButtons.length > 0) {
        dayButtons[0].classList.add('active');
    }
}

// Setup all event listeners
function setupEventListeners() {
    // Mobile menu button
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            toggleMobileMenu();
        });
    }
    
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function() {
            closeMobileMenu();
        });
    }
    
    // Sidebar navigation
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            navigateToSection(sectionId);
            
            // Close mobile menu after navigation
            if (window.innerWidth <= 1024) {
                closeMobileMenu();
            }
        });
    });
    
    // Day selector for schedule
    dayButtons.forEach(button => {
        button.addEventListener('click', function() {
            const day = this.getAttribute('data-day');
            selectDay(day);
        });
    });
    
    // Task checkboxes
    taskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('click', function() {
            toggleTask(this);
        });
    });
    
    // Profile dropdown (if needed)
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', function() {
            // Add dropdown functionality here if needed
            console.log('Profile clicked');
        });
    }
    
    // Logout button
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to logout?')) {
                alert('Logged out successfully!');
            }
        });
    }
}

// Navigate to a specific section
function navigateToSection(sectionId) {
    // Remove active class from all menu items
    menuItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to clicked menu item
    const activeMenuItem = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeMenuItem) {
        activeMenuItem.classList.add('active');
    }
    
    // Hide all content sections
    contentSections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show the selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Add entrance animation
        targetSection.style.opacity = '0';
        targetSection.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            targetSection.style.transition = 'all 0.3s ease';
            targetSection.style.opacity = '1';
            targetSection.style.transform = 'translateY(0)';
        }, 50);
    }
}

// Select a day in the schedule
function selectDay(day) {
    // Remove active class from all day buttons
    dayButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Add active class to clicked day button
    const activeDayButton = document.querySelector(`[data-day="${day}"]`);
    if (activeDayButton) {
        activeDayButton.classList.add('active');
    }
    
    // Update the schedule table title
    const scheduleTitle = document.querySelector('#schedule .card h3');
    if (scheduleTitle) {
        const dayName = day.charAt(0).toUpperCase() + day.slice(1);
        scheduleTitle.textContent = `${dayName} Classes`;
    }
    
    // Simulate loading different data for different days
    updateScheduleForDay(day);
}

// Update schedule content based on selected day
function updateScheduleForDay(day) {
    const scheduleData = {
        monday: [
            { subject: 'Mathematics', time: '09:00-10:30', room: 'Room 101', professor: 'Dr. Smith' },
            { subject: 'Physics', time: '11:00-12:30', room: 'Room 102', professor: 'Dr. Brown' }
        ],
        tuesday: [
            { subject: 'Chemistry', time: '09:00-10:30', room: 'Room 103', professor: 'Dr. Wilson' },
            { subject: 'Biology', time: '14:00-15:30', room: 'Room 104', professor: 'Dr. Davis' }
        ],
        wednesday: [
            { subject: 'Mathematics', time: '10:00-11:30', room: 'Room 101', professor: 'Dr. Smith' },
            { subject: 'English', time: '13:00-14:30', room: 'Room 105', professor: 'Dr. Taylor' }
        ],
        thursday: [
            { subject: 'Physics Lab', time: '09:00-12:00', room: 'Lab 201', professor: 'Dr. Brown' }
        ],
        friday: [
            { subject: 'Chemistry Lab', time: '10:00-13:00', room: 'Lab 202', professor: 'Dr. Wilson' },
            { subject: 'Mathematics', time: '14:00-15:30', room: 'Room 101', professor: 'Dr. Smith' }
        ]
    };
    
    const dayData = scheduleData[day] || [];
    const tableBody = document.querySelector('#schedule .schedule-table tbody');
    
    if (tableBody) {
        // Clear existing rows
        tableBody.innerHTML = '';
        
        if (dayData.length === 0) {
            // Show no classes message
            const row = document.createElement('tr');
            row.innerHTML = `
                <td colspan="4" style="text-align: center; padding: 40px; color: #64748b;">
                    <div style="font-size: 48px; margin-bottom: 16px;">📅</div>
                    <h3 style="font-size: 18px; margin-bottom: 8px;">No classes scheduled</h3>
                    <p>Enjoy your free time!</p>
                </td>
            `;
            tableBody.appendChild(row);
        } else {
            // Add rows for each class
            dayData.forEach((classItem, index) => {
                const row = document.createElement('tr');
                row.style.opacity = '0';
                row.style.transform = 'translateX(-20px)';
                row.innerHTML = `
                    <td>
                        <div class="subject-item">
                            <div class="subject-dot"></div>
                            <span>${classItem.subject}</span>
                        </div>
                    </td>
                    <td>${classItem.time}</td>
                    <td>${classItem.room}</td>
                    <td>${classItem.professor}</td>
                `;
                tableBody.appendChild(row);
                
                // Animate row entrance
                setTimeout(() => {
                    row.style.transition = 'all 0.3s ease';
                    row.style.opacity = '1';
                    row.style.transform = 'translateX(0)';
                }, index * 100);
            });
        }
    }
}

// Toggle task completion
function toggleTask(checkbox) {
    const taskItem = checkbox.closest('.task-item');
    const taskStatus = taskItem.querySelector('.task-status');
    
    if (checkbox.classList.contains('checked')) {
        // Mark as pending
        checkbox.classList.remove('checked');
        taskItem.classList.remove('completed');
        taskStatus.textContent = 'Pending';
        taskStatus.className = 'task-status pending';
    } else {
        // Mark as completed
        checkbox.classList.add('checked');
        taskItem.classList.add('completed');
        taskStatus.textContent = 'Completed';
        taskStatus.className = 'task-status completed';
        
        // Add completion animation
        taskItem.style.transform = 'scale(1.02)';
        setTimeout(() => {
            taskItem.style.transform = 'scale(1)';
        }, 200);
    }
    
    // Update task statistics
    updateTaskStats();
}

// Update task statistics
function updateTaskStats() {
    const totalTasks = document.querySelectorAll('.task-item').length;
    const completedTasks = document.querySelectorAll('.task-item.completed').length;
    const pendingTasks = totalTasks - completedTasks;
    
    // Update stats cards
    const totalStat = document.querySelector('#tasks .stat-card:nth-child(1) .stat-value');
    const pendingStat = document.querySelector('#tasks .stat-card:nth-child(2) .stat-value');
    const completedStat = document.querySelector('#tasks .stat-card:nth-child(3) .stat-value');
    
    if (totalStat) totalStat.textContent = totalTasks;
    if (pendingStat) pendingStat.textContent = pendingTasks;
    if (completedStat) completedStat.textContent = completedTasks;
}

// Animate elements on page load
function animateOnLoad() {
    // Animate sidebar
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.style.transform = 'translateX(-100%)';
        sidebar.style.transition = 'transform 0.5s ease';
        setTimeout(() => {
            sidebar.style.transform = 'translateX(0)';
        }, 100);
    }
    
    // Animate stats cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) scale(0.9)';
        card.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, 200 + index * 100);
    });
    
    // Animate progress bars
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach((bar, index) => {
        const width = bar.style.width;
        bar.style.width = '0%';
        bar.style.transition = 'width 1s ease';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 1000 + index * 200);
    });
}

// Utility function to add smooth scrolling
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Add hover effects to interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.card, .stat-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Mobile menu toggle functions
function toggleMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    
    if (sidebar && sidebarOverlay) {
        sidebar.classList.toggle('open');
        sidebarOverlay.classList.toggle('show');
        
        // Prevent body scroll when menu is open
        if (sidebar.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

function closeMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    
    if (sidebar && sidebarOverlay) {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Add mobile menu button if screen is small
if (window.innerWidth <= 1024) {
    const navbar = document.querySelector('.navbar-content');
    if (navbar) {
        const menuButton = document.createElement('button');
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        menuButton.className = 'mobile-menu-btn';
        menuButton.style.cssText = `
            display: block;
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            padding: 8px;
            margin-right: 16px;
        `;
        menuButton.addEventListener('click', toggleMobileMenu);
        navbar.insertBefore(menuButton, navbar.firstChild);
    }
}

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 1024) {
        closeMobileMenu();
    }
});

// Add loading animation for better UX
function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading';
    loadingDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        ">
            <div style="
                width: 40px;
                height: 40px;
                border: 4px solid #e2e8f0;
                border-top: 4px solid #3b82f6;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            "></div>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    document.body.appendChild(loadingDiv);
}

function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.remove();
    }
}

// Simulate loading for better UX
setTimeout(() => {
    hideLoading();
}, 1000);
