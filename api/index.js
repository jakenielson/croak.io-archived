const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const email = require('./routes/email');
app.use(email);

module.exports = {
  path: '/api',
  handler: app
}
