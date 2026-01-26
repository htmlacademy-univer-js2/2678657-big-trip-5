import Presenter from './presenter/presenter.js';
import AppModel from './model/app-model.js';

const filtersContainer = document.body.querySelector('.trip-controls__filters');
const eventsContainer = document.body.querySelector('.trip-events');
const tripMainContainer = document.body.querySelector('.trip-main');


const model = new AppModel();

const presenter = new Presenter({
  container: eventsContainer,
  filtersContainer: filtersContainer,
  tripMainContainer: tripMainContainer,
  model
});

presenter.init();
