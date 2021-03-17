const { default: axios } = require('axios');

const router = require('express').Router();

router.get('/', async (req, res) => {
  const response = await axios.get('https://api.exchangeratesapi.io/latest');
  res.send(response.data);
});

module.exports = {
  ratesRouter: router
};
