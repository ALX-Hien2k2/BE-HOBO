const util = require("util");
const XlsxPopulate = require("xlsx-populate");
const multer = require("multer");
const maxSize = 10 * 1024 * 1024;//max 10MB
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    XlsxPopulate.fromFileAsync()
      .then(workbook => {
        // Modify the workbook.
        const value = workbook.sheet("Sheet1").cell("A1").value();

        // Log the value.
        console.log(value);
      });
    cb(null, "./resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");
let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;