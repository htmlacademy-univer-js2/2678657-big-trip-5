import { render } from '../render.js';
import CreateFormView from '../view/create-form.js';
import EditFormView from '../view/edit-form.js';
import RoutePointView from '../view/route-point.js';
import ListRoutePointView from '../view/list-route-point.js';
import FilterView from '../view/filters.js';
import SortingView from '../view/sorting.js';
import TripInfoView from '../view/trip-info.js';

export default class Presenter {
  constructor({container, filtersContainer, tripMainContainer, model}) {
    this.container = container;
    this.filtersContainer = filtersContainer;
    this.tripMainContainer = tripMainContainer;
    this.model = model;
  }

  init(){
    const listRoutePointView = new ListRoutePointView();

    render(new TripInfoView(), this.tripMainContainer, 'afterbegin');
    render(new FilterView(), this.filtersContainer);
    render(new SortingView(), this.container);

    const points = this.model.getPoints();

    const editPoint = points[0];
    const editPointDestination = this.model.getDestinationById(editPoint.destinationId);
    const editPointAllOffersForType = this.model.getOffersByType(editPoint.type);

    render(new EditFormView(editPoint, editPointDestination, editPointAllOffersForType),listRoutePointView.getElement());

    render(new CreateFormView(),listRoutePointView.getElement());

    for(let i = 1; i < points.length; i++){
      render(new RoutePointView(points[i], this.model), listRoutePointView.getElement());
    }


    render(listRoutePointView, this.container);
  }
}
