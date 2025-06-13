const express = require("express");
const supabase = require("../config/supa.js");
const multer = require('multer');
const path = require('path');

router = express.Router();

// 파일 업로드 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.route("")
.get(async (req, res, next) => {
  // 예약완료 데이터 조회
  const { data: completedData, error: completedError } = await supabase
    .from("ice_res")
    .select("*")
    .eq('status', '결제완료');

  if (completedError) {
    console.error('예약완료 데이터 조회 실패:', completedError);
    return res.status(500).send('데이터 조회 중 오류가 발생했습니다.');
  }

  // 예약완료가 아닌 데이터 조회
  const { data: otherData, error: otherError } = await supabase
    .from("ice_res")
    .select("*")
    .in('status', ['청소대기', '청소진행']);

  if (otherError) {
    console.error('기타 데이터 조회 실패:', otherError);
    return res.status(500).send('데이터 조회 중 오류가 발생했습니다.');
  }

  // 청소완료 데이터 조회
  const { data: completeData, error: completeError } = await supabase
    .from("ice_res")
    .select("*")
    .eq('status', '청소완료');

  if (completeError) {
    console.error('청소완료 데이터 조회 실패:', completeError);
    return res.status(500).send('데이터 조회 중 오류가 발생했습니다.');
  }

  // gisa.html로 세 데이터 모두 전달 + 로그인된 기사명
  return res.render("gisa", { 
    completedData,
    otherData,
    completeData,
    cleanerName: req.session.cleaner ? req.session.cleaner.name : null
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

// 진행완료(사진+메모) 제출 라우터
router.post('/complete', upload.array('photo', 5), async (req, res) => {
  try {
    const { res_no, memo } = req.body;
    const photos = req.files ? req.files.map(f => f.filename) : [];
    if (!res_no || photos.length === 0) {
      return res.status(400).json({ success: false, message: '필수 데이터 누락' });
    }
    // ice_clean에 사진(여러개), 메모, 완료일 저장 (사진은 쉼표로 join)
    const { error: cleanError } = await supabase
      .from('ice_clean')
      .update({
        clean_status: '완료',
        delivered_at: new Date().toISOString(),
        photo: photos.join(','),
        memo,
        updated_at: new Date().toISOString()
      })
      .eq('res_no', res_no);
    if (cleanError) {
      return res.status(500).json({ success: false, message: 'ice_clean 업데이트 실패', error: cleanError });
    }
    // ice_res 상태도 청소완료로 변경
    const { error: resError } = await supabase
      .from('ice_res')
      .update({
        status: '청소완료',
        clean_status: '청소완료',
        clean_date: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('res_no', res_no);
    if (resError) {
      return res.status(500).json({ success: false, message: 'ice_res 업데이트 실패', error: resError });
    }
    return res.json({ success: true, message: '청소가 완료 처리되었습니다.' });
  } catch (error) {
    console.error('진행완료 처리 중 오류:', error);
    return res.status(500).json({ success: false, message: '서버 오류', error: error.message });
  }
});

// 청소완료 상세정보 조회 라우터
router.get('/clean-detail/:res_no', async (req, res) => {
  try {
    const { res_no } = req.params;
    const { data, error } = await supabase
      .from('ice_clean')
      .select('photo, memo')
      .eq('res_no', res_no)
      .single();
    if (error) {
      return res.status(500).json({ success: false, message: '청소내역 조회 실패', error });
    }
    return res.json({ success: true, photo: data?.photo || '', memo: data?.memo || '' });
  } catch (error) {
    return res.status(500).json({ success: false, message: '서버 오류', error: error.message });
  }
});

module.exports = router;
