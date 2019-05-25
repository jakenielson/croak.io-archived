const { Router } = require('express');
const axios = require('axios');

const baseUrl = 'https://api.emailjs.com/api/v1.0/email/send';
const service_id = 'gmail';
const template_id = 'template_kv8my4vB';
const user_id = 'user_jE0c6kVZb9tPJm89jqCMF';

const router = Router();

router.post('/email', async (req, res) => {
  const template_params = req.body;
  await axios.post(baseUrl, null, { data: { service_id, template_id, user_id, template_params } } )
  res.json(template_params);
})

module.exports = router;