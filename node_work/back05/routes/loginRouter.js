router.post('/login', async (req, res) => {
    const { phone, password, endpoint, p256dh, auth } = req.body;
    
    try {
        const { data, error } = await supabase
            .from('ice_gisa')
            .select('*')
            .eq('tel', phone)
            .eq('password', password)
            .single();

        if (error) {
            console.error('로그인 실패:', error);
            return res.json({ success: false, message: '로그인에 실패했습니다.' });
        }

        if (!data) {
            return res.json({ success: false, message: '아이디 또는 비밀번호가 일치하지 않습니다.' });
        }

        // 로그인 성공 시 푸시 구독 정보 저장
        if (endpoint && p256dh && auth) {
            const { error: upsertError } = await supabase
                .from('push_subscribe')
                .upsert([
                    { 
                        phone,
                        endpoint,
                        p256dh,
                        auth,
                        updated_at: new Date()
                    }
                ], { onConflict: ['phone'] });

            if (upsertError) {
                console.error('푸시 구독 정보 저장 실패:', upsertError);
            } else {
                console.log('푸시 구독 정보 저장 성공 - phone:', phone);
            }
        }

        req.session.user = {
            id: data.id,
            name: data.name,
            tel: data.tel
        };

        res.json({ success: true });
    } catch (e) {
        console.error('로그인 처리 중 오류:', e);
        res.json({ success: false, message: '로그인 처리 중 오류가 발생했습니다.' });
    }
}); 