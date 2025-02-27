// Scroll Progress Indicator
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.querySelector('.scroll-progress').style.width = scrolled + '%';
});

// Initialize AOS with custom settings
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false,
    anchorPlacement: 'top-bottom'
});

// Add loading states
function addLoadingState(element) {
    element.classList.add('loading-state');
    setTimeout(() => {
        element.classList.remove('loading-state');
    }, 2000);
}

// Success message animation
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    document.body.appendChild(successDiv);
    setTimeout(() => {
        successDiv.remove();
    }, 3500);
}

// Error animation
function showError(element) {
    element.classList.add('error-state');
    setTimeout(() => {
        element.classList.remove('error-state');
    }, 500);
}

// Modal animations
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    const overlay = document.querySelector('.modal-overlay');
    modal.classList.add('active');
    overlay.classList.add('active');
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    const overlay = document.querySelector('.modal-overlay');
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

// Intersection Observer for animated elements
const animatedElements = document.querySelectorAll('.animate-on-scroll');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.1 });

animatedElements.forEach(element => observer.observe(element));

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Notification bell animation
const notificationBell = document.querySelector('.notification-bell');
if (notificationBell) {
    setInterval(() => {
        notificationBell.classList.add('shake');
        setTimeout(() => {
            notificationBell.classList.remove('shake');
        }, 500);
    }, 10000);
}

// Category tag hover effect
document.querySelectorAll('.category-tag').forEach(tag => {
    tag.addEventListener('mousemove', (e) => {
        const bounds = tag.getBoundingClientRect();
        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;
        tag.style.setProperty('--mouse-x', `${x}px`);
        tag.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Button ripple effect
document.querySelectorAll('.mdl-button--raised').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        this.appendChild(ripple);
        const rect = this.getBoundingClientRect();
        ripple.style.left = `${e.clientX - rect.left}px`;
        ripple.style.top = `${e.clientY - rect.top}px`;
        setTimeout(() => ripple.remove(), 600);
    });
});
