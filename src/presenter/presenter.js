import { render, RenderPosition, remove } from '../framework/render.js';
import ListRoutePointView from '../view/list-route-point.js';
import SortingView from '../view/sorting.js';
import TripInfoView from '../view/trip-info.js';
import RoutePointPresenter from '../presenter/route-point-presenter.js';
import { sortByDay, sortByTime, sortByPrice } from '../utils/functions.js';
import { SortType } from '../const.js';
import {UserAction, UpdateType} from '../const.js';
import { filter } from '../utils/filter.js';
import NoPointsView from '../view/no-points-view.js';
import NewPointPresenter from './new-point-presenter.js';
import { FilterType } from '../const.js';


export default class Presenter {
  #listRoutePointView = new ListRoutePointView();
  #tripMainComponent = new TripInfoView();
  #container = null;
  #tripMainContainer = null;

  #model = null;
  #filterModel = null;

  #pointPresenters = new Map();
  #newPointPresenter = null;

  #sortComponent = null;
  #noPointsComponent = null;

  #currentSortType = SortType.DAY;

  #onNewPointDestroy = null;


  constructor({container, tripMainContainer, model, filterModel, onNewPointDestroy}) {
    this.#container = container;
    this.#tripMainContainer = tripMainContainer;
    this.#model = model;
    this.#filterModel = filterModel;
    this.#onNewPointDestroy = onNewPointDestroy;

    this.#model.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderBoard();
  }

  get points() {
    const points = this.#model.points;
    const filteredPoints = filter[this.#filterModel.filter](points);
    switch (this.#currentSortType) {
      case SortType.DAY:
        return [...filteredPoints].sort(sortByDay);
      case SortType.TIME:
        return [...filteredPoints].sort(sortByTime);
      case SortType.PRICE:
        return [...filteredPoints].sort(sortByPrice);
      default:
        return filteredPoints;
    }
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#model.updateTask(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#model.addTask(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#model.deleteTask(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderPoint(pointData) {
    const routePointPresenter = new RoutePointPresenter({
      listRoutePointView: this.#listRoutePointView,
      model: this.#model,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });
    routePointPresenter.init(pointData);
    this.#pointPresenters.set(pointData.id, routePointPresenter);
  }

  #handleSortTypeChange = (sortType) => {

    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSort() {
    this.#sortComponent = new SortingView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #clearBoard({resetSortType = false} = {}) {
    if (this.#newPointPresenter) {
      this.#newPointPresenter.destroy();
    }

    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#listRoutePointView);
    remove(this.#tripMainComponent);
    remove(this.#sortComponent);

    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #renderBoard() {
    render(this.#listRoutePointView, this.#container);
    render(this.#tripMainComponent, this.#tripMainContainer, 'afterbegin');
    this.#renderSort();

    const points = this.points;
    const pointsCount = points.length;

    if (pointsCount === 0) {
      this.#noPointsComponent = new NoPointsView({
        filterType: this.#filterModel.filter
      });
      render(this.#noPointsComponent, this.#container);
      return;
    }
    this.#renderPoints(points);
  }

  #renderPoints(points) {
    points.forEach((point) => this.#renderPoint(point));
  }

  #getNewPointPresenter() {
    return new NewPointPresenter({
      listContainer: this.#listRoutePointView.element,
      model: this.#model,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#onNewPointDestroy
    });
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);

    this.#handleModeChange();
    this.#newPointPresenter = this.#getNewPointPresenter();
    this.#newPointPresenter.init();
  }
}
