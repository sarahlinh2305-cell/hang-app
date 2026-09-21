// ============================================================
// HANG — APPLICATION LOGIC
// Router, Components, Screens, Events
// ============================================================

'use strict';

// ─── SVG ICONS ───────────────────────────────────────────────
const ICONS = {
  home: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" class="nav-icon"><path d="M3 9.5L11 3L19 9.5V19C19 19.55 18.55 20 18 20H14V14H8V20H4C3.45 20 3 19.55 3 19V9.5Z" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  plans: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" class="nav-icon"><path d="M8 6H19M8 11H19M8 16H13" stroke-width="1.8" stroke-linecap="round"/><circle cx="5" cy="6" r="1.5" fill="currentColor" stroke="none" style="fill:var(--text-muted)"/><circle cx="5" cy="11" r="1.5" fill="currentColor" stroke="none" style="fill:var(--text-muted)"/><circle cx="5" cy="16" r="1.5" fill="currentColor" stroke="none" style="fill:var(--text-muted)"/></svg>`,
  calendar: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" class="nav-icon"><rect x="3" y="5" width="16" height="15" rx="3" stroke-width="1.8"/><path d="M3 10H19" stroke-width="1.8" stroke-linecap="round"/><path d="M7.5 3V7M14.5 3V7" stroke-width="1.8" stroke-linecap="round"/><circle cx="8" cy="14" r="1" stroke="none" style="fill:var(--text-muted)"/><circle cx="11" cy="14" r="1" stroke="none" style="fill:var(--text-muted)"/><circle cx="14" cy="14" r="1" stroke="none" style="fill:var(--text-muted)"/></svg>`,
  crew: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" class="nav-icon"><circle cx="9" cy="8" r="3.5" stroke-width="1.8"/><path d="M3 19C3 15.686 5.686 13 9 13C12.314 13 15 15.686 15 19" stroke-width="1.8" stroke-linecap="round"/><path d="M16 5C17.657 5 19 6.343 19 8C19 9.657 17.657 11 16 11" stroke-width="1.8" stroke-linecap="round"/><path d="M19 19C19 16.791 17.761 14.871 16 14" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  profile: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" class="nav-icon"><circle cx="11" cy="8" r="4" stroke-width="1.8"/><path d="M4 19C4 15.134 7.134 12 11 12C14.866 12 18 15.134 18 19" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  back: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 5L7 10L12 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  plus: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 4V18M4 11H18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  location: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1C4.791 1 3 2.791 3 5C3 8 7 13 7 13C7 13 11 8 11 5C11 2.791 9.209 1 7 1Z" stroke="currentColor" stroke-width="1.5"/><circle cx="7" cy="5" r="1.5" stroke="currentColor" stroke-width="1.3"/></svg>`,
  clock: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.5"/><path d="M7 4V7L9 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  check: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7L6 10L11 4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevronRight: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  chevronLeft: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 5L7 10L12 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  chevronRight20: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8 5L13 10L8 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  settings: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 13C11.657 13 13 11.657 13 10C13 8.343 11.657 7 10 7C8.343 7 7 8.343 7 10C7 11.657 8.343 13 10 13Z" stroke="currentColor" stroke-width="1.8"/><path d="M16.5 10C16.5 10.46 16.46 10.91 16.38 11.34L17.9 12.51C18.1 12.66 18.15 12.94 18.02 13.16L16.62 15.62C16.49 15.84 16.22 15.92 16 15.82L14.22 15.07C13.83 15.37 13.4 15.62 12.94 15.8L12.65 17.72C12.61 17.97 12.39 18.16 12.13 18.16H9.37C9.11 18.16 8.89 17.97 8.85 17.72L8.56 15.8C8.1 15.62 7.67 15.37 7.28 15.07L5.5 15.82C5.27 15.92 5 15.84 4.88 15.62L3.48 13.16C3.35 12.94 3.4 12.66 3.6 12.51L5.12 11.34C5.04 10.91 5 10.46 5 10C5 9.54 5.04 9.09 5.12 8.66L3.6 7.49C3.4 7.34 3.35 7.06 3.48 6.84L4.88 4.38C5 4.16 5.27 4.08 5.5 4.18L7.28 4.93C7.67 4.63 8.1 4.38 8.56 4.2L8.85 2.28C8.89 2.03 9.11 1.84 9.37 1.84H12.13C12.39 1.84 12.61 2.03 12.65 2.28L12.94 4.2C13.4 4.38 13.83 4.63 14.22 4.93L16 4.18C16.22 4.08 16.49 4.16 16.62 4.38L18.02 6.84C18.15 7.06 18.1 7.34 17.9 7.49L16.38 8.66C16.46 9.09 16.5 9.54 16.5 10Z" stroke="currentColor" stroke-width="1.8"/></svg>`,
  mapPin: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5C5.515 1.5 3.5 3.515 3.5 6C3.5 9.5 8 14.5 8 14.5C8 14.5 12.5 9.5 12.5 6C12.5 3.515 10.485 1.5 8 1.5Z" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="6" r="2" stroke="currentColor" stroke-width="1.4"/></svg>`,
  brandSymbol: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M8 28C8 28 12 12 20 12C28 12 32 28 32 28" stroke="white" stroke-width="3.5" stroke-linecap="round"/><path d="M14 28C14 28 16 20 20 20C24 20 26 28 26 28" stroke="white" stroke-width="3.5" stroke-linecap="round"/><circle cx="20" cy="10" r="3" fill="white"/></svg>`,
  brandSymbolColored: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M8 28C8 28 12 12 20 12C28 12 32 28 32 28" stroke="#7C5CFC" stroke-width="3.5" stroke-linecap="round"/><path d="M14 28C14 28 16 20 20 20C24 20 26 28 26 28" stroke="#FF6B9D" stroke-width="3.5" stroke-linecap="round"/><circle cx="20" cy="10" r="3" fill="#FFD166"/></svg>`,
};

// ─── ROUTER ───────────────────────────────────────────────────
function navigate(screen, params = {}) {
  const prev = AppState.currentScreen;
  AppState.prevScreen = prev;
  AppState.currentScreen = screen;
  Object.assign(AppState, params);

  // Hide all screens
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));

  // Show target
  const target = document.getElementById('screen-' + screen);
  if (target) {
    // Render content
    renderScreen(screen);
    target.classList.add('active');
  }

  // Nav visibility
  const hasNav = ['home','plans','calendar','crew','profile'].includes(screen);
  const nav = document.getElementById('bottom-nav');
  if (hasNav) { nav.classList.remove('hidden'); updateNavActive(screen); }
  else { nav.classList.add('hidden'); }
}

function updateNavActive(screen) {
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.screen === screen);
  });
}

function goBack() {
  if (AppState.prevScreen) navigate(AppState.prevScreen);
  else navigate('home');
}

// ─── RENDER DISPATCHER ───────────────────────────────────────
function renderScreen(screen) {
  switch(screen) {
    case 'home':        renderHome(); break;
    case 'plans':       renderPlans(); break;
    case 'calendar':    renderCalendar(); break;
    case 'crew':        renderCrew(); break;
    case 'profile':     renderProfile(); break;
    case 'plan-detail': renderPlanDetail(); break;
    case 'create-plan': renderCreatePlan(); break;
  }
}

// ─── COMPONENT BUILDERS ──────────────────────────────────────
function avatarHTML(user, size = 'sm') {
  if (!user) return '';
  return `<div class="avatar avatar-${size}" style="background:${user.avatarColor}" title="${user.name}">${user.initial}</div>`;
}

function avatarStackHTML(users, maxShow = 4, size = 'sm') {
  const shown = users.slice(0, maxShow);
  const extra = users.length - maxShow;
  let html = `<div class="avatar-stack avatar-stack-${size}">`;
  shown.forEach(u => { html += avatarHTML(u, size); });
  if (extra > 0) html += `<div class="avatar avatar-${size} avatar-count" style="background:var(--surface-secondary);color:var(--text-secondary)">+${extra}</div>`;
  html += '</div>';
  return html;
}

