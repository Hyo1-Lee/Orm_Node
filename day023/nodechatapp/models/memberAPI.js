module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'member_api',
        {
            member_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
                comment: '회원고유번호',
            },
            user_nickname: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: '닉네임',
            },
            user_type_code: {
                type: DataTypes.TINYINT,
                allowNull: false,
                comment: '유저타입코드 0:일반 1:관리자',
            },
            user_state_code: {
                type: DataTypes.TINYINT,
                allowNull: false,
                comment: '사용상태코드 1:사용중 0:정지',
            },
            last_login_date: {
                type: DataTypes.varchar(50),
                allowNull: true,
                comment: '최종로그인일시',
            },
            last_logout_date: {
                type: DataTypes.varchar(50),
                allowNull: true,
                comment: '최종로그아웃일시',
            },
            user_id: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: '유저아이디',
            },
            user_IP: {
                type: DataTypes.STRING(100),
                allowNull: true,
                comment: '유저아이피',
            },
            edit_date: {
                type: DataTypes.varchar(50),
                allowNull: true,
                comment: '수정일시',
            },
            edit_member_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                comment: '수정자고유번호',
            },
        },
        {
            sequelize,
            timestamps: false,
            comment: '채팅방 회원정보',
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    fields: [{ name: 'member_id' }],
                },
            ],
        }
    )
};