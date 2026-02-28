import AbstractView from '../framework/view/abstract-view.js';

function createErrorDataTemplate() {
  return (
    '<p class="trip-events__msg">Failed to load latest route information</p>'
  );
}

export default class ErrorLoadDataView extends AbstractView {
  get template() {
    return createErrorDataTemplate();
  }
}
