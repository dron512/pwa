const http = require("http");

http
  .createServer((req, res) => {
    console.log('통신함');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    res.end('return value');
  })
  .listen(8005, () => {
    console.log("server 시작함");
  });
