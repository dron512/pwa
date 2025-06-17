const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {

  console.log(req.body);

  const {id,password} = req.body;
  const data = {};

  data.msg = "success";
  res.json(data);

})

module.exports = router;