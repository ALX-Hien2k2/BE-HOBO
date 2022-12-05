const express = require("express");
const mailRouter = require("./mail.router");
const postRouter = require("./post.router");
const userRouter = require("./user.router");
const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/post", postRouter);
rootRouter.use("/mail", mailRouter);
module.exports = rootRouter;
