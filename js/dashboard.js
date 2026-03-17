// =============================================
// CAMPUS LINK - Dashboard JavaScript
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  // ---- Load User ----
  const userStr = sessionStorage.getItem('cl_currentUser');
  if (!userStr) {
    window.location.href = 'index.html';
    return;
  }
  const user = JSON.parse(userStr);

  // ---- Populate Profile ----
  const dashName = document.getElementById('dashUserName');
  const dashUniversity = document.getElementById('dashUniversity');
  const dashCourse = document.getElementById('dashCourse');
  const dashAvatar = document.getElementById('dashAvatar');
  const sidebarAvatar = document.getElementById('sidebarAvatar');
  const sidebarName = document.getElementById('sidebarName');
  const sidebarUniversity = document.getElementById('sidebarUniversity');
  const welcomeName = document.getElementById('welcomeName');

  if (dashName) dashName.textContent = user.name;
  if (dashUniversity) dashUniversity.textContent = user.university;
  if (dashCourse) dashCourse.textContent = user.course;
  if (dashAvatar) dashAvatar.textContent = user.avatar;
  if (sidebarAvatar) sidebarAvatar.textContent = user.avatar;
  if (sidebarName) sidebarName.textContent = user.name;
  if (sidebarUniversity) sidebarUniversity.textContent = user.university;
  if (welcomeName) welcomeName.textContent = user.name.split(' ')[0];

  // ---- Today's Date ----
  const dateEl = document.getElementById('todayDate');
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString('en-KE', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  // ---- Profile Completion ----
  const completionFields = [
    { key: 'name', label: 'Full name', icon: 'fa-check-circle' },
    { key: 'email', label: 'Email verified', icon: 'fa-check-circle' },
    { key: 'university', label: 'University set', icon: 'fa-check-circle' },
    { key: 'bio', label: 'Add bio', icon: 'fa-exclamation-circle' },
    { key: 'skills', label: 'Add skills', icon: 'fa-exclamation-circle' },
    { key: 'course', label: 'Course/Major set', icon: 'fa-check-circle' }
  ];

  let filledCount = 0;
  completionFields.forEach(field => {
    const val = user[field.key];
    if (val && (typeof val === 'string' ? val !== 'Not specified' && val.length > 0 : val.length > 0)) {
      filledCount++;
    }
  });

  const completionPercent = Math.round((filledCount / completionFields.length) * 100);

  const progressFill = document.getElementById('profileProgressFill');
  const progressText = document.getElementById('profileProgressText');
  const progressLabel = document.getElementById('profileProgressLabel');
  const sidebarProgressFill = document.getElementById('sidebarProgressFill');
  const sidebarProgressText = document.getElementById('sidebarProgressText');

  if (progressFill) progressFill.style.width = completionPercent + '%';
  if (progressText) progressText.textContent = completionPercent + '%';
  if (progressLabel) progressLabel.textContent = completionPercent + '% Complete';
  if (sidebarProgressFill) sidebarProgressFill.style.width = completionPercent + '%';
  if (sidebarProgressText) sidebarProgressText.textContent = completionPercent + '% Complete';

  // ---- Activity Feed ----
  const activityData = [
    { icon: 'fa-briefcase', text: 'New internship posted at <strong>Safaricom</strong> – Software Engineer Intern', time: '2 hours ago', color: '#4f46e5' },
    { icon: 'fa-graduation-cap', text: 'New scholarship available: <strong>KPLC Engineering Scholarship</strong>', time: '5 hours ago', color: '#7c3aed' },
    { icon: 'fa-users', text: 'Study group invite: <strong>Data Structures Study Group</strong>', time: '1 day ago', color: '#06b6d4' },
    { icon: 'fa-eye', text: 'Your profile was viewed by <strong>3 recruiters</strong>', time: '2 days ago', color: '#10b981' },
    { icon: 'fa-envelope', text: 'New message from <strong>Career Center</strong>', time: '3 days ago', color: '#f59e0b' }
  ];

  const feedContainer = document.getElementById('activityFeed');
  if (feedContainer) {
    feedContainer.innerHTML = activityData.map(item => `
      <div class="activity-item">
        <div class="activity-icon" style="background:rgba(${hexToRgb(item.color)},0.12);color:${item.color};">
          <i class="fas ${item.icon}"></i>
        </div>
        <div class="activity-text">${item.text}</div>
        <div class="activity-time">${item.time}</div>
      </div>
    `).join('');
  }

  // ---- Recommended Resources ----
  const resourcesData = [
    { icon: 'fa-code', title: 'Introduction to Data Structures', subject: 'CS', downloads: 234, color: '#4f46e5' },
    { icon: 'fa-chart-bar', title: 'Business Communication Guide', subject: 'Business', downloads: 189, color: '#7c3aed' },
    { icon: 'fa-calculator', title: 'Engineering Mathematics Notes', subject: 'Engineering', downloads: 312, color: '#06b6d4' }
  ];

  const resourcesContainer = document.getElementById('recommendedResources');
  if (resourcesContainer) {
    resourcesContainer.innerHTML = resourcesData.map(r => `
      <div class="resource-card">
        <div class="resource-icon" style="background:linear-gradient(135deg,${r.color},${r.color}cc);">
          <i class="fas ${r.icon}"></i>
        </div>
        <div class="resource-info">
          <h4>${r.title}</h4>
          <div class="resource-type">${r.subject}</div>
          <div class="resource-downloads"><i class="fas fa-download"></i> ${r.downloads} downloads</div>
        </div>
        <a href="resources.html" class="btn btn-sm btn-outline">View</a>
      </div>
    `).join('');
  }

  // ---- Saved Opportunities ----
  const savedOpportunities = [
    { company: 'Safaricom PLC', role: 'Software Engineer Intern', location: 'Nairobi', salary: 'KSh 25,000/mo', logoColor: '#16a34a', logoText: 'SAF' },
    { company: 'Google Africa', role: 'UX Research Intern', location: 'Nairobi', salary: 'KSh 45,000/mo', logoColor: '#4285f4', logoText: 'GOO' },
    { company: 'KCB Bank', role: 'Data Analyst Intern', location: 'Nairobi', salary: 'KSh 20,000/mo', logoColor: '#2563eb', logoText: 'KCB' }
  ];

  const savedContainer = document.getElementById('savedOpportunities');
  if (savedContainer) {
    savedContainer.innerHTML = savedOpportunities.map(opp => `
      <div class="saved-job-card" style="background:white;border-radius:12px;padding:1rem 1.25rem;border:1px solid #e2e8f0;margin-bottom:0.75rem;display:flex;align-items:center;gap:1rem;box-shadow:0 1px 3px rgba(0,0,0,0.06);">
        <div class="company-logo" style="background:${opp.logoColor};width:40px;height:40px;font-size:0.65rem;">${opp.logoText}</div>
        <div style="flex:1;min-width:0;">
          <div style="font-size:0.875rem;font-weight:700;color:#1e293b;">${opp.role}</div>
          <div style="font-size:0.8rem;color:#64748b;">${opp.company} · ${opp.location}</div>
          <div style="font-size:0.8rem;color:#4f46e5;font-weight:600;">${opp.salary}</div>
        </div>
        <button class="btn btn-sm btn-danger remove-saved-btn" title="Remove"><i class="fas fa-times"></i></button>
      </div>
    `).join('');

    // Re-attach remove handlers
    savedContainer.querySelectorAll('.remove-saved-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const card = this.closest('.saved-job-card');
        if (card) {
          card.style.transition = 'opacity 0.3s ease';
          card.style.opacity = '0';
          setTimeout(() => card.remove(), 280);
        }
      });
    });
  }

  // ---- Notification Count Badge ----
  const notifBadgeEl = document.querySelector('.notif-badge');
  if (notifBadgeEl && user.notifications) {
    notifBadgeEl.textContent = user.notifications;
  }

  // ---- Sidebar Active Link ----
  const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
  document.querySelectorAll('.sidebar-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPage || (currentPage === 'dashboard.html' && href === 'dashboard.html'))) {
      link.classList.add('active');
    }
  });

  // ---- Profile Completion Widget ----
  const completionListEl = document.getElementById('completionList');
  if (completionListEl) {
    const items = [
      { done: !!user.bio && user.bio.length > 0, label: 'Add a bio to your profile' },
      { done: user.skills && user.skills.length > 0, label: 'Add your skills' },
      { done: false, label: 'Upload a profile photo' },
      { done: false, label: 'Verify your student email' },
      { done: !!(user.university && user.university !== 'Not specified'), label: 'Set your university' }
    ];
    completionListEl.innerHTML = items.map(item => `
      <div class="completion-item ${item.done ? 'done' : ''}">
        <i class="fas ${item.done ? 'fa-check-circle' : 'fa-exclamation-circle'}" style="color:${item.done ? '#10b981' : '#f59e0b'};"></i>
        <span style="${item.done ? 'text-decoration:line-through;color:#94a3b8;' : ''}">${item.label}</span>
      </div>
    `).join('');
  }
});

// ---- Utility: Hex to RGB ----
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '79,70,229';
  return `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`;
}
