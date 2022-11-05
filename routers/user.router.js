const express = require("express");
const {
  getUserDetails,
  createUser,
  loginAcc,
  getUserList,
  signupAcc,
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
  const userId = req.params.uid;
  console.log("userId", userId);

  getUserDetails(userId)
    .then((user) => {
      res.send(user);
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

// Login
userRouter.post("/login", (req, res) => {
  console.log("req.body", req.body);
  const userAccount = req.body;

  loginAcc(userAccount)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (typeof err == "object") {
        console.log("err", err);
        res.status(400).send(err.message);
      }
      else {
        console.log("err", err);
        res.status(400).send(err);
      }

    });
});

// Sign up
userRouter.post("/signup", (req, res) => {
  console.log("req.body", req.body);
  const signupAccount = req.body;

  signupAcc(signupAccount)
    .then((status) => {
      res.send(status);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

userRouter.post("/createUser", (req, res) => {
  const user = req.body;
  createUser(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log("err", err);
      res.status(400).send(err.message);
    });
});

// Change user info
userRouter.post("/changeInfo", (req, res) => {
  const user = req.body;
  changeInfo(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log("err", err);
      res.status(400).send(err.message);
    });
});

module.exports = userRouter;