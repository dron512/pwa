const SocketIO = require("socket.io");

module.exports = (server, app) => {
    const io = SocketIO(server, {
        path: "/socket.io",
    });
    app.set("io", io);

    io.on("connection", (socket) => {
        console.log("새로운 클라이언트 접속");
        const req = socket.request;
        const { headers } = req;
        console.log(headers);
    });

};

