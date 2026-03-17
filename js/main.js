// =============================================
// CAMPUS LINK - Main JavaScript
// =============================================

// ---- Mobile Navigation Toggle ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const icon = hamburger.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });

  // Close nav on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const icon = hamburger.querySelector('i');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-times');
    });
  });
}

// ---- Smooth Scrolling ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- Active Nav Link Highlighting ----
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

setActiveNavLink();

// ---- Intersection Observer for Scroll Animations ----
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      animObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  animObserver.observe(el);
});

// ---- Counter Animation ----
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-target]').forEach(el => {
  counterObserver.observe(el);
});

// ---- Tab Switching ----
function initTabs(containerSelector) {
  const containers = document.querySelectorAll(containerSelector || '.tabs');
  containers.forEach(container => {
    const buttons = container.querySelectorAll('.tab-btn');
    const contents = container.querySelectorAll('.tab-content');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab');
        buttons.forEach(b => b.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        const targetContent = container.querySelector(`#${target}`);
        if (targetContent) targetContent.classList.add('active');
      });
    });
  });
}

initTabs();

// ---- Accordion FAQ ----
document.querySelectorAll('.accordion-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.accordion-item');
    const content = item.querySelector('.accordion-content');
    const isOpen = btn.classList.contains('open');

    // Close all
    document.querySelectorAll('.accordion-btn.open').forEach(b => {
      b.classList.remove('open');
      b.closest('.accordion-item').classList.remove('open');
      b.closest('.accordion-item').querySelector('.accordion-content').classList.remove('open');
    });

    // Open clicked if not already open
    if (!isOpen) {
      btn.classList.add('open');
      item.classList.add('open');
      content.classList.add('open');
    }
  });
});

// ---- Category Filter (Blog) ----
function initCategoryFilter() {
  const catBtns = document.querySelectorAll('.cat-btn');
  if (!catBtns.length) return;

  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');
      const cards = document.querySelectorAll('.blog-card[data-category]');

      cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

initCategoryFilter();

// ---- Notification Bell Toggle ----
const notifBtn = document.querySelector('.notification-btn');
if (notifBtn) {
  notifBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    alert('You have 2 new notifications:\n• New internship posted at Safaricom\n• Scholarship deadline reminder: KPLC Engineering');
  });
}

// ---- Upload Resource Modal ----
const uploadBtn = document.getElementById('uploadResourceBtn');
const uploadModal = document.getElementById('uploadModal');
const closeUploadModal = document.getElementById('closeUploadModal');

if (uploadBtn && uploadModal) {
  uploadBtn.addEventListener('click', () => uploadModal.classList.add('active'));
}

if (closeUploadModal && uploadModal) {
  closeUploadModal.addEventListener('click', () => uploadModal.classList.remove('active'));
  uploadModal.addEventListener('click', (e) => {
    if (e.target === uploadModal) uploadModal.classList.remove('active');
  });
}

// ---- Apply Button Handlers ----
document.querySelectorAll('.apply-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const jobTitle = this.closest('.job-card')?.querySelector('h3')?.textContent || 'this opportunity';
    this.textContent = 'Applied ✓';
    this.classList.remove('btn-primary');
    this.classList.add('btn-success');
    this.disabled = true;
    setTimeout(() => {
      alert(`Application submitted for ${jobTitle}!\nWe'll notify you of any updates.`);
    }, 100);
  });
});

// ---- Connect Button Handlers ----
document.querySelectorAll('.connect-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const isConnected = this.getAttribute('data-connected') === 'true';
    if (!isConnected) {
      this.textContent = 'Connected ✓';
      this.classList.remove('btn-primary');
      this.classList.add('btn-secondary');
      this.setAttribute('data-connected', 'true');
    } else {
      this.textContent = 'Connect';
      this.classList.add('btn-primary');
      this.classList.remove('btn-secondary');
      this.setAttribute('data-connected', 'false');
    }
  });
});

// ---- Join Group Button Handlers ----
document.querySelectorAll('.join-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const joined = this.getAttribute('data-joined') === 'true';
    if (!joined) {
      this.textContent = 'Joined ✓';
      this.classList.remove('btn-primary');
      this.classList.add('btn-secondary');
      this.setAttribute('data-joined', 'true');
    } else {
      this.textContent = 'Join';
      this.classList.add('btn-primary');
      this.classList.remove('btn-secondary');
      this.setAttribute('data-joined', 'false');
    }
  });
});

