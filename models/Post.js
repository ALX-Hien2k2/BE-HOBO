const Model = require("./Model");

class Post extends Model {
  constructor() {
    super();
    this.hotelId = null;
    this.roomName = null;
    this.hotelName = null;
    this.location = null;
    this.price = null; // Number
    this.quantity = null; // String
    this.starNumber = null;
    this.bed = null;
    this.toilet = null;
    this.thumbnail = null;
    this.slider = null; // array
    this.description = null;
  }

  setInfo(obj) {
    this.roomName = obj.roomName;
    this.price = obj.price;
    this.quantity = obj.quantity;
    this.bed = obj.bed;
    this.toilet = obj.toilet;
    this.thumbnail = obj.thumbnail;
    this.slider = obj.slider;
    this.description = obj.description;
  }
}
module.exports = Post;