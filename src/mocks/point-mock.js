import { TYPES, DESTINATIONS, OFFERS } from '../const.js';

function generateRandomDate() {
  const start = new Date();
  start.setDate(start.getDate() + Math.floor(Math.random() * 7));
  start.setHours(Math.floor(Math.random() * 24));

  const end = new Date(start);
  end.setHours(end.getHours() + Math.floor(Math.random() * 5) + 1);

  return { start, end };
}

function generatePoints(count = 3) {
  const points = [];

  for (let i = 0; i < count; i++) {
    const type = TYPES[Math.floor(Math.random() * TYPES.length)];
    const destination = DESTINATIONS[Math.floor(Math.random() * DESTINATIONS.length)];
    const dates = generateRandomDate();

    const availableOffers = OFFERS.filter((offer) => offer.type === type);
    const selectedOffers = availableOffers.filter(() => Math.random() > 0.5).map((offer) => offer.id);

    points.push({
      id: crypto.randomUUID,
      type,
      destinationId: destination.id,
      startDate: dates.start,
      endDate: dates.end,
      price: Math.floor(Math.random() * 1000) + 100,
      offerIds: selectedOffers,
      isFavorite: Math.random() > 0.5
    });
  }

  return points;
}

function formatDateTime(date) {
  if (!date) {
    return '18/03/19 12:25';
  }
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear().toString().slice(-2);
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export {generatePoints, formatDateTime};