// ---- Create Event Button ----
const createEventBtn = document.getElementById('createEventBtn');
if (createEventBtn) {
  createEventBtn.addEventListener('click', () => {
    alert('Create Event feature coming soon!\nSign in to organize events for your community.');
  });
}

// ---- Search Functionality ----
function initSearch(inputSelector, cardSelector, fields) {
  const input = document.querySelector(inputSelector);
  if (!input) return;

  input.addEventListener('input', () => {
    const query = input.value.toLowerCase().trim();
    const cards = document.querySelectorAll(cardSelector);

    cards.forEach(card => {
      const text = fields.map(f => {
        const el = card.querySelector(f);
        return el ? el.textContent.toLowerCase() : '';
      }).join(' ');

      card.style.display = (!query || text.includes(query)) ? '' : 'none';
    });
  });
}

initSearch('#resourceSearch', '.resource-card', ['h4', '.resource-type']);
initSearch('#careerSearch', '.job-card', ['h3', '.job-company']);
initSearch('#networkSearch', '.student-card', ['h3', '.university', '.course']);

// ---- Hero Signup Buttons ----
['heroSignupBtn', 'ctaSignupBtn'].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('click', () => {
      if (typeof showSignupModal === 'function') showSignupModal();
    });
  }
});

// ---- Book Tutor Handler ----
document.querySelectorAll('.book-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const name = this.closest('.tutor-card')?.querySelector('h4')?.textContent || 'this tutor';
    alert(`Booking request sent to ${name}!\nThey will confirm your session shortly.`);
  });
});

// ---- Remove Saved Button ----
document.querySelectorAll('.remove-saved-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const card = this.closest('.saved-job-card');
    if (card) {
      card.style.animation = 'fadeOut 0.3s ease';
      setTimeout(() => card.remove(), 280);
    }
  });
});

// ---- Filter Apply Button ----
const applyFiltersBtn = document.getElementById('applyFiltersBtn');
if (applyFiltersBtn) {
  applyFiltersBtn.addEventListener('click', () => {
    alert('Filters applied! (Demo mode — all results shown)');
  });
}

// ---- Contact Form Handler ----
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Your message has been sent!\nOur support team will get back to you within 24 hours.');
    contactForm.reset();
  });
}

// ---- University Apply Form ----
const uniApplyForm = document.getElementById('uniApplyForm');
if (uniApplyForm) {
  uniApplyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Application submitted! We\'ll review your request and get in touch within 5 business days.');
    uniApplyForm.reset();
  });
}

// ---- Newsletter Subscribe ----
document.querySelectorAll('.newsletter-form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    if (input && input.value) {
      alert(`Thanks for subscribing with ${input.value}!\nYou'll receive our weekly digest.`);
      input.value = '';
    }
  });
});

// ---- Mock Data Arrays ----

// MongoDB Collection: students
const students = [
  { id: 1, name: "Wanjiru Kamau", university: "University of Nairobi", course: "Computer Science", year: 3, skills: ["Python", "React", "ML"], avatar: "WK", connections: 145, avatarColor: "#06b6d4" },
  { id: 2, name: "Brian Omondi", university: "JKUAT", course: "Electrical Engineering", year: 4, skills: ["MATLAB", "AutoCAD", "C++"], avatar: "BO", connections: 89, avatarColor: "#4f46e5" },
  { id: 3, name: "Amina Noor", university: "Strathmore University", course: "Business Administration", year: 2, skills: ["Finance", "Analytics", "Excel"], avatar: "AN", connections: 203, avatarColor: "#7c3aed" },
  { id: 4, name: "Dennis Mutua", university: "Kenyatta University", course: "Medicine", year: 5, skills: ["Research", "Healthcare", "Biology"], avatar: "DM", connections: 67, avatarColor: "#10b981" },
  { id: 5, name: "Faith Ochieng", university: "Moi University", course: "Law", year: 3, skills: ["Legal Research", "Advocacy", "Writing"], avatar: "FO", connections: 112, avatarColor: "#f59e0b" },
  { id: 6, name: "Samuel Mwangi", university: "Egerton University", course: "Agriculture", year: 2, skills: ["AgriTech", "Research", "GIS"], avatar: "SM", connections: 78, avatarColor: "#ef4444" },
  { id: 7, name: "Grace Wanjiru", university: "University of Nairobi", course: "Computer Science", year: 4, skills: ["Java", "Spring Boot", "SQL"], avatar: "GW", connections: 134, avatarColor: "#8b5cf6" },
  { id: 8, name: "Peter Mwangi", university: "JKUAT", course: "Mathematics", year: 3, skills: ["Statistics", "SPSS", "Python"], avatar: "PM", connections: 96, avatarColor: "#0891b2" }
];

