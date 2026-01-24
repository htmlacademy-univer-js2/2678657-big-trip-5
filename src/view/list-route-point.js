import {createElement} from '../render.js';

function createListRoutePointTemplate() {
  return (`<ul class="trip-events__list">
            </ul>`);
}

export default class ListRoutePointView {
  getTemplate() {
    return createListRoutePointTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
