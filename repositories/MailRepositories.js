const nodemailer = require("nodemailer");
const Mail = require("../models/Mail");
const { findOne, update_One } = require("../services/DatabaseServices");
const { generateCode } = require("../helps/generateVertificationCode");
const Collections = require("../services/Collections");
const uuid = require("uuid");
// async..await is not allowed in global scope, must use a wrapper
async function main(mailOptions) {
  try {
    const { toEmail, subject, message, fromEmail } = mailOptions;
    // connect to gmail
    console.log(
      "Connecting to gmail...",
      process.env.MAIL_USER,
      process.env.MAIL_PASS
    );
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"HOBO 🏷" <${fromEmail}>`, // sender address
      to: toEmail, // list of receivers
      subject: subject, // Subject line
      text: message,
    });
    console.log("Message sent: %s", info.messageId);
    return info.messageId;
  } catch (err) {
    return err;
  }
}

const sendMail = (mailOptions) => {
  return new Promise((resolve, reject) => {
    try {
      main(mailOptions)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          console.log("err", err);
          reject({
            status: 400,
            message: err.message
          });
        });
    } catch (err) {
      console.log("err", err);
      reject({
        status: 400,
        message: err.message
      });
    }
  });
};

async function mailConfirm(confirmObj) {
  try {
    // Check if username exist
    const findResult = await findOne(new Collections().user, { username: confirmObj.username });
    if (!findResult) {
      console.log("username not exist!");
      throw new Error("username not exist!");
    }
    console.log("findResult.email", findResult.email);
    // Check if acc's email is the same
    if (confirmObj.toEmail !== findResult.email) {
      console.log("This email is not registered for this account!");
      throw new Error("This email is not registered for this account!");
    }
    // Generate confirm code
    const confirmCode = generateCode(8); // String

    let mail = new Mail({
      idMail: uuid.v4(),
      toEmail: confirmObj.toEmail,
      fromEmail: process.env.MAIL_USER,
      subject: "Reset password",
      message: `Your reset password code is: ${confirmCode}`,
    });

    if (!mail.validation()) {
      throw new Error("Invalid mail");
    }

    // connect to gmail
    console.log(
      "Connecting to gmail...",
      process.env.MAIL_USER,
      process.env.MAIL_PASS
    );
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"HOBO 🏷" <${mail.fromEmail}>`, // sender address
      to: mail.toEmail, // list of receivers
      subject: mail.subject, // Subject line
      text: mail.message,
    });
    console.log("Message sent: %s", info.messageId);

    // Add confirm code to database
    const updateResult = await update_One(new Collections().user, { username: confirmObj.username }, { confirmCode: confirmCode });
    if (updateResult["matchedCount"] === 0) {
      console.log("user not found!");
      throw new Error("user not found!");
    }
    return info.messageId;
  } catch (error) {
    console.log("error", error);
    throw new Error(error);
  }
};

const sendMailConfirm = (confirmObj) => {
  return new Promise((resolve, reject) => {
    try {
      mailConfirm(confirmObj)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          console.log("err", err);
          reject({
            status: 400,
            message: err.message
          });
        });
    } catch (err) {
      console.log("err", err);
      reject({
        status: 400,
        message: err.message
      });
    }
  });
};

const codeConfirm = (confirmObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Check if username exist
      const findResult = await findOne(new Collections().user, { username: confirmObj.username });
      if (!findResult) {
        console.log("username not exist!");
        reject({
          status: 404,
          message: "username not exist!"
        });
      }
      else if (!findResult.confirmCode || (findResult.confirmCode !== confirmObj.confirmCode)) {
        console.log("Wrong confirm code!");
        reject({
          status: 400,
          message: "Wrong confirm code!"
        });
      }
      else {
        console.log("Confirm code is correct");
        resolve({
          status: 200,
          message: "Confirm code is correct"
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
  sendMail,
  mailConfirm,
  sendMailConfirm,
  codeConfirm,
}