// MongoDB Collection: internships
const internships = [
  { id: 1, company: "Safaricom PLC", role: "Software Engineer Intern", location: "Nairobi", salary: "KSh 25,000/mo", deadline: "March 30, 2024", type: "Full-time", skills: ["Python", "React", "Node.js"], logoColor: "#16a34a", logoText: "SAF" },
  { id: 2, company: "KCB Bank", role: "Data Analyst Intern", location: "Nairobi", salary: "KSh 20,000/mo", deadline: "April 15, 2024", type: "Full-time", skills: ["Excel", "SQL", "Power BI"], logoColor: "#2563eb", logoText: "KCB" },
  { id: 3, company: "Nation Media Group", role: "Journalism Intern", location: "Nairobi", salary: "KSh 15,000/mo", deadline: "March 25, 2024", type: "Part-time", skills: ["Writing", "Research"], logoColor: "#ea580c", logoText: "NMG" },
  { id: 4, company: "Kenya Power", role: "Electrical Engineering Intern", location: "Nationwide", salary: "KSh 22,000/mo", deadline: "April 5, 2024", type: "Full-time", skills: ["AutoCAD", "Electrical Systems"], logoColor: "#ca8a04", logoText: "KP" },
  { id: 5, company: "Google Africa", role: "UX Research Intern", location: "Nairobi", salary: "KSh 45,000/mo", deadline: "April 20, 2024", type: "Full-time", skills: ["Figma", "User Research", "Design"], logoColor: "#4285f4", logoText: "GOO" },
  { id: 6, company: "KPMG Kenya", role: "Audit Intern", location: "Nairobi", salary: "KSh 18,000/mo", deadline: "March 28, 2024", type: "Full-time", skills: ["Accounting", "Excel", "Analysis"], logoColor: "#0f766e", logoText: "KPM" },
  { id: 7, company: "Equity Bank", role: "Finance Intern", location: "Nairobi", salary: "KSh 19,000/mo", deadline: "April 10, 2024", type: "Full-time", skills: ["Finance", "Excel", "Communication"], logoColor: "#dc2626", logoText: "EQB" },
  { id: 8, company: "Deloitte Kenya", role: "Consulting Intern", location: "Nairobi", salary: "KSh 23,000/mo", deadline: "April 8, 2024", type: "Full-time", skills: ["Analysis", "PowerPoint", "Research"], logoColor: "#0369a1", logoText: "DEL" }
];

// MongoDB Collection: scholarships
const scholarships = [
  { id: 1, name: "KPLC Engineering Scholarship", amount: "KSh 100,000/yr", deadline: "May 1, 2024", eligibility: "Engineering students, min GPA 3.5", provider: "Kenya Power & Lighting" },
  { id: 2, name: "Equity Wings to Fly", amount: "Full scholarship + stipend", deadline: "April 30, 2024", eligibility: "Form 4 leavers, financial need", provider: "Equity Foundation" },
  { id: 3, name: "Google Generation Scholarship", amount: "USD 1,000", deadline: "March 31, 2024", eligibility: "CS students, women in tech", provider: "Google" },
  { id: 4, name: "Safaricom Foundation Scholarship", amount: "KSh 80,000/yr", deadline: "April 15, 2024", eligibility: "Any field, merit-based", provider: "Safaricom Foundation" },
  { id: 5, name: "CMA Capital Markets Scholarship", amount: "KSh 60,000/yr", deadline: "May 15, 2024", eligibility: "Finance & Business students", provider: "Capital Markets Authority" },
  { id: 6, name: "Mastercard Foundation Scholarship", amount: "Full tuition + living", deadline: "June 1, 2024", eligibility: "Undergraduate, African students", provider: "Mastercard Foundation" }
];

