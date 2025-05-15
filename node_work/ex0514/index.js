// 단방향 암호화
// const crypto = require('crypto');
const webpush = require('web-push')

webpush.setVapidDetails(
    'mailto:your@email.com',
    'BCRUQ5WPVsJ5r2mmTedv_VtZE6L3XMJ9ZOFWtzBAvmpKzvpe5W_LHPt5jr8-qq6TZlCXwcSFbMm0xY0cPBzsutk',
    'Yl_En8v44xeEL5QFwgULaxutTWKlWuoMI_-SpfpPcB8'
)

const {hashPassword, verifyPassword} = require('./passwordEncode');
const pool = require('./db');

const http = require('http');
const fs = require('fs').promises;

// CORS 헤더 설정 함수
function setCorsHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

http.createServer(async (req, res) => {
    console.log(req.url);
    setCorsHeaders(res);

    try {
        // OPTIONS 요청 처리 (preflight)
        if (req.method === 'OPTIONS') {
            res.writeHead(204);
            return res.end();
        }

        // 모든 응답에 CORS 헤더 추가
        else if (req.url === '/subscribe') {
            req.setEncoding('utf-8');
            let body = '';

            req.on('data', (data) => {
                body += data;
            });

            req.on('end', async () => {
                try {
                    const subscription = JSON.parse(body);
                    
                    // 구독 정보를 DB에 저장
                    const conn = await pool.getConnection();
                    const sql = 'INSERT INTO subscriptions (endpoint, p256dh, auth) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE p256dh = VALUES(p256dh), auth = VALUES(auth)';
                    await conn.execute(sql, [
                        subscription.endpoint,
                        subscription.keys.p256dh,
                        subscription.keys.auth
                    ]);
                    conn.release();

                    res.writeHead(201, {'Content-Type': 'application/json; charset=utf-8'});
                    res.end(JSON.stringify({message: '구독 성공'}));
                } catch (err) {
                    console.error('구독 파싱 오류:', err);
                    if (!res.headersSent) {
                        res.writeHead(400);
                        res.end('잘못된 구독 데이터');
                    }
                }
            });
            return; // ✅ 중복 응답 방지를 위해 반드시 return
        } else if (req.url === '/send') {
            // 구독자에게 푸시 알림을 보내는 부분
            const payload = JSON.stringify({title: '푸시 알림 제목', body: '푸시 알림 내용'});

            // DB에서 모든 구독 정보 가져오기
            const conn = await pool.getConnection();
            const [subscriptions] = await conn.execute('SELECT * FROM subscriptions');
            conn.release();

            // 각 구독자에게 푸시 알림 전송
            const sendPromises = subscriptions.map(sub => {
                const subscription = {
                    endpoint: sub.endpoint,
                    keys: {
                        p256dh: sub.p256dh,
                        auth: sub.auth
                    }
                };

                return webpush.sendNotification(subscription, payload)
                    .then(() => {
                        console.log('푸시 알림 전송 성공:', sub.endpoint);
                    })
                    .catch(err => {
                        console.error('푸시 알림 전송 실패:', sub.endpoint, err);
                        // 구독이 만료되었거나 유효하지 않은 경우 DB에서 삭제
                        if (err.statusCode === 410) {
                            return pool.execute('DELETE FROM subscriptions WHERE endpoint = ?', [sub.endpoint]);
                        }
                    });
            });

            // 모든 알림 전송 완료 대기
            await Promise.all(sendPromises);

            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            return res.end(JSON.stringify({message: '푸시 알림 전송 완료'}));
        } else if (req.url === '/') {
            const password = '비밀번호';    // 숨겨진 데이터
            const indexhtml = await fs.readFile('./index.html');
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            return res.end(indexhtml);
        } else if (req.url.includes('/select')) {
            const conn = await pool.getConnection(); // pool에서 connection을 가져온다.
            const sql = 'SELECT * FROM users';  // select 구문
            const result = await conn.execute(sql); // sql문 실행
            conn.release(); // pool 반환
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            return res.end(JSON.stringify(result[0])); // 결과를 JSON으로 변환하여 전송
        } else if (req.url === '/join' && req.method === 'POST') {
            // 한글이 들어오는 거 맞추기 위해서 utf-8로 인코딩
            req.setEncoding('utf-8');

            // body 문자열 선언
            let body = '';

            req.on('data', (data) => {
                body += data;
            });
            req.on('end', async () => {
                // body를 JSON.parse로 객체로 변환
                const {id, password} = JSON.parse(body);

                // 비밀번호 해시화
                const {salt, hashed} = await hashPassword(password);

                // mysql 에 저장하는 코드
                const conn = await pool.getConnection(); // pool에서 connection을 가져온다.
                const sql = 'INSERT INTO users (id, password, salt) VALUES (?, ?, ?)'; // sql 구문 설정
                const [result] = await conn.execute(sql, [id, hashed, salt]); // sql문 실행
                conn.release(); // pool 반환
            })

            res.writeHead(201, {'Content-Type': 'application/json; charset=utf-8'});
            return res.end(JSON.stringify({message: '회원가입 성공'}));
        } else if (req.url === '/login' && req.method === 'POST') {
            req.setEncoding('utf-8');
            let body = '';

            // 요청 본문 데이터 수집
            req.on('data', (data) => {
                body += data;
            });

            // 요청 본문 처리 완료 시
            req.on('end', async () => {
                try {
                    const {id, password} = JSON.parse(body);

                    // DB에서 사용자 조회
                    const conn = await pool.getConnection();
                    const [users] = await conn.execute('SELECT * FROM users WHERE id = ?', [id]);
                    conn.release();

                    // 사용자가 없는 경우
                    if (!users.length) {
                        res.writeHead(401, {'Content-Type': 'application/json; charset=utf-8'});
                        return res.end(JSON.stringify({message: '아이디 또는 비밀번호가 일치하지 않습니다.'}));
                    }

                    // 비밀번호 확인
                    if (await verifyPassword(password, users[0].salt, users[0].password)) {
                        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                        return res.end(JSON.stringify({message: '로그인 성공'}));
                    }

                    res.writeHead(401, {'Content-Type': 'application/json; charset=utf-8'});
                    return res.end(JSON.stringify({message: '아이디 또는 비밀번호가 일치하지 않습니다.'}));

                } catch (error) {
                    console.error('Login error:', error);
                    res.writeHead(500, {'Content-Type': 'application/json; charset=utf-8'});
                    return res.end(JSON.stringify({message: '서버 오류가 발생했습니다.'}));
                }
            });
        } else {
            res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
            return res.end('잘못된 경로입니다.');
        }
    } catch (e) {
        console.log(e);
        res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end(e.message);
    }
}).listen(8080, '0.0.0.0', () => {
    console.log('8080 포트에서 서버 대기 중');
});


