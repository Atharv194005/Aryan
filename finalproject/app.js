// Mock user data
let currentUser = null;
let courses = [];
let enrollments = [];

// DOM Elements
const authScreen = document.getElementById('auth-screen');
const mainApp = document.getElementById('main-app');
const authForm = document.getElementById('auth-form');
const coursesContainer = document.getElementById('courses-container');
const enrollmentsContainer = document.getElementById('enrollments-container');
const profileDetails = document.getElementById('profile-details');
const enrollmentDialog = document.getElementById('enrollment-dialog');
const enrollmentForm = document.getElementById('enrollment-form');
const searchInput = document.getElementById('search');

// Event Listeners
authForm.addEventListener('submit', handleAuth);
searchInput.addEventListener('input', handleSearch);
document.querySelector('.dialog-close').addEventListener('click', () => enrollmentDialog.close());

// Authentication Handler
function handleAuth(e) {
    e.preventDefault();
    currentUser = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value
    };
    authScreen.style.display = 'none';
    mainApp.style.display = 'block';
    updateProfile();
    loadCourses();
}

// Course Loading
async function loadCourses() {
    // In a real application, this would fetch from an API
    courses = [
        {
            id: 1,
            name: 'Web Development',
            price: '₹7,999',
            image: 'https://source.unsplash.com/300x200/?coding'
        },
        {
            id: 2,
            name: 'Data Science',
            price: '₹11,999',
            image: 'https://source.unsplash.com/300x200/?data'
        },
        {
            id: 3,
            name: 'Advanced Algorithms and Data Structures',
            price: '₹9,999',
            image: 'https://source.unsplash.com/300x200/?algorithm'
        },
        {
            id: 4,
            name: 'Computer Networks & Cybersecurity',
            price: '₹12,999',
            image: 'https://source.unsplash.com/300x200/?network'
        }
        // Add more courses as needed
    ];
    renderCourses(courses);
}

// Render Courses
function renderCourses(coursesToRender) {
    coursesContainer.innerHTML = coursesToRender.map(course => `
        <div class="course-card mdl-card mdl-shadow--2dp">
            <div class="mdl-card__title" style="background-image: url('${course.image}')">
                <h2 class="mdl-card__title-text">${course.name}</h2>
            </div>
            <div class="mdl-card__supporting-text">
                <span class="course-price">${course.price}</span>
            </div>
            <div class="mdl-card__actions mdl-card--border">
                <button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
                        onclick="openEnrollmentDialog(${course.id})">
                    Enroll Now
                </button>
            </div>
        </div>
    `).join('');
}

// Enrollment Dialog
function openEnrollmentDialog(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    enrollmentDialog.querySelector('#enrollment-name').value = currentUser.name;
    enrollmentDialog.querySelector('#enrollment-mobile').value = currentUser.phone;
    
    const enrollButton = enrollmentDialog.querySelector('.enroll');
    enrollButton.onclick = () => handleEnrollment(course);
    
    enrollmentDialog.showModal();
}

// Handle Enrollment
function handleEnrollment(course) {
    const enrollment = {
        id: Date.now(),
        courseId: course.id,
        courseName: course.name,
        coursePrice: course.price,
        studentName: document.getElementById('enrollment-name').value,
        address: document.getElementById('enrollment-address').value,
        mobile: document.getElementById('enrollment-mobile').value,
        status: 'pending',
        date: new Date().toLocaleDateString()
    };

    enrollments.push(enrollment);
    updateEnrollments();
    enrollmentDialog.close();
    showSnackbar('Enrollment submitted successfully!');
}

// Update Enrollments
function updateEnrollments() {
    enrollmentsContainer.innerHTML = enrollments.map(enrollment => `
        <div class="enrollment-card mdl-card mdl-shadow--2dp">
            <div class="mdl-card__title">
                <h2 class="mdl-card__title-text">
                    <span class="status-dot status-${enrollment.status}"></span>
                    ${enrollment.courseName}
                </h2>
            </div>
            <div class="mdl-card__supporting-text">
                <p><strong>Student:</strong> ${enrollment.studentName}</p>
                <p><strong>Address:</strong> ${enrollment.address}</p>
                <p><strong>Mobile:</strong> ${enrollment.mobile}</p>
                <p><strong>Price:</strong> ${enrollment.coursePrice}</p>
                <p><strong>Date:</strong> ${enrollment.date}</p>
                <p><strong>Status:</strong> ${enrollment.status}</p>
            </div>
        </div>
    `).join('');
}

// Update Profile
function updateProfile() {
    profileDetails.innerHTML = `
        <p><strong>Name:</strong> ${currentUser.name}</p>
        <p><strong>Email:</strong> ${currentUser.email}</p>
        <p><strong>Phone:</strong> ${currentUser.phone}</p>
    `;
}

// Search Handler
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
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
if (!currentUser) {
    mainApp.style.display = 'none';
}
