const Model = require("./Model");

class Comment extends Model {
  constructor() {
    super();
    this.hotelId = null;
    this.userId = null; // Comment creator's id
    this.name = null;
    this.avatar = null;
    this.date = null;
    this.content = null;
    this.isHide = null;
  }
}

module.exports = Comment;