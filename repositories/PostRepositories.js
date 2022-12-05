const { validateCheck } = require("../helps/ValidationBody");
const { infoToChange } = require("../helps/GetChangeInfo");
const Post = require("../models/Post");
const { findOne, findAll, insertOne, update_One, delete_One } = require("../services/DatabaseServices");
const Collections = require("../services/Collections");
const ObjectId = require('mongodb').ObjectId;

const getPostDetail = async (post_id) => {
  const promise = new Promise(async (resolve, reject) => {
    try {
      const postInfo = await findOne(new Collections().post, { _id: ObjectId(post_id) });
      if (postInfo) {
        console.log("postInfo", postInfo);
        resolve(postInfo);
      }
      else {
        console.log("Post not found");
        reject("Post not found");
      }
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
  return promise;
};

const getPostList = async (filter) => {
  const promise = new Promise(async (resolve, reject) => {
    try {
      const postList = await findAll(new Collections().post, filter, {
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
        reject("roomList not found");
      }
    } catch (err) {
      reject(err);
    }
  });
  return promise;
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
        console.log("hotel not found");
        reject("hotel not found");
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
                reject("Cannot find post");
              }
            } catch (err) {
              console.log(err);
              reject(err);
            }
          }
          else {
            console.log("Insert failed");
            reject("create post failed");
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
  return promise;
};

const changePostInfo = async (postChangeInfo) => {
  return new Promise(async (resolve, reject) => {
    try {
      const findResult = await findOne(new Collections().post, { _id: ObjectId(postChangeInfo._id) });
      if (!findResult) {
        console.log("Post not found");
        reject("Post not found");
      } else {
        console.log("Post found");
        const changeInfo = infoToChange(postChangeInfo);
        console.log("changeInfo", changeInfo);
        try {
          const updateResult = await update_One(new Collections().post, { _id: ObjectId(postChangeInfo._id) }, changeInfo);
          if (updateResult["acknowledged"] === true) {
            console.log("Update successfully");
            try {
              const findResult = await findOne(new Collections().post, { _id: ObjectId(postChangeInfo._id) });
              if (findResult) {
                console.log("Find successfully");
                resolve(findResult);
              }
              else {
                console.log("Find failed");
                reject("Cannot find post");
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
        reject("Delete failed");
      }
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

module.exports = {
  createPost,
  getPostList,
  getPostDetail,
  changePostInfo,
  deletePost,
  // approvePost,
};
