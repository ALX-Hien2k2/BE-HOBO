const Model = require("./Model");
class User extends Model {
  constructor() {
    super();
    this.username = null;
    this.email = null;
    this.password = null;
    this.firstName = null;
    this.lastName = null;
    this.userType = null;
    this.dob = null;
    this.licenseNumber = null;
    this.phoneNumber = null;
    this.history = null;
    this.hotelName = null;
    this.hotelAddress = null;
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
