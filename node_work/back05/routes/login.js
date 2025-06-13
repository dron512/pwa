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
    // 알림 자동 신청 (임시값)
    await supabase
      .from('push_subscribe')
      .upsert([
        {
          phone: data.phone,
          endpoint: 'dummy-endpoint',
          p256dh: 'dummy-p256dh',
          auth: 'dummy-auth',
          updated_at: new Date()
        }
      ], { onConflict: ['phone'] });
      // onConflict 는 핸드폰이 중복인지 아닌지 체크 하면 컬럼
    res.redirect('/');
  } catch (e) {
    res.render('login', { error: '서버 오류: ' + e.message });
  }
});

module.exports = router; 