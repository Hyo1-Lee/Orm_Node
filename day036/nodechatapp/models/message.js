module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"channel_member",
		{
            channel_msg_id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                comment: "채널메시지고유번호",
            },
			channel_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				comment: "채널고유번호",
			},
			member_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				comment: "메세지 발생 회원 고유번호",
			},
			nick_name: {
				type: DataTypes.STRING(100),
				allowNull: false,
				comment: "채널 분류 코드 1:일대일 2:그룹",
			},
			msg_type_code: {
				type: DataTypes.TINYINT,
				allowNull: false,
				comment: "메세지 유형 0:퇴장 1:입장 2:채팅 3:파일 4:이미지 5:이모티콘 6:공지",
			},
			connection_id: {
				type: DataTypes.STRING(100),
				allowNull: false,
				comment: "웹 소켓 연결 아이디",
			},
            message: {
				type: DataTypes.STRING(100),
				allowNull: false,
				comment: "메세지 내용",
			},
			ip_address: {
				type: DataTypes.STRING(100),
				allowNull: false,
				comment: "IP주소",
			},
            message_state_code: {
				type: DataTypes.INTEGER,
				allowNull: true,
				comment: "메세지 상태 코드 0:미확인 1:확인",
			},
			msg_date: {
				type: DataTypes.DATE,
				allowNull: false,
				comment: "메세지 작성 일시",
			},
			edit_date: {
				type: DataTypes.DATE,
				allowNull: false,
				comment: "메세지 수정 일시",
			},
            del_date: {
				type: DataTypes.DATE,
				allowNull: true,
				comment: "메세지 삭제 일시",
			},
		},
		{
			sequelize,
			tableName: "channel_msg",
			timestamps: false,
			comment: "채널메세지정보테이블",
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "channel_msg_id" }], 
				},
			],
		}
	);
};
