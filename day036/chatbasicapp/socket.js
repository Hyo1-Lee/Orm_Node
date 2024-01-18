// 소켓 io 객체 참조
const SocketIO = require("socket.io");
var redis = require("socket.io-redis");
module.exports = (server) => {
	// socketIO('서버소켓이 실행될 백엔드 서버 객체')
	// 웹브라우저 클라이언트에 제공될 클라이언트 스크립트 socket 라이브러리 경로
	// 클라이언트 스크립트 socket 라이브러리: http://localhost:3000/socket.io.js
	// const io = SocketIO(server, {path:"/socket.io"});

	const io = SocketIO(server, {
		path: "/socket.io",
		cors: {
			origin: "*",
			methods: ["GET", "POST"],
		},
	});
	io.adapter(
		redis({
			host: "127.0.0.1",
			port: "6379",
			// password: "1234"
		})
	);

	// io.on("이벤트명", (콜백함수)=>{...});
	// io 서버소켓이 클라이언트와 연결이 완료되면 메세지 수발신 기능을 제공
	// 소켓은 반드시 클라이언트와 연결이 된 상태에서만 메세지를 주고 받을 수 있다.
	// io 서버소켓이 connection 이벤트가 발생한 스코프 안에서 각종 메세지 수발신 기능을 제공
	//클라이언트와 서버소켓간 연결이 완료되면 클라이언트/서버연결 정보를 가진 socket이란 객체가 전달됨.
	//io는 서버소켓 자체이고(상위개념),socket은 각각의 클라이언트와 연결된 연결정보객체입니다.
	io.on("connection", async (socket) => {
		socket.on("broadcast", async (msg) => {
			// io.emit("클라이언트 이벤트 수신기 명", data)은 현재 서버소켓인 io에 연결된 모든 사용자에게
			// 지정한 클라이언트 이벤트 수신기 명으로 해당 메시지 데이터를 보낸다.
			io.emit("receiveAll", msg);
		});

		socket.on("test", async (msg) => {
			io.emit("receiveTest", msg);
		});

		// 채팅방 개설 및 채팅방 입장하기 기능 처리
		// 사용자 채팅방 입장 사실 클라이언트들에게 알리기
		socket.on("entry", async (channelId, nickName) => {
			// socket.join('채팅방고유아이디-문자열')
			// 듕일 채널id가 없으면 해당 채팅방을 만들고 있으면 해당채널로 접속
			socket.join(channelId);

			// 채널 입장사실 사용자들에게 알려주기 3가지 방법
			// 1) 현재 접속한 사용자에게만(나에게만) 메시지를 보내기
			// socket.emit('클라이언트 이벤트 수신기명', 전달데이터)
			socket.emit("entryok", `${nickName} 대화명으로 입장했습니다.`);

			// 2) 해당 접속한 채팅방에 나를 제외한 나머지 사용자들에게만 메시지를 보내고 싶을때
			// socket.io(채널아이디).emit('클라이언트이벤트 수신기명', 전달데이터)
			socket.to(channelId).emit("entryok", `${nickName}님이 채팅방에 입장했습니다.`);

			// 3) 해당 채팅방에 나를 포함한 모든 사용자에게 메시지 보내기
			// io.to(채널아이디).emit('클라이언트이벤트 수신기명', 전달데이터)
			// io.to(channelId).emit('entryok', `${nickName}님이 채팅방에 입장했습니다.`)
		});

		// 채팅방 기준 사용자 메세지 수발신 처리
		socket.on("groupmsg", async (msg) => {
			var sendMsg = `${msg.nickName} : ${msg.message}`;
			io.to(msg.channelId).emit("receivedGroupMsg", sendMsg);
		});
	});
};
