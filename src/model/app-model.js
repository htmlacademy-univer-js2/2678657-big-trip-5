import {generatePoints} from '../mocks/point-mock.js';
import { DESTINATIONS, OFFERS } from '../const.js';

export default class AppModel {
  constructor() {
    this.points = generatePoints(5);
    this.destinations = DESTINATIONS;
    this.offers = OFFERS;
  }

  getPoints() {
    return this.points;
  }

  getDestinationById(id) {
    return this.destinations.find((dest) => dest.id === id);
  }

  getOffersByType(type) {
    return this.offers.filter((offer) => offer.type === type);
  }
}
