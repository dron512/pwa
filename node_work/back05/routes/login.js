const express = require('express');
const router = express.Router();
const supabase = require('../config/supa.js');

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', async (req, res) => {
  const { phone, password } = req.body;
  // 임시: 비밀번호는 phone과 동일하게 체크
  try {
    const { data, error } = await supabase
      .from('cleaner')
      .select('*')
      .eq('phone', phone)
      .single();
    if (error || !data) {
      return res.render('login', { error: '존재하지 않는 연락처입니다.' });
    }
    if (password !== phone) {
      return res.render('login', { error: '비밀번호가 일치하지 않습니다.' });
    }
    // 로그인 성공: 세션에 저장
    req.session.cleaner = { id: data.id, name: data.name, phone: data.phone };
    res.redirect('/');
  } catch (e) {
    res.render('login', { error: '서버 오류: ' + e.message });
  }
});

module.exports = router; 