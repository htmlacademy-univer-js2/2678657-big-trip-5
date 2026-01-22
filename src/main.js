import { render } from './render.js';
import SortingView from '../src/view/sorting.js';
import FilterView from '../src/view/filters.js';
import Presenter from './presenter/presenter.js';
import TripInfoView from './view/trip-info.js';

const filtersContainer = document.body.querySelector('.trip-controls__filters');
const eventsContainer = document.body.querySelector('.trip-events');
const tripMainContainer = document.body.querySelector('.trip-main');

render(new TripInfoView(), tripMainContainer, 'afterbegin');
render(new FilterView(), filtersContainer);
render(new SortingView(), eventsContainer);

const presenter = new Presenter({container: eventsContainer});

presenter.init();
