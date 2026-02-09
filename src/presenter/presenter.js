import { render, RenderPosition } from '../framework/render.js';
import ListRoutePointView from '../view/list-route-point.js';
import FilterView from '../view/filters.js';
import SortingView from '../view/sorting.js';
import TripInfoView from '../view/trip-info.js';
import RoutePointPresenter from '../presenter/route-point-presenter.js';
import { updateItem } from '../utils/items.js';
import { sortByDay, sortByTime, sortByPrice } from '../utils/functions.js';
import { SortType } from '../const.js';


export default class Presenter {
  #listRoutePointView = null;
  #container = null;
  #filtersContainer = null;
  #tripMainContainer = null;
  #model = null;

  #pointPresenters = new Map();
  #points = [];

  #sortComponent = null;

  #currentSortType = SortType.DAY;
  #sourcedRoutePoints = [];


  constructor({container, filtersContainer, tripMainContainer, model}) {
    this.#container = container;
    this.#filtersContainer = filtersContainer;
    this.#tripMainContainer = tripMainContainer;
    this.#model = model;
  }

  init() {
    this.#listRoutePointView = new ListRoutePointView();

    render(this.#listRoutePointView, this.#container);

    this.#points = [...this.#model.points];

    this.#points.sort(sortByDay);

    this.#sourcedRoutePoints = [...this.#model.points];

    render(new TripInfoView(), this.#tripMainContainer, 'afterbegin');
    render(new FilterView(), this.#filtersContainer);
    this.#renderSort();


    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });

  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderPoint(pointData) {
    const routePointPresenter = new RoutePointPresenter({
      listRoutePointView: this.#listRoutePointView,
      model: this.#model,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });
    routePointPresenter.init(pointData);
    this.#pointPresenters.set(pointData.id, routePointPresenter);
  }

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    const pointPresenter = this.#pointPresenters.get(updatedPoint.id);
    this.#sourcedRoutePoints = updateItem(this.#sourcedRoutePoints, updatedPoint);
    pointPresenter.init(updatedPoint);
  };

  #sortRoutePoints(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this.#points.sort(sortByDay);
        break;
      case SortType.TIME:
        this.#points.sort(sortByTime);
        break;
      case SortType.PRICE:
        this.#points.sort(sortByPrice);
        break;
      default:
        this.#points = [...this.#sourcedRoutePoints];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {

    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortRoutePoints(sortType);


    this.#clearListPoints();
    this.#renderListPoints();
  };

  #renderSort() {
    this.#sortComponent = new SortingView({
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #clearListPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderListPoints() {
    this.#renderPoints(0, this.#points.length);
  }

  #renderPoints(from, to) {
    this.#points
      .slice(from, to)
      .forEach((point) => this.#renderPoint(point));
  }

}
