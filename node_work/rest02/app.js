const pool = require("./db");
const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan"); // (req,res,next=>{}) 미들웨어'

app.use(morgan("dev")); // 미들웨어 등록
// console.log(morgan("dev").toString());
app.use("/", express.static(path.join(__dirname, "public")));
// console.log(express.static(path.join(__dirname, "public")).toString());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("모든 요청은 여기 들렸다가 진행된다.");
  next();
});

app.get(
  "/",
  async (req, res, next) => {
    // console.log('req.body');
    // console.log(req.body);
    // console.log('req.query');
    // console.log(req.query);
    // console.log(req.query.name);
    // console.log(req.query.age);

    const conn = await pool.getConnection(); // 연결 객체 가져오기
    const result = await conn.execute("select * from users"); // sql 구문 실행
    conn.release(); // 연결 객체 반환
    next();
    // 끝...
    res.status(200).json(result[0]); // 클라이언트한테 hello get 보내기
  },
  (req, res, next) => {
    console.log("일로오나");
    // res.json('이거 두번 보내기 되냐');
  }
);
app.post("/", async (req, res) => {
  const conn = await pool.getConnection(); // 연결 객체 가져오기
  const result = await conn.execute(`insert into users 
                                     (id,password)
                                     values
                                     ('${req.body.name}','${req.body.age}')`); // sql 구문 실행
  conn.release(); // 연결 객체 반환
  res.send(result);
});
app.put("/", (req, res) => {
  res.send("Hello put");
});
app.delete("/", (req, res) => {
  throw new Error("강제에러 발생");
  res.send("hello delete");
});

app.get("/html", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("에러가발생하였습니다.");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
