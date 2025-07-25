const express = require('express');
const supabase = require('../utils/supa');
const router = express.Router();

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    console.log('로그아웃되었습니다.');
    res.clearCookie('session-cookie');
    res.redirect('/');
  });
})

router.get('/', async function (req, res, next) {
  res.render('login');

  // res.json(); json객체 보낼떄
  // res.send(); String 보낼때
  // res.render(); html 페이지로 갈떄
  // res.redirect(); url 이동
})

router.post('/', async function (req, res, next) {
  const {phone, password, endpoint, p256dh, auth} = req.body;

  const {data, error} = await supabase.from('cleaner')
    .select('*')
    .eq('phone', phone)
    .single();

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

  if (data) {
    // 로그인 성공시 req.session.user 에 내용 넣어줌..
    // 세션 만들고 / 페이지로 이동
    req.session.user = data;
    res.redirect('/');
  } else {
    // login 페이지로 가면서 error 가지고 이동
    res.render('login', {error: "핸드폰번호와 비밀번호확인하세요"});
  }

})

module.exports = router;