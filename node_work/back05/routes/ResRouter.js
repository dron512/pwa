const express = require("express");
const supabase = require("../config/supa.js");
// console.log(supabase);

const router = express.Router();

router.post("/", async(req, res, next) => {
  console.log(req.body);
  console.log("api POST 통신");

  const data = await supabase
        .from('ice_res')
        .insert([req.body]);

  if (data.status === 201) {
    res.send('success');
  }else{
    res.send("fail");
  }
});

// GET /res - 예약 페이지 렌더링
router.route("")
.get(async (req, res, next) => {
  try {
    // 예약 내역 조회
    const { data: reservations, error } = await supabase
      .from("ice_res")
      .select("*")
      .order('created_at', { ascending: false });

    if (error) {
      console.error('예약 내역 조회 실패:', error);
      return res.status(500).send('예약 내역 조회 중 오류가 발생했습니다.');
    }

    // 예약 페이지 렌더링
    return res.render("res", { 
      reservations,
      defaultValues: {
        name: "",
        tel: "",
        email: "",
        addr: "",
        date: "",
        time: "",
        model: "",
        capacity: "",
        service: "",
        cycle: "",
        add: "",
        remark: "",
        deposit: ""
      }
    });
  } catch (error) {
    console.error('예약 페이지 로드 중 오류:', error);
    return res.status(500).send('서버 오류가 발생했습니다.');
  }
})
.post(async (req, res) => {
  // ... existing code ...
});

module.exports = router;
