// =============================================
// CAMPUS LINK - Authentication
// =============================================

// ---- Initialize Demo User ----
function initDemoUser() {
  const users = JSON.parse(localStorage.getItem('cl_users') || '[]');
  const demoExists = users.find(u => u.email === 'demo@campuslink.com');
  if (!demoExists) {
    users.push({
      id: 1,
      name: "Alex Johnson",
      email: "demo@campuslink.com",
      password: "demo123",
      university: "University of Nairobi",
      course: "Computer Science",
      year: 3,
      avatar: "AJ",
      bio: "Passionate CS student interested in machine learning, web development, and building solutions for Africa.",
      skills: ["JavaScript", "Python", "React", "Node.js", "SQL"],
      savedJobs: [1, 3, 5],
      notifications: 2,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('cl_users', JSON.stringify(users));
  }
}

// ---- Modal Helpers ----
function showLoginModal() {
  document.getElementById('loginModal')?.classList.add('active');
  document.getElementById('loginEmail')?.focus();
}

function hideLoginModal() {
  document.getElementById('loginModal')?.classList.remove('active');
  const form = document.getElementById('loginForm');
  if (form) form.reset();
  const err = document.getElementById('loginError');
  if (err) err.textContent = '';
}

function showSignupModal() {
  document.getElementById('signupModal')?.classList.add('active');
  document.getElementById('signupName')?.focus();
}

function hideSignupModal() {
  document.getElementById('signupModal')?.classList.remove('active');
  const form = document.getElementById('signupForm');
  if (form) form.reset();
  const err = document.getElementById('signupError');
  if (err) err.textContent = '';
}

function switchToSignup() {
  hideLoginModal();
  showSignupModal();
}

function switchToLogin() {
  hideSignupModal();
  showLoginModal();
}

// ---- Validation ----
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function validatePassword(password) {
  return password && password.length >= 6;
}

// ---- Handle Login ----
function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('loginEmail')?.value.trim();
  const password = document.getElementById('loginPassword')?.value;
  const errorEl = document.getElementById('loginError');

  if (!validateEmail(email)) {
    if (errorEl) errorEl.textContent = 'Please enter a valid email address.';
    return;
  }
  if (!validatePassword(password)) {
    if (errorEl) errorEl.textContent = 'Password must be at least 6 characters.';
    return;
  }

  const users = JSON.parse(localStorage.getItem('cl_users') || '[]');
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    if (errorEl) errorEl.textContent = 'Invalid email or password. Try demo@campuslink.com / demo123';
    return;
  }

  sessionStorage.setItem('cl_currentUser', JSON.stringify(user));
  hideLoginModal();
  window.location.href = 'dashboard.html';
}

// ---- Handle Signup ----
function handleSignup(event) {
  event.preventDefault();
  const name = document.getElementById('signupName')?.value.trim();
  const email = document.getElementById('signupEmail')?.value.trim();
  const university = document.getElementById('signupUniversity')?.value;
  const password = document.getElementById('signupPassword')?.value;
  const errorEl = document.getElementById('signupError');

  if (!name || name.length < 2) {
    if (errorEl) errorEl.textContent = 'Please enter your full name.';
    return;
  }
  if (!validateEmail(email)) {
    if (errorEl) errorEl.textContent = 'Please enter a valid email address.';
    return;
  }
  if (!validatePassword(password)) {
    if (errorEl) errorEl.textContent = 'Password must be at least 6 characters.';
    return;
  }

  const users = JSON.parse(localStorage.getItem('cl_users') || '[]');
  if (users.find(u => u.email === email)) {
    if (errorEl) errorEl.textContent = 'An account with this email already exists.';
    return;
  }

  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
    university: university || 'Not specified',
    course: 'Not specified',
    year: 1,
    avatar: initials,
    bio: '',
    skills: [],
    savedJobs: [],
    notifications: 0,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  localStorage.setItem('cl_users', JSON.stringify(users));
  sessionStorage.setItem('cl_currentUser', JSON.stringify(newUser));
  hideSignupModal();
  window.location.href = 'dashboard.html';
}

// ---- Handle Logout ----
function handleLogout() {
  sessionStorage.removeItem('cl_currentUser');
  window.location.href = 'index.html';
}

// ---- Update Nav for Authenticated User ----
function updateNavForAuth(user) {
  const navAuth = document.getElementById('navAuth');
  if (!navAuth) return;

  navAuth.innerHTML = `
    <div class="user-nav">
      <button class="notification-btn" title="Notifications">
        <i class="fas fa-bell"></i>
        ${user.notifications > 0 ? `<span class="notif-badge">${user.notifications}</span>` : ''}
      </button>
      <a href="dashboard.html" style="display:flex;align-items:center;gap:0.5rem;text-decoration:none;">
        <div class="user-avatar-nav">${user.avatar}</div>
        <span class="user-name-nav">${user.name.split(' ')[0]}</span>
      </a>
      <button class="btn btn-secondary btn-sm" id="logoutBtn">
        <i class="fas fa-sign-out-alt"></i> Logout
      </button>
    </div>
  `;

  document.getElementById('logoutBtn')?.addEventListener('click', handleLogout);

  const notifBtn = navAuth.querySelector('.notification-btn');
  if (notifBtn) {
    notifBtn.addEventListener('click', () => {
      alert(`You have ${user.notifications} new notifications:\n• New internship posted at Safaricom\n• Scholarship deadline reminder`);
    });
  }
}

// ---- Check Auth State ----
function checkAuthState() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const userStr = sessionStorage.getItem('cl_currentUser');
  const user = userStr ? JSON.parse(userStr) : null;

  if (user) {
    updateNavForAuth(user);
  } else if (currentPage === 'dashboard.html') {
    window.location.href = 'index.html';
  }
}

// ---- DOMContentLoaded ----
document.addEventListener('DOMContentLoaded', () => {
  initDemoUser();
  checkAuthState();

  // Login button
  document.getElementById('loginBtn')?.addEventListener('click', showLoginModal);

  // Signup button
  document.getElementById('signupBtn')?.addEventListener('click', showSignupModal);

  // Close modals
  document.getElementById('closeLoginModal')?.addEventListener('click', hideLoginModal);
  document.getElementById('closeSignupModal')?.addEventListener('click', hideSignupModal);

  // Switch between modals
  document.getElementById('switchToSignup')?.addEventListener('click', (e) => {
    e.preventDefault();
    switchToSignup();
  });
  document.getElementById('switchToLogin')?.addEventListener('click', (e) => {
    e.preventDefault();
    switchToLogin();
  });

  // Form submissions
  document.getElementById('loginForm')?.addEventListener('submit', handleLogin);
  document.getElementById('signupForm')?.addEventListener('submit', handleSignup);

  // Click outside modal to close
  document.getElementById('loginModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'loginModal') hideLoginModal();
  });
  document.getElementById('signupModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'signupModal') hideSignupModal();
  });

  // Escape key to close modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hideLoginModal();
      hideSignupModal();
    }
  });

  // Hero signup buttons
  document.getElementById('heroSignupBtn')?.addEventListener('click', showSignupModal);
  document.getElementById('ctaSignupBtn')?.addEventListener('click', showSignupModal);
});

// Expose globals
window.showLoginModal = showLoginModal;
window.showSignupModal = showSignupModal;
window.hideLoginModal = hideLoginModal;
window.hideSignupModal = hideSignupModal;
window.handleLogout = handleLogout;
