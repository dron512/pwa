const express = require("express");
const supabase = require("../config/supa.js");
var got = require("got");
var { resolve } = require("path");
const webpush = require('web-push');

var secretKey = "test_gsk_docs_Ovk5rk1EwkEbP0W43n07xlzm";

const router = express.Router();

// success와 fail 라우트를 먼저 정의
router.get("/success", async function (req, res) {
    try {
        const { orderId, amount } = req.query;

        console.log('결제 성공 - orderId:', orderId);
        console.log('결제 성공 - amount:', amount);

        // 예약 정보 조회
        const { data: reservation, error } = await supabase
            .from('ice_res')
            .select('*')
            .eq('res_no', orderId)
            .single();

        if (error) {
            console.error('예약 정보 조회 실패:', error);
            return res.status(500).send('예약 정보를 불러오는데 실패했습니다.');
        }

        if (!reservation) {
            return res.status(404).send('예약 정보를 찾을 수 없습니다.');
        }

        // ice_res에 예약 정보가 있으면 승인된 것으로 간주 (상태 변경 없음)
        res.render("success", {
            reservation,
            payment: {
                amount: parseInt(amount),
                date: new Date()
            }
        });
    } catch (error) {
        console.error('결제 성공 처리 중 오류:', error);
        res.status(500).send('서버 오류가 발생했습니다.');
    }
});

router.get("/fail", function (req, res) {
    res.render("fail");
});

// resno 라우트는 마지막에 정의
router.get("/:resno", async function (req, res) {
    try {
        const { resno } = req.params;

        // 예약 정보 조회
        const { data: reservation, error } = await supabase
            .from('ice_res')
            .select('*')
            .eq('res_no', resno)
            .single();

        if (error) {
            console.error('예약 정보 조회 실패:', error);
            return res.status(500).send('예약 정보를 불러오는데 실패했습니다.');
        }

        if (!reservation) {
            return res.status(404).send('예약 정보를 찾을 수 없습니다.');
        }

        // 결제대기 상태가 아닌 경우
        if (reservation.status !== '결제대기') {
            return res.status(400).send('이미 결제가 완료되었거나 취소된 예약입니다.');
        }

        // 결제 페이지 렌더링
        res.render("checkout", {
            reservation,
            server_amount: reservation.deposit * 10000 // 보증금을 원 단위로 변환
        });
    } catch (error) {
        console.error('결제 페이지 로드 중 오류:', error);
        res.status(500).send('서버 오류가 발생했습니다.');
    }
});

// 결제 승인 라우터 복구
router.post("/confirm", async function (req, res) {
    try {
        const { orderId, amount, phone, endpoint, p256dh, auth } = req.body;
        // 예약 정보 업데이트
        const { error: updateError } = await supabase
            .from('ice_res')
            .update({
                status: '결제완료',
                payment_amount: parseInt(amount),
                payment_date: new Date(),
                payment_method: '토스페이먼츠',
                updated_at: new Date()
            })
            .eq('res_no', orderId);

        if (updateError) {
            console.error('결제 정보 업데이트 실패:', updateError);
            return res.status(500).json({
                success: false,
                message: '결제 정보 업데이트에 실패했습니다.',
                error: updateError
            });
        }

        // 알림 구독 정보가 있으면 push_subscribe에 upsert
        if (phone && endpoint && p256dh && auth) {
          await supabase
            .from('push_subscribe')
            .upsert([
              { phone, endpoint, p256dh, auth, updated_at: new Date() }
            ], { onConflict: ['phone'] });
        }

        // 결제 완료 알림 푸시
        if (phone) {
          const { data: subData, error: subError } = await supabase
            .from('push_subscribe')
            .select('*')
            .eq('phone', phone)
            .single();
          if (subData && subData.endpoint && subData.p256dh && subData.auth) {
            const pushSubscription = {
              endpoint: subData.endpoint,
              keys: {
                p256dh: subData.p256dh,
                auth: subData.auth
              }
            };
            try {
              await webpush.sendNotification(
                pushSubscription,
                JSON.stringify({
                  title: '청소신청 알림',
                  body: '새로운 청소신청이 되었습니다',
                  url: '/'
                })
              );
            } catch (e) {
              console.error('푸시 알림 전송 실패:', e);
            }
          }
        }

        // 성공 응답
        res.status(200).json({
            success: true,
            message: '결제가 성공적으로 완료되었습니다.'
        });
    } catch (error) {
        console.error('결제 승인 중 오류:', error);
        res.status(500).json({
            success: false,
            message: '결제 승인 중 오류가 발생했습니다.',
            error: error.response?.body || error.message
        });
    }
});

module.exports = router;