function categoryBadgeHTML(catId, includeLabel = true) {
  const cat = CATEGORIES[catId] || CATEGORIES.other;
  return `<span class="chip" style="background:${cat.bg};color:${cat.color}">${cat.emoji}${includeLabel ? ' ' + cat.label : ''}</span>`;
}

function planCardHTML(plan) {
  const cat = getCategoryInfo(plan);
  const going = getGoingUsers(plan);
  const dateLabel = formatDateShort(plan.date);
  const myStatus = getParticipantStatus(plan, 'user-current');
  let statusChip = '';
  if (myStatus === 'going') statusChip = '<span class="chip chip-success">Going ✓</span>';
  else if (myStatus === 'maybe') statusChip = '<span class="chip chip-muted">Maybe</span>';
  else if (myStatus === 'cant_go') statusChip = '<span class="chip chip-error">Can\'t go</span>';

  return `<div class="plan-list-card" data-action="open-plan" data-plan-id="${plan.id}">
    <div class="plan-list-card-header">
      <span class="plan-list-cat" style="background:${cat.bg};color:${cat.color}">${cat.emoji} ${cat.label}</span>
      <span class="plan-list-time">${plan.startTime}</span>
    </div>
    <div class="plan-list-title">${plan.title}</div>
    <div class="plan-list-location">${ICONS.location} ${plan.locationName || 'TBD'}</div>
    <div class="plan-list-footer">
      ${avatarStackHTML(going, 4, 'xs')}
      <div style="display:flex;align-items:center;gap:8px">
        ${statusChip}
        <span class="text-body-sm text-muted">${going.length} going</span>
      </div>
    </div>
  </div>`;
}

function miniPlanCardHTML(plan) {
  const cat = getCategoryInfo(plan);
  return `<div class="plan-mini-card" data-action="open-plan" data-plan-id="${plan.id}">
    <div class="plan-mini-emoji">${cat.emoji}</div>
    <div class="plan-mini-date">${formatDateShort(plan.date)} · ${plan.startTime}</div>
    <div class="plan-mini-title">${plan.title}</div>
    <div class="plan-mini-loc">${plan.locationName || 'TBD'}</div>
  </div>`;
}

function featuredCardHTML(plan) {
  const cat = getCategoryInfo(plan);
  const going = getGoingUsers(plan);
  const dateStr = formatDate(plan.date);
  return `<div class="plan-card-featured" data-action="open-plan" data-plan-id="${plan.id}">
    <div class="featured-tag">⚡ NEXT UP</div>
    <div class="featured-date">${dateStr} · ${plan.startTime}</div>
    <div class="featured-title">${plan.title}</div>
    <div class="featured-location">${ICONS.location} ${plan.locationName || 'TBD'}</div>
    <div class="featured-footer">
      <div class="featured-people">
        ${avatarStackHTML(going, 3, 'xs')}
        <span class="featured-people-label">${going.length} going</span>
      </div>
      <div class="chip" style="background:rgba(255,255,255,0.20);color:#fff">${cat.emoji} ${cat.label}</div>
    </div>
  </div>`;
}

function activityItemHTML(activity) {
  const info = activityText(activity);
  if (!info) return '';
  const actor = getUser(activity.actorId);
  return `<div class="activity-item">
    ${avatarHTML(actor, 'xs')}
    <div class="activity-text"><strong>${info.strong}</strong>${info.rest}</div>
    <span class="activity-time">${timeAgo(activity.createdAt)}</span>
  </div>`;
}

function emptyStateHTML(emoji, title, sub, actionLabel = null, actionId = null) {
  return `<div class="empty-state">
    <div class="empty-emoji">${emoji}</div>
    <div class="empty-title">${title}</div>
    <div class="empty-sub">${sub}</div>
    ${actionLabel ? `<div class="empty-action"><button class="btn-primary" id="${actionId || 'empty-action'}">${actionLabel}</button></div>` : ''}
  </div>`;
}

// ─── HOME SCREEN ─────────────────────────────────────────────
function renderHome() {
  const screen = document.getElementById('screen-home');
  const body = screen.querySelector('.screen-body');
  const upcoming = getUpcomingPlans();
  const user = getCurrentUser();
  const greeting = getGreeting();
  const firstName = (user && user.displayName ? user.displayName.split(' ')[0] : (user ? user.firstName : 'there'));
  const members = GROUP.memberIds.map(id => getUser(id)).filter(Boolean);

  let html = '';

  // Greeting area
  html += `<div class="home-greeting-area">
    <div class="home-greeting-top">
      <div>
        <div class="home-greeting">${greeting}, <span>${firstName}</span> ✨</div>
      </div>
      <div class="avatar-ring" data-action="nav" data-screen="profile">
        <div class="avatar-ring-inner" style="background:${user.avatarColor}">${user.initial}</div>
      </div>
    </div>
    <div class="home-crew-chip">
      <div class="home-crew-avatars">
        ${members.slice(0,4).map(u => `<div class="mini-av" style="background:${u.avatarColor}">${u.initial}</div>`).join('')}
      </div>
      <span class="home-crew-label">Weekend Crew ✨ · ${upcoming.length} plans coming up</span>
    </div>
  </div>`;

  // Featured next up
  if (upcoming.length > 0) {
    html += featuredCardHTML(upcoming[0]);
  } else {
    html += `<div style="margin:var(--sp-4) var(--screen-padding) 0">${emptyStateHTML('🗓️','No plans yet','Be the first to make a move!','Make a Plan ✨','home-make-plan-empty')}</div>`;
  }

  // Your week
  if (upcoming.length > 1) {
    html += `<div class="section-header"><span class="section-title">Your Week</span><span class="section-action" data-action="nav" data-screen="calendar">See calendar</span></div>`;
    html += `<div class="plan-row-scroll">${upcoming.slice(1, 6).map(miniPlanCardHTML).join('')}</div>`;
  }

  // Crew activity
  const recentActivities = AppState.activities.slice(0, 5);
  html += `<div class="section-header"><span class="section-title">Crew Activity</span></div>`;
  if (recentActivities.length > 0) {
    html += `<div class="activity-feed">${recentActivities.map(activityItemHTML).filter(Boolean).join('')}</div>`;
  } else {
    html += `<div class="activity-feed"><div class="empty-state" style="min-height:120px"><div class="empty-sub">No activity yet</div></div></div>`;
  }

  // Make a plan button
  html += `<button class="make-plan-btn" data-action="nav" data-screen="create-plan">${ICONS.plus} Make a Plan ✨</button>`;

  body.innerHTML = html;
}

// ─── PLANS SCREEN ────────────────────────────────────────────
function renderPlans() {
  const screen = document.getElementById('screen-plans');
  const body = screen.querySelector('.screen-body');
  const upcoming = getUpcomingPlans();
  const grouped = groupPlansByPeriod(upcoming);

  let html = '';

  if (upcoming.length === 0) {
    html = emptyStateHTML('👀','Your weekend is suspiciously free','Someone has to make the first move.','Make a Plan ✨', 'plans-make-plan-empty');
  } else {
    if (grouped.today.length > 0) {
      html += `<div class="plans-group-label">🌅 Today</div>`;
      html += grouped.today.map(planCardHTML).join('');
    }
    if (grouped.thisWeek.length > 0) {
      html += `<div class="plans-group-label">📅 This Week</div>`;
      html += grouped.thisWeek.map(planCardHTML).join('');
    }
    if (grouped.nextWeek.length > 0) {
      html += `<div class="plans-group-label">🗓️ Next Week</div>`;
      html += grouped.nextWeek.map(planCardHTML).join('');
    }
    if (grouped.later.length > 0) {
      html += `<div class="plans-group-label">🔮 Later</div>`;
      html += grouped.later.map(planCardHTML).join('');
    }
    html += `<div style="height:var(--sp-4)"></div>`;
  }

  body.innerHTML = html;
}

// ─── CALENDAR SCREEN ─────────────────────────────────────────
function renderCalendar() {
  const screen = document.getElementById('screen-calendar');
  const body = screen.querySelector('.screen-body');
  body.innerHTML = AppState.calendarView === 'month'
    ? renderMonthView()
    : renderWeekView();
  // Re-attach scroll for day plans section in month view
  const dayPlans = body.querySelector('.cal-day-plans');
  if (dayPlans) {
    dayPlans.style.overflowY = 'auto';
    dayPlans.style.webkitOverflowScrolling = 'touch';
    dayPlans.style.paddingBottom = 'calc(var(--nav-total) + var(--sp-4))';
  }
}

