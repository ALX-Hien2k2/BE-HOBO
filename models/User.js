const Model = require("./Model");
class User extends Model {
  constructor() {
    super();
    this.username = null;
    this.email = null;
    this.password = null;
    this.firstName = null;
    this.lastName = null;
    this.userType = null; // 0: Admin, 1: Customer, 2: Hotel owner
    this.phoneNumber = null;
    this.avatar = null;
    this.hotelId = null;
  }

  setInfo(obj) {
    this.username = obj.username;
    this.email = obj.email || null;
    this.firstName = obj.firstName || null;
    this.lastName = obj.lastName || null;
    this.userType = obj.userType;
    this.phoneNumber = obj.phoneNumber;
    this.avatar = obj.avatar || null;
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