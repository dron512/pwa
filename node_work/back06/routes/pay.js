const express = require('express');
const supabase = require('../utils/supa.js');
const router = express.Router();

router.get('/checkout', async function (req, res, next) {
  console.log(req.query);

  const {data, error} = await supabase.from('ice_res').select().eq('res_no', req.query.res_no);
  data[0].tel = data[0].tel.replace(/-/g, '');

  res.render('pay/checkout', {title: "예약내역결제", reservation: data[0]});
})

// 결제성공 -> ice_res => 결제완료 res_no 예약번호
router.get('/success', async function (req, res, next) {
  console.log(req.query);
  // 결제 완료
  await supabase.from('ice_res').update({status: "결제완료"}).eq("res_no", req.query.orderId);
  const {data} = await supabase.from('ice_res').select().eq("res_no", req.query.orderId);
  return res.render('pay/success', {reservation: data[0]});
})

router.get('/test', function (req, res, next) {
  console.log(req.query);
  res.render('base');
})

module.exports = router;