// Admin credentials
const ADMIN_EMAIL = 'admin123@gmail.com';
const ADMIN_PASSWORD = '123';

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const adminDashboard = document.getElementById('admin-dashboard');
const loginForm = document.getElementById('login-form');
const usersContainer = document.getElementById('users-container');
const enrollmentsContainer = document.getElementById('enrollments-container');
const coursesContainer = document.getElementById('courses-container');
const addCourseForm = document.getElementById('add-course-form');
const searchInput = document.getElementById('search');

// Data Storage
let users = [];
let courses = [];
let enrollments = [];

// Event Listeners
loginForm.addEventListener('submit', handleLogin);
addCourseForm.addEventListener('submit', handleAddCourse);
searchInput.addEventListener('input', handleSearch);

// Login Handler
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('admin-email').value;
    const password = document.getElementById('admin-password').value;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        loginScreen.style.display = 'none';
        adminDashboard.style.display = 'block';
        loadData();
    } else {
        alert('Invalid credentials');
    }
}

// Load Data
function loadData() {
    // In a real application, this would fetch from an API
    loadUsers();
    loadEnrollments();
    loadCourses();
}

// Users Management
function loadUsers() {
    // Mock data - in a real application, this would fetch from an API
    users = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            phone: '1234567890'
        },
        // Add more users as needed
    ];
    renderUsers();
}

function renderUsers() {
    usersContainer.innerHTML = users.map(user => `
        <div class="user-card mdl-card mdl-shadow--2dp">
            <div class="mdl-card__title">
                <h2 class="mdl-card__title-text">${user.name}</h2>
            </div>
            <div class="mdl-card__supporting-text">
                <div class="user-details">
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Phone:</strong> ${user.phone}</p>
                </div>
            </div>
        </div>
    `).join('');
}

// Enrollments Management
function loadEnrollments() {
    // Mock data - in a real application, this would fetch from an API
    enrollments = [
        {
            id: 1,
            courseId: 1,
            courseName: 'Web Development',
            studentName: 'John Doe',
            address: '123 Main St',
            mobile: '1234567890',
            price: '₹7,999',
            status: 'pending',
            date: new Date().toLocaleDateString()
        },
        // Add more enrollments as needed
    ];
    renderEnrollments();
}

function renderEnrollments() {
    enrollmentsContainer.innerHTML = enrollments.map(enrollment => `
        <div class="enrollment-card mdl-card mdl-shadow--2dp">
            <div class="mdl-card__title">
                <h2 class="mdl-card__title-text">
                    <span class="status-dot status-${enrollment.status}"></span>
                    ${enrollment.courseName}
                </h2>
            </div>
            <div class="mdl-card__supporting-text">
                <div class="enrollment-details">
                    <p><strong>Student:</strong> ${enrollment.studentName}</p>
                    <p><strong>Address:</strong> ${enrollment.address}</p>
                    <p><strong>Mobile:</strong> ${enrollment.mobile}</p>
                    <p><strong>Price:</strong> ${enrollment.price}</p>
                    <p><strong>Date:</strong> ${enrollment.date}</p>
                    <p><strong>Status:</strong> ${enrollment.status}</p>
                </div>
                <div class="enrollment-actions">
                    <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                            onclick="completeEnrollment(${enrollment.id})">
                        Complete Enrollment
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function completeEnrollment(enrollmentId) {
    const enrollment = enrollments.find(e => e.id === enrollmentId);
    if (enrollment) {
        enrollment.status = 'completed';
        renderEnrollments();
        showSnackbar('Enrollment status updated successfully!');
    }
}

// Courses Management
function loadCourses() {
    // Mock data - in a real application, this would fetch from an API
    courses = [
        {
            id: 1,
            name: 'Web Development',
            price: 7999,
            image: 'https://source.unsplash.com/300x200/?coding'
        },
        {
            id: 2,
            name: 'Data Science',
            price: 11999,
            image: 'https://source.unsplash.com/300x200/?data'
        },
        {
            id: 3,
            name: 'Advanced Algorithms and Data Structures',
            price: 9999,
            image: 'https://source.unsplash.com/300x200/?algorithm'
        },
        {
            id: 4,
            name: 'Computer Networks & Cybersecurity',
            price: 12999,
            image: 'https://source.unsplash.com/300x200/?network'
        }
        // Add more courses as needed
    ];
    renderCourses();
}

function renderCourses() {
    coursesContainer.innerHTML = courses.map(course => `
        <div class="course-card mdl-card mdl-shadow--2dp">
            <div class="mdl-card__title" style="background-image: url('${course.image}')">
                <h2 class="mdl-card__title-text">${course.name}</h2>
            </div>
            <div class="mdl-card__supporting-text">
                <span class="course-price">₹${course.price.toLocaleString('en-IN')}</span>
            </div>
        </div>
    `).join('');
}

// Add Course Handler
function handleAddCourse(e) {
    e.preventDefault();
    const newCourse = {
        id: Date.now(),
        name: document.getElementById('course-name').value,
        price: parseInt(document.getElementById('course-price').value),
        image: document.getElementById('course-image').value
    };

    courses.push(newCourse);
    renderCourses();
    addCourseForm.reset();
    showSnackbar('Course added successfully!');
}

// Search Handler
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    // Filter and render users
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );
    renderUsers(filteredUsers);

    // Filter and render courses
    const filteredCourses = courses.filter(course => 
        course.name.toLowerCase().includes(searchTerm)
    );
    renderCourses(filteredCourses);
}

// Utility function to show snackbar
function showSnackbar(message) {
    const snackbarContainer = document.querySelector('#snackbar');
    const data = { message, timeout: 2000 };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
}

// Initialize the application
if (!localStorage.getItem('adminLoggedIn')) {
    adminDashboard.style.display = 'none';
}
