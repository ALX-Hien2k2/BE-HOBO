const { validateCheck, validateExistence } = require("../helps/ValidationBody");
const uuid = require("uuid");
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const { findOne, findAll, insertOne, updateOne } = require("../services/DatabaseServices");
const Collections = require("../services/Collections");


const getUserDetails = async (user_name) => {
  const promise = new Promise(async (resolve, reject) => {
    try {
      const userInfo = await findOne(new Collections().user, { username: user_name });
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
      const result = await findOne(new Collections().user, { username: userAccount.username });
      if (result) {
        console.log(result);
        console.log("username found");
        if (!bcrypt.compareSync(userAccount.password, result.password)) {
          console.log("Wrong password");
          reject("Wrong username or password");
        }
        console.log("Sign in successfully");
        resolve(result);
      }
      else {
        console.log("username not found");
      }
      reject("Wrong username or password");
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
          username: newAccount.username,
          password: newAccount.password,
          phoneNumber: newAccount.phoneNumber,
          userType: newAccount.userType,
        },
        newAccount);

      // Check if username already exists
      if (await validateExistence(newAccount.username)) {
        console.log("username already exists");
        reject("username already exists");
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
          const insertResult = await insertOne(new Collections().user, newUser);
          if (insertResult["acknowledged"] === true) {
            console.log("Insert successfully");
            try {
              const findResult = await findOne(new Collections().user, { username: newAccount.username });
              if (findResult) {
                console.log("Find successfully");
                resolve(findResult);
              }
              else {
                console.log("Find failed");
                reject("Cannot find user");
              }
            } catch (err) {
              console.log(err);
              reject(err);
            }
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
  const promise = new Promise(async (resolve, reject) => {
    try {
      // hash password
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(userChangeInfo.password, salt);

      // Set user's info
      userChangeInfo.password = hash;

      // Update information
      const updateResult = await updateOne(new Collections().user, { username: userChangeInfo.username }, userChangeInfo);
      if (updateResult["matchedCount"] === 0) {
        console.log("user not found!");
        reject("user not found!");

      } else {
        console.log("update sucessfully");
        try {
          const findResult = await findOne(new Collections().user, { username: userChangeInfo.username });
          if (findResult) {
            console.log("Find successfully");
            resolve(findResult);
          } else {
            console.log("Find failed");
            reject("Cannot find user");
          }
        } catch (err) {
          console.log(err);
          reject(err);
        }
      }
    } catch (err) {
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
  changeInfo,
};