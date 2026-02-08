export const TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

export const DESTINATIONS = [
  {
    id: 'amsterdam',
    name: 'Amsterdam',
    description: 'Deserunt consectetur mollit duis commodo reprehenderit consectetur do mollit laborum esse et do.',
    pictures: [
      'https://loremflickr.com/248/152/amsterdam?random=1',
      'https://loremflickr.com/248/152/amsterdam?random=2',
      'https://loremflickr.com/248/152/amsterdam?random=3'
    ]
  },
  {
    id: 'geneva',
    name: 'Geneva',
    description: 'Deserunt eu et id cillum incididunt laboris aliquip magna et occaecat.',
    pictures: [
      'https://loremflickr.com/248/152/geneva?random=1',
      'https://loremflickr.com/248/152/geneva?random=2'
    ]
  },
  {
    id: 'chamonix',
    name: 'Chamonix',
    description: 'Exercitation pariatur minim ipsum non velit duis amet labore proident occaecat fugiat proident.',
    pictures: [
      'https://loremflickr.com/248/152/chamonix?random=1',
      'https://loremflickr.com/248/152/chamonix?random=2',
      'https://loremflickr.com/248/152/chamonix?random=3',
      'https://loremflickr.com/248/152/chamonix?random=4'
    ]
  }
];

export const OFFERS = [
  { id: 'luggage', type: 'flight', title: 'Add luggage', price: 50 },
  { id: 'comfort', type: 'flight', title: 'Switch to comfort', price: 80 },
  { id: 'uber', type: 'taxi', title: 'Order Uber', price: 20 },
  { id: 'business', type: 'taxi', title: 'Business class', price: 100 },
  { id: 'info', type: 'bus', title: 'Information tour', price: 10 },
  { id: 'seats-bus', type: 'bus', title: 'Choose seats', price: 5 },
  { id: 'bed', type: 'train', title: 'Bed in wagon', price: 120 },
  { id: 'meal-train', type: 'train', title: 'Meal on train', price: 25 },
  { id: 'deck', type: 'ship', title: 'Deck passage', price: 45 },
  { id: 'cabin', type: 'ship', title: 'Cabin upgrade', price: 200 },
  { id: 'car-upgrade', type: 'drive', title: 'Car upgrade', price: 150 },
  { id: 'insurance', type: 'drive', title: 'Insurance', price: 30 },
  { id: 'breakfast', type: 'check-in', title: 'Add breakfast', price: 20 },
  { id: 'late-checkout', type: 'check-in', title: 'Late checkout', price: 40 },
  { id: 'guide', type: 'sightseeing', title: 'Tour guide', price: 35 },
  { id: 'group', type: 'sightseeing', title: 'Private group', price: 200 },
  { id: 'wine', type: 'restaurant', title: 'Add wine', price: 45 },
  { id: 'desert', type: 'restaurant', title: 'Add desert', price: 15 }
];

export const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};
