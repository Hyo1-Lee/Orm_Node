module.exports = function (sequelize, DataTypes) {
    // sequelize.define('테이블명', { 컬럼정의 }, { 테이블옵션 })
    return sequelize.define(
      'member',
      {
          member_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
          comment: '회원고유번호',
        },
        email: {
          type: DataTypes.STRING(100),
          primaryKey: false,
          allowNull: false,
          comment: '사용자메일주소',
        },
        password: {
            type: DataTypes.STRING(100),
            primaryKey: false,
            allowNull: false,
            comment: '사용자메일주소',
          }
      },
      {
         timestamps: true, // 등록일시(createdAT), 수정일시(updatedAT), 컬럼 자동생성
         paranoid: true // 데이터 삭제 컬럼 자동 생성(deletedAT) 및 물리적 데이터 삭제 안함 기능 제공
     });
  };