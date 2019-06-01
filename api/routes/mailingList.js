const { Router } = require('express');
const mongodb = require('mongodb');
const cryptoRandomString = require('crypto-random-string');

const EmailService = require('../lib/EmailService');

const router = Router();

let db;

mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", (err, client) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  db = client.db();
  console.log("Database connection ready");
})

const emailExists = (email) => {
  return new Promise((resolve, reject) => {
    db.collection('mailingList')
      .find({'email': email})
      .toArray((err, docs) => err
        ? reject(err)
        : docs.length === 0
        ? resolve()
        : reject({'code': 500, 'message': 'This email already exists.'}));
  });
}

const insertEmail = (email, code) => {
  return new Promise((resolve, reject) => {
    db.collection('mailingList')
      .insertOne({'email': email, 'code': code}, (err, doc) => err
        ? reject(err)
        : resolve(doc));
  });
}

const validateEmail = (email, code) => {
  return new Promise((resolve, reject) => {
    db.collection('mailingList')
      .updateOne({'email': email, 'code': code}, {$set: {'validated': true}}, (err, doc) => err
        ? reject(err)
        : resolve(doc));
  });
}

router.post('/mailing-list/register', (req, res) => {
  const email = req.body.email;
  const code = cryptoRandomString({length: 10, type: 'url-safe'});
  const from = 'mailman@croak.io';
  const subject = 'Sign up for the croak.io mailing list!';
  const validateUrl = `${process.env.MAILING_LIST_VALIDATE_URL}?email=${email}&code=${code}`;
  const html = `<p><a href="${validateUrl}">Click here</a> to sign up for my mailing list!</p>`

  emailExists(email)
    .then(() => insertEmail(email, code))
    .then(() => EmailService.sendHTML(from, email, subject, html))
    .then(() => res.status(201).json({"message": `A registration email has been sent to ${email}`}))
    .catch(err => res.status(err.code || 500).json({"error": err.message}));
})

router.get('/mailing-list/validate', (req, res) => {
  const email = req.query.email;
  const code = req.query.code;

  validateEmail(email, code)
    .then(doc => res.redirect('/'))
    .catch(err => res.redirect(err.code || 500, '/'));
})

module.exports = router;
