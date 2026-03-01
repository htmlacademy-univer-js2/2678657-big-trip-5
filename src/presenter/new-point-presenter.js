import {remove, render, RenderPosition} from '../framework/render.js';
import EditFormView from '../view/edit-form.js';
import {UserAction, UpdateType} from '../const.js';

export default class NewPointPresenter {
  #listContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #model = null;

  #pointEditComponent = null;

  constructor({listContainer, model, onDataChange, onDestroy}) {
    this.#listContainer = listContainer;
    this.#model = model;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#pointEditComponent !== null) {
      return;
    }

    const blankPoint = {
      type: 'taxi',
      destination: this.#model.destinations[0].id,
      startDate: new Date(),
      endDate: new Date(),
      price: 0,
      offers: [],
      isFavorite: false,
    };

    this.#pointEditComponent = new EditFormView(
      blankPoint,
      this.#model,
      this.#handleDeleteClick,
      this.#handleFormSubmit,
      this.#handleDeleteClick
    );

    render(this.#pointEditComponent, this.#listContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = async (point) => {
    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
    try {
      await this.#handleDataChange(
        UserAction.ADD_POINT,
        UpdateType.MAJOR,
        point,
      );
      this.destroy();
    } catch (err) {
      this.#pointEditComponent.shake(() => {
        this.#pointEditComponent.updateElement({
          isDisabled: false,
          isSaving: false,
        });
      });
    }
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
