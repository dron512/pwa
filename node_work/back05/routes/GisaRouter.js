const express = require("express");
const supabase = require("../config/supa.js");

router = express.Router();

router.route("")
.get(async (req, res, next) => {
  // 예약완료 데이터 조회
  const { data: completedData, error: completedError } = await supabase
    .from("ice_res")
    .select("*")
    .eq('status', '예약완료');

  if (completedError) {
    console.error('예약완료 데이터 조회 실패:', completedError);
    return res.status(500).send('데이터 조회 중 오류가 발생했습니다.');
  }

  // 예약완료가 아닌 데이터 조회
  const { data: otherData, error: otherError } = await supabase
    .from("ice_res")
    .select("*")
    .neq('status', '예약완료');

  if (otherError) {
    console.error('기타 데이터 조회 실패:', otherError);
    return res.status(500).send('데이터 조회 중 오류가 발생했습니다.');
  }

  // gisa.html로 가면서 두 데이터를 모두 전달
  return res.render("gisa", { 
    completedData,
    otherData
  });
})
.post(async (req, res) => {
  try {
    const { resno, name, tel, email, addr, date, time, model, capacity, service, cycle, add, remark, deposit } = req.body;

    // ice_clean 테이블에 데이터 저장
    const { data, error } = await supabase
      .from('ice_clean')
      .insert([
        {
          gisa_id: 1, // 임시로 1번 기사로 설정
          res_no: resno,
          recipient_name: name,
          phone: tel,
          address: addr,
          clean_status: '대기',
          requested_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      console.error('청소 데이터 저장 실패:', error);
      return res.json({ success: false, error: error.message });
    }

    // ice_res 테이블의 상태를 '청소중'으로 업데이트
    const { error: updateError } = await supabase
      .from('ice_res')
      .update({ 
        status: '청소대기',
        updated_at: new Date().toISOString()
      })
      .eq('res_no', resno);

    if (updateError) {
      console.error('예약 상태 업데이트 실패:', updateError);
      return res.json({ success: false, error: updateError.message });
    }

    return res.json({ 
      success: true, 
      message: '청소 작업이 등록되었습니다.',
      data: data[0]  // 저장된 데이터 반환
    });
  } catch (error) {
    console.error('청소 작업 등록 중 오류:', error);
    return res.json({ success: false, error: error.message });
  }
});

module.exports = router;
