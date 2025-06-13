const express = require('express');
const router = express.Router();
const supabase = require('../config/supa.js');

router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase.from('cleaner').select('*');
    if (error) {
      return res.status(400).send('청소기사 조회 실패: ' + error.message);
    }
    res.render('admin', { cleaners: data });
  } catch (e) {
    res.status(500).send('서버 오류: ' + e.message);
  }
});

router.post('/', async (req, res) => {
  const { name, phone, email, address } = req.body;
  try {
    const { error } = await supabase
      .from('cleaner')
      .insert([{ name, phone, email, address }]);
    if (error) {
      return res.status(400).send('청소기사 등록 실패: ' + error.message);
    }
    res.redirect('/admin');
  } catch (e) {
    res.status(500).send('서버 오류: ' + e.message);
  }
});

module.exports = router; 