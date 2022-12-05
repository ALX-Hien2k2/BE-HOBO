class Collections {
  user = process.env.USER_COLLECTION_NAME;
  post = process.env.POST_COLLECTION_NAME;
  hotel = process.env.HOTEL_COLLECTION_NAME;
  getListCollections() {
    return [this.user, this.post, this.hotel];
  }
}
module.exports = Collections;