function renderMonthView() {
  const m = AppState.calendarMonth;
  const year = m.getFullYear();
  const month = m.getMonth();
  const monthName = m.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  const plansInMonth = getPlansForMonth(year, month);
  const planDateSet = {};
  plansInMonth.forEach(p => {
    if (!planDateSet[p.date]) planDateSet[p.date] = [];
    planDateSet[p.date].push(getCategoryInfo(p).color);
  });

  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const adjusted = (firstDay + 6) % 7; // Mon=0
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayStr = TODAY.toISOString().split('T')[0];
  const selected = AppState.selectedDate;

  let grid = '';
  // Empty cells before month start
  for (let i = 0; i < adjusted; i++) {
    const prevDay = new Date(year, month, -adjusted + i + 1);
    const ds = prevDay.toISOString().split('T')[0];
    grid += `<div class="cal-cell other-month" data-date="${ds}"><span class="cal-day-num">${prevDay.getDate()}</span></div>`;
  }
  // Days of month
  for (let d = 1; d <= daysInMonth; d++) {
    const ds = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const classes = ['cal-cell'];
    if (ds === todayStr) classes.push('today');
    if (ds === selected) classes.push('selected');
    const dots = planDateSet[ds] || [];
    const dotsHTML = dots.length > 0 ? `<div class="cal-dots">${dots.slice(0,3).map(c=>`<div class="cal-dot" style="background:${c}"></div>`).join('')}</div>` : '';
    grid += `<div class="${classes.join(' ')}" data-date="${ds}" data-action="select-date"><span class="cal-day-num">${d}</span>${dotsHTML}</div>`;
  }
  // Fill remainder
  const totalCells = Math.ceil((adjusted + daysInMonth) / 7) * 7;
  let nextDay = 1;
  for (let i = adjusted + daysInMonth; i < totalCells; i++) {
    const nd = new Date(year, month + 1, nextDay++);
    const ds = nd.toISOString().split('T')[0];
    grid += `<div class="cal-cell other-month" data-date="${ds}"><span class="cal-day-num">${nd.getDate()}</span></div>`;
  }

  // Day plans
  const dayPlans = getPlansForDate(selected);
  const selectedLabel = selected === todayStr ? `Today, ${new Date(selected+'T00:00:00').getDate()} ${new Date(selected+'T00:00:00').toLocaleDateString('en-GB',{month:'long'})}` : formatDateFull(selected);

  let dayContent = '';
  if (dayPlans.length === 0) {
    dayContent = `<div class="empty-state" style="min-height:180px">
      <div style="font-size:36px">🌤️</div>
      <div class="empty-title" style="font-size:17px">Nothing planned</div>
      <div class="empty-sub" style="font-size:13px">Perfect excuse to make a plan</div>
    </div>`;
  } else {
    dayContent = dayPlans.map(plan => {
      const cat = getCategoryInfo(plan);
      const going = getGoingUsers(plan);
      return `<div class="plan-card" data-action="open-plan" data-plan-id="${plan.id}">
        <div class="plan-card-icon" style="background:${cat.bg}">${cat.emoji}</div>
        <div class="plan-card-info">
          <div class="plan-card-time">${plan.startTime} – ${plan.endTime}</div>
          <div class="plan-card-title">${plan.title}</div>
          <div class="plan-card-location">${plan.locationName}</div>
        </div>
        <div class="plan-card-right">
          ${avatarStackHTML(going, 3, 'xs')}
        </div>
      </div>`;
    }).join('');
  }

  return `
    <div class="cal-header">
      <div class="cal-month-nav">
        <div class="cal-month-title">${monthName}</div>
        <div style="display:flex;gap:4px">
          <button class="cal-nav-btn" data-action="cal-prev">${ICONS.chevronLeft}</button>
          <button class="cal-nav-btn" data-action="cal-next">${ICONS.chevronRight20}</button>
        </div>
      </div>
      <div class="seg-control">
        <div class="seg-btn ${AppState.calendarView==='month'?'active':''}" data-action="cal-view" data-view="month">Month</div>
        <div class="seg-btn ${AppState.calendarView==='week'?'active':''}" data-action="cal-view" data-view="week">Week</div>
      </div>
    </div>
    <div class="cal-days-header">
      ${['M','T','W','T','F','S','S'].map(d=>`<div class="cal-day-name">${d}</div>`).join('')}
    </div>
    <div class="cal-grid">${grid}</div>
    <div style="height:1px;background:var(--border-default);margin:var(--sp-3) var(--screen-padding)"></div>
    <div class="cal-day-plans">
      <div class="cal-day-label">${selectedLabel.split(',')[0]}<span>${selectedLabel.includes(',') ? ', '+selectedLabel.split(',')[1] : ''}</span></div>
      ${dayContent}
    </div>
  `;
}

function renderWeekView() {
  const selected = AppState.selectedDate;
  const selDate = new Date(selected + 'T00:00:00');
  // Get week start (Monday)
  const dayOfWeek = (selDate.getDay() + 6) % 7;
  const weekStart = new Date(selDate);
  weekStart.setDate(selDate.getDate() - dayOfWeek);

  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    days.push(d);
  }

  const todayStr = TODAY.toISOString().split('T')[0];
  const dayNames = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const monthName = selDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

  const dayChips = days.map((d, i) => {
    const ds = d.toISOString().split('T')[0];
    const classes = ['week-day-chip'];
    if (ds === todayStr) classes.push('today');
    if (ds === selected) classes.push('selected');
    const hasPlans = AppState.plans.some(p => p.date === ds);
    return `<div class="${classes.join(' ')}" data-date="${ds}" data-action="select-date">
      <span class="week-day-name">${dayNames[i]}</span>
      <span class="week-day-num">${d.getDate()}</span>
      ${hasPlans ? '<div class="week-dot"></div>' : '<div style="width:4px;height:4px"></div>'}
    </div>`;
  }).join('');

  const dayPlans = getPlansForDate(selected);
  let timeline = '';
  if (dayPlans.length === 0) {
    timeline = `<div class="empty-state" style="min-height:200px"><div style="font-size:36px">🌤️</div><div class="empty-title" style="font-size:17px">Nothing planned</div><div class="empty-sub" style="font-size:13px">Perfect excuse to make a plan</div></div>`;
  } else {
    timeline = `<div class="day-timeline">` + dayPlans.map((plan, idx) => {
      const cat = getCategoryInfo(plan);
      const going = getGoingUsers(plan);
      const isLast = idx === dayPlans.length - 1;
      return `<div class="timeline-item" data-action="open-plan" data-plan-id="${plan.id}">
        <div class="timeline-time-col">
          <div class="timeline-time">${plan.startTime}</div>
        </div>
        <div class="timeline-dot-wrap">
          <div class="timeline-dot"></div>
          ${!isLast ? '<div class="timeline-line"></div>' : ''}
        </div>
        <div class="timeline-card">
          <div class="timeline-cat-badge" style="background:${cat.bg};color:${cat.color}">${cat.emoji} ${cat.label}</div>
          <div class="timeline-title">${plan.title}</div>
          <div class="timeline-loc">${ICONS.location} ${plan.locationName || 'TBD'}</div>
          ${avatarStackHTML(going, 4, 'xs')}
        </div>
      </div>`;
    }).join('') + '</div>';
  }

  return `
    <div class="cal-header">
      <div class="cal-month-nav">
        <div class="cal-month-title">${monthName}</div>
        <div style="display:flex;gap:4px">
          <button class="cal-nav-btn" data-action="cal-prev">${ICONS.chevronLeft}</button>
          <button class="cal-nav-btn" data-action="cal-next">${ICONS.chevronRight20}</button>
        </div>
      </div>
      <div class="seg-control">
        <div class="seg-btn ${AppState.calendarView==='month'?'active':''}" data-action="cal-view" data-view="month">Month</div>
        <div class="seg-btn ${AppState.calendarView==='week'?'active':''}" data-action="cal-view" data-view="week">Week</div>
      </div>
    </div>
    <div class="week-days-scroll">${dayChips}</div>
    <div style="height:1px;background:var(--border-default);margin:0 var(--screen-padding) var(--sp-3)"></div>
    <div class="screen-body" style="position:relative;overflow-y:auto;padding-bottom:calc(var(--nav-total) + var(--sp-4))">
      ${timeline}
    </div>
  `;
}

