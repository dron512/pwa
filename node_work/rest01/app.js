// 설치되어진 라이브러리를 가져올때는...
// ./express

// const aa = require('./test');
// console.log(aa);

const express = require('express');
const path = require('path');
const sessions = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

const obj = {}

app.set('port',process.env.PORT || 8080);
// app.set('test','100');

app.use(cookieParser());
app.use(sessions({
    secret:'123456',
    resave:false,
    saveUninitialized:false
}));

app.use((req,res,next)=>{
    console.log('여기에 들렸다가 갑니다.');
    next();
})

// RESTFUL -> RESTFUL API
// CRUD -> GET 조회 POST 삽입 PATCH,PUT 수정 DELETE 삭제

app.get('/img',(req,res)=>{
    console.log(__dirname); // 현재 경로 출력
    // 현재 경로에서 html 폴더 밑에 index.html 보내기
    res.sendFile(path.join(__dirname,'./img/aa.jpg'));
})


app.get('/html',(req,res)=>{
    console.log(__dirname); // 현재 경로 출력
    console.log(req.session.name)
    // 현재 경로에서 html 폴더 밑에 index.html 보내기
    res.sendFile(path.join(__dirname,'./html/index.html'));
})

app.get('/', (req, res, next) => {
    console.log(req.headers.cookie);
    req.session.name = '홍길동';
    req.test = "aaatest";
    // console.log(app.get('test'));
    obj.aa = "aa 변수입니다.";
    next();
    // res.send('hello world');
}, (req, res) => {
    console.log(obj.aa);
    console.log(req.method)
    console.log(req.test);
    console.log(req.session.name);
    // req.session.name = 'name';
    res.cookie('test','test');
    res.send('hello get');
    // throw  new Error('error');  // 강제 에러 발생 근데... 매개변수 4개인 미들웨어가 없다
});

app.post('/', (req, res) => {
    console.log(obj.aa);
    console.log(req.method)
    console.log(req.test);
    res.send('hello post');
});

app.use((err,req,res,next)=>{
    console.log(err);
    res.status(500).json({'error':'에러가 강제로 발생하였습니다.'});
})


app.listen(app.get('port'), () => {
    console.log('server is running on port 3000');
});

