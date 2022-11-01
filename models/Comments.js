export default class Comments extends Model {
  constructor() {
    super();
    this.comment = null;
    this.userId = null;
    this.postId = null;
    this.isHide = null;
  }
}
