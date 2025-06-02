const express = require("express"); // express 라이브러리
const path = require("path"); // 경로설정라이브러리

const nunjucks = require("nunjucks"); // html 보내는거 res.render

const morgan = require("morgan"); // 로그???
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const cors = require("cors");
const { title } = require("process");
const multer = require("multer");
const fs = require("fs");

try {
  // uploads 폴더 읽어라 근데 없으면 에러(캐치)로 간다
  fs.readdirSync("uploads");
} catch (e) {
  console.error("uploads 폴더가 없어서 uploads폴더 생성합니다.");
  fs.mkdirSync("uploads");
}

require("dotenv").config();

const webpush = require("web-push");

webpush.setVapidDetails(
  "mailto:you@example.com",
  "BMq3F00aFd-uR2uUHuzf5i57BfVC9KcPJmvSr90CjYn8cgvz8oqXBBqKfuv9O-gaOot6Eqzl-ujlkUaIXgAdqZ4",
  "E5sCdeZSehjLu_9y4BjLSkVMwr8rAR7pcCtc-4bujvY"
);

// console.log(process.env.AA);
// console.log(process.env.BB);
// const dotenv = require('dotenv');
// dotenv.config();

const app = express();

// app.use((req,res,next)=>{
//   console.log(req.method,"그다음 미들웨어로 진행");
//   next();
// },(req,res,next)=>{
//   console.log("그다음 미들웨어");
//   try{
//     as;
//   }catch(e){
//     console.log(e);
//     next(e);
//   }
//   next()
// },(req,res,next)=>{
//   console.log("다음 미들웨어");
//   next()
// })

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// console.log(morgan("dev").toString());

// app.use(morgan());
app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") morgan("combined")(req, res, next);
  else morgan("dev")(req, res, next);
});

// javascript react node 기사
app.use((req, res, next) => {
  console.log("밖에서req사용가능");
  (function (req, res, next) {
    next();
    console.log("req사용가능");
  })(req, res, next);
});

// 로그남기기
app.use(express.json(), express.urlencoded({ extended: false }));
// public 에 있는거 요청했을경우 응답해주기
app.use("/", express.static(path.join(__dirname, "public")));
app.use(cookieParser(process.env.COOKIE_SECRET));
// cookieParser 미들웨어 등록하고 그 다음에 expressSession 호출 하는게 안전하다.
app.use(
  expressSession({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      secure: false,
    },
    name: "session-cookie",
  })
);

app.set("port", 4000);
app.set("view engine", "html");

nunjucks.configure("views", {
  express: app,
  watch: true,
});

const upload = multer({
  storage: multer.diskStorage({
    // 파일은 디스크에 저장 하겠다.
    destination(req, file, done) {
      done(null, "uploads/"); // 파일이 업로드 되면 uploads경로에 저장하겠다
    },
    // 파일을 저장할때 파일명은
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      console.log(ext);
      console.log(path.basename(file.originalname, ext) + Date.now() + ext);
      // 원래 파일명 + 현재시간 + 확장자로 설정하겠다.
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 100 * 1024 * 1024 },
});

app.get("/", (req, res, next) => {
  console.log(req.body);
  console.log(req.query);
  console.log("/경로 요청");

  // 데이터 베이스에 가서
  res.locals.member = [
    {
      name: "홍길동",
      age: 20,
    },
    {
      name: "박길동",
      age: 30,
    },
    {
      name: "이길동",
      age: 40,
    },
  ];
  res.locals.data = "새로운 데이터";
  res.locals.aaa = "aaa데이터";
  // res.send("성공");
  res.render("index", { title: "제목" });
});

app.get("/multipart", (req, res, next) => {
  res.render("multipart");
});

// console.log(upload.single('image').toString());

// upload 경로 하나 로만 만들고 싶으면
// req.file req.files 이것의 내용을 확인해서
// 다음 미들웨어를 upload.single() 이나 upload.array()를 설정해야한다.

app.post("/upload", upload.single("image"), (req, res, next) => {
  console.log("파일 한개 올림");
  console.log(req.file, req.body);
  res.send("저장성공");
});

app.post("/uploads", upload.array("many"), (req, res, next) => {
  console.log("파일 여러개 올림");
  console.log(req.files, req.body);
  res.send("저장성공");
});

app.post("/login", (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (email === "aaa@naver.com" && password === "1234") {
    req.session.user = { email };
    res.send("로그인성공");
  } else {
    res.send("로그인실패 email password 확인하세요");
  }
});

app.get("/mypage", (req, res, next) => {
  if (req.session.user) {
    res.send(req.session.user);
  } else {
    res.send("로그인안되어있음");
  }
});

app.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("세션삭제실패");
    }
    res.clearCookie("session-cookie");
    res.send("로그아웃되었습니다.");
  });
});

app.post("/setSession", (req, res, next) => {
  req.session.userName = "홍길동";
  req.session.loggedIn = true;
  res.send("세션 설정 완료");
});

app.get("/getSession", (req, res, next) => {
  console.log("req.session.userName", req.session.userName);
  console.log("req.session.loggedIn", req.session.loggedIn);
  res.send("세션가져오기");
});

app.get("/destorySession", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("세션삭제실패");
    }
    res.clearCookie("session-cookie");
    res.send("세션 삭제 완료");
  });
});

// 쿠키는 백엔드쪽에서 만들어서 프론트한테 전달
// 프론트는 cookies 저장소에다가 넣어놓고 주소 호출한테 자동으로 전달
app.get("/setCookie", (req, res, next) => {
  console.log(new Date(Date.now));
  res.cookie("haha", "hoho", {
    expires: new Date(Date.now() + 1000 * 60),
  });
  res.cookie("signhaha", "hoho", { signed: true });
  res.send("쿠키설정");
});

app.get("/getCookie", (req, res, next) => {
  console.log(req.cookies);
  console.log(req.signedCookies);
  res.send("쿠키확인");
});

app.get("/html", (req, res, next) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/send", (req, res, next) => {
  webpush.sendNotification(
    subscription,
    JSON.stringify({
      title: "새 메시지",
      body: "누군가가 당신에게 메시지를 보냈어요!",
      url: "/chat",
    })
  );
});

app.use((err, req, res, next) => {
  console.log("에러 미들웨어 동작");
  console.error(err);
  console.error(err.message);
  res.send(err.toString());
});

app.listen(app.get("port"), () => {
  console.log(`서버 ${app.get("port")}시작`);
});
