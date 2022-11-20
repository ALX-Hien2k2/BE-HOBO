class Collections {
  user = process.env.USER_COLLECTION_NAME;
  test = process.env.TEST_COLLECTION_NAME;
  getListCollections() {
    return [this.user,this.test];
  }
}
module.exports = Collections;
