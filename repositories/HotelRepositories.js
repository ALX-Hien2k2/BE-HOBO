const { findOne, findAll, update_One } = require("../services/DatabaseServices");
const Collections = require("../services/Collections");
const ObjectId = require('mongodb').ObjectId;

const getHotelDetail = async (hotel_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hotelInfo = await findOne(new Collections().hotel, { _id: ObjectId(hotel_id) });
            if (hotelInfo) {
                resolve(hotelInfo);
            }
            else {
                console.log("Hotel not found");
                reject("Hotel not found");
            }
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

const getHotelList = async (filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hotelList = await findAll(new Collections().hotel, filter, {
                hotelName: 1,
                hotelAddress: 1,
                hotelPhoneNumber: 1,
                starNumber: 1,
                descriptionImage: 1
            });

            if (hotelList) {
                resolve(hotelList);
            }
            else {
                console.log("hotelList not found");
                reject("hotelList not found");
            }
        } catch (err) {
            reject(err);
        }
    });
};

const changeHotelInfo = async (hotelChangeInfo) => {
    return new Promise(async (resolve, reject) => {
        try {
            const findResult = await findOne(new Collections().hotel, { _id: ObjectId(hotelChangeInfo._id) });
            if (!findResult) {
                console.log("hotel not found");
                reject("hotel not found");
            } else {
                console.log("hotel found");
                const changeInfo = infoToChange(hotelChangeInfo);
                console.log("changeInfo", changeInfo);
                try {
                    const updateResult = await update_One(new Collections().hotel, { _id: ObjectId(hotelChangeInfo._id) }, changeInfo);
                    if (updateResult["acknowledged"] === true) {
                        console.log("Update successfully");
                        try {
                            const findResult = await findOne(new Collections().hotel, { _id: ObjectId(hotelChangeInfo._id) });
                            if (findResult) {
                                console.log("Find successfully");
                                resolve(findResult);
                            }
                            else {
                                console.log("Find failed");
                                reject("Cannot find hotel");
                            }
                        } catch (err) {
                            console.log(err);
                            reject(err);
                        }
                    }
                    else {
                        console.log("Update failed");
                        reject("Update failed");
                    }
                } catch (err) {
                    console.log(err);
                    reject(err);
                }
            }
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

module.exports = {
    getHotelDetail,
    getHotelList,
    changeHotelInfo
};
