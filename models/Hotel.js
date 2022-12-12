const Model = require("./Model");

class Hotel extends Model {
    constructor() {
        super();
        this.userId = null;
        this.licenseNumber = null;
        this.hotelName = null;
        this.hotelAddress = null;
        this.hotelPhoneNumber = null;

        this.description = null;
        this.descriptionImage = null;
        this.starNumber = null;
        this.slider = null; // array
        this.utilities = null; // array
    }

    setInfo(obj) {
        this.licenseNumber = obj.licenseNumber;
        this.hotelName = obj.hotelName;
        this.hotelAddress = obj.hotelAddress;
        this.hotelPhoneNumber = obj.hotelPhoneNumber;

        this.description = obj.description || null;
        this.descriptionImage = obj.descriptionImage || null;
        this.starNumber = obj.starNumber || null;
        this.slider = obj.slider || null;
        this.utilities = obj.utilities || null;
    }
}

module.exports = Hotel;