const { validateCheck } = require("../helps/ValidationBody");
const HoBoPost = require("../models/HoBoPost");
const uuid = require("uuid");

const getPostDetails = async (postId) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        {
          id: 1,
          name: "John Doe",
        },
        1000
      );
    });
  });
  return promise;
};

const createPost = async (post) => {
  const promise = new Promise((resolve, reject) => {
    try {
      const newPost = new HoBoPost();
      validateCheck(
        {
          userId: post.userId,
          title: post.title,
          description: post.description,
          image: post.image,
          location: post.location,
          date: post.date,
          time: post.time,
        },
        post
      );
      newPost.title = post.title;
      newPost.description = post.description;
      newPost.image = post.image;
      newPost.location = post.location;
      newPost.date = post.date;
      newPost.time = post.time;
      newPost.userId = post.userId;
      newPost.isApproved = false;
      newPost.id = uuid.v4();
      resolve(newPost);
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

module.exports = {
  createPost,
  getPostDetails,
  approvePost,
};
