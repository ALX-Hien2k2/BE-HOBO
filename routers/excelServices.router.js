const express = require("express");
const { excelServicesTest } = require("../controllers/excelServices.controller");
const excelServicesRouters = express.Router();

excelServicesRouters.get("/",excelServicesTest);
module.exports = excelServicesRouters;