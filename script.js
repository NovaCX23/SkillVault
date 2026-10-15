// ======================= NAVBAR =======================

// Change navbar style on scroll
window.addEventListener('scroll', () => {
    document.querySelector('nav').classList.toggle('window-scroll', window.scrollY > 0);
});

// Show/hide the nav menu on smaller screens.
// Toggling a class (instead of inline styles) lets the CSS media queries
// decide what is visible, so the desktop nav comes back after a resize.
const nav = document.querySelector('nav');
const menuBtn = document.querySelector('#open-menu-btn');
const closeBtn = document.querySelector('#close-menu-btn');

menuBtn.addEventListener('click', () => {
    nav.classList.add('menu-open');
});

const closeNav = () => {
    nav.classList.remove('menu-open');
};

closeBtn.addEventListener('click', closeNav);

// Close the mobile menu when a link is clicked, and highlight the current page
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('.nav__menu a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
    }
    link.addEventListener('click', closeNav);
});

// Show the logged-in username instead of "Login" (front-end demo, see login.js).
// The link still goes to login.html, which shows the Logout button.
const loginLink = document.querySelector('.nav__menu a[href="login.html"]');

function updateLoginLink() {
    let username = null;
    try {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            username = (localStorage.getItem('username') || '').trim();
        }
    } catch {
        // Storage unavailable: treat as logged out
    }

    if (username) {
        // One wrapper span, so the mobile menu (display: grid) keeps icon and name on one line
        loginLink.innerHTML = '<span class="nav__user"><i class="uil uil-user" aria-hidden="true"></i> <span class="nav__username"></span></span>';
        loginLink.querySelector('.nav__username').textContent = username;
        loginLink.title = `Logged in as ${username}. Open to log out.`;
    } else {
        loginLink.textContent = 'Login';
        loginLink.removeAttribute('title');
    }
}

updateLoginLink();


// ======================= TESTIMONIALS =======================

const addTestimonialBtn = document.querySelector('#add-testimonial-btn');

// The testimonial form only exists on the home page
if (addTestimonialBtn) {
    const nameInput = document.querySelector('#testimonial-name');
    const roleInput = document.querySelector('#testimonial-role');
    const messageInput = document.querySelector('#testimonial-message');
    const testimonialsContainer = document.querySelector('.testimonials__list');

    // Avatars picked at random for newly added testimonials
    const avatarImages = [
        './images/avatar6.webp',
        './images/avatar7.webp',
        './images/avatar8.webp',
        './images/avatar9.webp',
        './images/avatar10.webp',
        './images/avatar11.webp',
        './images/avatar12.webp'
    ];

    // Stored as an index into avatarImages (not a path) so saved testimonials
    // keep working if the image files are renamed
    const getRandomAvatar = () => Math.floor(Math.random() * avatarImages.length);

    // Added testimonials are saved in localStorage so they survive a refresh
    const STORAGE_KEY = 'testimonials';

    const loadTestimonials = () => {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
            return Array.isArray(saved) ? saved : [];
        } catch {
            return [];
        }
    };

    const saveTestimonials = () => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(savedTestimonials));
        } catch {
            // Storage unavailable (e.g. blocked by the browser): the testimonial
            // still shows on the page, it just won't survive a refresh
        }
    };

    let savedTestimonials = loadTestimonials();

    function addTestimonial({ id, name, role, message, avatar }) {
        const testimonial = document.createElement('article');
        testimonial.classList.add('testimonial');
        testimonial.innerHTML = `
            <div class="avatar">
                <img loading="lazy">
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
        testimonial.querySelector('img').src = avatarImages[avatar] || avatarImages[0];
        testimonial.querySelector('img').alt = name;
        testimonial.querySelector('h5').textContent = name;
        testimonial.querySelector('small').textContent = role;
        testimonial.querySelector('p').textContent = `"${message}"`;

        testimonial.querySelector('.delete-testimonial-btn').addEventListener('click', () => {
            testimonial.remove();
            savedTestimonials = savedTestimonials.filter(saved => saved.id !== id);
            saveTestimonials();
            updateArrows();
        });

        testimonialsContainer.appendChild(testimonial);
    }

    savedTestimonials.forEach(addTestimonial);

    // Slider arrows: move one testimonial at a time, disabled at either end
    const prevBtn = document.querySelector('.testimonials__arrow--prev');
    const nextBtn = document.querySelector('.testimonials__arrow--next');

    const updateArrows = () => {
        const maxScroll = testimonialsContainer.scrollWidth - testimonialsContainer.clientWidth;
        prevBtn.disabled = testimonialsContainer.scrollLeft <= 1;
        nextBtn.disabled = testimonialsContainer.scrollLeft >= maxScroll - 1;
    };

    prevBtn.addEventListener('click', () => {
        testimonialsContainer.scrollBy({ left: -testimonialsContainer.clientWidth });
    });

    nextBtn.addEventListener('click', () => {
        testimonialsContainer.scrollBy({ left: testimonialsContainer.clientWidth });
    });

    testimonialsContainer.addEventListener('scroll', updateArrows);
    window.addEventListener('resize', updateArrows);
    updateArrows();

    addTestimonialBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        const role = roleInput.value.trim();
        const message = messageInput.value.trim();

        // \p{L} matches letters in any alphabet, so names like "Ștefan" or "José" pass
        const nameRegex = /^[\p{L}\s'-]{3,50}$/u;
        const roleRegex = /^[a-zA-Z\s]{2,30}$/;
        // [\s\S] instead of . so messages can contain line breaks
        const messageRegex = /^[\s\S]{10,300}$/;

        if (!nameRegex.test(name)) {
            alert('The name must contain only letters, spaces, apostrophes and hyphens, between 3 and 50 characters.');
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

        const testimonial = { id: Date.now().toString(), name, role, message, avatar: getRandomAvatar() };
        savedTestimonials.push(testimonial);
        saveTestimonials();
        addTestimonial(testimonial);
        updateArrows();

        // Slide to the new testimonial so the visitor sees it was added
        testimonialsContainer.scrollTo({ left: testimonialsContainer.scrollWidth });

        nameInput.value = '';
        roleInput.value = '';
        messageInput.value = '';
    });
}


// ======================= CONTACT FORM =======================

const contactForm = document.querySelector('.contact__form');

// The contact form only exists on the contact page.
// It is sent to Formspree (the form's action URL) without reloading the page.
if (contactForm) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const formStatus = contactForm.querySelector('.form__status');

    const showStatus = (message, type) => {
        formStatus.textContent = message;
        formStatus.className = `form__status ${type}`;
    };

    contactForm.addEventListener('submit', async event => {
        event.preventDefault();

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        showStatus('', '');

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { Accept: 'application/json' }
            });

            if (response.ok) {
                contactForm.reset();
                showStatus('Thanks! Your message has been sent.', 'success');
            } else {
                showStatus('Sorry, your message could not be sent.', 'error');
            }
        } catch {
            showStatus('Network error. Please try again.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    });
}


// ======================= FAQs =======================

// Show/hide FAQ answers and toggle the plus/minus icon.
// The question is a <button>, so keyboard users can open it with Enter/Space;
// its click bubbles up to the article, which also stays clickable with the mouse.
document.querySelectorAll('.faq').forEach(faq => {
    faq.addEventListener('click', () => {
        const isOpen = faq.classList.toggle('open');
        faq.querySelector('.faq__question').setAttribute('aria-expanded', isOpen);

        const icon = faq.querySelector('.faq__icon i');
        icon.classList.toggle('uil-plus');
        icon.classList.toggle('uil-minus');
    });
});
