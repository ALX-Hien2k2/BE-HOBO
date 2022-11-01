const express = require("express");
const { getUserDetails } = require("../repositories/UserRepositories");
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

module.exports = userRouter;
