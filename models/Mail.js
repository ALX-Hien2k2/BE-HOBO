const Model = require("./Model");

class Mail extends Model {
  constructor(initMail) {
    super();
    this.idMail = initMail.idMail;
    this.toName = initMail.toName;
    this.toEmail = initMail.toEmail;
    this.fromEmail = initMail.fromEmail;
    this.subject = initMail.subject;
    this.message = initMail.message;
  }
  validation() {
    const { toEmail, subject, message, fromEmail } = this;
    console.log("This is mail", this);
    if (!toEmail || !fromEmail || !subject || !message) {
      return false;
    }
    return true;
  }
}
module.exports = Mail;
