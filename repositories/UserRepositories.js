const { validateCheck } = require("../helps/ValidationBody");
const uuid = require("uuid");
const User = require("../models/User");

const getUserDetails = async (userId) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        {
          id: 1,
          name: "John Doe",
        },
        1000
      );
    });
  });
  return promise;
};

const createUser = async (user) => {
  console.log("user", user);

  const promise = new Promise((resolve, reject) => {
    try {
      const newUser = new User();
      validateCheck(
        {
          username: user.username,
          pwd: user.pwd,
          userType: user.userType,
        },
        user
      );
      newUser.username = user.username;
      newUser.email = user.email;
      newUser.password = user.pwd;
      newUser.firstName = user.firstName || null;
      newUser.lastName = user.lastName || null;
      newUser.userType = user.userType;
      newUser.dob = user.dob || null;
      if (user.userType === newUser.getTypeUser().Hotel) {
        console.log("user.userType", user.userType);
        validateCheck(
          {
            licenseNumber: user.licenseNumber,
            phoneNumber: user.phoneNumber,
            hotelName: user.hotelName,
            hotelAddress: user.hotelAddress,
          },
          user
        );
      }
      newUser.licenseNumber = user.licenseNumber || null;
      newUser.phoneNumber = user.phoneNumber || null;
      newUser.history = user.history || null;
      newUser.hotelName = user.hotelName || null;
      newUser.hotelAddress = user.hotelAddress || null;
      newUser.id = uuid.v4();
      // done validate
      // save to db

      resolve(newUser);
    } catch (err) {
      reject(err);
    }
  });
  return promise;
};
// validate
// tương tác vs db
module.exports = {
  getUserDetails,
  createUser,
};
