var express = require('express');
var router = express.Router();
const sendSMS = require("../test");
const supabase = require('../utils/supa');

router.get('/', async function(req, res, next) {
  const {data} = await supabase.from('cleaner').select();
  res.render('admin',{cleaners: data});
});
router.post('/', async function(req, res, next) {
  const {name, email, phone , addr, } = req.body;

  const {error} = await supabase.from('cleaner')
                          .insert([{name, email, phone, "address":addr}]);

  if(error) {
    console.log('슈파베이스 등록시 에러 발생');
    console.log(error);
  };

  // const {data} = await supabase.from('cleaner').select();

  // res.render('admin',{cleaners: data});
  res.redirect('/admin');
})

router.get("/send", async function(req, res, next) {
  console.log("문자메시지 보내기 시작");
  await sendSMS("821033673743");
})

module.exports = router;
