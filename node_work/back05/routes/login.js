const express = require('express');
const router = express.Router();
const supabase = require('../config/supa.js');

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', async (req, res) => {
  const { phone, password, endpoint, p256dh, auth } = req.body;
  
  try {
    const { data, error } = await supabase
      .from('cleaner')
      .select('*')
      .eq('phone', phone)
      .single();

    if (error || !data) {
      return res.json({ success: false, message: '존재하지 않는 연락처입니다.' });
    }

    if (password !== phone) {
      return res.json({ success: false, message: '비밀번호가 일치하지 않습니다.' });
    }

    // 로그인 성공 시 푸시 구독 정보 저장
    if (endpoint && p256dh && auth) {
      const { error: upsertError } = await supabase
        .from('push_subscribe')
        .upsert([
          { 
            phone,
            endpoint,
            p256dh,
            auth,
            updated_at: new Date()
          }
        ], { onConflict: ['phone'] });

      if (upsertError) {
        console.error('푸시 구독 정보 저장 실패:', upsertError);
      } else {
        console.log('푸시 구독 정보 저장 성공 - phone:', phone);
      }
    }

    // 로그인 성공: 세션에 저장
    req.session.cleaner = { id: data.id, name: data.name, phone: data.phone };
    
    res.json({ success: true });
  } catch (e) {
    console.error('로그인 처리 중 오류:', e);
    res.json({ success: false, message: '서버 오류: ' + e.message });
  }
});

module.exports = router; 