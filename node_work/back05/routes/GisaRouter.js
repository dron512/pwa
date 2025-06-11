const express = require("express");
const supabase = require("../config/supa.js");

router = express.Router();

router.route("")
.get(async (req, res, next) => {
  const { data, error } = await supabase.from("ice_res").select("*");

  // gisa.html 로 가면서 select 한 데이터도 가지고 가라.
  return res.render("gisa", { data });
})
.post(async(req,res,next)=>{
    console.log(req.body);
    return res.send('저장됨');
});

module.exports = router;
