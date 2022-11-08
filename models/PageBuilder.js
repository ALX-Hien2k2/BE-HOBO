const Model = require("./Model");

class PageBuilder extends Model {
  constructor() {
    super();
    this.idPage = null;
    this.page = null;
    this.description = null;
    this.imageCDN = null;
    this.bannerList = null;
    this.postList = null;
  }
}
module.exports = PageBuilder;