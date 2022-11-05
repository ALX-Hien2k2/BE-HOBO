const User = require("../models/User");

const getUserDetails = async (userId) => {
  const promise = new Promise((resolve, reject) => {
    try {
      const users = [
        {
          id: 20127494,
          name: "Truong Chi Hien",
        },
        {
          id: 20127651,
          name: "Do Minh Tri",
        },
        {
          id: 20127016,
          name: "Hai Baby",
        }
      ];
      users.map((member) => {
        if (member.id == userId) {
          resolve(member);
        }
      });
      reject("User does not exist");
    } catch (err) {
      reject(err);
    }
  });
  return promise;
};

const getUserList = async () => {
  const promise = new Promise((resolve, reject) => {
    try {
      const users = [
        {
          id: 20127494,
          name: "Truong Chi Hien",
        },
        {
          id: 20127651,
          name: "Do Minh Tri",
        },
        {
          id: 20127016,
          name: "Hai Baby",
        },
      ];
      resolve(users);
    } catch (err) {
      reject(err);
    }
  });
  return promise;
};

const loginAcc = async (userAccount) => {
  const require = (attr) => {
    console.log("attr", attr);
    Object.keys(attr).forEach((key) => {
      console.log("key", key, "attr[key]", attr[key]);
      if (userAccount[key] === undefined) {
        console.log("Throw");
        throw new Error(`${key} is required`);
      }
    });
  };

  const promise = new Promise((resolve, reject) => {
    try {
      // Represent data in db
      const accounts = [
        {
          userName: "trchihien2002",
          pwd: "12345"
        },
        {
          userName: "dominhtri",
          pwd: "zxcv"
        },
        {
          userName: "haibabycute",
          pwd: "xxxx"
        }
      ];

      // Validate
      require({
        userName: userAccount.userName,
        pwd: userAccount.pwd
      });

      // Compare with account in db
      for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].userName == userAccount.userName && accounts[i].pwd == userAccount.pwd) {
          // Match
          resolve("Login successfully");
        }
      }
      // Not found
      reject("Login failed");
    } catch (err) {
      reject(err);
    }
  });
  return promise;
};

const signupAcc = async (signupAccount) => {
  const promise = new Promise((resolve, reject) => {
    try {
      const fs = require('fs');
      fs.readFile('./accounts.json', 'utf-8', (err, jsonString) => {
        if (err) {
          console.log(err);
        }
        else {
          try {
            let list = JSON.parse(jsonString);
            console.log(list.accounts);
            for (let i = 0; i < list.accounts.length; i++) {
              if (list.accounts[i].userName == signupAccount.userName) {
                reject("Account already exist!");
                return;
              }
            }
            list.accounts.push(signupAccount);
            fs.writeFile('./accounts.json', JSON.stringify(list, null, 2), (err) => {
              if (err) {
                console.log(err);
                reject(err);
              } else {
                console.log("File successfully written");
                resolve("Sign up successfully");
              }
            });
          } catch (err) {
            reject("Error parsing JSON", err);
          }
        }
      });
    } catch (err) {
      reject(err);
    }
  });
  return promise;
};

const createUser = async (user) => {
  console.log("user", user);
  const require = (attr) => {
    console.log("attr", attr);
    Object.keys(attr).forEach((key) => {
      console.log("key", key, "attr[key]", attr[key]);
      if (user[key] === undefined) {
        throw new Error(`${key} is required`);
      }
    });
  };
  const promise = new Promise((resolve, reject) => {
    try {
      // Validate
      const newUser = new User();
      require({
        username: user.username,
        password: user.password,
        userType: user.userType,
      });
      newUser.username = user.username;
      newUser.email = user.email;
      newUser.password = user.password;
      newUser.firstName = user.firstName || null;
      newUser.lastName = user.lastName || null;
      newUser.userType = user.userType;
      newUser.dob = user.dob || null;
      if (user.userType === newUser.getTypeUser().Hotel) {
        console.log("user.userType", user.userType);
        require({
          licenseNumber: user.licenseNumber,
          phoneNumber: user.phoneNumber,
          hotelName: user.hotelName,
          hotelAddress: user.hotelAddress,
        });
      }
      newUser.licenseNumber = user.licenseNumber || null;
      newUser.phoneNumber = user.phoneNumber || null;
      newUser.history = user.history || null;
      newUser.hotelName = user.hotelName || null;
      newUser.hotelAddress = user.hotelAddress || null;

      // save to db

      resolve(newUser);
    } catch (err) {
      reject(err);
    }
  });
  return promise;
};

const changeInfo = async (userInfo) => {
  const promise = new Promise((resolve, reject) => {
    // Có thể quy định các thuộc tính nào được phép đổi

    // const require = (attr) => {
    //   console.log("attr", attr);
    //   Object.keys(attr).forEach((key) => {
    //     console.log("key", key, "attr[key]", attr[key]);
    //     if (user[key] === undefined) {
    //       throw new Error(`${key} is required`);
    //     }
    //   });
    // };

    try {
      const A_info = {
        username: "trchihien",
        email: "chihien2002@gmail.com",
        password: "123",
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
      const user = new User();
      user.setInfo(A_info);
      console.log(user);

      console.log("userInfo", userInfo);
      Object.keys(userInfo).forEach((key) => {
        // console.log("key", key, "this.key", user[key], "obj[key]", userInfo[key]);
        user[key] = userInfo[key]
      });

      console.log(user);
      resolve(user);
    } catch (error) {
      reject(err);
    }
  });
  return promise;
};

module.exports = {
  getUserDetails,
  createUser,
  loginAcc,
  getUserList,
  signupAcc,
  changeInfo
};