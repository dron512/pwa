const express = require("express");
const supabase = require("../config/supa.js");
var got = require("got");
var { resolve } = require("path");

var secretKey = "test_gsk_docs_Ovk5rk1EwkEbP0W43n07xlzm";

const router = express.Router();

router.post("/confirm", async function (req, res) {
    try {
        var { paymentKey, orderId, amount } = req.body;

        // 토스페이먼츠 API는 시크릿 키를 사용자 ID로 사용하고, 비밀번호는 사용하지 않습니다.
        // 비밀번호가 없다는 것을 알리기 위해 시크릿 키 뒤에 콜론을 추가합니다.
        // @docs https://docs.tosspayments.com/reference/using-api/authorization#%EC%9D%B8%EC%A6%9D
        var encryptedSecretKey = "Basic " + Buffer.from(secretKey + ":").toString("base64");

        // 결제 승인 API를 호출하세요.
        // 결제를 승인하면 결제수단에서 금액이 차감돼요.
        // @docs https://docs.tosspayments.com/guides/v2/payment-widget/integration#3-결제-승인하기
        try {
            const response = await got.post("https://api.tosspayments.com/v1/payments/confirm", {
                headers: {
                    Authorization: encryptedSecretKey,
                    "Content-Type": "application/json",
                },
                json: {
                    orderId: orderId,
                    amount: amount,
                    paymentKey: paymentKey,
                },
                responseType: "json",
            });
        } catch (e) {
            console.log(e);
        }

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

        // 성공 응답
        res.status(200).json({
            success: true,
            message: '결제가 성공적으로 완료되었습니다.',
            data: response.body
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

        // 성공 페이지 렌더링
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

module.exports = router;