// ─── PLAN DETAIL ─────────────────────────────────────────────
function renderPlanDetail() {
  const screen = document.getElementById('screen-plan-detail');
  const plan = getPlan(AppState.currentPlanId);
  if (!plan) { navigate('home'); return; }

  const cat = getCategoryInfo(plan);
  const going = getGoingUsers(plan);
  const maybeUsers = plan.participants.filter(p => p.status === 'maybe').map(p => getUser(p.userId)).filter(Boolean);
  const currentUser = getCurrentUser();
  const myStatus = getParticipantStatus(plan, currentUser.id);
  const creator = getUser(plan.creatorId);
  const isCreator = plan.creatorId === currentUser.id;

  // Cover color
  const bgColors = {
    food: 'linear-gradient(135deg, #FF6B52, #FF8C7A)',
    coffee: 'linear-gradient(135deg, #E08A40, #F4A261)',
    cinema: 'linear-gradient(135deg, #8B47D9, #9B5DE5)',
    culture: 'linear-gradient(135deg, #1AADD4, #4CC9F0)',
    party: 'linear-gradient(135deg, #E8487B, #FF6B9D)',
    outdoors: 'linear-gradient(135deg, #39A66E, #52B788)',
    trip: 'linear-gradient(135deg, #D81B7C, #F72585)',
    games: 'linear-gradient(135deg, #6B28A8, #8B47D9)',
    shopping: 'linear-gradient(135deg, #D45B38, #E76F51)',
    activity: 'linear-gradient(135deg, #159A8E, #2EC4B6)',
    other: 'linear-gradient(135deg, #5B4E7A, #7C5CFC)',
  };
  const coverBg = bgColors[plan.category] || bgColors.other;

  const goingBtn = myStatus === 'going'
    ? `<button class="btn-rsvp-primary going" id="rsvp-going">You're Going ✓</button>`
    : `<button class="btn-rsvp-primary" id="rsvp-going">I'm In ✨</button>`;

  const dateDisplay = formatDateFull(plan.date);

  const durationMs = (() => {
    const [sh,sm] = plan.startTime.split(':').map(Number);
    const [eh,em] = plan.endTime.split(':').map(Number);
    const mins = (eh*60+em) - (sh*60+sm);
    if (mins <= 0) return '';
    if (mins < 60) return `${mins}m`;
    const h = Math.floor(mins/60); const m = mins%60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  })();

  screen.innerHTML = `
    <div class="plan-detail-cover">
      <div class="plan-detail-cover-bg" style="background:${coverBg}"></div>
      <div class="plan-detail-cover-gradient"></div>
      <button class="plan-detail-back" id="detail-back" data-action="back">${ICONS.back}</button>
      ${isCreator ? `<button class="edit-pill" id="edit-plan-btn">Edit</button>` : ''}
      <div class="plan-detail-cover-content">
        <div class="plan-detail-cat-badge">${cat.emoji} ${cat.label}</div>
        <div class="plan-detail-title">${plan.title}</div>
        <div class="plan-detail-date">${dateDisplay} · ${plan.startTime}</div>
      </div>
    </div>
    <div class="plan-detail-body" id="plan-detail-body">

      <!-- RSVP -->
      <div class="rsvp-area">
        <div style="position:relative">
          ${goingBtn}
        </div>
        <div class="btn-rsvp-secondary-row">
          <button class="btn-rsvp-secondary ${myStatus==='maybe'?'active':''}" id="rsvp-maybe">🤔 Maybe</button>
          <button class="btn-rsvp-secondary ${myStatus==='cant_go'?'active':''}" id="rsvp-cant">😞 Can't Go</button>
        </div>
      </div>

      <!-- Participants -->
      <div class="detail-section">
        <div class="detail-label">Who's Coming</div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--sp-3)">
          ${avatarStackHTML(going, 5, 'sm')}
          <span class="chip chip-success">${going.length} going</span>
        </div>
        ${going.map(u => `<div style="display:flex;align-items:center;gap:12px;padding:8px 0;border-bottom:1px solid var(--border-default)">
          ${avatarHTML(u,'sm')}
          <div>
            <div style="font-size:14px;font-weight:600;color:var(--text-primary)">${u.name}${u.id==='user-current'?' (You)':''}</div>
          </div>
          <div style="margin-left:auto"><span class="chip chip-success" style="font-size:11px">Going ✓</span></div>
        </div>`).join('')}
        ${maybeUsers.length > 0 ? `<div style="margin-top:var(--sp-3)"><div style="font-size:12px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:var(--sp-2)">Maybe</div>${maybeUsers.map(u=>`<div style="display:flex;align-items:center;gap:12px;padding:6px 0">${avatarHTML(u,'sm')}<div style="font-size:14px;font-weight:500;color:var(--text-secondary)">${u.name}</div></div>`).join('')}</div>` : ''}
      </div>

      <!-- When -->
      <div class="detail-section">
        <div class="detail-label">When</div>
        <div class="detail-row">
          <div class="detail-row-icon">${ICONS.clock}</div>
          <div>
            <div class="detail-info-main">${plan.startTime} – ${plan.endTime}</div>
            <div class="detail-info-sub">${dateDisplay}${durationMs ? ' · ' + durationMs : ''}</div>
          </div>
        </div>
      </div>

      <!-- Where -->
      <div class="detail-section">
        <div class="detail-label">Where</div>
        <div class="detail-row">
          <div class="detail-row-icon">${ICONS.mapPin}</div>
          <div>
            <div class="detail-info-main">${plan.locationName || 'TBD'}</div>
            <div class="detail-info-sub">${plan.address || ''}</div>
          </div>
        </div>
        ${plan.locationName ? `
        <div class="map-preview" id="map-preview">
          <div class="map-placeholder" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center">
            <div style="text-align:center">
              <div style="font-size:28px">🗺️</div>
              <div style="font-size:12px;font-weight:600;color:var(--text-secondary);margin-top:4px">${plan.locationName}</div>
            </div>
          </div>
          <div class="map-pin-center"></div>
        </div>
        <div class="open-maps-btn" id="open-maps">${ICONS.mapPin} Open in Maps</div>` : ''}
      </div>

      <!-- Notes -->
      ${plan.description ? `<div class="detail-section">
        <div class="detail-label">Notes</div>
        <div style="font-size:15px;line-height:1.6;color:var(--text-secondary)">${plan.description}</div>
      </div>` : ''}

      <!-- Creator -->
      <div class="detail-section">
        <div class="detail-label">Organised by</div>
        <div class="creator-row">
          ${avatarHTML(creator, 'sm')}
          <div class="creator-info">
            <div class="creator-name">${creator ? creator.name : 'Unknown'}${creator && creator.id === 'user-current' ? ' (You)' : ''}</div>
            <div class="creator-label">Plan creator</div>
          </div>
          ${isCreator ? `<button class="btn-ghost danger-ghost" id="delete-plan-btn" style="color:var(--status-error);font-size:13px">Delete plan</button>` : ''}
        </div>
      </div>

      <div style="height:var(--sp-10)"></div>
    </div>
  `;
}

