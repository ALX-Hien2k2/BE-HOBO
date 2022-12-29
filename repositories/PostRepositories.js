const { validateCheck } = require("../helps/ValidationBody");
const { infoToChange } = require("../helps/GetChangeInfo");
const Post = require("../models/Post");
const { findOne, findAll, insertOne, update_One, delete_One } = require("../services/DatabaseServices");
const Collections = require("../services/Collections");
const ObjectId = require('mongodb').ObjectId;

// Get post detail that is approved (isApproved: true)
const getPostDetail = async (post_id) => {
  const promise = new Promise(async (resolve, reject) => {
    try {
      const postInfo = await findOne(new Collections().post, { _id: ObjectId(post_id), isApproved: true });
      if (postInfo) {
        console.log("postInfo", postInfo);
        resolve(postInfo);
      }
      else {
        console.log("Post not found");
        reject({
          status: 404,
          message: "Post not found"
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

const getPostList = async (filter) => {
  const promise = new Promise(async (resolve, reject) => {
    console.log("filter before: ", filter);
    filter["isApproved"] = true;
    console.log("filter after: ", filter);
    try {
      const postList = await findAll(new Collections().post, filter, {
        _id: 1,
        hotelId: 1,
        roomName: 1,
        hotelName: 1,
        location: 1,
        price: 1,
        quantity: 1,
        starNumber: 1,
        bed: 1,
        toilet: 1,
        thumbnail: 1
      });

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

const getPostListByHotelId = async (hotel_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const postList = await findAll(new Collections().post, { hotelId: ObjectId(hotel_id), isApproved: true }, {
        _id: 1,
        hotelId: 1,
        roomName: 1,
        hotelName: 1,
        location: 1,
        price: 1,
        quantity: 1,
        starNumber: 1,
        bed: 1,
        toilet: 1,
        thumbnail: 1
      });

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

const getPostListByHotelId_Except = async (hotel_id, post_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const postList = await findAll(new Collections().post, { hotelId: ObjectId(hotel_id), isApproved: true, _id: { $ne: ObjectId(post_id) } }, {
        _id: 1,
        hotelId: 1,
        roomName: 1,
        hotelName: 1,
        location: 1,
        price: 1,
        quantity: 1,
        starNumber: 1,
        bed: 1,
        toilet: 1,
        thumbnail: 1
      });

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

const createPost = async (post) => {
  const promise = new Promise(async (resolve, reject) => {
    try {
      validateCheck(
        {
          hotelId: post.hotelId,
          roomName: post.roomName,
          price: post.price,
          quantity: post.quantity,
          bed: post.bed,
          toilet: post.toilet,
          thumbnail: post.thumbnail,
          slider: post.slider,
          description: post.description
        },
        post
      );

      // Check if hotel exists
      const resultHotel = await findOne(new Collections().hotel, { _id: ObjectId(post.hotelId) });
      if (!resultHotel) {
        console.log("Hotel not found");
        reject({
          status: 404,
          message: "Hotel not found"
        });
      } else {
        console.log("hotel found");

        const newPost = new Post();
        newPost.hotelId = resultHotel._id;
        newPost.hotelName = resultHotel.hotelName;
        newPost.location = resultHotel.hotelAddress;
        newPost.starNumber = resultHotel.starNumber;
        newPost.setInfo(post);

        try {
          const insertResult = await insertOne(new Collections().post, newPost);
          if (insertResult["acknowledged"] === true) {
            console.log("Insert successfully");
            try {
              const findResult = await findOne(new Collections().post, { _id: insertResult["insertedId"] });
              if (findResult) {
                console.log("Find successfully");
                resolve(findResult);
              }
              else {
                console.log("Find failed");
                reject({
                  status: 404,
                  message: "Cannot find post"
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
            console.log("Insert failed");
            reject({
              status: 400,
              message: "Create post failed"
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
  return promise;
};

const changePostInfo = async (postChangeInfo) => {
  return new Promise(async (resolve, reject) => {
    try {
      const findResult = await findOne(new Collections().post, { _id: ObjectId(postChangeInfo._id) });
      if (!findResult) {
        console.log("Post not found");
        reject({
          status: 404,
          message: "Post not found"
        });
      } else {
        console.log("Post found");
        const changeInfo = infoToChange(postChangeInfo);
        changeInfo.updatedDate = new Date().toLocaleString();
        console.log("changeInfo", changeInfo);
        try {
          const updateResult = await update_One(new Collections().post, { _id: ObjectId(postChangeInfo._id) }, changeInfo);
          if (updateResult["matchedCount"] === true) {
            console.log("Update successfully");
            try {
              const findResult = await findOne(new Collections().post, { _id: ObjectId(postChangeInfo._id) });
              if (findResult) {
                console.log("Find successfully");
                resolve(findResult);
              }
              else {
                console.log("Find failed");
                reject({
                  status: 404,
                  message: "Cannot find post"
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

const deletePost = async (post_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const deleteResult = await delete_One(new Collections().post, { _id: ObjectId(post_id) });
      if (deleteResult["deletedCount"] === 1) {
        console.log("Delete successfully");
        resolve("Delete successfully");
      }
      else {
        console.log("Delete failed");
        reject({
          status: 400,
          message: "Delete failed"
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
  createPost,
  getPostList,
  getPostListByHotelId,
  getPostListByHotelId_Except,
  getPostDetail,
  changePostInfo,
  deletePost,
};