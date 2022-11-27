const Model = require("./Model");

class HoBoPost extends Model {
  constructor() {
    super();
    this.roomName = null;
    this.description = null;
    this.location = null;
    this.userId = null;
    this.hotelName = null;
    this.isApproved = null;
    this.price = null;
    this.roomImg = null;
    this.hotelImg = null;
    this.numberStar = null;
  }

  setInfo(obj) {
    this.roomName = obj.roomName;
    this.price = obj.price;
    this.roomImg = obj.roomImg;
    this.location = obj.location;
    this.userId = obj.userId;
    this.hotelName = obj.hotelName;
    this.hotelImg = obj.hotelImg;
    this.description = obj.description;
    this.isApproved = obj.isApproved;
    this.numberStar = obj.numberStar;
  }
}
module.exports = HoBoPost;