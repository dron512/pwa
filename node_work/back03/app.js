const express = require("express");
const path = require("path");

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

require("dotenv").config();

// console.log(process.env.AA);
// console.log(process.env.BB);
// const dotenv = require('dotenv');
// dotenv.config();

const app = express();

// 로그남기기
app.use(morgan("combined"));
// public 에 있는거 요청했을경우 응답해주기
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json()); // req.body 확인
app.use(express.urlencoded({ extended: false })); // req.query 확인
app.use(cookieParser(process.env.COOKIE_SECRET));

app.set("port", 4000);

// 쿠키는 백엔드쪽에서 만들어서 프론트한테 전달
// 프론트는 cookies 저장소에다가 넣어놓고 주소 호출한테 자동으로 전달
app.post("/setCookie", (req, res, next) => {
  res.cookie("haha", "hoho");
  res.cookie("signhaha","hoho", { signed:true } );
  res.send("쿠키설정");
});

app.get('/getCookie',(req,res,next)=>{
    console.log(req.cookies);
    console.log(req.signedCookies);
    res.send("쿠키확인")
})

app.get("/", (req, res, next) => {
  console.log(req.body);
  console.log(req.query);
  console.log("/경로 요청");
  res.send("성공");
});

app.get("/html", (req, res, next) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use((err, req, res, next) => {
  console.log(err);
  res.send(err);
});

app.listen(app.get("port"), () => {
  console.log(`서버 ${app.get("port")}시작`);
});
