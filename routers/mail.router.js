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
    return res.status(400).send({
      status: 400,
      message: "Invalid mail"
    });
  }
  try {
    sendMail(mail)
      .then((data) => {
        res.status(200).send({
          status: 200,
          message: "Sent mail successfully"
        });
      })
      .catch((err) => {
        res.status(err.status).send(err);
      });
  } catch (err) {
    console.log("err", err);
    res.status(400).send({
      status: 400,
      message: err.message
    });
  }
});

mailRouter.post("/emailConfirm", (req, res) => {
  const confirmObj = req.body;
  console.log("confirm object: ", confirmObj);
  sendMailConfirm(confirmObj)
    .then((data) => {
      res.status(200).send({
        status: 200,
        message: "Confirm code sent"
      });
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
});

mailRouter.post("/confirmCode", (req, res) => {
  const confirmObj = req.body;
  console.log("confirm object: ", confirmObj);
  codeConfirm(confirmObj)
    .then((data) => {
      res.status(data.status).send(data);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
});

module.exports = mailRouter;
