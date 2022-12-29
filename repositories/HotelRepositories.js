const { findOne, findAll, update_One, insertOne, delete_One, delete_All } = require("../services/DatabaseServices");
const { validateCheck } = require("../helps/ValidationBody");
const Collections = require("../services/Collections");
const ObjectId = require('mongodb').ObjectId;
const { infoToChange } = require("../helps/GetChangeInfo");
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
                reject({
                    status: 404,
                    message: "Hotel not found"
                });
            }
        } catch (err) {
            console.log("err", err);
            reject({
                status: 400,
                message: err.message
            });
        }
    });
};

const changeHotelInfo = async (hotelChangeInfo) => {
    return new Promise(async (resolve, reject) => {
        try {
            const findResult = await findOne(new Collections().hotel, { _id: ObjectId(hotelChangeInfo.hotelId) });
            if (!findResult) {
                console.log("hotel not found");
                reject({
                    status: 404,
                    message: "Hotel not found"
                });
            } else {
                console.log("hotel found");
                const changeInfo = infoToChange(hotelChangeInfo);
                changeInfo.updatedDate = new Date().toLocaleString();
                console.log("changeInfo", changeInfo);
                try {
                    const updateResult = await update_One(new Collections().hotel, { _id: ObjectId(hotelChangeInfo.hotelId) }, changeInfo);
                    if (updateResult["acknowledged"] === true) {
                        console.log("Update successfully");
                        try {
                            const findResult = await findOne(new Collections().hotel, { _id: ObjectId(hotelChangeInfo.hotelId) });
                            if (findResult) {
                                console.log("Find successfully");
                                resolve(findResult);
                            }
                            else {
                                console.log("Find failed");
                                reject({
                                    status: 404,
                                    message: "Cannot find hotel"
                                });
                            }
                        } catch (err) {
                            console.log("err", err);
                            reject({
                                status: 400,
                                message: err.message
                            });
                        }
                    }
                    else {
                        console.log("Update failed");
                        reject({
                            status: 400,
                            message: "Update failed"
                        });
                    }
                } catch (err) {
                    console.log("err", err);
                    reject({
                        status: 400,
                        message: err.message
                    });
                }
            }
        } catch (err) {
            console.log("err", err);
            reject({
                status: 400,
                message: err.message
            });
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
                if (user.userType === 2) {
                    // Check if hotel owner already have a hotel
                    if (user.hotelId === null) {
                        newHotel = new Hotel();
                        console.log("Hotel_Id", newHotel._id);

                        newHotel.userId = ObjectId(newHotelInfo.userId);
                        newHotel.setInfo(newHotelInfo);

                        // Update user's hotelId
                        const updateUserResult = await update_One(new Collections().user, { _id: ObjectId(newHotelInfo.userId) }, { hotelId: newHotel._id, updatedDate: new Date().toLocaleString() });
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
                                    reject({
                                        status: 404,
                                        message: "Cannot find hotel"
                                    });
                                }
                            } else {
                                console.log("Insert new hotel failed");
                                reject({
                                    status: 400,
                                    message: "Create new hotel failed"
                                });
                            }
                        } else {
                            console.log("Update user's hotelId failed");
                            reject({
                                status: 400,
                                message: "Update user's hotelId failed"
                            });
                        }
                    } else {
                        console.log("User already have a hotel");
                        reject({
                            status: 400,
                            message: "User already have a hotel"
                        });
                    }
                } else {
                    console.log("User is not a hotel owner");
                    reject({
                        status: 400,
                        message: "User is not a hotel owner"
                    });
                }
            } else {
                console.log("User not found");
                reject({
                    status: 404,
                    message: "User not found"
                });
            }
        } catch (err) {
            console.log("err", err);
            reject({
                status: 400,
                message: err.message
            });
        }
    });
};

const deleteHotel = async (hotel_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const findHotelResult = await findOne(new Collections().hotel, { _id: ObjectId(hotel_id) });
            if (findHotelResult) {
                console.log("Hotel found");
                // Delete rooms
                const deleteRoomResult = await delete_All(new Collections().post, { hotelId: ObjectId(hotel_id) });
                console.log("Deleted rooms", deleteRoomResult["deletedCount"]);
                // Delete hotel
                const deleteHotelResult = await delete_One(new Collections().hotel, { _id: ObjectId(hotel_id) });
                if (deleteHotelResult["deletedCount"] === 1) {
                    console.log("Delete hotel successfully");
                    const updateUserHotelIdResult = await update_One(new Collections().user, { hotelId: ObjectId(hotel_id) }, { hotelId: null, updatedDate: new Date().toLocaleString() });
                    if (updateUserHotelIdResult["matchedCount"] === 1) {
                        console.log("Update user's hotelId successfully");
                        resolve("Delete hotel and update user's hotel_id successfully");
                    }
                    else {
                        console.log("Update user's hotelId failed");
                        reject({
                            status: 400,
                            message: "Delete hotel successfully but update user's hotel_id failed"
                        });
                    }
                }
                else {
                    console.log("Delete failed");
                    reject({
                        status: 400,
                        message: "Delete failed"
                    });
                }
            } else {
                console.log("Hotel not found");
                reject({
                    status: 404,
                    message: "Hotel not found"
                });
            }
        } catch (err) {
            console.log("err", err);
            reject({
                status: 400,
                message: err.message
            });
        }
    });
};

module.exports = {
    getHotelDetail,
    changeHotelInfo,
    createHotel,
    deleteHotel,
};