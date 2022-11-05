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

  setInfo(obj) {
    this.username = obj.username;
    this.email = obj.email;
    this.password = obj.password;
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
    this.userType = obj.userType;
    this.dob = obj.dob;
    this.licenseNumber = obj.licenseNumber;
    this.phoneNumber = obj.phoneNumber;
    this.history = obj.history;
    this.hotelName = obj.hotelName;
    this.hotelAddress = obj.hotelAddress;
  }

  // changeInfo(obj) {
  //   console.log("obj", obj);
  //   Object.keys(obj).forEach((key) => {
  //     console.log("key", key, "this.key", this[key], "obj[key]", obj[key]);
  //     this[key] = obj[key]
  //   });
  // }

}
module.exports = User;
