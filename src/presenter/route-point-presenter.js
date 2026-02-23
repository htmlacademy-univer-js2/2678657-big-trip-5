import {render, replace, remove} from '../framework/render.js';
import RoutePointView from '../view/route-point.js';
import EditFormView from '../view/edit-form.js';
import {UserAction, UpdateType} from '../const.js';

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
      this.#handleCloseClick,
      this.#handleFormSubmit,
      this.#handleDeleteClick
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
      this.#editFormComponent.reset(this.#pointData);
      this.#replaceFormToCard();
    }
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleCloseClick = () => {
    this.#replaceFormToCard();
  };

  #handleFormSubmit = (point) => {
    const isMinorUpdate =
    this.#pointData.startDate !== point.startDate ||
    this.#pointData.endDate !== point.endDate ||
    this.#pointData.price !== point.price;

    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      point,
    );
    this.#replaceFormToCard();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
    this.#replaceFormToCard();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      {...this.#pointData, isFavorite: !this.#pointData.isFavorite}
    );
  };

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editFormComponent.reset(this.#pointData);
      this.#replaceFormToCard();
    }
  }
}

