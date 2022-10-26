const express = require("express");
const rootRouter = express.Router();

rootRouter.use("/excelServices", require("./excelServices.router"));
module.exports = rootRouter;