// ─── CREATE PLAN ─────────────────────────────────────────────
function renderCreatePlan() {
  const screen = document.getElementById('screen-create-plan');
  const step = AppState.createStep;
  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const header = `
    <div class="create-header">
      <button class="header-btn" data-action="create-back">${ICONS.back}</button>
      <div class="create-progress"><div class="create-progress-fill" style="width:${progress}%"></div></div>
      <span class="create-step-label">Step ${step}/${totalSteps}</span>
    </div>`;

  let body = '';
  let footer = '';

  if (step === 1) {
    body = `<div class="create-body">
      <div class="create-step-title">What's the plan?</div>
      <div class="create-step-sub">Pick a vibe for your hangout</div>
      <div class="cat-grid">
        ${Object.values(CATEGORIES).map(cat => {
          const selected = AppState.createData.category === cat.id;
          return `<div class="cat-tile ${selected?'selected':''}" style="background:${cat.bg}" data-action="select-cat" data-cat="${cat.id}">
            <div class="cat-emoji">${cat.emoji}</div>
            <div class="cat-label" style="color:${cat.color}">${cat.label}</div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
    const canNext = !!AppState.createData.category;
    footer = `<div class="create-footer"><button class="create-next-btn ${canNext?'':'opacity-50'}" id="create-next" ${canNext?'':'disabled'}>What's Next →</button></div>`;
  }

  else if (step === 2) {
    const todayVal = TODAY.toISOString().split('T')[0];
    const date = AppState.createData.date || todayVal;
    const start = AppState.createData.startTime || '19:00';
    const end = AppState.createData.endTime || '21:00';
    body = `<div class="create-body">
      <div class="create-step-title">When? 📅</div>
      <div class="create-step-sub">Pick the date and time</div>
      <div class="date-time-field">
        <div class="date-time-label">Date</div>
        <input type="date" class="date-time-input" id="cp-date" value="${date}" min="${todayVal}">
      </div>
      <div style="display:flex;gap:var(--sp-3)">
        <div class="date-time-field" style="flex:1">
          <div class="date-time-label">Start</div>
          <input type="time" class="date-time-input" id="cp-start" value="${start}">
        </div>
        <div class="date-time-field" style="flex:1">
          <div class="date-time-label">End</div>
          <input type="time" class="date-time-input" id="cp-end" value="${end}">
        </div>
      </div>
    </div>`;
    footer = `<div class="create-footer"><button class="create-next-btn" id="create-next">Next →</button></div>`;
  }

  else if (step === 3) {
    const locName = AppState.createData.locationName || '';
    const addr = AppState.createData.address || '';
    body = `<div class="create-body">
      <div class="create-step-title">Where? 📍</div>
      <div class="create-step-sub">Let the crew know where to be</div>
      <div class="create-input-field">
        <div class="create-input-label">Place Name</div>
        <input class="create-input" id="cp-loc-name" placeholder="e.g. Menma Ramen" value="${locName}">
      </div>
      <div class="create-input-field">
        <div class="create-input-label">Address (optional)</div>
        <input class="create-input" id="cp-loc-addr" placeholder="e.g. 42 Noodle Street, Soho" value="${addr}">
      </div>
    </div>`;
    footer = `<div class="create-footer"><button class="create-next-btn" id="create-next">Next →</button></div>`;
  }

  else if (step === 4) {
    const invited = AppState.createData.invitedUserIds || [];
    const friends = getFriends();
    body = `<div class="create-body">
      <div class="create-step-title">Who's coming? 👥</div>
      <div class="create-step-sub">Invite your crew</div>
      <div class="friend-list">
        ${friends.map(f => {
          const checked = invited.includes(f.id);
          return `<div class="friend-row ${checked?'selected':''}" data-action="toggle-friend" data-user-id="${f.id}">
            ${avatarHTML(f,'sm')}
            <div>
              <div class="friend-name">${f.name}</div>
              <div class="friend-username">@${f.username}</div>
            </div>
            <div class="friend-check ${checked?'checked':''}">${checked ? ICONS.check : ''}</div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
    footer = `<div class="create-footer"><button class="create-next-btn" id="create-next">Next →</button></div>`;
  }

  else if (step === 5) {
    const cat = CATEGORIES[AppState.createData.category] || CATEGORIES.other;
    const title = AppState.createData.title || '';
    const notes = AppState.createData.description || '';
    body = `<div class="create-body">
      <div class="create-step-title">Final details ✨</div>
      <div class="create-step-sub">Give it a name and any extra info</div>
      <div class="create-input-field" style="border-color:var(--brand-primary)">
        <div class="create-input-label">Plan Name</div>
        <input class="create-input" id="cp-title" placeholder="${cat.emoji} ${cat.label} with the crew" value="${title}" maxlength="60">
      </div>
      <div class="create-input-field">
        <div class="create-input-label">Notes (optional)</div>
        <textarea class="create-textarea" id="cp-notes" placeholder="Any details your crew needs to know...">${notes}</textarea>
      </div>
      <div class="create-input-field">
        <div class="create-input-label">Link (optional)</div>
        <input class="create-input" id="cp-url" type="url" placeholder="https://..." value="${AppState.createData.externalUrl||''}">
      </div>
    </div>`;
    footer = `<div class="create-footer"><button class="create-next-btn" id="create-next" style="background:var(--status-success);box-shadow:0 8px 24px rgba(6,214,160,0.35)">Create Plan ✨</button></div>`;
  }

  screen.innerHTML = header + body + footer;
}

// ─── CREW SCREEN ─────────────────────────────────────────────
function renderCrew() {
  const screen = document.getElementById('screen-crew');
  const body = screen.querySelector('.screen-body');
  const members = GROUP.memberIds.map(id => getUser(id)).filter(Boolean);
  const upcoming = getUpcomingPlans();

  let html = `
    <div class="crew-cover">
      <div class="crew-cover-content">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div>
            <div class="crew-name">Weekend Crew ✨</div>
            <div class="crew-meta">${members.length} members · Together since forever</div>
          </div>
        </div>
        <div class="crew-cover-avatars">
          ${members.slice(0,5).map(u=>avatarHTML(u,'sm')).join('')}
        </div>
      </div>
    </div>

    <div class="crew-stats">
      <div class="crew-stat">
        <div class="crew-stat-num">${upcoming.length}</div>
        <div class="crew-stat-label">Upcoming</div>
      </div>
      <div class="crew-stat">
        <div class="crew-stat-num">${members.length}</div>
        <div class="crew-stat-label">Members</div>
      </div>
      <div class="crew-stat">
        <div class="crew-stat-num">${AppState.plans.length}</div>
        <div class="crew-stat-label">All time</div>
      </div>
    </div>

    <div class="section-header"><span class="section-title">Members</span></div>
    <div>
      ${members.map((u, i) => {
        const isYou = u.id === 'user-current';
        const isMia = u.id === 'user-mia'; // pretend Mia is admin
        return `<div class="member-row">
          ${avatarHTML(u,'md')}
          <div class="member-info">
            <div class="member-name">${u.name}${isYou?' (You)':''}</div>
            <div class="member-username">@${u.username}</div>
          </div>
          ${isMia ? '<span class="member-badge">Admin</span>' : ''}
        </div>`;
      }).join('')}
    </div>

    <div class="section-header"><span class="section-title">Crew Activity</span></div>
    <div class="activity-feed">
      ${AppState.activities.slice(0,8).map(activityItemHTML).filter(Boolean).join('')}
    </div>

    <button class="invite-btn">${ICONS.plus} Invite a Friend</button>
    <div style="height:var(--sp-4)"></div>`;

  body.innerHTML = html;
}

