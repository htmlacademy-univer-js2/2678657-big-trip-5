import { render, replace } from '../framework/render.js';
import EditFormView from '../view/edit-form.js';
import RoutePointView from '../view/route-point.js';
import ListRoutePointView from '../view/list-route-point.js';
import FilterView from '../view/filters.js';
import SortingView from '../view/sorting.js';
import TripInfoView from '../view/trip-info.js';

export default class Presenter {
  #listRoutePointView = null;

  constructor({container, filtersContainer, tripMainContainer, model}) {
    this.container = container;
    this.filtersContainer = filtersContainer;
    this.tripMainContainer = tripMainContainer;
    this.model = model;
  }

  init() {
    this.#listRoutePointView = new ListRoutePointView();

    render(new TripInfoView(), this.tripMainContainer, 'afterbegin');
    render(new FilterView(), this.filtersContainer);
    render(new SortingView(), this.container);

    const points = this.model.getPoints();

    points.forEach((point) => {
      this.#renderPoint(point);
    });

    render(this.#listRoutePointView, this.container);
  }

  #renderPoint(pointData) {

    const pointComponent = new RoutePointView(pointData, this.model, replacePointToEdit);
    const editFormComponent = new EditFormView(pointData, this.model, replaceEditToPoint, onFormSubmit);

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    function replacePointToEdit() {
      replace(editFormComponent, pointComponent);
      document.addEventListener('keydown', escKeyDownHandler);
    }

    function replaceEditToPoint() {
      replace(pointComponent, editFormComponent);
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    function onFormSubmit(evt) {
      evt.preventDefault();
      replaceEditToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    render(pointComponent, this.#listRoutePointView.element);
  }
}
