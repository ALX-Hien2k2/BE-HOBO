const Model = require("./Model");
class User extends Model {
  constructor() {
    super();
    this.username = null;
    this.phoneNumber = null;
    this.email = null;
    this.password = null;
    this.firstName = null;
    this.lastName = null;
    this.userType = null; // 0: Admin, 1: Customer, 2: Hotel owner
    this.dob = null;
    this.history = null;

    this.licenseNumber = null;
    this.hotelName = null;
    this.hotelPhoneNumber = null;
    this.hotelAddress = null;
  }

  setGeneralInfo(obj) {
    this.username = obj.username;
    this.phoneNumber = obj.phoneNumber;
    this.userType = obj.userType;
    this.email = obj.email || null;
    this.firstName = obj.firstName || null;
    this.lastName = obj.lastName || null;
    this.dob = obj.dob || null;
    this.history = obj.history || null;
  }

  setHotelOwnerInfo(obj) {
    this.licenseNumber = obj.licenseNumber || null;
    this.hotelName = obj.hotelName || null;
    this.hotelAddress = obj.hotelAddress || null;
    this.hotelPhoneNumber = obj.hotelPhoneNumber || null;
  }

  getTypeUser() {
    return {
      Admin: 0,
      Customer: 1,
      Hotel: 2,
    };
  }
}

module.exports = User;