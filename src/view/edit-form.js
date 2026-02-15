import { formatDateTime } from '../utils/functions.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function createEditFormTemplate(point, model) {
  const destination = model.getDestinationById(point.destinationId);
  const allOffersForType = model.getOffersByType(point.type);
  const allDestinations = model.destinations;

  const { type, startDate, endDate, price, offerIds: selectedOfferIds = [] } = point;
  const { name, description, pictures } = destination;

  const offersWithSelection = allOffersForType.map((offer) => ({
    ...offer,
    selected: selectedOfferIds.includes(offer.id)
  }));

  const destinationOptionsTemplate = allDestinations
    .map((dest) => `<option value="${dest.id}">${dest.name}</option>`).join('');

  const photosTemplate =
    `<div class="event__photos-container">
         <div class="event__photos-tape">
           ${pictures.map((pic) => `<img class="event__photo" src="${pic}" alt="Event photo">`).join('')}
         </div>
       </div>`;

  return (`<form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        <div class="event__type-item">
                          <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                          <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                          <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                          <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                          <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                          <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight">
                          <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                          <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                          <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                          <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                        </div>
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${destinationOptionsTemplate}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDateTime(startDate)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDateTime(endDate)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                    <section class="event__section event__section--offers">
                      <h3 class="event__section-title event__section-title--offers">Offers</h3>
                      <div class="event__available-offers">
                        ${offersWithSelection.map((offer) => `
                          <div class="event__offer-selector">
                            <input class="event__offer-checkbox visually-hidden" 
                                   id="event-offer-${offer.id}" 
                                   type="checkbox" 
                                   name="event-offer" 
                                   value="${offer.id}"
                                   ${offer.selected ? 'checked' : ''}>
                            <label class="event__offer-label" for="event-offer-${offer.id}">
                              <span class="event__offer-title">${offer.title}</span>
                              &plus;&euro;&nbsp;
                              <span class="event__offer-price">${offer.price}</span>
                            </label>
                          </div>
                        `).join('')}
                      </div>
                    </section>
                </section>
                <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${description}</p>
                    ${photosTemplate}
                  </section>
                </section>
              </form>`);
}

export default class EditFormView extends AbstractStatefulView {
  #model = null;
  #handleCloseClick = null;
  #handleFormSubmit = null;

  #datepickerStart = null;
  #datepickerEnd = null;

  constructor(point, model, onCloseClick, onFormSubmit) {
    super();
    this._setState({ ...point });
    this.#model = model;
    this.#handleCloseClick = onCloseClick;
    this.#handleFormSubmit = onFormSubmit;
    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeClickHandler);
    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#offerChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('input',this.#priceChangeHandler);

    this.#setDatepickers();
  }

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offerIds: [],
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      destinationId: evt.target.value,
    });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      price: evt.target.value,
    });
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit({ ...this._state });
  };

  get template() {
    return createEditFormTemplate(this._state, this.#model);
  }

  #offerChangeHandler = (evt) => {
    evt.preventDefault();
    const checkedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    this.updateElement({
      offerIds: checkedOffers.map((element) => element.value),
    });
  };

  reset(point) {
    this.updateElement(point);
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerStart) {
      this.#datepickerStart.destroy();
      this.#datepickerStart = null;
    }
    if (this.#datepickerEnd) {
      this.#datepickerEnd.destroy();
      this.#datepickerEnd = null;
    }
  }

  #setDatepickers = () => {
    this.#datepickerStart = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        defaultDate: this._state.startDate,
        onChange: this.#startDateChangeHandler,
        'time_24hr': true,
      },
    );

    this.#datepickerEnd = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        defaultDate: this._state.endDate,
        minDate: this._state.startDate,
        onChange: this.#endDateChangeHandler,
        'time_24hr': true,
      },
    );
  };

  #startDateChangeHandler = ([userDate]) => {
    this.updateElement({
      startDate: userDate,
    });
  };

  #endDateChangeHandler = ([userDate]) => {
    this.updateElement({
      endDate: userDate,
    });
  };
}
