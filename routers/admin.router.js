const express = require("express");
const {
    getUserList_Admin,
    getHotelList_Admin,
    getPostList_Admin,
    getPostListByHotelId_Admin,
    getCommentList_Admin,
    approvePost,
    disapprovePost,
    showComment,
    hideComment,
} = require("../repositories/AdminRepositories");

const adminRouter = express.Router();

// Get users list
adminRouter.get("/userlist", (req, res) => {
    getUserList_Admin()
        .then((userList) => {
            res.send(userList);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

adminRouter.get("/hotellist", (req, res) => {
    getHotelList_Admin()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

adminRouter.get("/postlist", (req, res) => {
    const filter = req.body;
    console.log(filter);
    getPostList_Admin(filter)
        .then((postList) => {
            res.send(postList);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

adminRouter.get("/postlist/:hotel_id", (req, res) => {
    const hotel_id = req.params.hotel_id;
    console.log(hotel_id);
    getPostListByHotelId_Admin(hotel_id)
        .then((postList) => {
            res.send(postList);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

adminRouter.get("/commentlist", (req, res) => {
    const filter = req.body;
    console.log(filter);
    getCommentList_Admin(filter)
        .then((commentList) => {
            res.send(commentList);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

adminRouter.patch("/approvepost/:post_id", (req, res) => {
    const approve_post_id = req.params.post_id;
    approvePost(approve_post_id)
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

adminRouter.patch("/disapprovepost/:post_id", (req, res) => {
    const disapprove_post_id = req.params.post_id;
    disapprovePost(disapprove_post_id)
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

adminRouter.patch("/showcomment/:comment_id", (req, res) => {
    const show_cmt_id = req.params.comment_id;
    showComment(show_cmt_id)
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

adminRouter.patch("/hidecomment/:comment_id", (req, res) => {
    const hide_cmt_id = req.params.comment_id;
    hideComment(hide_cmt_id)
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

module.exports = adminRouter;