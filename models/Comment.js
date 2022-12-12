const Model = require("./Model");
const ObjectId = require('mongodb').ObjectId;
class Comment extends Model {
  constructor() {
    super();
    this.hotelId = null;
    this.userId = null; // Comment creator's id
    this.name = null; // first name + last name
    this.avatar = null;
    this.content = null;
    this.isHide = null;
  }

  setCommentInfo(obj) {
    this.hotelId = ObjectId(obj.hotelId);
    this.userId = ObjectId(obj.userId);
    this.content = obj.content;
    this.isHide = false;
  }
}

module.exports = Comment;