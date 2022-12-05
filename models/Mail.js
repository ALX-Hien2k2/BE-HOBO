const Model = require("./Model");

class Mail extends Model {
  constructor(initMail) {
    super();
    this.idMail = initMail.idMail;
    this.toName = initMail.toName;
    this.toEmail = initMail.toEmail;
    this.subject = initMail.subject;
    this.message = initMail.message;
  }
  validation() {
    const { toName, toEmail, subject, message } = this;
    console.log("This is mail", this);
    if (!toName || !toEmail || !subject || !message) {
      return false;
    }
    return true;
  }
}
module.exports = Mail;
