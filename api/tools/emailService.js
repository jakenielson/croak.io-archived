const nodemailer = require('nodemailer');
const mailgunTransport = require('nodemailer-mailgun-transport');

const mailgunOptions = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  }
};

const transport = mailgunTransport(mailgunOptions);

class EmailService {
  constructor() {
    this.emailClient = nodemailer.createTransport(transport)
  };

  // to can be an array
  sendText(from, to, subject, text) {
    return new Promise((resolve, reject) => {
      this.emailClient.sendMail({
        from,
        to,
        subject,
        text,
      }, (err, info) => {
        err ? reject(err) : resolve(info);
      });
    });
  };

  // to can be an array
  sendHTML(from, to, subject, html) {
    return new Promise((resolve, reject) => {
      this.emailClient.sendMail({
        from,
        to,
        subject,
        html,
      }, (err, info) => {
        err ? reject(err) : resolve(info);
      });
    });
  };
}

module.exports = new EmailService();
