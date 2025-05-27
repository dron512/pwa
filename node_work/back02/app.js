require("dotenv").config();

const webpush = require("web-push");

webpush.setVapidDetails(
  "mailto:dron512@naver.com",
  "BMCne_9uf301kxUf_wqVTiARfQ0t9tnbTzw7WDLu-eeJ0QGxM_AxkXbEAWxaqSLkNa7ty-XZKjYX5EHLw63N7Y4",
  "cInBNnVO1wTLpwht9GveA19PDPlW_Lop1bYp9VpfnGw"
);

const cors = require("cors");

// const pool = require("./db");
const mymid = require("./mymiddle");
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

// console.log(mymid.toString());

app.use(morgan("tiny"));
app.use(cors());
// 해당하는 파일이 있을때는 res.sendFile(), next()
app.use("/images", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(mymid);

app.get("/", (req, res, next) => {
  console.log("/호출");
  res.send("클라이언트한테보내기");
});

// 서버 시작 누르기 되면 배열 값 삭제
// 배열이기 때문에 서버 재시작 하면 프론트 정보 사라짐
// DB에 넣어야 함.
const ss = [];

app.post("/subscribe", (req, res, next) => {
  console.log(req.body);
  ss.push({ sub: req.body });
  console.log(ss);
  res.send("구독성공");
});

app.get("/send", async (req, res, next) => {
  try {
    const payload = JSON.stringify({
      title: "new 알림",
      body: "미세먼지가.. 좀... 버스가 몇분뒤 도착...하였습니다.",
      url: "https://front02-puce.vercel.app/",
    });
    const notifications = ss.map((item) => {
      console.log("item = ", item);
      return webpush.sendNotification(item.sub, payload);
    });
    console.log("notifications = ", notifications);
    await Promise.all(notifications);
    res.json({ message: "푸시 알람 전송 성공" });
  } catch (e) {
    console.log(e);
    res.json({ message: "푸시 알람 전송 실패" });
  }
});

app.listen(8080, () => {
  console.log("서버 8080시작");
});
