import {generatePoints} from '../mocks/point-mock.js';
import { DESTINATIONS, OFFERS } from '../const.js';

export default class AppModel {
  #points = [];
  #destinations = [];
  #offers = [];

  constructor() {
    this.#points = generatePoints(5);
    this.#destinations = DESTINATIONS;
    this.#offers = OFFERS;
  }

  get Points() {
    return [...this.#points];
  }

  get Destinations() {
    return [...this.#destinations];
  }

  get Offers() {
    return [...this.#offers];
  }

  getDestinationById(id) {
    const destination = this.#destinations.find((dest) => dest.id === id);
    return destination ? {...destination} : null;
  }

  getOffersByType(type) {
    return this.#offers.filter((offer) => offer.type === type).map((offer) => ({...offer}));
  }
}
