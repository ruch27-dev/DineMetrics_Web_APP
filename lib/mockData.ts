export const branches = ['All Branches', 'Mulund', 'Dombivli', 'Kalyan West', 'Kalyan East', 'Badlapur'];
export const kpiData = { total: 42, avg: 4.3, response: 82, negative: 5, escalations: 3 };

export const branchHealthData = [
  { name: 'Mulund', score: 4.5, status: 'Trending Up ↑', statusColor: 'text-green-700 bg-green-100', food: 4.6, service: 4.4, ambience: 4.7, clean: 4.5, today: 12, responded: 10, pending: 2, pos: 9, neu: 2, neg: 1 },
  { name: 'Dombivli', score: 3.9, status: 'Needs Attention ⚠', statusColor: 'text-orange-700 bg-orange-100', food: 4.1, service: 3.5, ambience: 4.2, clean: 4.0, today: 15, responded: 8, pending: 7, pos: 7, neu: 3, neg: 5, alert: true },
  { name: 'Kalyan West', score: 4.2, status: 'Stable →', statusColor: 'text-primary bg-primary/20', food: 4.3, service: 4.1, ambience: 4.0, clean: 4.4, today: 6, responded: 6, pending: 0, pos: 4, neu: 2, neg: 0 },
  { name: 'Kalyan East', score: 4.4, status: 'Trending Up ↑', statusColor: 'text-green-700 bg-green-100', food: 4.5, service: 4.3, ambience: 4.2, clean: 4.6, today: 5, responded: 4, pending: 1, pos: 4, neu: 1, neg: 0 },
  { name: 'Badlapur', score: 4.0, status: 'Stable →', statusColor: 'text-primary bg-primary/20', food: 4.1, service: 3.9, ambience: 4.0, clean: 4.1, today: 4, responded: 4, pending: 0, pos: 3, neu: 1, neg: 0 }
];

export const reviewsData = [
  { id: 1, source: 'Google', branch: 'Mulund', rating: 5, name: 'Rohan Shah', time: '2 hours ago', text: 'The food was absolutely incredible. Service was quick and the ambience is perfect for dates. Will definitely be back!', tags: ['Food', 'Service', 'Ambience'], sentiment: 'Positive' },
  { id: 2, source: 'Internal', branch: 'Dombivli', rating: 2, name: 'Anonymous', time: '3 hours ago', text: 'Waited 40 minutes for our order. Staff was rude when we asked for an update. Very disappointing experience.', tags: ['Service', 'Staff Behavior'], sentiment: 'Negative', staff: 'Rahul K.', escalated: true },
  { id: 3, source: 'Zomato', branch: 'Dombivli', rating: 3, name: 'Meera Joshi', time: '5 hours ago', text: 'Food quality has gone down compared to last visit. Pasta was overcooked.', tags: ['Food'], sentiment: 'Neutral' },
  { id: 4, source: 'Internal', branch: 'Kalyan West', rating: 5, name: 'Arjun Nair', time: '1 day ago', text: 'Loved the new menu! Staff was super helpful especially Sneha.', tags: ['Food', 'Staff'], sentiment: 'Positive', staff: 'Sneha P.' },
  { id: 5, source: 'Google', branch: 'Mulund', rating: 4, name: 'Divya Rao', time: '1 day ago', text: 'Great place, minor delay in getting the bill but overall a wonderful evening.', tags: ['Service'], sentiment: 'Positive' },
  { id: 6, source: 'Zomato', branch: 'Badlapur', rating: 4, name: 'Vikram Singh', time: '2 days ago', text: 'Good food, nice ambience. Parking is a bit of an issue.', tags: ['Food', 'Ambience'], sentiment: 'Positive' },
  { id: 7, source: 'Google', branch: 'Kalyan East', rating: 5, name: 'Pooja Desai', time: '2 days ago', text: 'Best dining experience in the area. Highly recommended!', tags: ['Overall'], sentiment: 'Positive' }
];

export const sentimentData = [
  { name: 'Feb 2', pos: 40, neu: 20, neg: 10 }, { name: 'Feb 9', pos: 45, neu: 18, neg: 12 },
  { name: 'Feb 16', pos: 55, neu: 15, neg: 8 }, { name: 'Feb 23', pos: 60, neu: 12, neg: 5 },
  { name: 'Feb 28', pos: 65, neu: 10, neg: 4 }
];

