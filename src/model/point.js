export default class Point {
  constructor(data) {
    this.id = data.id;
    this.type = data.type;
    this.destination = data.destination;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.price = data.price;
    this.offers = data.offers || [];
    this.isFavorite = data.isFavorite || false;
  }
}
