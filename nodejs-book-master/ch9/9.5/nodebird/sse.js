const SSE = require("sse");

module.exports = (server) => {
    const sse = new SSE(server);
    sse.on("connection", (client) => {
        setInterval(() => {
            console.log("SSE 연결 성공");
            client.send({
                time: new Date().toISOString(),
            });
        }, 1000);
    });
};

