const express = require("express");
const {
  createPost,
  getRoomList,
  getPostDetails,
  approvePost,
} = require("../repositories/PostRepositories");

const postRouter = express.Router();

postRouter.get("/info/:id", (req, res) => {
  const post_id = req.params.id;
  getPostDetails(post_id)
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
      if (typeof err == "object") {
        res.status(400).send(err.message);
      }
      res.status(400).send(err);
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