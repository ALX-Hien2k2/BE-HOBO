const { ObjectId } = require("mongodb")

class Model {
    constructor() {
        this._id = new ObjectId();
        this.createdDate = null;
        this.updatedDate = null;
    }
}

module.exports = Model;