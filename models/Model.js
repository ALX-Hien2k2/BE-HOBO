const { ObjectId } = require("mongodb")

class Model {
    constructor() {
        this._id = new ObjectId();
        this.createdDate = new Date().toLocaleString();
        this.updatedDate = this.createdDate;
    }
}

module.exports = Model;