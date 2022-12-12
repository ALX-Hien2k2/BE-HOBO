const { validateCheck } = require("../helps/ValidationBody");
const { infoToChange } = require("../helps/GetChangeInfo");
const Comment = require("../models/Comment");
const { findOne, findAll, insertOne, update_One, delete_One } = require("../services/DatabaseServices");
const Collections = require("../services/Collections");
const ObjectId = require('mongodb').ObjectId;

const createComment = async (newComment) => {
    return new Promise(async (resolve, reject) => {
        try {
            const findUserResult = await findOne(new Collections().user, { _id: ObjectId(newComment.userId) });
            const findHotelResult = await findOne(new Collections().hotel, { _id: ObjectId(newComment.hotelId) });
            if (!findUserResult || !findHotelResult) {
                console.log("User or Hotel not found");
                reject("User or Hotel not found");
            }
            else {
                newCmt = new Comment();
                newCmt.name = findUserResult.firstName + " " + findUserResult.lastName;
                newCmt.avatar = findUserResult.avatar;

                newCmt.setCommentInfo(newComment);
                try {
                    const insertCommentResult = await insertOne(new Collections().comment, newCmt);
                    if (insertCommentResult["acknowledged"] === false) {
                        console.log("Create comment fail");
                        reject("Create comment fail");
                    } else {
                        try {
                            const findCommentResult = await findOne(new Collections().comment, { _id: ObjectId(insertCommentResult["insertedId"]) });
                            if (!findCommentResult) {
                                console.log("Comment not found");
                                reject("Comment not found");
                            } else {
                                console.log("Create comment successfully");
                                resolve(findCommentResult);
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
            }
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

const getCommentsByHotelId = async (hotel_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const findHotelResult = await findOne(new Collections().hotel, { _id: ObjectId(hotel_id) });
            if (!findHotelResult) {
                console.log("Hotel not found");
                reject("Hotel not found");
            }
            else {
                console.log("Hotel found");
                const findCommentResult = await findAll(new Collections().comment, { hotelId: ObjectId(hotel_id), isHide: false });
                if (findCommentResult) {
                    console.log("findCommentResult", findCommentResult);
                    console.log("Get comments successfully");
                    resolve(findCommentResult);
                } else {
                    console.log("Comments not found");
                    reject("Comments not found");
                }
            }
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

const deleteComment = async (comment_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const deleteResult = await delete_One(new Collections().comment, { _id: ObjectId(comment_id) });
            if (deleteResult["deletedCount"] === 1) {
                console.log("Delete comment successfully");
                resolve("Delete comment successfully");
            }
            else if (deleteResult["deletedCount"] === 0) {
                console.log("Comment not found");
                reject("Comment not found");
            }
            else {
                console.log("Delete comment fail");
                reject("Delete comment fail");
            }
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

module.exports = {
    createComment,
    getCommentsByHotelId,
    deleteComment,
};