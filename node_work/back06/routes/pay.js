const express = require('express');

const router = express.Router();

router.get('/checkout', function(req, res, next) {
  res.render('pay/checkout');
})

module.exports = router;