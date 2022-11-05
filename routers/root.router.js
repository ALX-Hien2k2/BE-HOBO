const express = require("express");
const postRouter = require("./post.router");
const userRouter = require("./user.router");
const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/post", postRouter);
module.exports = rootRouter;
