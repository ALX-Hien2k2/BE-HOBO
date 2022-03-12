const express = require("express");
const { excelServicesTest,excelServicesGetPurchaseOrder, upload, download, save } = require("../controllers/excelServices.controller");
const excelServicesRouters = express.Router();

excelServicesRouters.get("/",excelServicesTest);
excelServicesRouters.get("/getPurchaseOrder/:id",excelServicesGetPurchaseOrder);
module.exports = excelServicesRouters;