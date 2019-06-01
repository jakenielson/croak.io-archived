const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const contact = require('./routes/contact');
app.use(contact);

const mailingList = require('./routes/mailingList');
app.use(mailingList);

module.exports = {
  path: '/api',
  handler: app
}