// ─── PROFILE SCREEN ──────────────────────────────────────────
function renderProfile() {
  const screen = document.getElementById('screen-profile');
  const body = screen.querySelector('.screen-body');
  const user = getCurrentUser();
  const myPlans = AppState.plans.filter(p => p.participants.some(pt => pt.userId === 'user-current' && pt.status === 'going'));
  const created = AppState.plans.filter(p => p.creatorId === 'user-current');

  body.innerHTML = `
    <div class="profile-hero">
      <div class="avatar avatar-2xl" style="background:${user.avatarColor};font-size:36px">${user.initial}</div>
      <div class="profile-name">${user.displayName || user.name}</div>
      <div class="profile-username">@${user.username}</div>
      <div class="profile-stats">
        <div class="profile-stat"><div class="profile-stat-num">${myPlans.length}</div><div class="profile-stat-label">Going</div></div>
        <div class="profile-stat"><div class="profile-stat-num">${created.length}</div><div class="profile-stat-label">Created</div></div>
        <div class="profile-stat"><div class="profile-stat-num">1</div><div class="profile-stat-label">Crews</div></div>
      </div>
    </div>

    <div class="settings-group">
      <div class="settings-row" id="toggle-dark">
        <div class="settings-icon" style="background:var(--surface-tertiary)">🌙</div>
        <div class="settings-label">Dark Mode</div>
        <div class="toggle ${AppState.isDark?'on':''}" id="dark-toggle"><div class="toggle-thumb"></div></div>
      </div>
      <div class="settings-row" data-action="notif-settings">
        <div class="settings-icon" style="background:var(--brand-accent-subtle)">🔔</div>
        <div class="settings-label">Notifications</div>
        <span class="settings-chevron">${ICONS.chevronRight}</span>
      </div>
      <div class="settings-row" data-action="privacy-settings">
        <div class="settings-icon" style="background:var(--status-success-subtle)">🔒</div>
        <div class="settings-label">Privacy</div>
        <span class="settings-chevron">${ICONS.chevronRight}</span>
      </div>
    </div>

    <div class="settings-group">
      <div class="settings-row" data-action="share-app">
        <div class="settings-icon" style="background:var(--brand-primary-subtle)">📲</div>
        <div class="settings-label">Share HANG</div>
        <span class="settings-chevron">${ICONS.chevronRight}</span>
      </div>
      <div class="settings-row" data-action="feedback">
        <div class="settings-icon" style="background:var(--brand-secondary-subtle)">💬</div>
        <div class="settings-label">Send Feedback</div>
        <span class="settings-chevron">${ICONS.chevronRight}</span>
      </div>
    </div>

    <div class="settings-group">
      <div class="settings-row" id="logout-btn" data-action="logout">
        <div class="settings-icon" style="background:var(--status-error-subtle)">🚪</div>
        <div class="settings-label" style="color:var(--status-error)">Log Out</div>
      </div>
    </div>

    <div style="text-align:center;padding:var(--sp-6);color:var(--text-muted);font-size:12px">
      HANG v1.0 · Made with ✨
    </div>
    <div style="height:var(--sp-4)"></div>`;
}

// ─── AUTH SCREEN ─────────────────────────────────────────────
function renderAuth() {
  const screen = document.getElementById('screen-auth');
  const isLogin = screen.dataset.mode !== 'signup';
  const body = screen.querySelector('.auth-body');
  body.innerHTML = `
    <div class="auth-header">
      <div class="auth-logo">hang.</div>
      <div class="auth-subtitle">Plans are better together ✨</div>
    </div>
    <div class="auth-tabs" style="margin:0 var(--screen-padding) var(--sp-5);padding:3px;display:flex;gap:3px;background:var(--surface-secondary);border-radius:var(--radius-full)">
      <div class="auth-tab ${isLogin?'active':''}" data-auth-tab="login">Log In</div>
      <div class="auth-tab ${!isLogin?'active':''}" data-auth-tab="signup">Sign Up</div>
    </div>
    <div class="auth-form">
      ${!isLogin ? `<div class="auth-field">
        <label class="auth-label">Your Name</label>
        <input class="auth-input" id="auth-name" type="text" placeholder="e.g. Jordan" autocomplete="name">
      </div>` : ''}
      <div class="auth-field">
        <label class="auth-label">Email</label>
        <input class="auth-input" id="auth-email" type="email" placeholder="you@example.com" autocomplete="email">
      </div>
      <div class="auth-field">
        <label class="auth-label">Password</label>
        <input class="auth-input" id="auth-pass" type="password" placeholder="••••••••" autocomplete="${isLogin?'current':'new'}-password">
      </div>
      <button class="auth-submit" id="auth-submit">${isLogin ? 'Log In' : 'Create Account'} →</button>
      <div class="auth-divider">or continue with</div>
      <button class="auth-social-btn" id="auth-google">
        <svg width="20" height="20" viewBox="0 0 20 20"><path d="M19.6 10.23c0-.68-.06-1.36-.18-2H10v3.79h5.4a4.61 4.61 0 0 1-2 3.02v2.5h3.24c1.89-1.74 2.96-4.3 2.96-7.31z" fill="#4285F4"/><path d="M10 20c2.7 0 4.96-.9 6.61-2.44l-3.22-2.5a6.02 6.02 0 0 1-3.39.94c-2.6 0-4.8-1.76-5.59-4.12H1.1v2.58A10 10 0 0 0 10 20z" fill="#34A853"/><path d="M4.41 11.88a6.02 6.02 0 0 1 0-3.76V5.54H1.1a10 10 0 0 0 0 8.92l3.31-2.58z" fill="#FBBC05"/><path d="M10 3.96a5.46 5.46 0 0 1 3.84 1.5l2.87-2.87A9.67 9.67 0 0 0 10 0 10 10 0 0 0 1.1 5.54l3.31 2.58C5.2 5.72 7.4 3.96 10 3.96z" fill="#EA4335"/></svg>
        Continue with Google
      </button>
      <button class="auth-social-btn" id="auth-apple">
        <svg width="20" height="20" viewBox="0 0 20 20"><path d="M16.7 10.45c0-2.1 1.72-3.1 1.8-3.16-1-1.45-2.52-1.65-3.07-1.67-1.3-.13-2.56.77-3.22.77-.67 0-1.68-.75-2.77-.73C7.8 5.69 6.23 6.7 5.36 8.2 3.6 11.23 4.88 15.8 6.6 18.29c.86 1.23 1.88 2.6 3.22 2.55 1.3-.05 1.79-.83 3.35-.83 1.57 0 2.01.83 3.38.8 1.4-.02 2.27-1.23 3.1-2.47.99-1.41 1.4-2.78 1.42-2.85-.03-.01-2.74-1.06-2.77-4.04z" fill="currentColor"/><path d="M14.43 3.81c.72-.87 1.2-2.08 1.07-3.28-1.04.04-2.3.69-3.04 1.56-.67.77-1.25 2-1.09 3.18 1.15.09 2.33-.59 3.06-1.46z" fill="currentColor"/></svg>
        Continue with Apple
      </button>
    </div>`;
}

