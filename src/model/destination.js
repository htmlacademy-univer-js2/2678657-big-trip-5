export default class Destination {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.pictures = data.pictures || [];
  }
}
