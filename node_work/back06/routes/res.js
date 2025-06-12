const express = require('express');
const router = express.Router();
const supabase = require('../utils/supa.js');

router.get('/', async function(req, res, next) {
  const {data,error} = await supabase.from('ice_res').select();
  res.render('reservation',{data});
})

module.exports = router;