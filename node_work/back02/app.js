require("dotenv").config();

const webpush = require('web-push');

webpush.setVapidDetails(
    'mailto:dron512@naver.com', 
    'BMCne_9uf301kxUf_wqVTiARfQ0t9tnbTzw7WDLu-eeJ0QGxM_AxkXbEAWxaqSLkNa7ty-XZKjYX5EHLw63N7Y4',
    'cInBNnVO1wTLpwht9GveA19PDPlW_Lop1bYp9VpfnGw'
)

const cors = require("cors");

// const pool = require("./db");
const mymid = require("./mymiddle");
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

console.log(mymid.toString());

app.use(morgan());
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

app.get("/subscribe",(req,res,next)=>{
    console.log(req.body);
    res.send('구독성공');
})

app.listen(8080, () => {
  console.log("서버 8080시작");
});
