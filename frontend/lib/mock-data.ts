// Mock data for SnowDay Predictor

export const schoolBoards = [
  { id: "tdsb", name: "Toronto District School Board", city: "Toronto" },
  { id: "pdsb", name: "Peel District School Board", city: "Mississauga" },
  { id: "yrdsb", name: "York Region District School Board", city: "Newmarket" },
  { id: "ddsb", name: "Durham District School Board", city: "Whitby" },
  { id: "hdsb", name: "Halton District School Board", city: "Burlington" },
];

export const currentPrediction = {
  modelProbability: 72,
  crowdProbability: 68,
  decisionTime: new Date(Date.now() + 10 * 60 * 60 * 1000 + 42 * 60 * 1000), // 10h 42m from now
  lastUpdated: new Date(),
  confidence: "high" as const,
};

export const marketData = {
  yesPrice: 0.68,
  noPrice: 0.32,
  volume24h: 12450,
  userBalance: 5000,
  userPosition: {
    yes: 150,
    no: 0,
  },
};

export const timelineData = [
  { time: "72h ago", probability: 25, event: null },
  { time: "60h ago", probability: 28, event: null },
  { time: "48h ago", probability: 35, event: "Winter storm watch issued" },
  { time: "36h ago", probability: 42, event: null },
  { time: "24h ago", probability: 55, event: "Snowfall forecast upgraded" },
  { time: "18h ago", probability: 61, event: null },
  { time: "12h ago", probability: 65, event: "Transit alert announced" },
  { time: "6h ago", probability: 70, event: null },
  { time: "3h ago", probability: 71, event: null },
  { time: "Now", probability: 72, event: "Current prediction" },
];

export const chartData = timelineData.map((item, index) => ({
  hour: index * 8,
  probability: item.probability,
  event: item.event,
  label: item.time,
}));

export const factors = [
  { name: "Overnight snowfall", impact: 28, positive: true, description: "15-20cm expected" },
  { name: "Temperature", impact: 18, positive: true, description: "-12°C overnight low" },
  { name: "Wind gusts", impact: 15, positive: true, description: "45km/h gusts forecasted" },
  { name: "Road conditions", impact: 12, positive: true, description: "Hazardous driving expected" },
  { name: "Historical pattern", impact: 8, positive: true, description: "Board closed 4/5 similar events" },
  { name: "Weekend proximity", impact: -5, positive: false, description: "Friday - some resistance" },
];

export const leaderboard = [
  { rank: 1, username: "WeatherWizard", accuracy: 94.2, predictions: 156, badge: "Weather Prophet" },
  { rank: 2, username: "SnowSeer", accuracy: 91.8, predictions: 203, badge: "Snowday Sniper" },
  { rank: 3, username: "FrostForecast", accuracy: 89.5, predictions: 178, badge: "Winter Watcher" },
  { rank: 4, username: "BlizzardBoss", accuracy: 87.3, predictions: 142, badge: "Storm Chaser" },
  { rank: 5, username: "IceProphet", accuracy: 85.1, predictions: 189, badge: "Frost Finder" },
];

export const userStats = {
  rank: 23,
  accuracy: 78.5,
  totalPredictions: 45,
  correctPredictions: 35,
  currentStreak: 4,
  badges: ["Winter Watcher", "Early Bird"],
};

export const regionData = [
  { id: "toronto", name: "Toronto", probability: 72, lat: 43.65, lng: -79.38 },
  { id: "mississauga", name: "Mississauga", probability: 68, lat: 43.59, lng: -79.64 },
  { id: "brampton", name: "Brampton", probability: 75, lat: 43.73, lng: -79.76 },
  { id: "markham", name: "Markham", probability: 65, lat: 43.85, lng: -79.34 },
  { id: "vaughan", name: "Vaughan", probability: 70, lat: 43.84, lng: -79.51 },
  { id: "oakville", name: "Oakville", probability: 62, lat: 43.45, lng: -79.68 },
  { id: "burlington", name: "Burlington", probability: 58, lat: 43.33, lng: -79.79 },
  { id: "hamilton", name: "Hamilton", probability: 55, lat: 43.26, lng: -79.87 },
  { id: "oshawa", name: "Oshawa", probability: 78, lat: 43.90, lng: -78.86 },
  { id: "pickering", name: "Pickering", probability: 74, lat: 43.84, lng: -79.09 },
];
