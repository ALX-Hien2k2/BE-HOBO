const express = require("express");
const {
    getHotelDetail,
    changeHotelInfo,
    createHotel,
    deleteHotel,
} = require("../repositories/HotelRepositories");
const hotelRouter = express.Router();

hotelRouter.get("/info/:hotel_id", (req, res) => {
    const hotelId = req.params.hotel_id;
    getHotelDetail(hotelId)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

hotelRouter.post("/changehotelinfo", (req, res) => {
    const hotelChangeInfo = req.body;
    changeHotelInfo(hotelChangeInfo)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(400).send
        });
});

hotelRouter.post("/createhotel", (req, res) => {
    const newHotelInfo = req.body;
    createHotel(newHotelInfo)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.log("error 1")
            res.status(400).send(err);
        });
});

hotelRouter.delete("/deletehotel/:hotel_id", (req, res) => {
    const hotel_id = req.params.hotel_id;
    deleteHotel(hotel_id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

module.exports = hotelRouter;