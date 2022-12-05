const express = require("express");
const {
    getHotelDetail,
    getHotelList,
    changeHotelInfo
} = require("../repositories/HotelRepositories");
const hotelRouter = express.Router();



module.exports = hotelRouter;