export const csatData = [
  { date: 'Feb 1', score: 4.1 }, { date: 'Feb 5', score: 4.2 }, { date: 'Feb 10', score: 4.0 },
  { date: 'Feb 15', score: 4.3 }, { date: 'Feb 20', score: 4.4 }, { date: 'Feb 25', score: 4.2 },
  { date: 'Feb 28', score: 4.5 }
];

export const escalationsInit = [
  { id: 1, text: 'Waited 40 mins, staff was rude...', branch: 'Dombivli', assigned: 'Karan M.', sla: '1h 20m remaining', slaColor: 'text-red-600', status: 'Open', priority: 'High', created: '2h ago', customer: 'Anonymous', rating: 2, source: 'Internal' },
  { id: 2, text: 'Found a hair in the food...', branch: 'Mulund', assigned: 'Priya M.', sla: '5h 45m remaining', slaColor: 'text-yellow-600', status: 'In Progress', priority: 'High', created: '3h ago', customer: 'Rohan S.', rating: 1, source: 'Google' },
  { id: 3, text: 'Overcharged on the bill...', branch: 'Kalyan West', assigned: 'Amit D.', sla: '2h 10m remaining', slaColor: 'text-orange-600', status: 'Open', priority: 'Medium', created: '4h ago', customer: 'Meera J.', rating: 2, source: 'Zomato' }
];

export const staffData = {
  'This Month': [
    { rank: 1, initial: 'S', name: 'Sneha P.', branch: 'Kalyan West', role: 'Server', rating: 4.8, reviews: 18, pos: 90, neg: 2, trend: '↑' },
    { rank: 2, initial: 'A', name: 'Amit D.', branch: 'Mulund', role: 'Manager', rating: 4.6, reviews: 24, pos: 85, neg: 5, trend: '↑' },
    { rank: 3, initial: 'R', name: 'Rahul K.', branch: 'Dombivli', role: 'Server', rating: 3.2, reviews: 19, pos: 40, neg: 35, trend: '↓', alert: true },
    { rank: 4, initial: 'P', name: 'Priya T.', branch: 'Mulund', role: 'Host', rating: 4.4, reviews: 15, pos: 80, neg: 5, trend: '→' },
    { rank: 5, initial: 'V', name: 'Vikas S.', branch: 'Kalyan East', role: 'Server', rating: 4.3, reviews: 11, pos: 75, neg: 10, trend: '↑' }
  ],
  'Last Month': [
    { rank: 1, initial: 'A', name: 'Amit D.', branch: 'Mulund', role: 'Manager', rating: 4.7, reviews: 20, pos: 88, neg: 4, trend: '↑' },
    { rank: 2, initial: 'S', name: 'Sneha P.', branch: 'Kalyan West', role: 'Server', rating: 4.5, reviews: 15, pos: 82, neg: 6, trend: '↑' },
    { rank: 3, initial: 'P', name: 'Priya T.', branch: 'Mulund', role: 'Host', rating: 4.4, reviews: 18, pos: 80, neg: 5, trend: '→' },
    { rank: 4, initial: 'V', name: 'Vikas S.', branch: 'Kalyan East', role: 'Server', rating: 4.1, reviews: 10, pos: 70, neg: 15, trend: '↑' },
    { rank: 5, initial: 'R', name: 'Rahul K.', branch: 'Dombivli', role: 'Server', rating: 3.8, reviews: 22, pos: 60, neg: 20, trend: '↓' }
  ]
};

export const pieData = [{ name: 'Google', value: 45, color: '#fb7232' }, { name: 'Internal QR', value: 35, color: '#fdba74' }, { name: 'Zomato', value: 20, color: '#EF4444' }];
export const barData = [{ name: 'Food', count: 38 }, { name: 'Service', count: 29 }, { name: 'Ambience', count: 18 }, { name: 'Cleanliness', count: 12 }, { name: 'Staff', count: 22 }];

export const avgRatingByBranch = [
  { name: 'Mulund', rating: 4.5 },
  { name: 'Dombivli', rating: 3.9 },
  { name: 'Kalyan W', rating: 4.2 },
  { name: 'Kalyan E', rating: 4.4 },
  { name: 'Badlapur', rating: 4.0 }
];
