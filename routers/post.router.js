const express = require("express");
const {
  createPost,
  getPostList,
  getPostListByHotelId,
  getPostListByHotelId_Except,
  getPostDetail,
  changePostInfo,
  deletePost,
} = require("../repositories/PostRepositories");

const postRouter = express.Router();

postRouter.get("/info/:id", (req, res) => {
  const post_id = req.params.id;
  getPostDetail(post_id)
    .then((post) => {
      res.send(post);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
});

postRouter.get("/postlist", (req, res) => {
  const filter = req.body;
  console.log(filter);
  getPostList(filter)
    .then((postList) => {
      res.send(postList);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
});

postRouter.get("/postlist/:hotel_id", (req, res) => {
  const hotel_id = req.params.hotel_id;
  console.log(hotel_id);
  getPostListByHotelId(hotel_id)
    .then((postList) => {
      res.send(postList);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
});

postRouter.get("/postlistexcept", (req, res) => {
  const { hotel_id, post_id } = req.body;
  console.log("hotel_id", hotel_id);
  console.log("post_id", post_id);
  getPostListByHotelId_Except(hotel_id, post_id)
    .then((postList) => {
      res.send(postList);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
});

postRouter.post("/createpost", (req, res) => {
  const post = req.body;
  createPost(post)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
});

postRouter.post("/changeinfo", (req, res) => {
  const postInfo = req.body;
  changePostInfo(postInfo)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
});

postRouter.delete("/deletepost/:postid", (req, res) => {
  const postid = req.params.postid;
  deletePost(postid)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
});

module.exports = postRouter;