class Collections {
  user = process.env.USER_COLLECTION_NAME;
  post = process.env.POST_COLLECTION_NAME;
  getListCollections() {
    return [this.user, this.post];
  }
}
module.exports = Collections;
