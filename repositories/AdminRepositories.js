const { validateCheck } = require("../helps/ValidationBody");
const { infoToChange } = require("../helps/GetChangeInfo");
const { findOne, findAll, update_One } = require("../services/DatabaseServices");
const Collections = require("../services/Collections");
const ObjectId = require('mongodb').ObjectId;

const getUserList_Admin = async () => {
    const promise = new Promise(async (resolve, reject) => {
        try {
            const userList = await findAll(new Collections().user, {});
            if (userList) {
                console.log("userList ", userList);
                resolve(userList);
            }
            else {
                console.log("userList not found");
                reject({
                    status: 404,
                    message: "userList not found"
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
    return promise;
};

const getHotelList_Admin = async (filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hotelList = await findAll(new Collections().hotel, filter, {});

            // const hotelList = await findAll(new Collections().hotel, filter, {
            //     hotelName: 1,
            //     hotelAddress: 1,
            //     hotelPhoneNumber: 1,
            //     starNumber: 1,
            //     descriptionImage: 1
            // });

            if (hotelList) {
                resolve(hotelList);
            }
            else {
                console.log("hotelList not found");
                reject({
                    status: 404,
                    message: "hotelList not found"
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

const getPostList_Admin = async (filter) => {
    const promise = new Promise(async (resolve, reject) => {
        console.log("filter:", filter);
        try {
            const postList = await findAll(new Collections().post, filter, {});

            if (postList) {
                resolve(postList);
            }
            else {
                console.log("roomList not found");
                reject({
                    status: 404,
                    message: "roomList not found"
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
    return promise;
};

const getPostListByHotelId_Admin = async (hotel_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const postList = await findAll(new Collections().post, { hotelId: ObjectId(hotel_id) }, {});

            if (postList) {
                resolve(postList);
            }
            else {
                console.log("roomList not found");
                reject({
                    status: 404,
                    message: "roomList not found"
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

const getCommentList_Admin = async (filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const commentList = await findAll(new Collections().comment, filter, {});
            if (commentList) {
                console.log("CommentList found")
                resolve(commentList);
            }
            else {
                console.log("commentList not found");
                reject({
                    status: 404,
                    message: "commentList not found"
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

const approvePost = async (post_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const findPostResult = await findOne(new Collections().post, { _id: ObjectId(post_id) });
            if (!findPostResult) {
                console.log("Post not found");
                reject({
                    status: 404,
                    message: "Post not found"
                });
            } else {
                if (findPostResult.isApproved === false) {
                    const updateResult = await update_One(new Collections().post, { _id: ObjectId(post_id) }, { isApproved: true });
                    if (updateResult["matchedCount"] === 1) {
                        console.log("Approve post successfully");
                        resolve("Approve post successfully");
                    }
                    else {
                        console.log("Approve post failed");
                        reject({
                            status: 400,
                            message: "Approve post failed"
                        });
                    }
                } else {
                    console.log("Post is already approved");
                    reject({
                        status: 400,
                        message: "Post is already approved"
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

const disapprovePost = async (post_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const findPostResult = await findOne(new Collections().post, { _id: ObjectId(post_id) });
            if (!findPostResult) {
                console.log("Post not found");
                reject({
                    status: 404,
                    message: "Post not found"
                });
            } else {
                if (findPostResult.isApproved === true) {
                    const updateResult = await update_One(new Collections().post, { _id: ObjectId(post_id) }, { isApproved: false });
                    if (updateResult["matchedCount"] === 1) {
                        console.log("Disapprove post successfully");
                        resolve("Disapprove post successfully");
                    }
                    else {
                        console.log("Disapprove post failed");
                        reject({
                            status: 400,
                            message: "Disapprove post failed"
                        });
                    }
                } else {
                    console.log("Post is already disapproved");
                    reject({
                        status: 400,
                        message: "Post is already disapproved"
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

const hideComment = async (comment_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const findCommentResult = await findOne(new Collections().comment, { _id: ObjectId(comment_id) });
            if (!findCommentResult) {
                console.log("Comment not found");
                reject({
                    status: 404,
                    message: "Comment not found"
                });
            } else {
                if (findCommentResult.isHide === false) {
                    const updateResult = await update_One(new Collections().comment, { _id: ObjectId(comment_id) }, { isHide: true });
                    if (updateResult["matchedCount"] === 1) {
                        console.log("Hide comment successfully");
                        resolve("Hide comment successfully");
                    } else {
                        console.log("Hide comment failed");
                        reject({
                            status: 400,
                            message: "Hide comment failed"
                        });
                    }
                } else {
                    console.log("Comment is already hidden");
                    reject({
                        status: 400,
                        message: "Comment is already hidden"
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

const showComment = async (comment_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const findCommentResult = await findOne(new Collections().comment, { _id: ObjectId(comment_id) });
            if (!findCommentResult) {
                console.log("Comment not found");
                reject({
                    status: 404,
                    message: "Comment not found"
                });
            } else {
                if (findCommentResult.isHide === true) {
                    const updateResult = await update_One(new Collections().comment, { _id: ObjectId(comment_id) }, { isHide: false });
                    if (updateResult["matchedCount"] === 1) {
                        console.log("Show comment successfully");
                        resolve("Show comment successfully");
                    } else {
                        console.log("Show comment failed");
                        reject({
                            status: 400,
                            message: "Show comment failed"
                        });
                    }
                } else {
                    console.log("Comment is already Showed");
                    reject({
                        status: 400,
                        message: "Comment is already Showed"
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

module.exports = {
    getUserList_Admin,
    getHotelList_Admin,
    getPostList_Admin,
    getPostListByHotelId_Admin,
    getCommentList_Admin,
    approvePost,
    disapprovePost,
    showComment,
    hideComment
};