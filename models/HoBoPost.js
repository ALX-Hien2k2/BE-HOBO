const Model = require("./Model");

class HoBoPost extends Model {
  constructor() {
    super();
    this.title = null;
    this.description = null;
    this.image = null;
    this.location = null;
    this.date = null;
    this.time = null;
    this.userId = null;
    this.hotelName = null;
    this.isApproved = null;
  }

  setInfo(obj) {
    this.title = obj.title;
    this.description = obj.description;
    this.image = obj.image;
    this.location = obj.location;
    this.date = obj.date;
    this.time = obj.time;
    this.userId = obj.userId;
    this.hotelName = obj.hotelName;
    this.isApproved = obj.isApproved || null;
  }
}
module.exports = HoBoPost;