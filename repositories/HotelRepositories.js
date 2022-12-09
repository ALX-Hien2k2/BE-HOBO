const { findOne, findAll, update_One, insertOne } = require("../services/DatabaseServices");
const { validateCheck } = require("../helps/ValidationBody");
const Collections = require("../services/Collections");
const ObjectId = require('mongodb').ObjectId;
const infoToChange = require("../helps/GetChangeInfo");
const Hotel = require("../models/Hotel");


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

const createHotel = async (newHotelInfo) => {
    return new Promise(async (resolve, reject) => {
        // Create a hotel for hotel owner
        validateCheck(
            {
                userId: newHotelInfo.userId,
                licenseNumber: newHotelInfo.licenseNumber,
                hotelName: newHotelInfo.hotelName,
                hotelAddress: newHotelInfo.hotelAddress,
                hotelPhoneNumber: newHotelInfo.hotelPhoneNumber,
            },
            newHotelInfo);

        // Check if user exists
        try {
            const user = await findOne(new Collections().user, { _id: ObjectId(newHotelInfo.userId) });
            if (user) {
                // Check if user is a hotel owner
                if (user.userType === "hotelOwner") {
                    // Check if hotel owner already have a hotel
                    if (user.hotelId === null) {
                        newHotel = new Hotel();
                        console.log("Hotel_Id", newHotel._id);

                        newHotel.userId = ObjectId(newHotelInfo.userId);
                        newHotel.setInfo(newHotelInfo);

                        // Update user's hotelId
                        const updateUserResult = await update_One(new Collections().user, { _id: ObjectId(newHotelInfo.userId) }, { hotelId: newHotel._id });
                        if (updateUserResult["acknowledged"] === true) {
                            console.log("Update user's hotelId successfully");
                            // Add hotel's info to database
                            const insertHotelResult = await insertOne(new Collections().hotel, newHotel);
                            if (insertHotelResult["acknowledged"] === true) {
                                console.log("Insert new hotel successfully");

                                const findResult = await findOne(new Collections().hotel, { _id: ObjectId(newHotel._id) });
                                if (findResult) {
                                    console.log("Find successfully");
                                    resolve(findResult);
                                }
                                else {
                                    console.log("Find failed");
                                    reject("Cannot find hotel");
                                }
                            } else {
                                console.log("Insert new hotel failed");
                                reject("Create new hotel failed");
                            }
                        } else {
                            console.log("Update user's hotelId failed");
                            reject("Update user's hotelId failed");
                        }
                    } else {
                        console.log("User already have a hotel");
                        reject("User already have a hotel");
                    }
                } else {
                    console.log("User is not a hotel owner");
                    reject("User is not a hotel owner");
                }
            } else {
                console.log("User not found");
                reject("User not found");
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
    changeHotelInfo,
    createHotel,
};