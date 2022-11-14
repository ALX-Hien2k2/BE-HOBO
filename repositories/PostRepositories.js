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

const getRoomList = async (filter) => {
  const promise = new Promise((resolve, reject) => {
    try {
      // Load data from db
      const roomList = [
        {
          title: "tieude1",
          description: "mota1",
          image: "linkToImg1",
          location: "Diadiem1",
          date: "12/5/2022",
          time: "2N1D",
          userId: "hotelOwner's ID",
          hotelName: "TenKS1",
          isApproved: true
        },
        {
          title: "tieude2",
          description: "mota2",
          image: "linkToImg2",
          location: "Diadiem1",
          date: "12/5/2022",
          time: "2N1D",
          userId: "hotelOwner's I2",
          hotelName: "TenKS2",
          isApproved: false
        },
        {
          title: "tieude3",
          description: "mota3",
          image: "linkToImg3",
          location: "Diadiem1",
          date: "12/5/2023",
          time: "2N13",
          userId: "hotelOwner's I3",
          hotelName: "TenKS3",
          isApproved: false
        }
      ];
      // If filter has no attribute => Send origin list
      if (Object.keys(filter).length !== 0) {
        // console.log("test1");
        const responseList = roomList.filter((room) => {
          const keys = Object.keys(filter);
          let count = 0;

          for (let i of keys) {
            // console.log(filter[i], room[i]);
            if (filter[i] == room[i]) {
              count++;
            }
          }
          // console.log(count);
          if (count == keys.length) {
            return room;
          }
        });
        // console.log("test2");
        // console.log(responseList);
        resolve(responseList);
      }
      else {
        // return room's list to client
        console.log("hehe")
        resolve(roomList);
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
