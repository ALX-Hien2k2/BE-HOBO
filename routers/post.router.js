const express = require("express");
const {
  createPost,
  getRoomList,
  getPostDetails,
  approvePost,
} = require("../repositories/PostRepositories");

const postRouter = express.Router();

postRouter.get("info/:id", (req, res) => {
  const { id } = req.params;
  getPostDetails(id)
    .then((post) => {
      res.send(post);
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

postRouter.post("/approve/:id", (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  approvePost(id, userId)
    .then((data) => { })
    .catch((err) => { });
});

postRouter.get("/roomList", (req, res) => {
  const filter = req.body;
  console.log(filter);
  getRoomList(filter)
    .then((roomList) => {
      res.send(roomList);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = postRouter;