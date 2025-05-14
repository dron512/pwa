// 단방향 암호화
// const crypto = require('crypto');

const http = require('http');
const fs = require('fs').promises;

http.createServer(async (req, res) => {
    try{
        const password = '비밀번호';    // 숨겨진 데이터
        const indexhtml = await fs.readFile('./index.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(indexhtml);
    }catch(e){
        console.log(e);
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(e.message);
    }
    // res.end('<html><body><h1>안녕</h1></body></html>\n');
}).listen(8080, () => {
    console.log('8080 포트에서 서버 대기 중');
});


