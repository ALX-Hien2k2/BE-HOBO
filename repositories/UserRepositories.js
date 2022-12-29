const { validateCheck, validateExistence } = require("../helps/ValidationBody");
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const { findOne, findAll, insertOne, update_One } = require("../services/DatabaseServices");
const Collections = require("../services/Collections");
const ObjectId = require('mongodb').ObjectId;

const getUserDetails = async (user_id) => {
  const promise = new Promise(async (resolve, reject) => {
    try {
      const userInfo = await findOne(new Collections().user, { _id: ObjectId(user_id) });
      if (userInfo) {
        console.log(userInfo);
        resolve(userInfo);
      } else {
        console.log("User not found");
        reject({
          status: 404,
          message: "User not found"
        });
      }
    } catch (err) {
      console.log("err", err);
      reject({
        status: 400,
        message: err.message
      });
    }
  });
  return promise;
};

const signIn = async (userAccount) => {
  const promise = new Promise(async (resolve, reject) => {
    try {
      const result = await findOne(new Collections().user, { username: userAccount.username });
      if (result) {
        console.log(result);
        console.log("username found");
        if (!bcrypt.compareSync(userAccount.password, result.password)) {
          console.log("Wrong password");
          reject({
            status: 400,
            message: "Wrong username or password"
          });
        } else {
          console.log("Sign in successfully");
          resolve(result);
        }
      }
      else {
        console.log("username not found");
        reject({
          status: 404,
          message: "Wrong username or password"
        });
      }
    } catch (err) {
      console.log("err", err);
      reject({
        status: 400,
        message: err.message
      });
    }
  });
  return promise;
};

const signUp = async (newAccount) => {
  const promise = new Promise(async (resolve, reject) => {
    try {
      console.log("newAccount", newAccount);
      // Validate
      validateCheck(
        {
          username: newAccount.username,
          email: newAccount.email,
          password: newAccount.password,
          phoneNumber: newAccount.phoneNumber,
          userType: newAccount.userType,
        },
        newAccount);

      // Check if username already exists
      if (await validateExistence(newAccount.username)) {
        console.log("username already exists");
        reject({
          status: 400,
          message: "username already exists"
        });
      }
      else {
        // Add info to User class
        const newUser = new User();
        console.log("User_Id", newUser._id);

        // hash password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newAccount.password, salt);

        // Set user's info
        newUser.password = hash;
        newUser.setInfo(newAccount);

        // Insert to database
        try {
          const insertUserResult = await insertOne(new Collections().user, newUser);
          if (insertUserResult["acknowledged"] === true) {
            console.log("Insert new user successfully");
            try {
              const findResult = await findOne(new Collections().user, { username: newAccount.username });
              if (findResult) {
                console.log("Find successfully");
                resolve(findResult);
              }
              else {
                console.log("Find failed");
                reject({
                  status: 404,
                  message: "Cannot find user"
                });
              }
            } catch (err) {
              console.log("err", err);
              reject({
                status: 400,
                message: err.message
              });
            }
          }
          else {
            console.log("Insert new user failed");
            reject({
              status: 404,
              message: "Sign up failed"
            });
          }
        } catch (err) {
          console.log("err", err);
          reject({
            status: 400,
            message: err.message
          });
        }
      }
    } catch (err) {
      console.log("err", err);
      reject({
        status: 400,
        message: err.message
      });
    }
  });
  return promise;
};

const changeUserInfo = async (userChangeInfo) => { // no update username, password
  const promise = new Promise(async (resolve, reject) => {
    try {
      // Update information
      userChangeInfo.updatedDate = new Date().toLocaleString();
      const updateResult = await update_One(new Collections().user, { username: userChangeInfo.username }, userChangeInfo);
      if (updateResult["matchedCount"] === 0) {
        console.log("user not found!");
        reject({
          status: 404,
          message: "user not found!"
        });

      } else {
        console.log("update sucessfully");
        try {
          const findResult = await findOne(new Collections().user, { username: userChangeInfo.username });
          if (findResult) {
            console.log("Find successfully");
            resolve(findResult);
          } else {
            console.log("Find failed");
            reject({
              status: 404,
              message: "Cannot find user"
            });
          }
        } catch (err) {
          console.log("err", err);
          reject({
            status: 400,
            message: err.message
          });
        }
      }
    } catch (err) {
      console.log("err", err);
      reject({
        status: 400,
        message: err.message
      });
    }
  });
  return promise;
};

const changePassword = async (userChangePassword) => {
  return new Promise(async (resovle, reject) => {
    try {
      const result = await findOne(new Collections().user, { _id: ObjectId(userChangePassword["_id"]) });
      if (result) {
        console.log("user found");
        if (!bcrypt.compareSync(userChangePassword.old_password, result.password)) {
          console.log("Wrong password");
          reject({
            status: 400,
            message: "Wrong password"
          });
        }
        else {
          // hash password
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(userChangePassword.new_password, salt);

          const updatePassword = await update_One(new Collections().user, { _id: ObjectId(userChangePassword["_id"]) }, { password: hash, updatedDate: new Date().toLocaleString() });
          if (updatePassword["matchedCount"] === 0) {
            console.log("user not found!");
            reject({
              status: 404,
              message: "Update password failed!"
            });
          } else {
            console.log("Update password successfully");
            resovle({
              status: 200,
              message: "Update password successfully"
            });
          }
        }
      } else {
        console.log("user not found");
        reject({
          status: 404,
          message: "User not found"
        });
      }
    } catch (err) {
      console.log("err", err);
      reject({
        status: 400,
        message: err.message
      });
    }
  });
};

const resetPassword = async (resetObj) => {
  return new Promise(async (resovle, reject) => {
    try {
      const findResult = await findOne(new Collections().user, { username: resetObj.username });
      if (!findResult) {
        console.log("user not found!");
        reject({
          status: 404,
          message: "User not found!"
        });
      }
      else if (!findResult.confirmCode || (findResult.confirmCode !== resetObj.confirmCode)) {
        console.log("Wrong confirm code!");
        reject({
          status: 400,
          message: "Wrong confirm code!"
        });
      }
      else {
        console.log("user found");
        // hash password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(resetObj.resetpassword, salt);

        const updateResult = await update_One(new Collections().user, { username: resetObj.username }, { password: hash, updatedDate: new Date().toLocaleString() });
        if (updateResult["matchedCount"] === 0) {
          console.log("user not found!");
          reject({
            status: 404,
            message: "Update password failed!"
          });
        } else {
          console.log("Reset password successfully");
          resovle({
            status: 200,
            message: "Reset password successfully"
          });
        }
      }
    } catch (err) {
      console.log("err", err);
      reject({
        status: 400,
        message: err.message
      });
    }
  });
};

module.exports = {
  getUserDetails,
  signIn,
  signUp,
  changeUserInfo,
  changePassword,
  resetPassword,
};