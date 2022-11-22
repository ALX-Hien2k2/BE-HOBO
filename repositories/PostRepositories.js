const { validateCheck } = require("../helps/ValidationBody");
const HoBoPost = require("../models/HoBoPost");
const uuid = require("uuid");
const { findOne, findAll, insertOne, updateOne } = require("../services/DatabaseServices");
const Collections = require("../services/Collections");
const ObjectId = require('mongodb').ObjectId;

const getPostDetails = async (post_id) => {
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

const createPost = async (post) => {
  const promise = new Promise(async (resolve, reject) => {
    try {
      validateCheck(
        {
          title: post.title,
          description: post.description,
          image: post.image,
          location: post.location,
          date: post.date,
          time: post.time,
          userId: post.userId,
          hotelName: post.hotelName
        },
        post
      );

      // Check if user exists
      const user = await findOne(new Collections().user, { _id: ObjectId(post.userId) });
      if (!user) {
        console.log("user not found");
        reject("User not found");
      } else {
        console.log("user found");
        // Check if user is hotel owner
        if (user.userType !== 2) {
          console.log("user is not hotel owner");
          reject("User is not hotel owner");
        } else {
          console.log("user is hotel owner");

          const newPost = new HoBoPost();
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
      }
    } catch (err) {
      reject(err);
    }
  });
  return promise;
};

const approvePost = async (postId, userId) => {
  const promise = new Promise((resolve, reject) => {
    try {
      // find user by id
      // check if user is admin
      // find post by id
      // check if post is approved
      resolve({});
    } catch (err) {
      reject(err);
    }
  });
  return promise;
};

const getRoomList = async (filter) => {
  const promise = new Promise(async (resolve, reject) => {
    try {
      const roomList = await findAll(new Collections().post, filter);
      if (roomList) {
        console.log("roomList ", roomList);
        resolve(roomList);
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

module.exports = {
  createPost,
  getRoomList,
  getPostDetails,
  approvePost,
};
