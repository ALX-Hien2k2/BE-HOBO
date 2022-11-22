const { validateCheck, validateExistence } = require("../helps/ValidationBody");
const uuid = require("uuid");
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const { findOne, findAll, insertOne } = require("../services/DatabaseServices");
const Collections = require("../services/Collections");


const getUserDetails = async (phone_number) => {
  const promise = new Promise(async (resolve, reject) => {
    try {
      const userInfo = await findOne(new Collections().user, { phoneNumber: phone_number });
      if (userInfo) {
        console.log(userInfo);
        resolve(userInfo);
      } else {
        console.log(userInfo);
        reject("User not found");
      }
    } catch (err) {
      reject(err);
    }
  });
  return promise;
};

const getUserList = async () => {
  const promise = new Promise(async (resolve, reject) => {
    try {
      const userList = await findAll(new Collections().user);
      if (userList) {
        console.log("userList ", userList);
        resolve(userList);
      }
      else {
        reject("userList not found");
      }
    } catch (err) {
      reject(err);
    }
  });
  return promise;
};

const signInAcc = async (userAccount) => {
  const promise = new Promise(async (resolve, reject) => {
    try {
      const result = await findOne(new Collections().user, { phoneNumber: userAccount.phoneNumber });
      if (result) {
        console.log(result);
        console.log("phoneNumber found");
        if (!bcrypt.compareSync(userAccount.password, result.password)) {
          console.log("Wrong password");
          reject("Wrong phoneNumber or password");
        }
        resolve("Login successfully");
      }
      else {
        console.log("phoneNumber not found");
      }
      reject("Wrong phoneNumber or password");
    } catch (err) {
      reject(err);
    }
  });
  return promise;
};

const signUpAcc = async (newAccount) => {
  const promise = new Promise(async (resolve, reject) => {
    try {
      console.log("newAccount", newAccount);
      // Validate
      validateCheck(
        {
          phoneNumber: newAccount.phoneNumber,
          password: newAccount.password,
          userType: newAccount.userType,
        },
        newAccount);

      console.log(newAccount.phoneNumber);
      // Check if phoneNumber already exists
      if (await validateExistence(newAccount.phoneNumber)) {
        console.log("phoneNumber already exists");
        reject("phoneNumber already exists");
      }
      else {
        // Add info to User class
        const newUser = new User();

        // hash password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newAccount.password, salt);

        // Set user's info
        newUser.password = hash;
        newUser.setGeneralInfo(newAccount);

        if (newAccount.userType === newUser.getTypeUser().Hotel) {
          validateCheck(
            {
              licenseNumber: newAccount.licenseNumber,
              hotelName: newAccount.hotelName,
              hotelPhoneNumber: newAccount.hotelPhoneNumber,
              hotelAddress: newAccount.hotelAddress,
            },
            newAccount
          );
        }
        newUser.setHotelOwnerInfo(newAccount);

        try {
          const result = await insertOne(new Collections().user, newUser);
          if (result["acknowledged"] === true) {
            console.log("Insert successfully");
            resolve("Sign up successfully");
          }
          else {
            console.log("Insert failed");
            reject("Sign up failed");
          }
        } catch (err) {
          reject(err);
        }
      }

    } catch (err) {
      reject(err);
    }
  });
  return promise;
};

const changeInfo = async (userChangeInfo) => {
  const promise = new Promise((resolve, reject) => {
    try {
      // Option 1: Update all info
      // Client will let user change their info, no matter which info they change,
      // client always send all info to server

      // Client will sent uid and user's info

      // Search for user's info in db using uid

      // If not found, raise alert and return

      // If found, update user's info to db and return it
      // MongoDB: update userChangeInfo to db

      // Update user's info
      Object.keys(userChangeInfo).forEach((key) => {
        if (key == "password") {
          const salt = bcrypt.genSaltSync(10);
          updated_Info[key] = bcrypt.hashSync(userChangeInfo[key], salt);
        } else {
          updated_Info[key] = userChangeInfo[key]
        }
      });

      // Save to db

      // return user's info
      console.log(updated_Info);
      resolve(updated_Info);
    } catch (error) {
      reject(err);
    }
  });
  return promise;
};

module.exports = {
  getUserDetails,
  signInAcc,
  getUserList,
  signUpAcc,
  changeInfo
};