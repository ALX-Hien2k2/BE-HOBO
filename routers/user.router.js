const express = require("express");
const {
  getUserDetails,
  signIn,
  signUp,
  changeUserInfo,
  changePassword,
  resetPassword,
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
      res.status(err.status).send(err);
    });
});

// Log in
userRouter.post("/signin", (req, res) => {
  console.log("sign in account", req.body);
  const userAccount = req.body;
  signIn(userAccount)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
});

// Sign up
userRouter.post("/signup", (req, res) => {
  const user = req.body;
  signUp(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
});

// Change user info
userRouter.post("/changeinfo", (req, res) => {
  const user = req.body;
  changeUserInfo(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
});

// Change password
userRouter.post("/changepassword", (req, res) => {
  const userChangePassword = req.body;
  changePassword(userChangePassword)
    .then((data) => {
      res.status(data.status).send(data);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
});

// Reset password
userRouter.post("/resetpassword", (req, res) => {
  const resetObj = req.body;
  resetPassword(resetObj)
    .then((status) => {
      res.send(status);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
});

module.exports = userRouter;