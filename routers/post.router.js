const express = require("express");
const { createPost } = require("../repositories/PostRepositories");
const {
  getUserDetails,
  createUser,
} = require("../repositories/UserRepositories");
const postRouter = express.Router();

postRouter.get("/:uid", (req, res) => {
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

postRouter.post("/createPost", (req, res) => {
  const user = req.body;
  createPost(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log("err", err);
      res.status(400).send(err.message);
    });
});

module.exports = postRouter;
