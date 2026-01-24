import { render } from '../render.js';
import CreateFormView from '../view/create-form.js';
import EditFormView from '../view/edit-form.js';
import RoutePointView from '../view/route-point.js';
import ListRoutePointView from '../view/list-route-point.js';
import FilterView from '../view/filters.js';
import SortingView from '../view/sorting.js';
import TripInfoView from '../view/trip-info.js';

export default class Presenter {
  constructor({container, filtersContainer, tripMainContainer}) {
    this.container = container;
    this.filtersContainer = filtersContainer;
    this.tripMainContainer = tripMainContainer;
  }

  init(){
    const createFormView = new CreateFormView();
    const editFormView = new EditFormView();
    const listRoutePointView = new ListRoutePointView();

    render(new TripInfoView(), this.tripMainContainer, 'afterbegin');
    render(new FilterView(), this.filtersContainer);
    render(new SortingView(), this.container);
    render(editFormView, listRoutePointView.getElement());
    render(createFormView, listRoutePointView.getElement());
    for(let i = 0; i < 3; i++){
      render(new RoutePointView(), listRoutePointView.getElement());
    }
    render(listRoutePointView, this.container);
  }
}