// ─── TOAST ───────────────────────────────────────────────────
function showToast(msg, type = '', duration = 3000) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast${type ? ' '+type : ''}`;
  const icons = { success: '✅', error: '❌', '': 'ℹ️' };
  toast.innerHTML = `<span class="toast-icon">${icons[type]||'ℹ️'}</span>${msg}`;
  toast.style.pointerEvents = 'all';
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('leaving');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ─── SUCCESS ANIMATION ────────────────────────────────────────
function showSuccessOverlay(emoji = '✨', title = 'Plan Created!', sub = 'Your crew has been notified') {
  const overlay = document.getElementById('success-overlay');
  overlay.querySelector('.success-icon').textContent = emoji;
  overlay.querySelector('.success-text').textContent = title;
  overlay.querySelector('.success-sub').textContent = sub;
  overlay.classList.add('visible');

  // Sparks
  const sparks = overlay.querySelector('.sparks');
  sparks.innerHTML = '';
  for (let i = 0; i < 16; i++) {
    const spark = document.createElement('div');
    spark.className = 'spark';
    const angle = (i / 16) * Math.PI * 2;
    const dist = 80 + Math.random() * 80;
    spark.style.cssText = `left:50%;top:45%;--tx:${Math.cos(angle)*dist}px;--ty:${Math.sin(angle)*dist}px;background:rgba(255,255,255,${0.5+Math.random()*0.5});animation-delay:${Math.random()*0.2}s`;
    sparks.appendChild(spark);
  }

  setTimeout(() => {
    overlay.classList.remove('visible');
  }, 2000);
}

// ─── RSVP ANIMATION ──────────────────────────────────────────
function animateRSVP(btn) {
  const spark = document.createElement('div');
  spark.className = 'rsvp-spark';
  spark.innerHTML = '<div class="rsvp-ring"></div>';
  btn.appendChild(spark);
  setTimeout(() => spark.remove(), 500);

  if ('vibrate' in navigator) navigator.vibrate([10, 30, 10]);
}

// ─── HAPTIC ──────────────────────────────────────────────────
function haptic(pattern = [10]) {
  if ('vibrate' in navigator) navigator.vibrate(pattern);
}

// ─── BOTTOM SHEET ────────────────────────────────────────────
function openSheet(html) {
  const overlay = document.getElementById('sheet-overlay');
  const sheet = document.getElementById('bottom-sheet');
  sheet.innerHTML = `<div class="sheet-handle"></div>${html}`;
  overlay.classList.add('visible');
  sheet.classList.add('open');
}

function closeSheet() {
  document.getElementById('sheet-overlay').classList.remove('visible');
  document.getElementById('bottom-sheet').classList.remove('open');
}

// ─── THEME ───────────────────────────────────────────────────
function applyTheme() {
  document.documentElement.setAttribute('data-theme', AppState.isDark ? 'dark' : '');
}

function toggleDark() {
  AppState.isDark = !AppState.isDark;
  applyTheme();
  const tog = document.getElementById('dark-toggle');
  if (tog) tog.className = `toggle${AppState.isDark?' on':''}`;
  saveState();
}

// ─── OFFLINE ─────────────────────────────────────────────────
function updateOnlineState() {
  AppState.isOnline = navigator.onLine;
  const banner = document.getElementById('offline-banner');
  if (banner) banner.classList.toggle('visible', !AppState.isOnline);
}

// ─── EVENT DELEGATION ────────────────────────────────────────
document.addEventListener('click', function(e) {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  const action = el.dataset.action;
  haptic([5]);

  switch(action) {
    case 'nav':
      navigate(el.dataset.screen);
      break;

    case 'back':
      goBack();
      break;

    case 'open-plan':
      AppState.currentPlanId = el.dataset.planId;
      navigate('plan-detail');
      break;

    case 'select-date': {
      const date = el.dataset.date || el.closest('[data-date]')?.dataset.date;
      if (date) {
        AppState.selectedDate = date;
        renderCalendar();
      }
      break;
    }

    case 'cal-view':
      AppState.calendarView = el.dataset.view;
      renderCalendar();
      break;

    case 'cal-prev':
    case 'cal-next': {
      const dir = action === 'cal-prev' ? -1 : 1;
      if (AppState.calendarView === 'month') {
        AppState.calendarMonth.setMonth(AppState.calendarMonth.getMonth() + dir);
      } else {
        const sel = new Date(AppState.selectedDate + 'T00:00:00');
        sel.setDate(sel.getDate() + dir * 7);
        AppState.selectedDate = sel.toISOString().split('T')[0];
      }
      renderCalendar();
      break;
    }

    case 'select-cat': {
      const cat = el.dataset.cat;
      AppState.createData.category = cat;
      renderCreatePlan();
      break;
    }

    case 'toggle-friend': {
      const uid = el.dataset.userId;
      if (!AppState.createData.invitedUserIds) AppState.createData.invitedUserIds = [];
      const arr = AppState.createData.invitedUserIds;
      const idx = arr.indexOf(uid);
      if (idx >= 0) arr.splice(idx, 1); else arr.push(uid);
      renderCreatePlan();
      break;
    }

    case 'create-back':
      if (AppState.createStep > 1) {
        AppState.createStep--;
        renderCreatePlan();
      } else {
        AppState.createStep = 1;
        AppState.createData = {};
        navigate(AppState.prevScreen || 'home');
      }
      break;
  }
});

// Specific button events (not data-action)
document.addEventListener('click', function(e) {
  // Create Next/Submit
  if (e.target.id === 'create-next') {
    handleCreateNext();
    return;
  }
  // RSVP buttons
  if (e.target.id === 'rsvp-going') {
    handleRSVP('going', e.target);
    return;
  }
  if (e.target.id === 'rsvp-maybe') {
    handleRSVP('maybe', e.target);
    return;
  }
  if (e.target.id === 'rsvp-cant') {
    handleRSVP('cant_go', e.target);
    return;
  }
  // Dark mode toggle
  if (e.target.id === 'toggle-dark' || e.target.closest('#toggle-dark')) {
    toggleDark();
    return;
  }
  // Auth submit
  if (e.target.id === 'auth-submit' || e.target.id === 'auth-google' || e.target.id === 'auth-apple') {
    handleAuth();
    return;
  }
  // Auth tabs
  if (e.target.dataset.authTab) {
    const screen = document.getElementById('screen-auth');
    screen.dataset.mode = e.target.dataset.authTab;
    renderAuth();
    return;
  }
  // Logout
  if (e.target.id === 'logout-btn' || e.target.closest('#logout-btn')) {
    logout();
    navigate('auth');
    return;
  }
  // Sheet overlay
  if (e.target.id === 'sheet-overlay') {
    closeSheet();
    return;
  }
  // Delete plan
  if (e.target.id === 'delete-plan-btn') {
    openSheet(`
      <div style="padding:0 var(--sp-5) var(--sp-5)">
        <div class="sheet-title">Delete this plan?</div>
        <div style="color:var(--text-secondary);margin-bottom:var(--sp-5)">This can't be undone and all your crew will be notified.</div>
        <button class="danger-btn" id="confirm-delete">🗑️ Delete Plan</button>
        <div style="height:var(--sp-3)"></div>
        <button class="btn-secondary full" id="cancel-delete" style="width:100%">Keep it</button>
      </div>`);
    return;
  }
  if (e.target.id === 'confirm-delete') {
    deletePlan(AppState.currentPlanId);
    closeSheet();
    showToast('Plan deleted','');
    navigate('home');
    return;
  }
  if (e.target.id === 'cancel-delete') {
    closeSheet();
    return;
  }
  // Open Maps
  if (e.target.id === 'open-maps' || e.target.closest('#open-maps')) {
    const plan = getPlan(AppState.currentPlanId);
    if (plan) {
      const q = encodeURIComponent(plan.address || plan.locationName);
      window.open(`https://maps.google.com/maps?q=${q}`, '_blank');
    }
    return;
  }
  // Edit plan button
  if (e.target.id === 'edit-plan-btn') {
    const plan = getPlan(AppState.currentPlanId);
    if (plan) {
      AppState.createStep = 1;
      AppState.createData = { ...plan };
      navigate('create-plan');
    }
    return;
  }
  // Home make plan empty state
  if (e.target.id === 'home-make-plan-empty' || e.target.id === 'plans-make-plan-empty') {
    AppState.createStep = 1;
    AppState.createData = {};
    navigate('create-plan');
    return;
  }
  // Invite friend
  const inviteBtn = e.target.closest('.invite-btn');
  if (inviteBtn) {
    openSheet(`<div style="padding:0 var(--sp-5) var(--sp-5)">
      <div class="sheet-title">Invite a Friend</div>
      <div style="color:var(--text-secondary);margin-bottom:var(--sp-4)">Share your invite link with a friend to add them to Weekend Crew.</div>
      <div style="background:var(--surface-secondary);border-radius:var(--radius-xl);padding:var(--sp-4);font-size:14px;color:var(--text-muted);font-family:monospace;word-break:break-all;margin-bottom:var(--sp-4)">hang.app/join/weekend-crew-abc123</div>
      <button class="btn-primary full" id="copy-invite">📋 Copy Invite Link</button>
    </div>`);
    return;
  }
  if (e.target.id === 'copy-invite') {
    navigator.clipboard?.writeText('https://hang.app/join/weekend-crew-abc123').catch(()=>{});
    showToast('Link copied! ✨','success');
    closeSheet();
    return;
  }
  // Make plan FAB
  const fab = e.target.closest('.fab');
  if (fab) {
    AppState.createStep = 1;
    AppState.createData = {};
    navigate('create-plan');
    return;
  }
});

function handleRSVP(status, btn) {
  const planId = AppState.currentPlanId;
  const userId = 'user-current';
  const prevStatus = getParticipantStatus(getPlan(planId), userId);

  // Toggle off if same
  const newStatus = prevStatus === status ? null : status;
  if (newStatus) rsvpPlan(planId, userId, newStatus);
  else rsvpPlan(planId, userId, 'pending');

  animateRSVP(btn);

  const messages = {
    going: "You're in! ✨",
    maybe: "Marked as maybe 🤔",
    cant_go: "Sorry you can't make it 😞"
  };
  if (newStatus) showToast(messages[newStatus] || '', 'success');

  renderPlanDetail();
  // Also refresh other screens in background
}

