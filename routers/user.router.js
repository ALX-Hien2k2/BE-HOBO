const express = require("express");
const {
  getUserDetails,
  createUser,
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

userRouter.get("/:uid", (req, res) => {
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

module.exports = userRouter;
