const express = require("express");
const commentRouter = require("./comment.router");
const adminRouter = require("./admin.router");
const hotelRouter = require("./hotel.router");
const mailRouter = require("./mail.router");
const postRouter = require("./post.router");
const userRouter = require("./user.router");
const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/post", postRouter);
rootRouter.use("/mail", mailRouter);
rootRouter.use("/hotel", hotelRouter);
rootRouter.use("/admin", adminRouter);
rootRouter.use("/comment", commentRouter);
module.exports = rootRouter;
