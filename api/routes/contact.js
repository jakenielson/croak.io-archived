const { Router } = require('express');

const EmailService = require('../lib/emailService');

const router = Router();

router.post('/contact', (req, res) => {
  EmailService.sendText('contact@croak.io', 'jakenielsonweb@gmail.com', `${req.body.name}: ${req.body.subject}`, req.body.body)
    .then(() => {
      res.status(201).json({"message": "success"});
    })
    .catch((err) => {
      res.status(500).json({"error": err.message});
    });
})

module.exports = router;
