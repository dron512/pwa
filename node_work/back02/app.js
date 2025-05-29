require("dotenv").config();

const webpush = require("web-push");

webpush.setVapidDetails(
  "mailto:dron512@naver.com",
  "BMCne_9uf301kxUf_wqVTiARfQ0t9tnbTzw7WDLu-eeJ0QGxM_AxkXbEAWxaqSLkNa7ty-XZKjYX5EHLw63N7Y4",
  "cInBNnVO1wTLpwht9GveA19PDPlW_Lop1bYp9VpfnGw"
);

const cors = require("cors");

const pool = require("./db");
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
// const ss = [];

app.post("/subscribe", async (req, res, next) => {
  try {
    console.log(req.body);
    const conn = await pool.getConnection();
    const sql =
      "insert into subscriptions (endpoint, p256dh, auth, city) values (?,?,?,?)";
    const result = await conn.execute(sql, [
      req.body.sub.endpoint,
      req.body.sub.keys.p256dh,
      req.body.sub.keys.auth,
      req.body.city,
    ]);
    // pool 반환
    conn.release();
    res.send(result);
  } catch (e) {
    console.log(e);
    res.send("구독실패",e);
  }
});

// 관리자 send -> 보내는게 알림X 

// 윈도우 
// 리눅스 crontab
// node 교과서... 12장 스케쥴러기법
// -> setInterval(()=>{ 즐겨찾는게 있고 일정시간이 .send},1000*60)
// 버스가 일정시간 안에 -> 알람
// 미세먼지 농도 설정 -> 알람

app.get("/send", async (req, res, next) => {

  // query 는 http://localhost:8080/send?city=daegu
  // body 는 http://localhost:8080 raw-json 데이터 { "city":"daegu"}
  try {
    const {city} = req.query; // 4장, 6장에내용

    // select -> sequelize orm 면접단골질문... orm 라이브러리??
    const conn = await pool.getConnection();
    const sql = "select * from subscriptions where city=?";
    const result = await conn.execute(sql,[city]);

    const payload = JSON.stringify({
      title: "new 알림",
      body: "미세먼지가.. 좀... 버스가 몇분뒤 도착...하였습니다.",
      url: "https://front02-puce.vercel.app/",
    });
    const notifications = result[0].map((item) => {
      console.log("item = ", item);
      const temp = {
        endpoint:item.endpoint,
        expirationTime: null,
        keys: {
          p256dh: item.p256dh,
          auth: item.auth,
        },
      };
      console.log("temp = ",temp)
      return webpush.sendNotification(temp, payload);
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
