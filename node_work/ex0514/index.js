// 단방향 암호화
// const crypto = require('crypto');
const pool = require('./db');
// console.log(pool);

const http = require('http');
const fs = require('fs').promises;

http.createServer(async (req, res) => {
    console.log(req.url);
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
            console.log(result); // 결과 출력해보기
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            return res.end(JSON.stringify(result[0])); // 결과를 JSON으로 변환하여 전송
        }
        else if (req.url === '/join' && req.method === 'POST') {
            // 한글이 들어오는 거 맞추기 위해서 utf-8로 인코딩
            req.setEncoding('utf-8');

            // body 문자열 선언
            let body = '';
            // request 요청 한 클라인거 data로 들어오는게 있으면 
            // data를 모아서 body에 넣어준다.

            // addEventListener('click', (data) => {});

            req.on('data', (data) => {
                body += data;
            });
            req.on('end',async ()=>{
                // body 내용 출력
                console.log(body);
                // body를 JSON.parse로 객체로 변환
                const {id, password} = JSON.parse(body);
                console.log(id, password);

                // mysql 에 저장하는 코드
                const conn = await pool.getConnection(); // pool에서 connection을 가져온다.
                const sql = 'INSERT INTO users (id, password) VALUES (?, ?)'; // sql 구문 설정
                const [result] = await conn.execute(sql, [id, password]); // sql문 실행
                conn.release(); // pool 반환
                
                console.log(result);    // 결과 출력해보기
            })

            res.writeHead(201, {'Content-Type': 'application/json; charset=utf-8'});
            return res.end(JSON.stringify({message:'회원가입 성공'}));
        } else if (req.url === '/login') {
            // id password => mysql select 해당하는 행이 있으면 로그인성공..
            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            return res.end('로그인 성공');
        }

        res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
        return res.end('잘못된 경로입니다.');
    } catch (e) {
        console.log(e);
        res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end(e.message);
    }
    // res.end('<html><body><h1>안녕</h1></body></html>\n');
}).listen(8080, '0.0.0.0', () => {
    console.log('8080 포트에서 서버 대기 중');
});


