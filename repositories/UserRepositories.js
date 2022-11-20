const { validateCheck } = require("../helps/ValidationBody");
const uuid = require("uuid");
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const { findOne, collection } = require("../services/DatabaseServices");
const Collections = require("../services/Collections");


const getUserDetails = async (userID) => {
  const promise = new Promise((resolve, reject) => {
    try {
      // Search for user's info in db using uid
      // If not found, raise alert and return
      // If found, return user's info

      // Find and load data from db
      const userInfo = {
        username: "trchihien",
        email: "chihien2002@gmail.com",
        password: "$2a$10$Atjn8VUd7GP79H4O9odzhOR6pQP1tmd04uv8Ctj/SKjQI7CwVydau",
        firstName: "Hien",
        lastName: "Truong",
        userType: 1,
        dob: "15/04/2002",
        licenseNumber: null,
        phoneNumber: "0795907075",
        history: null,
        hotelName: null,
        hotelAddress: null
      };

      // reutrn user's info
      resolve(userInfo);
    } catch (err) {
      reject(err);
    }
  });
  return promise;
};

const getUserList = async () => {
  const promise = new Promise((resolve, reject) => {
    try {
      // Load user's list from db
      const userList = [
        {
          username: "trchihien",
          email: "chihien2002@gmail.com",
          password: "$2a$10$Atjn8VUd7GP79H4O9odzhOR6pQP1tmd04uv8Ctj/SKjQI7CwVydau",
          firstName: "Hien",
          lastName: "Truong",
          userType: 1,
          dob: "15/04/2002",
          licenseNumber: null,
          phoneNumber: "0795907075",
          history: null,
          hotelName: null,
          hotelAddress: null
        },
        {
          username: "dominhtri",
          email: "dominhtri@gmail.com",
          password: "$2a$10$yZ.mUQEV8nooZAK428rD0eG3WTc8q/A7oAHw4Oz4mKTswooSEdHiO",
          firstName: "Tri",
          lastName: "Do",
          userType: 1,
          dob: "10/9/2002",
          licenseNumber: null,
          phoneNumber: "1111111111",
          history: null,
          hotelName: null,
          hotelAddress: null
        },
        {
          username: "daodaihai",
          email: "daodaihai@gmail.com",
          password: "$2a$10$tzrSv/jst4/xyFhDSsycGOWjTLf4ds6Vfm.YeWSpvy9/EDTArWqbC",
          firstName: "Hai",
          lastName: "Dao",
          userType: 1,
          dob: "14/02/2002",
          licenseNumber: null,
          phoneNumber: "222222222",
          history: null,
          hotelName: null,
          hotelAddress: null
        }
      ];

      // Return user's list
      resolve(userList);
    } catch (err) {
      reject(err);
    }
  });
  return promise;
};

const signInAcc = async (userAccount) => {
  const promise = new Promise((resolve, reject) => {
    try {
      const result = findOne(new Collections().user, { username: userAccount.username });
      console.log("result", result);
      // Search for user's info in db using username
      // If not found (db return NULL), raise alert and return
      // reject("Wrong userName or password");
      // If found, check password
      // Load data from db
      const userInfo = { // Example if username is found
        username: "trchihien",
        email: "chihien2002@gmail.com",
        password: "$2a$10$/ndtbU6L7EAJN29cVzzNuuTPzyNTELSLV44ns/HrIjrGziqi38MVS",
        firstName: "Hien",
        lastName: "Truong",
        userType: 1,
        dob: "15/04/2002",
        licenseNumber: null,
        phoneNumber: "0795907075",
        history: null,
        hotelName: null,
        hotelAddress: null
      };

      // Validate password
      if (!bcrypt.compareSync(userAccount.password, userInfo.password)) {
        reject("Wrong userName or password");
      }
      // If password is correct, return "login successfully"
      resolve("Login successfully");
    } catch (err) {
      reject(err);
    }
  });
  return promise;
};

const signUpAcc = async (signupAccount) => {

  console.log("signupAccount", signupAccount);

  const promise = new Promise((resolve, reject) => {
    try {
      // Validate
      // Login in client will have 2 pages: (Idea)
      // 1st page. Fill general info (Must have info of username.password.userType)
      // 2nd page. Depend on userType, if userType == 2, fill hotel owner info (Must have info of licenseNumber)
      // => Dont need validateCheck
      // => Send to server user's info (type == 2: includes hotel info)
      validateCheck(
        {
          username: signupAccount.username,
          password: signupAccount.password,
          userType: signupAccount.userType,
        },
        signupAccount);

      // Check if username already exist in db
      // If exist, raise alert and return
      // reject("Account already exist!");
      // If not exist, create info and add to db

      const newUser = new User();

      // hash password
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(signupAccount.password, salt);
      newUser.password = hash;

      newUser.setGeneralInfo(signupAccount);

      if (signupAccount.userType === newUser.getTypeUser().Hotel) {
        validateCheck(
          {
            licenseNumber: signupAccount.licenseNumber,
            hotelName: signupAccount.hotelName,
            hotelPhoneNumber: signupAccount.hotelPhoneNumber,
            hotelAddress: signupAccount.hotelAddress,
          },
          signupAccount
        );
      }

      newUser.setHotelOwnerInfo(signupAccount);

      // save to db
      // db will return uid of that new user
      // send uid and user's info to client

      resolve(newUser);
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


      // Option 2: Update only changed info
      // Client only send changed info to server

      // Find and load data from db
      const updated_Info = {
        username: "trchihien",
        email: "chihien2002@gmail.com",
        password: "$2a$10$Atjn8VUd7GP79H4O9odzhOR6pQP1tmd04uv8Ctj/SKjQI7CwVydau",
        firstName: "Hien",
        lastName: "Truong",
        userType: 1,
        dob: "15/04/2002",
        licenseNumber: null,
        phoneNumber: "0795907075",
        history: null,
        hotelName: null,
        hotelAddress: null
      };

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