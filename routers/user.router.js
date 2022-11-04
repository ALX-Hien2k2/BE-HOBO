const express = require("express");
const { getUserDetails, loginAcc, getUserList } = require("../repositories/UserRepositories");
const userRouter = express.Router();

//  Test get request
userRouter.get("/", (req, res) => {
  res.send("Hello from userRouter get");
});

//  Test post request
userRouter.post("/", (req, res) => {
  console.log("req.body", req.body);
  res.send("Hello from userRouter post");
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
    .then((status) => {
      res.send(status);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = userRouter;