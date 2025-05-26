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

const subscribe = [
    {
        sub: {
            endpoint: 'https://fcm.googleapis.com/fcm/send/fEk6pFN9ihc:APA91bFy8GFObup3DmarjtcyWvU_kQ0-SCwuCftONyhnZ1VBZKe6bNNx3u3UHIshJKRppCi2lcnkhsrLSEiZ1HFDII3RfbMD8VbaNkifP9OkSQzrsfORF06KdB_CV_96x-n9NnZfgIgZ',
            keys: {
                p256dh: 'BCCyUUatF3RrwtUbGy2B3dyoSYBQHuSlzoGo4SK3cy2uz8XMQ8jmM_qIyukvN7j-5-oiFvKiDA19pjSliFbm7vI',
                auth: 'BCCyUUatF3RrwtUbGy2B3dyoSYBQHuSlzoGo4SK3cy2uz8XMQ8jmM_qIyukvN7j-5-oiFvKiDA19pjSliFbm7vI'
            }
        }
    }
]

app.post("/subscribe",(req,res,next)=>{
    console.log(req.body);
    subscribe.push({ sub: req.body });
    res.json({message:'구독성공'});
})

app.get("/send", async (req, res) => {
    try {
        const payload = JSON.stringify({
            title: '새로운 알림',
            body: '새로운 내용이 도착했습니다!',
            url: 'https://front02-puce.vercel.app/'
        });

        // 모든 구독자에게 알림 전송
        const notifications = subscribe.map(sub => 
            webpush.sendNotification(sub.sub, payload)
        );
        
        await Promise.all(notifications);
        res.json({ message: '알림 전송 성공' });
    } catch (error) {
        console.error('알림 전송 실패:', error);
        res.status(500).json({ error: '알림 전송 실패' });
    }
});

app.listen(8080, () => {
  console.log("서버 8080시작");
});
