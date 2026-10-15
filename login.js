// DOM Elements
const loginContainer = document.getElementById('login-container');
const registerContainer = document.getElementById('register-container');
const welcomeContainer = document.getElementById('welcome-container');
const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const newUsernameInput = document.getElementById('new-username');
const newPasswordInput = document.getElementById('new-password');
const userNameDisplay = document.getElementById('user-name');
const logoutButton = document.getElementById('logout-button');

// Event Listeners
loginForm.addEventListener('submit', handleLogin);
registerForm.addEventListener('submit', handleRegister);
// preventDefault stops the href="#" links from changing the URL
showRegisterLink.addEventListener('click', event => {
    event.preventDefault();
    showRegister();
});
showLoginLink.addEventListener('click', event => {
    event.preventDefault();
    showLogin();
});
logoutButton.addEventListener('click', handleLogout);

// Functions
function handleLogin(event) {
    event.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.username === username && storedUser.password === password) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);

        // Redirect to the home page after a successful login
        window.location.href = "index.html";
    } else {
        alert('Invalid username or password');
    }
}

function handleRegister(event) {
    event.preventDefault();
    const username = newUsernameInput.value;
    const password = newPasswordInput.value;

    if (username && password) {
        const user = { username, password };
        localStorage.setItem('user', JSON.stringify(user));
        alert('Registration successful! You can now log in.');
        showLogin();
    } else {
        alert('Please fill in all fields');
    }
}

function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    // Switch the navbar back from the username to "Login" (defined in script.js)
    updateLoginLink();
    showLogin();
}

function showLogin() {
    loginContainer.style.display = 'block';
    registerContainer.style.display = 'none';
    welcomeContainer.style.display = 'none';
}

function showRegister() {
    loginContainer.style.display = 'none';
    registerContainer.style.display = 'block';
    welcomeContainer.style.display = 'none';
}

function showWelcome() {
    loginContainer.style.display = 'none';
    registerContainer.style.display = 'none';
    welcomeContainer.style.display = 'block';
    userNameDisplay.textContent = localStorage.getItem('username');
}

// Initialize
function init() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        showWelcome();
    } else {
        showLogin();
    }
}

init();
