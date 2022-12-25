const express = require("express");
const { validateCheck } = require("../helps/ValidationBody");
const Mail = require("../models/Mail");
const { sendMail, codeConfirm, sendMailConfirm } = require("../repositories/MailRepositories");
const uuid = require("uuid");
const mailRouter = express.Router();

mailRouter.post("/sendNewMail", (req, res) => {
  console.log("req.body", req.body);
  let mail = new Mail({
    idMail: uuid.v4(),
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
      .catch((err) => { });
  } catch (err) {
    res.status(400).send(err);
  }
});

mailRouter.post("/emailConfirm", (req, res) => {
  try {
    const confirmObj = req.body;
    console.log("confirm object: ", confirmObj);
    sendMailConfirm(confirmObj)
      .then((data) => {
        res.send("Confirm code sent");
      })
      .catch((err) => {
        res.status(400).send(err.message);
      });
  } catch (err) {
    res.status(400).send(err);
  }
});

mailRouter.post("/confirmCode", (req, res) => {
  try {
    const confirmObj = req.body;
    console.log("confirm object: ", confirmObj);
    codeConfirm(confirmObj)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        if (typeof err == "string") {
          res.status(400).send(err);
        }
        else {
          res.status(400).send(err.message);
        }
      });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = mailRouter;
