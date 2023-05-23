export class Place {
  constructor(title, imageUri, address, location, id) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location; // { lat: 0.27, lng: 126.81 }
    this.id = id;
  }
}
