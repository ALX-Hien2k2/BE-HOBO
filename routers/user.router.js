const express = require("express");
const {
  getUserDetails,
  signInAcc,
  getUserList,
  signUpAcc,
  changeInfo
} = require("../repositories/UserRepositories");
const userRouter = express.Router();

//  Test get request
userRouter.get("/", (req, res) => {
  res.send("Hello from userRouter");
});
//  Test post request
userRouter.post("/", (req, res) => {
  console.log("req.body", req.body);
  res.send("Hello from userRouter");
});

// Get user info
userRouter.get("/info/:uid", (req, res) => {
  const user_id = req.params.uid;
  getUserDetails(user_id)
    .then((userInfo) => {
      res.send(userInfo);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// Get users list
userRouter.get("/list", (req, res) => {
  getUserList()
    .then((userList) => {
      res.send(userList);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// Log in
userRouter.post("/signin", (req, res) => {
  console.log("sign in account", req.body);
  const userAccount = req.body;
  signInAcc(userAccount)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (typeof err == "object") {
        res.status(400).send(err.message);
      }
      res.status(400).send(err);
    });
});

// Sign up
userRouter.post("/signup", (req, res) => {
  const user = req.body;
  signUpAcc(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (typeof err == "object") {
        res.status(400).send(err.message);
      }
      else {
        res.status(400).send(err);
      }
    });
});

// Change user info
userRouter.post("/changeinfo", (req, res) => {
  const user = req.body;
  changeInfo(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (typeof err == "string") {
        res.status(400).send(err);
      }
      else {
        res.status(400).send(err.message);
      }
    });
});

module.exports = userRouter;