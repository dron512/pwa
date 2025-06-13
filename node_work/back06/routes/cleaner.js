const express = require('express');
const supabase = require('../utils/supa.js');
const router = express.Router();

router.get('/', async (req, res) => {

  const {data, error} = await supabase.from('ice_res').select().eq('status', '결제완료');

  return res.render('cleaner/index', {title: 'Cleaner', reservation:data});
})

module.exports = router;