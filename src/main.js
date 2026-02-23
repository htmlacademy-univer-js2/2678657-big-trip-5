import Presenter from './presenter/presenter.js';
import AppModel from './model/app-model.js';
import FilterModel from './model/filter-model.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';

const eventsContainer = document.body.querySelector('.trip-events');
const tripMainContainer = document.body.querySelector('.trip-main');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');
const newPointButtonIndex = document.querySelector('.trip-main__event-add-btn');


const model = new AppModel();
const filterModel = new FilterModel();

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

const presenter = new Presenter({
  container: eventsContainer,
  tripMainContainer: tripMainContainer,
  model,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose
});

const filtersPresenter = new FiltersPresenter({
  filterContainer: tripControlsFiltersElement,
  filterModel: filterModel,
  pointModel: model
});

function handleNewPointFormClose() {
  newPointButtonComponent.setDisabled(false);
}

function handleNewPointButtonClick() {
  presenter.createPoint();
  newPointButtonComponent.setDisabled(true);
}

newPointButtonIndex.replaceWith(newPointButtonComponent.element);

filtersPresenter.init();
presenter.init();
