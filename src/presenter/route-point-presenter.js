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

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#editFormComponent;

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

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#listRoutePointView.element);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editFormComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
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

  #handleFormSubmit = async (point) => {
    this.#editFormComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
    try {
      const isMinorUpdate =
      this.#pointData.startDate !== point.startDate ||
      this.#pointData.endDate !== point.endDate ||
      this.#pointData.price !== point.price;

      await this.#handleDataChange(
        UserAction.UPDATE_POINT,
        isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
        point,
      );
      await this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    } catch (err) {
      this.#editFormComponent.shake(() => {
        this.#editFormComponent.updateElement({
          isDisabled: false,
          isSaving: false,
        });
      });
    }
  };

  #handleDeleteClick = async (point) => {
    this.#editFormComponent.updateElement({
      isDisabled: true,
      isDeleting: true,
    });
    try {
      await this.#handleDataChange(
        UserAction.DELETE_POINT,
        UpdateType.MINOR,
        point,
      );
    } catch (err) {
      this.#editFormComponent.shake(() => {
        this.#editFormComponent.updateElement({
          isDisabled: false,
          isDeleting: false,
        });
      });
    }
  };

  #handleFavoriteClick = async () => {
    try {
      await this.#handleDataChange(
        UserAction.UPDATE_POINT,
        UpdateType.PATCH,
        {...this.#pointData, isFavorite: !this.#pointData.isFavorite}
      );
    }catch (err) {
      this.#pointComponent.shake();
    }
  };

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editFormComponent.reset(this.#pointData);
      this.#replaceFormToCard();
    }
  }
}

