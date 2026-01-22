import { render } from '../render';
import CreateFormView from '../view/create-form.js';
import EditFormView from '../view/edit-form.js';
import RoutePointView from '../view/route-point.js';
import ListRoutePointView from '../view/list-route-point.js';

export default class Presenter {
  constructor({container}) {
    this.container = container;
  }

  init(){
    const createFormView = new CreateFormView();
    const editFormView = new EditFormView();
    const listRoutePointView = new ListRoutePointView();

    render(editFormView, listRoutePointView.getElement());
    render(createFormView, listRoutePointView.getElement());
    render(listRoutePointView, this.container);
    for(let i = 0; i < 3; i++){
      render(new RoutePointView(), this.listRoutePointView.getElement());
    }
  }
}
