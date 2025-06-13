const express = require('express');
const router = express.Router();
const supabase = require('../config/supa.js');

router.get('/', async (req, res) => {
  try {
    const { data: subscribers, error } = await supabase
      .from('push_subscribe')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      return res.status(400).send('구독자 조회 실패: ' + error.message);
    }

    // 날짜 포맷팅
    const formattedSubscribers = subscribers.map(sub => ({
      ...sub,
      created_at: new Date(sub.created_at).toLocaleString(),
      updated_at: new Date(sub.updated_at).toLocaleString()
    }));
    
    res.render('alarm', { 
      title: '푸시 알림 구독자',
      subscribers: formattedSubscribers || []
    });
  } catch (e) {
    res.status(500).send('서버 오류: ' + e.message);
  }
});

module.exports = router; 