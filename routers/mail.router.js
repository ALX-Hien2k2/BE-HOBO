const express = require("express");
const { validateCheck } = require("../helps/ValidationBody");
const Mail = require("../models/Mail");
const sendMail = require("../repositories/MailRepositories");
const uuid = require("uuid");
const mailRouter = express.Router();

mailRouter.post("/sendNewMail", (req, res) => {
  console.log("req.body", req.body);
  let mail = new Mail({
    idMail: uuid.v4(),
    toName: req.body.toName,
    toEmail: req.body.toEmail,
    fromEmail: req.body.fromEmail,
    subject: req.body.subject,
    message: req.body.message,
  });
  if (!mail.validation()) {
    return res.status(400).send("Invalid mail");
  }
  try {
    sendMail(mail)
      .then((data) => {
        res.send("OK");
      })
      .catch((err) => {});
  } catch (err) {
    res.status(400).send(err);
  }
});
module.exports = mailRouter;
