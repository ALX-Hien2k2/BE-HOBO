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
        },
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

const loginAcc = async (userAccount) => {
  const promise = new Promise((resolve, reject) => {
    try {
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

      for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].userName == userAccount.userName && accounts[i].pwd == userAccount.pwd) {
          resolve("Login successfully");
        }
      }
      reject("Login failed");
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

module.exports = {
  getUserDetails, loginAcc, getUserList
};