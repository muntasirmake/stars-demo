// STARS Admin Console — sample data
window.DATA = {
  kpis: [
    { label: 'Loyalty members', value: '185,420', icon: 'users', delta: '+4.8%', dir: 'up', vs: 'vs last month' },
    { label: 'Monthly active', value: '64,800', icon: 'activity', delta: '+2.1%', dir: 'up', vs: '35% of base' },
    { label: 'Active campaigns', value: '12', icon: 'campaigns', vs: '3 always-on · 9 promotional' },
    { label: 'Pending approvals', value: '2', icon: 'warn', vs: 'Marketing + Risk review' },
  ],
  statusMap: {
    Live: 'green',
    Scheduled: 'blue',
    'Pending Approval': 'pending',
    Paused: 'amber',
    Draft: 'slate',
    Completed: 'violet',
  },
  campaigns: [
    { id: 'CMP_AO01', type: 'Always-on',   mark: 'P', name: 'Complete Profile Bonus',       status: 'Live',             trigger: 'Complete member profile',     audience: 'New members',        issued: '1,240,000', liability: '৳1.8L', ends: 'Always active', live: true },
    { id: 'CMP_AO02', type: 'Always-on',   mark: 'R', name: 'Refer-a-Friend',                 status: 'Live',             trigger: 'Invite 1 verified user',      audience: 'All members',        issued: '9,200,000', liability: '৳2.1L', ends: 'Always active', live: true },
    { id: 'CMP_AO03', type: 'Always-on',   mark: 'W', name: 'Welcome Bonus',                   status: 'Live',             trigger: 'First app login',             audience: 'New members',        issued: '3,600,000', liability: '৳1.4L', ends: 'Always active', live: true },
    { id: 'CMP_8841', type: 'Promotional', mark: 'B', name: 'Bill Pay Booster',               status: 'Live',             trigger: 'Pay 3 utility bills',         audience: 'All members',        issued: '3,120,000', liability: '৳4.2L', ends: 'Jun 30',        live: true },
    { id: 'CMP_8839', type: 'Promotional', mark: 'W', name: 'Weekend Card Spend Streak',      status: 'Scheduled',        trigger: 'Spend ৳5,000 Fri–Sun',        audience: 'Tier · Gold+',       issued: '—',         liability: '৳2.0L', ends: 'Starts Jun 14'          },
    { id: 'CMP_8835', type: 'Promotional', mark: 'R', name: 'Refer-a-Friend 2.0',              status: 'Pending Approval', trigger: 'Invite 1 verified user',      audience: 'All members',        issued: '240,000',   liability: '৳1.1L', ends: 'Jul 15'                 },
    { id: 'CMP_8833', type: 'Promotional', mark: 'S', name: 'Salary Account Activation',      status: 'Pending Approval', trigger: 'Receive salary deposit',      audience: 'Segment · Salaried', issued: '—',         liability: '৳3.5L', ends: 'Jul 01'                 },
    { id: 'CMP_8828', type: 'Promotional', mark: 'Q', name: 'QR Pay Cashback',                status: 'Paused',           trigger: 'Complete 5 QR payments',     audience: 'App users',          issued: '880,000',   liability: '৳1.6L', ends: 'Aug 01'                 },
    { id: 'CMP_8822', type: 'Promotional', mark: 'G', name: 'Gold Tier Upgrade Sprint',       status: 'Completed',        trigger: 'Earn 2,000 STARS this month', audience: 'Tier · Silver',      issued: '5,640,000', liability: '৳6.1L', ends: 'May 31'                 },
    { id: 'CMP_8818', type: 'Promotional', mark: 'E', name: 'Eid Season Bonus',               status: 'Draft',            trigger: 'Make any transaction',        audience: 'All members',        issued: '—',         liability: '—',     ends: '—'                      },
  ],
  feed: [
    { tone: 'accent',  icon: 'star',   html: '<b>Complete Profile Bonus</b> issued 500 STARS to new members this week', time: '30 min ago' },
    { tone: 'success', icon: 'users',  html: '<b>Refer-a-Friend</b> generated <b>148 qualified referrals</b> this week', time: '1 hr ago' },
    { tone: 'accent',  icon: 'arrow',  html: '<b>Bill Pay Booster</b> submitted for approval by <b>Kaiser J.</b>', time: '2 hrs ago' },
    { tone: 'warn',    icon: 'pause',  html: '<b>Salary Account Activation</b> paused after low redemption signal', time: '3 hrs ago' },
    { tone: 'slate',   icon: 'warn',   html: '<b>Partner Voucher API</b> pending configuration — inventory sync blocked', time: '4 hrs ago' },
  ],
  integrations: [
    { mark: 'N', tone: 'accent', name: 'MTB Neo Core',      cat: 'Banking ledger',  desc: 'Member identity, balances and transaction events feed campaign triggers.', status: 'Demo Mode simulated',           badge: 'slate',  action: 'Configure' },
    { mark: '★', tone: 'green',  name: 'STARS Ledger API',  cat: 'Rewards economy', desc: 'Issues and redeems STARS with double-entry liability accounting.',          status: 'API-ready',               badge: 'green',  action: 'Manage'    },
    { mark: 'P', tone: 'amber',  name: 'Payments Switch',   cat: 'QR & bill pay',   desc: 'Real-time payment events for cashback and booster campaigns.',              status: 'Production required',    badge: 'amber',  action: 'Request'   },
    { mark: 'K', tone: 'blue',   name: 'KYC / Identity',    cat: 'Compliance',      desc: 'Verifies member eligibility before high-value reward redemption.',          status: 'Pending bank access',    badge: 'blue',   action: 'Request'   },
    { mark: 'C', tone: 'green',  name: 'Comms / Push',      cat: 'Notifications',   desc: 'Delivers campaign nudges and mission reminders to the Neo app.',            status: 'API-ready',               badge: 'green',  action: 'Manage'    },
    { mark: 'D', tone: 'slate',  name: 'Data Warehouse',    cat: 'Analytics',       desc: 'Streams campaign performance into the analytics & liability models.',       status: 'Demo Mode simulated',           badge: 'slate',  action: 'Configure' },
  ],
};