function handleCreateNext() {
  const step = AppState.createStep;

  if (step === 1) {
    if (!AppState.createData.category) { showToast('Pick a category first!', 'error'); return; }
  }
  if (step === 2) {
    const dateEl = document.getElementById('cp-date');
    const startEl = document.getElementById('cp-start');
    const endEl = document.getElementById('cp-end');
    if (!dateEl.value) { showToast('Pick a date!','error'); return; }
    AppState.createData.date = dateEl.value;
    AppState.createData.startTime = startEl.value || '18:00';
    AppState.createData.endTime = endEl.value || '20:00';
  }
  if (step === 3) {
    const locEl = document.getElementById('cp-loc-name');
    AppState.createData.locationName = locEl.value.trim();
    AppState.createData.address = (document.getElementById('cp-loc-addr')?.value || '').trim();
  }
  if (step === 4) {
    // Friends already stored in AppState.createData.invitedUserIds
  }
  if (step === 5) {
    const titleEl = document.getElementById('cp-title');
    const notesEl = document.getElementById('cp-notes');
    const urlEl = document.getElementById('cp-url');
    const cat = CATEGORIES[AppState.createData.category] || CATEGORIES.other;
    AppState.createData.title = (titleEl.value.trim()) || `${cat.emoji} ${cat.label} with the crew`;
    AppState.createData.description = notesEl?.value.trim() || '';
    AppState.createData.externalUrl = urlEl?.value.trim() || '';

    // Create the plan
    const newPlan = createPlan(AppState.createData);
    AppState.createStep = 1;
    AppState.createData = {};

    showSuccessOverlay('✨', 'Plan Created!', 'Your crew has been notified');
    setTimeout(() => {
      AppState.currentPlanId = newPlan.id;
      navigate('plan-detail');
    }, 2100);
    return;
  }

  AppState.createStep++;
  renderCreatePlan();
}

function handleAuth() {
  const screen = document.getElementById('screen-auth');
  const isSignup = screen.dataset.mode === 'signup';
  const nameEl = document.getElementById('auth-name');
  const emailEl = document.getElementById('auth-email');

  const name = isSignup && nameEl ? nameEl.value.trim() : 'Jordan';
  const email = emailEl ? emailEl.value.trim() : 'jordan@hang.app';

  login(name || 'Jordan', email || 'jordan@hang.app');
  navigate('home');
  setTimeout(() => showToast(`Welcome back! ✨`,'success'), 400);
}

// ─── ONBOARDING ──────────────────────────────────────────────
function initOnboarding() {
  const screen = document.getElementById('screen-onboarding');

  const slides = [
    { icon: '🎉', color: '#7C5CFC', title: 'Plans are better together.', sub: 'Make memories with your people — not just appointments on a calendar.' },
    { icon: '👥', color: '#FF6B9D', title: 'See what your crew is up to.', sub: "Stay in the loop. Know what's happening before you even have to ask." },
    { icon: '📍', color: '#06D6A0', title: 'Pick a place. Pick a time. Let's go.', sub: 'Create a plan in seconds. Your crew gets notified instantly.' },
    { icon: '✨', color: '#FFD166', title: 'Meet your crew.', sub: 'Start with Weekend Crew and add your people.' },
  ];

  function updateSlide() {
    const idx = AppState.onboardingSlide;
    const track = screen.querySelector('.onboarding-track');
    if (track) track.style.transform = `translateX(-${idx * 100}%)`;
    const dots = screen.querySelectorAll('.onboarding-dot');
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    const btn = screen.querySelector('.onboarding-btn');
    if (btn) btn.innerHTML = idx < slides.length - 1 ? 'Next →' : "Let's Go ✨";
    const skip = screen.querySelector('.onboarding-skip');
    if (skip) skip.style.visibility = idx < slides.length - 1 ? 'visible' : 'hidden';
  }

  const slidesHTML = slides.map(s => `
    <div class="onboarding-slide">
      <div class="onboarding-icon" style="background:${s.color}20">
        <span style="position:relative;z-index:1;font-size:52px">${s.icon}</span>
      </div>
      <div class="onboarding-h">${s.title}</div>
      <div class="onboarding-p">${s.sub}</div>
    </div>`).join('');

  screen.innerHTML = `
    <div class="onboarding-slides">
      <div class="onboarding-track">${slidesHTML}</div>
    </div>
    <div class="onboarding-footer">
      <div class="onboarding-dots">
        ${slides.map((_,i)=>`<div class="onboarding-dot ${i===0?'active':''}"></div>`).join('')}
      </div>
      <button class="onboarding-btn" id="onboarding-btn">Next →</button>
      <button class="onboarding-skip" id="onboarding-skip">Skip</button>
    </div>`;

  screen.querySelector('#onboarding-btn').addEventListener('click', () => {
    if (AppState.onboardingSlide < slides.length - 1) {
      AppState.onboardingSlide++;
      updateSlide();
    } else {
      navigate('auth');
    }
  });

  screen.querySelector('#onboarding-skip').addEventListener('click', () => {
    navigate('auth');
  });

  // Swipe support
  let startX = 0;
  screen.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  screen.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) {
      if (dx < 0 && AppState.onboardingSlide < slides.length - 1) AppState.onboardingSlide++;
      else if (dx > 0 && AppState.onboardingSlide > 0) AppState.onboardingSlide--;
      updateSlide();
    }
  }, { passive: true });
}

// ─── BOTTOM NAV ───────────────────────────────────────────────
function initNav() {
  const nav = document.getElementById('bottom-nav');
  const items = [
    { screen: 'home',     icon: ICONS.home,     label: 'Home'     },
    { screen: 'plans',    icon: ICONS.plans,    label: 'Plans'    },
    { screen: 'calendar', icon: ICONS.calendar, label: 'Calendar' },
    { screen: 'crew',     icon: ICONS.crew,     label: 'Crew'     },
    { screen: 'profile',  icon: ICONS.profile,  label: 'Profile'  },
  ];

  nav.innerHTML = items.map(item => `
    <div class="nav-item" data-screen="${item.screen}" data-action="nav">
      <div class="nav-icon-wrap">${item.icon}</div>
      <span class="nav-label">${item.label}</span>
    </div>`).join('');
}

// ─── SPLASH ──────────────────────────────────────────────────
function runSplash() {
  const screen = document.getElementById('screen-splash');
  screen.innerHTML = `
    <svg class="splash-symbol" viewBox="0 0 80 80" fill="none">
      <path d="M16 58C16 58 24 28 40 28C56 28 64 58 64 58" stroke="white" stroke-width="5" stroke-linecap="round"/>
      <path d="M26 58C26 58 31 40 40 40C49 40 54 58 54 58" stroke="rgba(255,255,255,0.7)" stroke-width="5" stroke-linecap="round"/>
      <circle cx="40" cy="20" r="6" fill="rgba(255,209,102,1)"/>
    </svg>
    <div class="splash-wordmark">hang.</div>
    <div class="splash-tagline">plans are better together</div>`;

  setTimeout(() => {
    if (AppState.isLoggedIn) {
      navigate('home');
    } else {
      navigate('onboarding');
      initOnboarding();
    }
  }, 1400);
}

// ─── AUTH SCREEN INIT ─────────────────────────────────────────
function initAuthScreen() {
  const screen = document.getElementById('screen-auth');
  screen.dataset.mode = 'signup';
  // Only add body if not already present
  if (!screen.querySelector('.auth-body')) {
    const body = document.createElement('div');
    body.className = 'auth-body screen-body no-nav';
    screen.appendChild(body);
  }
  renderAuth();
}

// ─── INIT ─────────────────────────────────────────────────────
function init() {
  loadState();
  applyTheme();
  initNav();
  initAuthScreen();

  // Network events
  window.addEventListener('online',  updateOnlineState);
  window.addEventListener('offline', updateOnlineState);
  updateOnlineState();

  // Run splash
  runSplash();
}

// Start
document.addEventListener('DOMContentLoaded', init);
