const { validateCheck } = require("../helps/ValidationBody");
const HoBoPost = require("../models/HoBoPost");

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
      resolve(newPost);
    } catch (err) {
      reject(err);
    }
  });
  return promise;
};
module.exports = {
  createPost,
};
