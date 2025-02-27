document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        
        // In a real application, this would send data to a server
        // For now, we'll just show a success message
        showSnackbar('Message sent successfully! We\'ll get back to you soon.');
        contactForm.reset();
    });
});

function showSnackbar(message) {
    const snackbarContainer = document.querySelector('#snackbar');
    const data = { message, timeout: 3000 };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
}
