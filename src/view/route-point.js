import {createElement} from '../render.js';
import {calculateDuration} from '../mocks/point-mock.js';

function createRoutePointTemplate(point, model) {
  const destination = model.getDestinationById(point.destinationId);
  const allOffersForType = model.getOffersByType(point.type);
  const offers = allOffersForType.filter((offer) => point.offerIds.includes(offer.id));

  const { type, startDate, endDate, price, isFavorite } = point;
  const { name } = destination;

  const dateFormat = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const startTime = startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const endTime = endDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const duration = calculateDuration(startDate, endDate);

  return (`<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${startDate.toISOString()}">${dateFormat.toUpperCase()}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${startDate.toISOString()}">${startTime}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${endDate.toISOString()}">${endTime}</time>
                  </p>
                  <p class="event__duration">${duration}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${price}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  ${offers.map((offer) => `
                    <li class="event__offer">
                      <span class="event__offer-title">${offer.title}</span>
                      &plus;&euro;&nbsp;
                      <span class="event__offer-price">${offer.price}</span>
                    </li>
                  `).join('')}
                </ul>
                <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`);
}

export default class RoutePointView {
  constructor(point, model) {
    this.point = point;
    this.model = model;
  }

  getTemplate() {
    return createRoutePointTemplate(this.point, this.model);
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
