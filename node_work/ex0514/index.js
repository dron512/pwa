// 단방향 암호화
// const crypto = require('crypto');
const { hashPassword, verifyPassword } = require('./passwordEncode');
const pool = require('./db');

const http = require('http');
const fs = require('fs').promises;

http.createServer(async (req, res) => {
    try {
        if (req.url === '/') {
            const password = '비밀번호';    // 숨겨진 데이터
            const indexhtml = await fs.readFile('./index.html');
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            return res.end(indexhtml);
        }
        else if( req.url.includes('/select') ){
            const conn = await pool.getConnection(); // pool에서 connection을 가져온다.
            const sql = 'SELECT * FROM users';  // select 구문
            const result = await conn.execute(sql); // sql문 실행
            conn.release(); // pool 반환
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            return res.end(JSON.stringify(result[0])); // 결과를 JSON으로 변환하여 전송
        }
        else if (req.url === '/join' && req.method === 'POST') {
            // 한글이 들어오는 거 맞추기 위해서 utf-8로 인코딩
            req.setEncoding('utf-8');

            // body 문자열 선언
            let body = '';

            req.on('data', (data) => {
                body += data;
            });
            req.on('end',async ()=>{
                // body를 JSON.parse로 객체로 변환
                const {id, password} = JSON.parse(body);

                // 비밀번호 해시화
                const { salt, hashed } = await hashPassword(password);

                // mysql 에 저장하는 코드
                const conn = await pool.getConnection(); // pool에서 connection을 가져온다.
                const sql = 'INSERT INTO users (id, password, salt) VALUES (?, ?, ?)'; // sql 구문 설정
                const [result] = await conn.execute(sql, [id, hashed, salt]); // sql문 실행
                conn.release(); // pool 반환
            })

            res.writeHead(201, {'Content-Type': 'application/json; charset=utf-8'});
            return res.end(JSON.stringify({message:'회원가입 성공'}));
        } else if (req.url === '/login' && req.method === 'POST') {
            req.setEncoding('utf-8');
            let body = '';

            // Promise를 사용하여 요청 본문을 처리
            // 요청 본문 데이터 수집
            req.on('data', (data) => {
                body += data;
            });

            // 요청 본문 처리 완료 시
            req.on('end', async () => {
                try {
                    const { id, password } = JSON.parse(body);
                    
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
        }else{
            res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
            return res.end('잘못된 경로입니다.');
        }
    } catch (e) {
        console.log(e);
        res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end(e.message);
    }

    console.log("여기 실행")
    // res.end('<html><body><h1>안녕</h1></body></html>\n');
}).listen(8080, '0.0.0.0', () => {
    console.log('8080 포트에서 서버 대기 중');
});


