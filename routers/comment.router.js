const express = require("express");
const {
    createComment,
    getCommentsByHotelId,
    deleteComment,
} = require("../repositories/CommentRepositories");

const commentRouter = express.Router();

commentRouter.post("/createcomment", async (req, res) => {
    const newComment = req.body;
    console.log(newComment);
    createComment(newComment)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(err.status).send(err);
        });
});

commentRouter.get("/commentlistbyhotel/:hotel_id", async (req, res) => {
    console.log("commentlistbyhotel called");
    const hotelId = req.params.hotel_id;
    console.log("hotelId", hotelId);
    getCommentsByHotelId(hotelId)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(err.status).send(err);
        });
});

commentRouter.delete("/deletecomment/:comment_id", async (req, res) => {
    const commentId = req.params.comment_id;
    console.log("commentId", commentId);
    deleteComment(commentId)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(err.status).send(err);
        });
});

module.exports = commentRouter;