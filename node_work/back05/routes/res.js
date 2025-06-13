const express = require("express");
const supabase = require("../config/supa.js");
// console.log(supabase);

const router = express.Router();

// GET /res - 예약 페이지 렌더링
router.route("")
.get(async (req, res, next) => {
  try {
    // 예약 내역 조회 - status 기준으로 정렬 (결제대기 -> 예약완료 -> 결제완료 -> 청소완료 -> 취소요청 -> 취소완료)
    const { data: reservations, error } = await supabase
      .from("ice_res")
      .select("*")
      .order('status', { ascending: false })
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
  try {
    const { 
      name, tel, email, addr, date, time, model, 
      capacity, service, cycle, add, remark, deposit 
    } = req.body;

    // ice_res 테이블에 데이터 저장
    const { data, error } = await supabase
      .from('ice_res')
      .insert([
        {
          name,
          tel,
          email,
          addr,
          date: new Date(date), // timestamp 형식으로 변환
          time,
          model,
          capacity,
          service,
          cycle,
          add,
          remark,
          deposit: parseInt(deposit) || 0,
          state: 1, // 기본값 1
          status: '결제대기', // 초기 상태를 '결제대기'로 설정
          created_at: new Date(),
          updated_at: new Date()
        }
      ])
      .select();

    if (error) {
      console.error('예약 데이터 저장 실패:', error);
      return res.json({ success: false, error: error.message });
    }

    console.log("예약 데이터 저장 성공:", data);

    return res.json({ 
      success: true, 
      message: '예약이 완료되었습니다. 결제를 진행해주세요.',
      data: data[0]
    });
  } catch (error) {
    console.error('예약 처리 중 오류:', error);
    return res.json({ success: false, error: error.message });
  }
});

module.exports = router;
