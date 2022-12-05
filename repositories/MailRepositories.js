const nodemailer = require("nodemailer");
// async..await is not allowed in global scope, must use a wrapper
async function main(mailOptions) {
  try {
    const { toName, toEmail, subject, message, fromEmail } = mailOptions;
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
  } catch (e) {
    return e;
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
          reject(err.message);
        });
    } catch (err) {
      reject(err);
    }
  });
};
module.exports = sendMail;
