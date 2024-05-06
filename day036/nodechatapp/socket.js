const SocketIO = require("socket.io");
const moment = require("moment");
const jwt = require("jsonwebtoken");
var db = require("./models/index");

module.exports = (server) => {
	const io = SocketIO(server, {
		path: "/socket.io",
		cors: {
			origin: "*",
			methods: ["GET", "POST"],
		},
	});

	io.on("connection", async (socket) => {
		//소켓Req객체
		const req = socket.request;

		// 현재 연결되는 사용자들기반을 사용할 전역변수 정의
		const socketId = socket.id; // 현재 접속한 사용자의 소켓 아이디
		const userIP = req.headers["x-forwarded-for"] || req.connection.remoteAddress; //사용자IP

		// system 소켓 이벤트 재정의하기

		// 웹 브라우저와 서버소켓이 끊어질 때마다 자동으로 발생하는 이벤트
		// 사용자가 채팅중에 웹 브라우저를 닫거나 일시적으로 네트워크 자앵가 발생해 웹 소켓이 끊기는 경우
		// 서버 소켓에서 자동 소켓 끊김 감지 기능 제공
		socket.on("disconnect", async () => {

			// 개발자 정의 현재 사용자 연결 끊김 처리 함수
			await UserConnectionOut();

			// 소켓 끊김시 서버측 자원 정리 기능
			clearInterval(socket.interval);
		});

		socket.on("error", async (error) => {
			console.log("소켓 에러 발생: ", error);
		});

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

		socket.on("entryChannel", async (channel) => {
			try {
				var currentUser = jwt.verify(channel.token, process.env.JWT_SECRET);
				var channelData = {};
				if (channel.channelType == 1) {
					// 일대일 채팅
					var channelName =
						channel.targetMemberId < currentUser.member_id
							? `${channel.targetMemberId}-${currentUser.member_id}`
							: `${currentUser.member_id}-${channel.targetMemberId}`;

					channelData = await db.Channel.findOne({
						where: {
							channel_name: channelName,
							category_code: 1,
						},
					});

					if (channelData == null) {
						var channelInfo = {
							community_id: 1,
							category_code: channel.channelType,
							channel_name: channelName,
							channel_img_path: "",
							user_limit: 2,
							channel_state_code: 1,
							reg_date: Date.now(),
							reg_member_id: currentUser.member_id,
						};
						var registedChannel = await db.Channel.create(channelInfo);
						channelData = registedChannel;

						var currentMember = {
							channel_id: registedChannel.channel_id,
							member_id: channel.targetMemberId,
							nick_name: channel.targetNickName,
							member_type_code: 0,
							active_state_code: 0,
							connection_id: "",
							ip_address: "",
							edit_date: Date.now(),
							edit_member_id: channel.targetMemberId,
						};
						await db.ChannelMember.create(currentMember);

						var targetMember = {
							channel_id: registedChannel.channel_id,
							member_id: currentUser.member_id,
							nick_name: currentUser.name,
							member_type_code: 1,
							active_state_code: 0,
							connection_id: "",
							ip_address: "",
							edit_date: Date.now(),
							edit_member_id: currentUser.member_id,
						};
						await db.ChannelMember.create(targetMember);
					}
				} else {
					// 그룹 채팅
				}

				// 현재 접속자의 접속 상태와 접속 일시 정보 업데이트 처리
				var updateMember = {
					active_state_code: 1,
					last_contact_date: Date.now(),
					connection_id: socketId,
					ip_address: userIP,
				};
				await db.ChannelMember.update(updateMember, {
					where: { channel_id: channelData.channel_id, member_id: currentUser.member_id },
				});

				socket.join(channelData.channel_id);

				socket.emit(
					"entryok",
					`${currentUser.name} 대화명으로 입장했습니다.`,
					currentUser.name,
					channelData
				);
				socket
					.to(channelData.channel_id)
					.emit(
						"entryok",
						`${currentUser.name}님이 채팅방에 입장했습니다.`,
						currentUser.name,
						channelData
					);

				await ChattingMsgLogging(
					channelData.channel_id,
					currentUser.member_id,
					currentUser.name,
					1,
					`${currentUser.name}님이 채팅방에 입장했습니다.`
				);
			} catch (err) {
				socket.emit("entryok", "채널 접속 오류 발생");
				console.log("채팅방 입장 에러: ", err);
			}
		});

		// 채팅방 별로 메세지 수-발신 처리
		socket.on("channelMsg", async (channelId, memberId, nickName, profileImgPath, message) => {
			var sendTime = moment(Date.now()).format("HH:mm");
			io.to(channelId).emit("receiveChannelMsg", nickName, profileImgPath, message, sendTime);

			// 채팅 이력 로그 기록 하기
			await ChattingMsgLogging(channelId, memberId, nickName, 2, message);
		});

		// 채팅 이력 정보 기록처리 함수
		async function ChattingMsgLogging(channelId, memberId, nickName, msgTypeCode, message) {
			var msg = {
				channel_id: channelId,
				member_id: memberId,
				nick_name: nickName,
				msg_type_code: msgTypeCode,
				connection_id: socketId,
				ip_address: userIP,
				message: message,
				msg_state_code: 1,
				msg_date: Date.now(),
				edit_date: Date.now(),
			};
			await db.ChannelMsg.create(msg);
		}

		// 현재 사용자 나가기 정보 처리
		async function UserConnectionOut(){
			var member = await db.ChannelMember.findOne({
				where: {connection_id: socketId}
			});
			if (member != null){
				// 사용자 연결 끊김 정보 수정 반영
				var updateMember = {
					active_state_code: 0,
					last_out_date: Date.now(),
					connection_id: socketId,
					ip_address: userIP,
				};
				await db.ChannelMember.update(updateMember, {
					where: { connection_id: socketId },
				});

				await ChattingMsgLogging(
					member.channel_id,
					member.member_id,
					member.name,
					0,
					`${member.nick_name}님이 퇴장했습니다..`
				);
			}
		}
	});
};
