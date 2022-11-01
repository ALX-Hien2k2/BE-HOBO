const getUserDetails = async (userId) => {
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
module.exports = {
  getUserDetails,
};
