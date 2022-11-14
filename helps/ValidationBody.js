const validateCheck = (attr, body) => {
  Object.keys(attr).forEach((key) => {
    if (body[key] === undefined) {
      throw new Error(`${key} is required`);
      return;
    }
  });
};

module.exports = {
  validateCheck,
};
