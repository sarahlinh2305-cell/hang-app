// ============================================================
// HANG — DATA LAYER
// Models, mock data, state persistence
// ============================================================

'use strict';

// ─── DATE HELPERS ────────────────────────────────────────────
const TODAY = new Date();
TODAY.setHours(0, 0, 0, 0);

function dateOffset(days) {
  const d = new Date(TODAY);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
}

function formatDateFull(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
}

function formatDateShort(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  const today = new Date(); today.setHours(0,0,0,0);
  const diff = Math.round((d - today) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Tomorrow';
  if (diff === -1) return 'Yesterday';
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
}

function timeAgo(isoStr) {
  const diff = Date.now() - new Date(isoStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 2) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs/24)}d ago`;
}

function isToday(dateStr) {
  return dateStr === TODAY.toISOString().split('T')[0];
}

function isPast(dateStr) {
  return new Date(dateStr + 'T00:00:00') < TODAY;
}

// ─── CATEGORIES ──────────────────────────────────────────────
const CATEGORIES = {
  food:     { id: 'food',     label: 'Food',     emoji: '🍜', color: 'var(--cat-food)',     bg: 'var(--cat-food-bg)' },
  coffee:   { id: 'coffee',   label: 'Coffee',   emoji: '☕', color: 'var(--cat-coffee)',   bg: 'var(--cat-coffee-bg)' },
  cinema:   { id: 'cinema',   label: 'Cinema',   emoji: '🎬', color: 'var(--cat-cinema)',   bg: 'var(--cat-cinema-bg)' },
  culture:  { id: 'culture',  label: 'Culture',  emoji: '🎨', color: 'var(--cat-culture)',  bg: 'var(--cat-culture-bg)' },
  party:    { id: 'party',    label: 'Party',    emoji: '🎉', color: 'var(--cat-party)',    bg: 'var(--cat-party-bg)' },
  outdoors: { id: 'outdoors', label: 'Outdoors', emoji: '🌳', color: 'var(--cat-outdoors)', bg: 'var(--cat-outdoors-bg)' },
  trip:     { id: 'trip',     label: 'Trip',     emoji: '🏖️', color: 'var(--cat-trip)',     bg: 'var(--cat-trip-bg)' },
  games:    { id: 'games',    label: 'Games',    emoji: '🎮', color: 'var(--cat-games)',    bg: 'var(--cat-games-bg)' },
  shopping: { id: 'shopping', label: 'Shopping', emoji: '🛍️', color: 'var(--cat-shopping)', bg: 'var(--cat-shopping-bg)' },
  activity: { id: 'activity', label: 'Activity', emoji: '🏋️', color: 'var(--cat-activity)', bg: 'var(--cat-activity-bg)' },
  other:    { id: 'other',    label: 'Other',    emoji: '✨', color: 'var(--cat-other)',    bg: 'var(--cat-other-bg)' },
};

// ─── USERS ───────────────────────────────────────────────────
const USERS = [
  { id: 'user-current', name: 'Jordan Lee',   username: 'jordan',  firstName: 'Jordan', avatarColor: '#7C5CFC', initial: 'J', email: 'jordan@hang.app' },
  { id: 'user-mia',     name: 'Mia Chen',     username: 'mia',     firstName: 'Mia',    avatarColor: '#FF6B9D', initial: 'M', email: 'mia@hang.app' },
  { id: 'user-alex',    name: 'Alex Rivera',  username: 'alex',    firstName: 'Alex',   avatarColor: '#1AADD4', initial: 'A', email: 'alex@hang.app' },
  { id: 'user-sophie',  name: 'Sophie Park',  username: 'sophie',  firstName: 'Sophie', avatarColor: '#39A66E', initial: 'S', email: 'sophie@hang.app' },
  { id: 'user-noah',    name: 'Noah Kim',     username: 'noah',    firstName: 'Noah',   avatarColor: '#E08A40', initial: 'N', email: 'noah@hang.app' },
  { id: 'user-emma',    name: 'Emma Santos',  username: 'emma',    firstName: 'Emma',   avatarColor: '#8B47D9', initial: 'E', email: 'emma@hang.app' },
];

const GROUP = {
  id: 'group-1',
  name: 'Weekend Crew',
  emoji: '✨',
  memberIds: ['user-current', 'user-mia', 'user-alex', 'user-sophie', 'user-noah', 'user-emma'],
  createdAt: new Date().toISOString(),
};

// ─── MOCK PLANS ──────────────────────────────────────────────
function buildMockPlans() {
  return [
    {
      id: 'plan-10',
      groupId: 'group-1',
      creatorId: 'user-noah',
      title: 'Morning Coffee Run',
      category: 'coffee',
      date: dateOffset(0),
      startTime: '09:00', endTime: '10:00',
      locationName: 'Flat White Coffee',
      address: '17 Berwick Street, Soho W1F 0PT',
      description: 'Quick morning coffee before the week kicks off ☕',
      participants: [
        { userId: 'user-noah',    status: 'going' },
        { userId: 'user-current', status: 'going' },
        { userId: 'user-mia',     status: 'maybe' },
      ],
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: 'plan-1',
      groupId: 'group-1',
      creatorId: 'user-mia',
      title: 'Ramen Night',
      category: 'food',
      date: dateOffset(1),
      startTime: '19:30', endTime: '22:00',
      locationName: 'Menma Ramen',
      address: '42 Noodle Street, Soho W1D 3PQ',
      description: 'Best ramen in town, we HAVE to go! The tonkotsu broth is insane 🍜',
      participants: [
        { userId: 'user-mia',     status: 'going' },
        { userId: 'user-alex',    status: 'going' },
        { userId: 'user-sophie',  status: 'maybe' },
        { userId: 'user-current', status: 'going' },
      ],
      createdAt: new Date(Date.now() - 7200000).toISOString(),
    },
    {
      id: 'plan-2',
      groupId: 'group-1',
      creatorId: 'user-alex',
      title: 'Sunday Brunch',
      category: 'coffee',
      date: dateOffset(3),
      startTime: '10:30', endTime: '13:00',
      locationName: 'Little Fern Café',
      address: '8 Garden Lane, Notting Hill W11 2PN',
      description: 'Their avocado toast is genuinely life-changing. Booking for 6!',
      participants: [
        { userId: 'user-alex',    status: 'going' },
        { userId: 'user-mia',     status: 'going' },
        { userId: 'user-sophie',  status: 'going' },
        { userId: 'user-noah',    status: 'going' },
        { userId: 'user-current', status: 'maybe' },
      ],
      createdAt: new Date(Date.now() - 5400000).toISOString(),
    },
    {
      id: 'plan-3',
      groupId: 'group-1',
      creatorId: 'user-sophie',
      title: 'Cinema Night',
      category: 'cinema',
      date: dateOffset(4),
      startTime: '19:00', endTime: '22:00',
      locationName: 'Vue Leicester Square',
      address: '3 Cranbourn St, London WC2H 7AL',
      description: 'Dune Part 3 is finally out and we are GOING 🎬',
      participants: [
        { userId: 'user-sophie',  status: 'going' },
        { userId: 'user-noah',    status: 'going' },
        { userId: 'user-emma',    status: 'going' },
        { userId: 'user-current', status: 'cant_go' },
      ],
      createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    },
    {
      id: 'plan-4',
      groupId: 'group-1',
      creatorId: 'user-current',
      title: 'Museum Day',
      category: 'culture',
      date: dateOffset(8),
      startTime: '14:00', endTime: '18:00',
      locationName: 'Tate Modern',
      address: 'Bankside, London SE1 9TG',
      description: 'New exhibition looks incredible. Free entry! 🎨',
      participants: [
        { userId: 'user-current', status: 'going' },
        { userId: 'user-mia',     status: 'going' },
        { userId: 'user-emma',    status: 'maybe' },
      ],
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 'plan-5',
      groupId: 'group-1',
      creatorId: 'user-noah',
      title: 'Park Picnic',
      category: 'outdoors',
      date: dateOffset(10),
      startTime: '12:00', endTime: '16:00',
      locationName: "Regent's Park",
      address: 'Chester Rd, London NW1 4NR',
      description: "Bring something to share! BYO vibes 🌳",
      participants: [
        { userId: 'user-noah',    status: 'going' },
        { userId: 'user-alex',    status: 'going' },
        { userId: 'user-sophie',  status: 'going' },
        { userId: 'user-mia',     status: 'going' },
        { userId: 'user-emma',    status: 'going' },
        { userId: 'user-current', status: 'going' },
      ],
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: 'plan-6',
      groupId: 'group-1',
      creatorId: 'user-emma',
      title: 'Game Night',
      category: 'games',
      date: dateOffset(11),
      startTime: '20:00', endTime: '23:59',
      locationName: "Noah's Place",
      address: '12 Arcade Road, Hackney E8 2BQ',
      description: 'Jackbox, Catan, and chaos. BYOB 🎮',
      participants: [
        { userId: 'user-emma',    status: 'going' },
        { userId: 'user-noah',    status: 'going' },
        { userId: 'user-current', status: 'going' },
        { userId: 'user-alex',    status: 'maybe' },
      ],
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    },
    {
      id: 'plan-7',
      groupId: 'group-1',
      creatorId: 'user-mia',
      title: 'Shopping Day',
      category: 'shopping',
      date: dateOffset(15),
      startTime: '11:00', endTime: '17:00',
      locationName: 'Oxford Street',
      address: 'Oxford Street, London W1C 1JS',
      description: "Mia needs new boots. We're the support squad 🛍️",
      participants: [
        { userId: 'user-mia',     status: 'going' },
        { userId: 'user-sophie',  status: 'going' },
        { userId: 'user-current', status: 'maybe' },
      ],
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    },
    {
      id: 'plan-8',
      groupId: 'group-1',
      creatorId: 'user-alex',
      title: 'House Party',
      category: 'party',
      date: dateOffset(16),
      startTime: '21:00', endTime: '03:00',
      locationName: "Alex's Place",
      address: '5 Bloom Street, Shoreditch E1 6RF',
      description: 'Finally doing the housewarming! Come through 🎉',
      participants: [
        { userId: 'user-alex',    status: 'going' },
        { userId: 'user-mia',     status: 'going' },
        { userId: 'user-sophie',  status: 'going' },
        { userId: 'user-noah',    status: 'going' },
        { userId: 'user-emma',    status: 'going' },
        { userId: 'user-current', status: 'going' },
      ],
      createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    },
    {
      id: 'plan-9',
      groupId: 'group-1',
      creatorId: 'user-sophie',
      title: 'Brighton Day Trip',
      category: 'trip',
      date: dateOffset(20),
      startTime: '09:00', endTime: '20:00',
      locationName: 'Brighton Seafront',
      address: 'Brighton Beach, East Sussex BN2 1TB',
      description: 'Train from Victoria at 9:15! Fish & chips mandatory 🏖️',
      participants: [
        { userId: 'user-sophie',  status: 'going' },
        { userId: 'user-alex',    status: 'going' },
        { userId: 'user-current', status: 'going' },
        { userId: 'user-mia',     status: 'maybe' },
      ],
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    },
  ];
}

const MOCK_ACTIVITIES = [
  { id: 'act-1', actorId: 'user-mia',    type: 'created', planId: 'plan-1',  createdAt: new Date(Date.now() - 2 * 3600000).toISOString() },
  { id: 'act-2', actorId: 'user-alex',   type: 'joined',  planId: 'plan-2',  createdAt: new Date(Date.now() - 1.5 * 3600000).toISOString() },
  { id: 'act-3', actorId: 'user-sophie', type: 'created', planId: 'plan-3',  createdAt: new Date(Date.now() - 1 * 3600000).toISOString() },
  { id: 'act-4', actorId: 'user-noah',   type: 'joined',  planId: 'plan-5',  createdAt: new Date(Date.now() - 0.5 * 3600000).toISOString() },
  { id: 'act-5', actorId: 'user-emma',   type: 'joined',  planId: 'plan-6',  createdAt: new Date(Date.now() - 0.25 * 3600000).toISOString() },
];

// ─── APP STATE ────────────────────────────────────────────────
const AppState = {
  // Session
  isLoggedIn: false,
  currentUser: null,

  // Data
  users: [...USERS],
  group: { ...GROUP },
  plans: [],
  activities: [...MOCK_ACTIVITIES],

  // UI
  currentScreen: 'splash',
  prevScreen: null,
  selectedDate: TODAY.toISOString().split('T')[0],
  calendarView: 'month',
  calendarMonth: new Date(TODAY),
  currentPlanId: null,
  isDark: false,
  isOnline: true,

  // Create Plan flow
  createStep: 1,
  createData: {},

  // Onboarding
  onboardingSlide: 0,
};

// ─── PERSISTENCE ──────────────────────────────────────────────
function loadState() {
  try {
    const saved = localStorage.getItem('hang_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      AppState.isLoggedIn = parsed.isLoggedIn || false;
      AppState.currentUser = parsed.currentUser || null;
      AppState.plans = parsed.plans || buildMockPlans();
      AppState.activities = parsed.activities || [...MOCK_ACTIVITIES];
      AppState.isDark = parsed.isDark || false;
    } else {
      AppState.plans = buildMockPlans();
    }
  } catch(e) {
    AppState.plans = buildMockPlans();
  }
}

function saveState() {
  try {
    localStorage.setItem('hang_state', JSON.stringify({
      isLoggedIn: AppState.isLoggedIn,
      currentUser: AppState.currentUser,
      plans: AppState.plans,
      activities: AppState.activities,
      isDark: AppState.isDark,
    }));
  } catch(e) {}
}

// ─── DATA HELPERS ─────────────────────────────────────────────
function getUser(id) {
  return AppState.users.find(u => u.id === id) || null;
}

function getCurrentUser() {
  return AppState.currentUser || AppState.users.find(u => u.id === 'user-current');
}

function getPlan(id) {
  return AppState.plans.find(p => p.id === id) || null;
}

function getFriends() {
  return AppState.users.filter(u => u.id !== 'user-current');
}

function getUpcomingPlans() {
  const today = TODAY.toISOString().split('T')[0];
  return AppState.plans
    .filter(p => p.date >= today)
    .sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date);
      return a.startTime.localeCompare(b.startTime);
    });
}

function getPlansForDate(dateStr) {
  return AppState.plans
    .filter(p => p.date === dateStr)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
}

function getPlansForMonth(year, month) {
  return AppState.plans.filter(p => {
    const d = new Date(p.date + 'T00:00:00');
    return d.getFullYear() === year && d.getMonth() === month;
  });
}

function getParticipantStatus(plan, userId) {
  if (!plan || !plan.participants) return null;
  const p = plan.participants.find(p => p.userId === userId);
  return p ? p.status : null;
}

function getGoingCount(plan) {
  return plan.participants.filter(p => p.status === 'going').length;
}

function getGoingUsers(plan) {
  return plan.participants
    .filter(p => p.status === 'going')
    .map(p => getUser(p.userId))
    .filter(Boolean);
}

function getCategoryInfo(planOrId) {
  const id = typeof planOrId === 'string' ? planOrId : planOrId.category;
  return CATEGORIES[id] || CATEGORIES.other;
}

// ─── CRUD OPERATIONS ──────────────────────────────────────────
function rsvpPlan(planId, userId, status) {
  const plan = getPlan(planId);
  if (!plan) return;
  const idx = plan.participants.findIndex(p => p.userId === userId);
  if (idx >= 0) {
    plan.participants[idx].status = status;
    plan.participants[idx].respondedAt = new Date().toISOString();
  } else {
    plan.participants.push({ userId, status, respondedAt: new Date().toISOString() });
  }

  // Add activity
  const actType = status === 'going' ? 'joined' : (status === 'cant_go' ? 'declined' : 'maybe');
  AppState.activities.unshift({
    id: 'act-' + Date.now(),
    actorId: userId,
    type: actType,
    planId,
    createdAt: new Date().toISOString(),
  });

  saveState();
}

function createPlan(data) {
  const currentUser = getCurrentUser();
  const newPlan = {
    id: 'plan-' + Date.now(),
    groupId: 'group-1',
    creatorId: currentUser.id,
    title: data.title || 'New Plan',
    category: data.category || 'other',
    date: data.date || TODAY.toISOString().split('T')[0],
    startTime: data.startTime || '18:00',
    endTime: data.endTime || '20:00',
    locationName: data.locationName || '',
    address: data.address || '',
    description: data.description || '',
    externalUrl: data.externalUrl || '',
    participants: [
      { userId: currentUser.id, status: 'going', respondedAt: new Date().toISOString() },
      ...(data.invitedUserIds || []).map(uid => ({
        userId: uid, status: 'pending', respondedAt: null
      }))
    ],
    createdAt: new Date().toISOString(),
  };
  AppState.plans.push(newPlan);
  AppState.activities.unshift({
    id: 'act-' + Date.now(),
    actorId: currentUser.id,
    type: 'created',
    planId: newPlan.id,
    createdAt: new Date().toISOString(),
  });
  saveState();
  return newPlan;
}

function deletePlan(planId) {
  const idx = AppState.plans.findIndex(p => p.id === planId);
  if (idx >= 0) AppState.plans.splice(idx, 1);
  saveState();
}

function updatePlan(planId, updates) {
  const plan = getPlan(planId);
  if (!plan) return;
  Object.assign(plan, updates, { updatedAt: new Date().toISOString() });
  AppState.activities.unshift({
    id: 'act-' + Date.now(),
    actorId: getCurrentUser().id,
    type: 'updated',
    planId,
    createdAt: new Date().toISOString(),
  });
  saveState();
  return plan;
}

// ─── PLAN GROUPING ────────────────────────────────────────────
function groupPlansByPeriod(plans) {
  const todayStr  = TODAY.toISOString().split('T')[0];
  const weekEnd   = dateOffset(6);
  const nextWeekEnd = dateOffset(13);

  const groups = { today: [], thisWeek: [], nextWeek: [], later: [] };
  for (const p of plans) {
    if (p.date === todayStr) groups.today.push(p);
    else if (p.date > todayStr && p.date <= weekEnd) groups.thisWeek.push(p);
    else if (p.date > weekEnd && p.date <= nextWeekEnd) groups.nextWeek.push(p);
    else if (p.date > nextWeekEnd) groups.later.push(p);
  }
  return groups;
}

// ─── ACTIVITY TEXT ────────────────────────────────────────────
function activityText(activity) {
  const actor = getUser(activity.actorId);
  const plan  = getPlan(activity.planId);
  if (!actor || !plan) return null;
  const name = actor.id === 'user-current' ? 'You' : actor.firstName;
  switch (activity.type) {
    case 'created':  return { strong: name, rest: ` created ${plan.title}` };
    case 'joined':   return { strong: name, rest: ` joined ${plan.title}` };
    case 'maybe':    return { strong: name, rest: ` is maybe for ${plan.title}` };
    case 'declined': return { strong: name, rest: ` can't make ${plan.title}` };
    case 'updated':  return { strong: name, rest: ` updated ${plan.title}` };
    default:         return { strong: name, rest: ` did something with ${plan.title}` };
  }
}

// ─── AUTH ─────────────────────────────────────────────────────
function login(name, email) {
  const u = getCurrentUser();
  AppState.currentUser = { ...u, name, email, displayName: name };
  AppState.isLoggedIn = true;
  saveState();
}

function logout() {
  AppState.isLoggedIn = false;
  AppState.currentUser = null;
  saveState();
}

// ─── GREETING ─────────────────────────────────────────────────
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}