// MongoDB Collection: blogPosts
const blogPosts = [
  { id: 1, title: "10 Study Hacks That Actually Work", category: "Study Tips", excerpt: "Proven techniques from top-performing students that can transform your study sessions and boost retention.", author: "Wanjiru K.", date: "March 18, 2024", readTime: "5 min", tags: ["Study Tips", "Productivity"] },
  { id: 2, title: "Top 5 Productivity Apps for University Students", category: "Productivity", excerpt: "Discover the apps that help thousands of students stay organized, focused, and on top of their deadlines.", author: "Brian O.", date: "March 15, 2024", readTime: "4 min", tags: ["Productivity", "Technology"] },
  { id: 3, title: "How to Ace Technical Interviews in Kenya", category: "Career Advice", excerpt: "Expert tips on preparing for technical interviews at Kenya's top tech companies including Safaricom and Google Africa.", author: "David M.", date: "March 12, 2024", readTime: "8 min", tags: ["Career", "Technology"] },
  { id: 4, title: "Introduction to Machine Learning for Beginners", category: "Technology", excerpt: "A gentle introduction to machine learning concepts every computer science student should understand.", author: "Kevin O.", date: "March 10, 2024", readTime: "10 min", tags: ["Technology", "Research"] },
  { id: 5, title: "From UoN to Silicon Valley: A Graduate's Journey", category: "Success Stories", excerpt: "How a University of Nairobi graduate navigated the path from campus to a top Silicon Valley tech company.", author: "Amira H.", date: "March 5, 2024", readTime: "7 min", tags: ["Success Stories", "Career"] },
  { id: 6, title: "Managing Exam Stress: A Practical Guide", category: "Study Tips", excerpt: "Scientifically-backed strategies to manage exam anxiety and perform at your best when it matters most.", author: "Sarah K.", date: "March 1, 2024", readTime: "6 min", tags: ["Study Tips", "Wellness"] }
];

// MongoDB Collection: universities
const universities = [
  { id: 1, name: "University of Nairobi", abbr: "UoN", established: 1956, students: 62000, resources: 234, departments: ["Engineering", "Medicine", "Law", "Business", "Arts", "Science", "Education", "Architecture"], color: "#1e3a5f" },
  { id: 2, name: "Strathmore University", abbr: "STR", established: 1961, students: 7500, resources: 189, departments: ["Business", "Technology", "Law", "Humanities", "Tourism"], color: "#7c0000" },
  { id: 3, name: "JKUAT", abbr: "JKU", established: 1994, students: 40000, resources: 312, departments: ["Engineering", "Agriculture", "Science", "Business", "Architecture", "Medicine", "ICT", "Hospitality", "Education"], color: "#166534" },
  { id: 4, name: "Kenyatta University", abbr: "KU", established: 1985, students: 75000, resources: 276, departments: ["Education", "Science", "Arts", "Business", "Engineering", "Medicine", "Law", "Environmental", "Security", "Tourism"], color: "#991b1b" },
  { id: 5, name: "Moi University", abbr: "MU", established: 1984, students: 55000, resources: 198, departments: ["Science", "Engineering", "Business", "Arts", "Medicine", "Law", "Education"], color: "#1d4ed8" },
  { id: 6, name: "Egerton University", abbr: "EGE", established: 1939, students: 35000, resources: 167, departments: ["Agriculture", "Science", "Business", "Arts", "Engineering", "Education"], color: "#92400e" }
];

// MongoDB Collection: companies
const companies = [
  { id: 1, name: "Safaricom PLC", industry: "Telecommunications", location: "Nairobi", openPositions: 12, logoText: "SAF", logoColor: "#16a34a", description: "Kenya's largest telco and technology company, pioneer of M-PESA." },
  { id: 2, name: "KCB Bank Group", industry: "Banking & Finance", location: "Nairobi", openPositions: 8, logoText: "KCB", logoColor: "#2563eb", description: "Leading bank in East Africa with operations across the region." },
  { id: 3, name: "Equity Bank", industry: "Banking & Finance", location: "Nairobi", openPositions: 6, logoText: "EQB", logoColor: "#dc2626", description: "Pan-African bank focused on financial inclusion and empowerment." },
  { id: 4, name: "Nation Media Group", industry: "Media & Publishing", location: "Nairobi", openPositions: 4, logoText: "NMG", logoColor: "#ea580c", description: "East Africa's largest independent media house." },
  { id: 5, name: "Google Africa", industry: "Technology", location: "Nairobi", openPositions: 3, logoText: "GOO", logoColor: "#4285f4", description: "Google's Africa hub driving digital innovation across the continent." },
  { id: 6, name: "Deloitte Kenya", industry: "Consulting", location: "Nairobi", openPositions: 10, logoText: "DEL", logoColor: "#0369a1", description: "Global leader in audit, consulting, tax, and advisory services." }
];

// Export for use in other scripts
if (typeof window !== 'undefined') {
  window.CampusLinkData = { students, internships, scholarships, blogPosts, universities, companies };
}
