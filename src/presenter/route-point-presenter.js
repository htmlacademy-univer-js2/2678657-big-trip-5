import {render, replace, remove} from '../framework/render.js';
import RoutePointView from '../view/route-point.js';
import EditFormView from '../view/edit-form.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class RoutePointPresenter {
  #listRoutePointView = null;
  #pointComponent = null;
  #editFormComponent = null;
  #model = null;
  #handleDataChange = null;
  #pointData = null;

  #handleModeChange = null;
  #mode = Mode.DEFAULT;

  constructor({listRoutePointView, model, onDataChange, onModeChange}) {
    this.#listRoutePointView = listRoutePointView;
    this.#model = model;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(pointData) {
    this.#pointData = pointData;

    const prevTaskComponent = this.#pointComponent;
    const prevTaskEditComponent = this.#editFormComponent;

    this.#pointComponent = new RoutePointView(
      pointData,
      this.#model,
      this.#handleEditClick,
      this.#handleFavoriteClick
    );

    this.#editFormComponent = new EditFormView(
      pointData,
      this.#model,
      this.#handleFormSubmit,
      this.#handleCloseClick
    );

    if (prevTaskComponent === null || prevTaskEditComponent === null) {
      render(this.#pointComponent, this.#listRoutePointView.element);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevTaskComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editFormComponent, prevTaskEditComponent);
    }

    remove(prevTaskComponent);
    remove(prevTaskEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editFormComponent);
  }

  #replaceCardToForm() {
    replace(this.#editFormComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange(this);
    this.#mode = Mode.EDITING;
  }

  #replaceFormToCard() {
    replace(this.#pointComponent, this.#editFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleCloseClick = () => {
    this.#replaceFormToCard();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToCard();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFavoriteClick = () => {
    const updatedPoint = {...this.#pointData, isFavorite: !this.#pointData.isFavorite};
    this.#handleDataChange(updatedPoint);
  };

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  }
}

