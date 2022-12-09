const express = require("express");
const {
    getHotelDetail,
    getHotelList,
    changeHotelInfo,
    createHotel
} = require("../repositories/HotelRepositories");
const hotelRouter = express.Router();

hotelRouter.get("/info/:id", (req, res) => {
    const hotel_id = req.params.id;
    getHotelDetail(hotel_id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

hotelRouter.get("/hotellist", (req, res) => {
    getHotelList()
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
            res.status(400).send(err);
        });
});

module.exports = hotelRouter;