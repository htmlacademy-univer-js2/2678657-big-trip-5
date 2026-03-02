import ApiService from '../framework/api-service.js';
import { Method } from '../const.js';

export default class PointApiService extends ApiService {
  get points() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async addPoint(point) {
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deletePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.DELETE,
    });

    return response;
  }

  #adaptToServer(point) {
    const adaptedPoint = {...point,
      'date_from': point.startDate instanceof Date ? point.startDate.toISOString() : null,
      'date_to': point.endDate instanceof Date ? point.endDate.toISOString() : null,
      'base_price': point.price,
      'is_favorite': point.isFavorite,
      'offers': point.offers,
    };

    delete adaptedPoint.startDate;
    delete adaptedPoint.endDate;
    delete adaptedPoint.isFavorite;
    delete adaptedPoint.price;
    delete adaptedPoint.offerIds;
    delete adaptedPoint.isValidationFailed;

    return adaptedPoint;
  }
}
