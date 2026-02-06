import { TYPES, DESTINATIONS, OFFERS } from '../const.js';
import { generateRandomDate } from '../utils/functions.js';

export function generatePoints(count = 3) {
  const points = [];

  for (let i = 0; i < count; i++) {
    const type = TYPES[Math.floor(Math.random() * TYPES.length)];
    const destination = DESTINATIONS[Math.floor(Math.random() * DESTINATIONS.length)];
    const dates = generateRandomDate();

    const availableOffers = OFFERS.filter((offer) => offer.type === type);
    const selectedOffers = availableOffers.filter(() => Math.random() > 0.5).map((offer) => offer.id);

    points.push({
      id: crypto.randomUUID(),
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

