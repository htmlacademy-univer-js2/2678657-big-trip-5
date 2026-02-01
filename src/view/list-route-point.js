import AbstractView from '../framework/view/abstract-view.js';

function createListRoutePointTemplate() {
  return (`<ul class="trip-events__list">
            </ul>`);
}

export default class ListRoutePointView extends AbstractView {
  constructor(){
    super();
  }

  get template() {
    return createListRoutePointTemplate();
  }

}
