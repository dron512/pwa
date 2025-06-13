// 설치한 npm i
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const nunjucks = require("nunjucks");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
require("dotenv").config();
const cors = require('cors');
const fs = require('fs');
const webpush = require("web-push");

webpush.setVapidDetails(
  "mailto:dron512@naver.com",
  "BMq3F00aFd-uR2uUHuzf5i57BfVC9KcPJmvSr90CjYn8cgvz8oqXBBqKfuv9O-gaOot6Eqzl-ujlkUaIXgAdqZ4",
  "E5sCdeZSehjLu_9y4BjLSkVMwr8rAR7pcCtc-4bujvY"
);
// models 폴더 안에 index.js 파일 호출해라
// const { sequelize, User } = require("./models");
// console.log(sequelize);

const app = express();
app.set("port", process.env.PORT || 3001);

// Nunjucks 설정
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true,
});
app.set("view engine", "html");

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("DB연결 성공");
//   })
//   .catch((err) => {
//     console.error(err);
//   });

//함수 만들어서 즉시 함수 호출 실행..
// (async function () {
//   // await 를 top level 에서 사용 불가능 해서...
//   const result = await User.findAll({
//     attributes: ["name", "age"],
//   });
//   console.log(result);
// })();

// const result = User.findAll({});
//   console.log(result);

// User.create({
//   name: "ㅂㅈㄷㄱ",
//   age: 20,
//   married: 0,
//   comment: "ㅂㅈㄷㄱ라는 사람이야",
// });

app.use(morgan("dev"));
app.use(express.json(), express.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cookieParser(process.env.COOKIE_SECRET));
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
app.set("port", 4001);

app.use(cors());
/* 미들웨어 장착 끝 */

const resRouter = require("./routes/res.js");
const gisaRouter = require("./routes/gisa.js");
const payRouter = require("./routes/pay.js");
const adminRouter = require("./routes/admin.js");
const loginRouter = require("./routes/login.js");
const alarmRouter = require('./routes/alarm');

app.get("/", (req, res, next) => {
  res.render("index");
});

app.use("/res", resRouter);
app.use("/gisa",gisaRouter);
app.use("/pay",payRouter);
app.use("/admin", adminRouter);
app.use("/login", loginRouter);
app.use("/alram", alarmRouter);

app.use((req, res, next) => {
  console.log("해당하는 라우터가 없다"+req.path);
  const error = new Error("해당하는 페이지가 없습니다.");
  next(error); // 에러 미들웨어로 가라
});

app.use((err, req, res, next) => {
  console.log("에러 미들웨어 동작");
  console.error(err);
  res.send(err.toString() + "<a href='/'>첫페이지로</a>");
});

// uploads 폴더 자동 생성
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.listen(app.get("port"), () => {
  console.log(`서버 ${app.get("port")}시작`);
});
