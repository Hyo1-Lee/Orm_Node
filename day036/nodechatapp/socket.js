const SocketIO = require("socket.io");
const moment = require("moment");

module.exports = (server) => {
	const io = SocketIO(server, {
		path: "/socket.io",
		cors: {
			origin: "*",
			methods: ["GET", "POST"],
		},
	});

	io.on("connection", async (socket) => {
		socket.on("broadcast", async (msg) => {
			io.emit("receiveAll", msg);
		});

		socket.on("test", async (nickName, msg) => {
			var sendTime = moment(Date.now()).format("HH:mm");
			io.emit("receiveTest", nickName, msg, sendTime);
		});

		socket.on("entry", async (channelId, nickName) => {
			socket.join(channelId);
			socket.emit("entryok", `${nickName} 대화명으로 입장했습니다.`);
			socket.to(channelId).emit("entryok", `${nickName}님이 채팅방에 입장했습니다.`);
		});

		socket.on("groupmsg", async (msg) => {
			var sendMsg = `${msg.nickName} : ${msg.message}`;
			io.to(msg.channelId).emit("receivedGroupMsg", sendMsg);
		});
	});
};
