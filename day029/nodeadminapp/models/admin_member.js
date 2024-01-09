module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"admin_member",
		{
			admin_member_id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
				comment: "관리자 웹사이트 관리자 계정 고유번호",
			},
			company_code: {
				type: DataTypes.INTEGER,
				allowNull: false,
				comment: "소속 회사 코드 - 기준정보 테이블 참조",
			},
			admin_id: {
				type: DataTypes.STRING(200),
				allowNull: false,
				comment: "관리자 계정 아이디 - 메일주소 아님",
			},
			admin_password: {
				type: DataTypes.STRING(200),
				allowNull: false,
				comment: "관리자 계정 난독화된 단방향 암호화된 비밀번호",
			},
			admin_name: {
				type: DataTypes.STRING(200),
				allowNull: false,
				comment: "관리자명",
			},
            email: {
				type: DataTypes.STRING(100),
				allowNull: true,
				comment: "이메일",
			},
            telephone: {
				type: DataTypes.STRING(50),
				allowNull: true,
				comment: "전화번호",
			},
            dept_name: {
				type: DataTypes.STRING(100),
				allowNull: true,
				comment: "부서명",
			},
			used_yn_code: {
				type: DataTypes.INTEGER,
				allowNull: false,
				comment: "사용여부 코드 0:사용안함 1:사용함",
			},
            reg_date:{
                type: DataTypes.DATE,
                allowNull: false,
                comment: "등록일시",
            },
			reg_member_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				comment: "등록자고유번호",
			},
			edit_date: {
				type: DataTypes.DATE,
				allowNull: true,
				comment: "등록일시",
			},
			edit_member_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				comment: "수정자고유번호",
			},
		},
		{
			sequelize,
			tableName: "admin_member", //기본 테이블명 옵션이 복수형이 아닌 여기 지정한 테이블명으로 생성됨
			timestamps: false,
			comment: "관리자 사이트 관리자 계정 정보",
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "admin_member_id" }], //여러개의 컬럼이 프라이머리키인경우(복합키){}추가하여 설정가능
				},
			],
		}
	);
};
