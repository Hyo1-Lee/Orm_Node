// 서버소켓으로 메시지 보내기
$("#btnSend").click(function () {
	// 임시로 현재 닉네임 사용-추후 토큰에서 정보 추출
	// 현재 접속한 채널 고유번호
	var channelId = currentChannel.channel_id;

	// 사용자 닉네임 조회
    var memberId = currentUser.member_id;
	var nickName = currentUser.name;
	var profileImgPath = currentUser.profile_img_path;

	// 입력 메세지 조회
	var message = $("#txtMessage").val();

	// 서버로 그룹 메세지 발송하기
	socket.emit("channelMsg", channelId, memberId, nickName, profileImgPath, message);
	$("#txtMessage").val("");
});

// 엔터키로 메시지 보내기
$("#txtMessage").keydown(function (key) {
	if (key.keyCode == 13) {
		$("#btnSend").click();
        key.preventDefault();
	}
});

// 서버에서 보내준 메시지 수신 처리
socket.on("receiveTest", function (nickName, msg, sendDate) {
	var msgTag =
		currentUser.name == nickName
			? `
							<li class='chat-right'>
								<div class="chat-text-wrapper">
									<div class='chat-text'>
										<p>${msg}</p>
										<div class='chat-hour read'>${sendDate}<span>&#10003;</span></div>
									</div>
								</div>
								<div class='chat-avatar'>
									<img src="img/user24.png" alt="Quick Chat Admin" />
									<div class='chat-name'>${nickName}</div>
								</div>
							</li>`
			: `<li class='chat-left'>
								<div class='chat-avatar'>
									<img src="img/user21.png" alt="Quick Chat Admin" />
									<div class='chat-name'>${nickName}</div>
								</div>
								<div class="chat-text-wrapper">
									<div class='chat-text'>
										<p>${msg}</p>
										<div class='chat-hour read'>${sendDate}<span>&#10003;</span></div>
									</div>
								</div>
							</li>`;

	// 채팅 메시지 템플릿 추가
	$("#chatHistory").append(msgTag);

	// 채팅영역 맨 하단으로 스크롤 이동처리
	chatScrollToBottom();
});

// 채팅방 입장 완료 수신기 정의 기능
socket.on("entryok", function (msg, nickName, channelData) {
	currentChannel = channelData;
	var msgTag = `<li class="divider">${msg}</li>`;
	$("#chatHistory").append(msgTag);
	chatScrollToBottom();
});

// 채팅방 메세지 수신 치리기
socket.on("receiveChannelMsg", function (nickName, profileImgPath, msg, sendDate) {
	var msgTag =
		currentUser.name == nickName
			? `<li class='chat-right'>
								<div class="chat-text-wrapper">
									<div class='chat-text'>
										<p>${msg}</p>
										<div class='chat-hour read'>${sendDate}<span>&#10003;</span></div>
									</div>
								</div>
								<div class='chat-avatar'>
									<img src="${profileImgPath}" alt="Quick Chat Admin" />
									<div class='chat-name'>${nickName}</div>
								</div>
							</li>`
			: `<li class='chat-left'>
								<div class='chat-avatar'>
									<img src="${profileImgPath}" alt="Quick Chat Admin" />
									<div class='chat-name'>${nickName}</div>
								</div>
								<div class="chat-text-wrapper">
									<div class='chat-text'>
										<p>${msg}</p>
										<div class='chat-hour read'>${sendDate}<span>&#10003;</span></div>
									</div>
								</div>
							</li>`;

	// 채팅 메시지 템플릿 추가
	$("#chatHistory").append(msgTag);

	// 채팅영역 맨 하단으로 스크롤 이동처리
	chatScrollToBottom();
});

// 채팅창 스크롤 최하단 이동시키기
function chatScrollToBottom() {
	$("#chatScroll").scrollTop($("#chatScroll")[0].scrollHeight);
}

$("#contacts-tab").click(function () {
	var loginUserToken = localStorage.getItem("userauthtoken");

	$.ajax({
		type: "GET",
		url: "/api/member/all",
		headers: {
			Authorization: `Bearer ${loginUserToken}`,
		},
		dataType: "json",
		success: function (result) {
			console.log("모든 사용자 정보 호출 결과: ", result);
			if (result.code == 200) {
				$(".contacts-list").html("");
				$.each(result.data, function (index, user) {
					var userTag = `<li onClick="fnChatEntry(${user.member_id}, '${user.name}', 1)">
                    <a href="#">
                        <div class="contacts-avatar">
                            <span class="status busy"></span>
                            <img src="${user.profile_img_path}" alt="Avatar">
                        </div>
                        <div class="contacts-list-body">
                            <div class="contacts-msg">
                                <h6 class="text-truncate">${user.name}</h6>
                                <p class="text-truncate">${user.email}</p>
                            </div>
                        </div>
                        <div class="contacts-list-actions">
                            <div class="action-block">
                                <img src="img/dots.svg" alt="Actions">
                            </div>
                            <div class="action-list">
                                <span class="action-list-item">Chat User</span>
                                <span class="action-list-item">Remove User</span>
                            </div>
                        </div>
                    </a>
                </li>`;
					$(".contacts-list").append(userTag);
				});
			} else if (result.code == 400) {
				alert(result.msg);
			} else {
				alert("현재 사용자 정보 호출 실패: " + result.msg);
			}
		},
		error: function (err) {
			console.log("백엔드 API 호출 에러 발생: ", err);
		},
	});
});

function fnChatEntry(memberId, nickName, channelType) {
	console.log("채팅방 입장위한 선택 사용자 정보: ", memberId, nickName);

	var channel = {
		channelType, // 1: 1:1 채팅, 2: 그룹 채팅
		channelId: 0, // 0: 1:1 채팅, 그룹 채팅은 채널 아이디
		token: localStorage.getItem("userauthtoken"),
		targetMemberId: memberId,
		targetNickName: nickName,
	};
	socket.emit("entryChannel", channel);

	$(".empty-chat-screen").addClass("d-none");
	$(".chat-content-wrapper").removeClass("d-none");
}
