// ======================= NAVBAR =======================

// Change navbar style on scroll
window.addEventListener('scroll', () => {
    document.querySelector('nav').classList.toggle('window-scroll', window.scrollY > 0);
});

// Show/hide the nav menu on smaller screens
const menu = document.querySelector('.nav__menu');
const menuBtn = document.querySelector('#open-menu-btn');
const closeBtn = document.querySelector('#close-menu-btn');

menuBtn.addEventListener('click', () => {
    menu.style.display = 'flex';
    closeBtn.style.display = 'inline-block';
    menuBtn.style.display = 'none';
});

const closeNav = () => {
    menu.style.display = 'none';
    closeBtn.style.display = 'none';
    menuBtn.style.display = 'inline-block';
};

closeBtn.addEventListener('click', closeNav);


// ======================= TESTIMONIALS =======================

const addTestimonialBtn = document.querySelector('#add-testimonial-btn');

// The testimonial form only exists on the home page
if (addTestimonialBtn) {
    const nameInput = document.querySelector('#testimonial-name');
    const roleInput = document.querySelector('#testimonial-role');
    const messageInput = document.querySelector('#testimonial-message');
    const testimonialsContainer = document.querySelector('.testimonials__Container > div');
    const testimonialForm = document.querySelector('.testimonial__form');

    // Avatars picked at random for newly added testimonials
    const avatarImages = [
        './images/avatar6.jpg',
        './images/avatar7.jpg',
        './images/avatar8.jpg',
        './images/avatar9.jpg',
        './images/avatar10.jpg',
        './images/avatar11.jpg',
        './images/avatar12.jpg'
    ];

    const getRandomAvatar = () => avatarImages[Math.floor(Math.random() * avatarImages.length)];

    function addTestimonial(name, role, message, avatar) {
        const testimonial = document.createElement('article');
        testimonial.classList.add('testimonial');
        testimonial.innerHTML = `
            <div class="avatar">
                <img alt="Avatar">
            </div>
            <div class="testimonial__info">
                <h5></h5>
                <small></small>
            </div>
            <div class="testimonial__body">
                <p></p>
            </div>
            <button class="delete-testimonial-btn">Delete</button>
        `;

        // Fill user input with textContent so it can't inject HTML
        testimonial.querySelector('img').src = avatar;
        testimonial.querySelector('h5').textContent = name;
        testimonial.querySelector('small').textContent = role;
        testimonial.querySelector('p').textContent = `"${message}"`;

        testimonial.querySelector('.delete-testimonial-btn').addEventListener('click', () => {
            testimonial.remove();
        });

        // Keep the form as the last item in the list
        testimonialsContainer.insertBefore(testimonial, testimonialForm);

        nameInput.value = '';
        roleInput.value = '';
        messageInput.value = '';
    }

    addTestimonialBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        const role = roleInput.value.trim();
        const message = messageInput.value.trim();

        const nameRegex = /^[a-zA-Z\s]{3,50}$/;
        const roleRegex = /^[a-zA-Z\s]{2,30}$/;
        const messageRegex = /^.{10,300}$/;

        if (!nameRegex.test(name)) {
            alert('The name must contain only letters and spaces, between 3 and 50 characters.');
            return;
        }

        if (!roleRegex.test(role)) {
            alert('The role must contain only letters and spaces, between 2 and 30 characters.');
            return;
        }

        if (!messageRegex.test(message)) {
            alert('The message must be between 10 and 300 characters.');
            return;
        }

        addTestimonial(name, role, message, getRandomAvatar());
    });
}


// ======================= FAQs =======================

// Show/hide FAQ answers and toggle the plus/minus icon
document.querySelectorAll('.faq').forEach(faq => {
    faq.addEventListener('click', () => {
        faq.classList.toggle('open');

        const icon = faq.querySelector('.faq__icon i');
        icon.classList.toggle('uil-plus');
        icon.classList.toggle('uil-minus');
    });
});
