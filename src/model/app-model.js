import Observable from '../framework/observable.js';
import {generatePoints} from '../mocks/point-mock.js';
import { DESTINATIONS, OFFERS } from '../const.js';

export default class AppModel extends Observable {
  #points = [];
  #destinations = [];
  #offers = [];

  constructor() {
    super();
    this.#points = generatePoints(5);
    this.#destinations = DESTINATIONS;
    this.#offers = OFFERS;
  }

  get points() {
    return [...this.#points];
  }

  get destinations() {
    return [...this.#destinations];
  }

  get offers() {
    return [...this.#offers];
  }

  getDestinationById(id) {
    const destination = this.#destinations.find((dest) => dest.id === id);
    return destination ? {...destination} : null;
  }

  getOffersByType(type) {
    return this.#offers.filter((offer) => offer.type === type).map((offer) => ({...offer}));
  }

  updateTask(updateType, update) {
    const index = this.#points.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addTask(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deleteTask(updateType, update) {
    const index = this.#points.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
