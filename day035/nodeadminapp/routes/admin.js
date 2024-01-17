// 관리자 사이트 관리자 계정 정보 관리 라우팅 기능

// 라우터의 기본주소는
// http://localhost:3000/admin/~

var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const AES = require("mysql-aes");
// const {isLoggedin, isNotLoggedin} = require("./sessionMiddleware")
const { isLoggedin, isNotLoggedin } = require("./passportMiddleware.js");
var db = require("../models/index.js");
var Op = db.Sequelize.Op;
var sequelize = db.sequelize;
const { QueryTypes } = sequelize;

router.get("/list", isLoggedin, async (req, res, next) => {
	// var admins = await db.Admin.findAll({
	// 	attributes: [
	// 		"admin_member_id",
	// 		"email",
	// 		"admin_name",
	// 		"telephone",
	// 		"dept_name",
	// 		"used_yn_code",
	// 		"reg_date",
	// 	],
	// });

	var sqlQuery =`SELECT 
    company_code,admin_id,admin_password,admin_name,
    CONVERT(AES_DECRYPT(UNHEX(email),'${process.env.MYSQL_AES_KEY}')USING utf8) as email,
    CONVERT(AES_DECRYPT(UNHEX(telephone),'${process.env.MYSQL_AES_KEY}')USING utf8) as telephone,
    dept_name,used_yn_code,reg_date,reg_member_id 
    FROM admin_member;`;

    var admins = await sequelize.query(sqlQuery,{
        raw: true,
        type: QueryTypes.SELECT,
    });

	res.render("admin/list.ejs", { admins });
});

router.post("/list", isLoggedin, async (req, res) => {
	// step1: 사용자가 선택/입력한 조회옵션 데이터 추출
	var email = req.body.email;
	var adminName = req.body.adminName;
	var telephone = req.body.telephone;

	var searchOption = {
		email,
		admin_name: adminName,
		telephone,
	};

	var whereClause = {};

	if (searchOption.email) {
		whereClause.email = searchOption.email;
	}
	if (searchOption.admin_name) {
		whereClause.admin_name = searchOption.admin_name;
	}
	if (searchOption.telephone) {
		whereClause.telephone = searchOption.telephone;
	}

	var admins = await db.Admin.findAll({ where: whereClause });

	res.render("admin/list.ejs", { admins, searchOption });
});

router.get("/create", isLoggedin, async (req, res) => {
	res.render("admin/create.ejs");
});

router.post("/create", isLoggedin, async (req, res) => {
	// step1: 사용자가 입력한 게시글 등록 데이터 추출
	var companyCode = req.body.companyCode;
	var adminid = req.body.adminid;
    var admin_password = req.body.admin_password;
	var email = req.body.email;
	var telephone = req.body.telephone;
	var dept_name = req.body.dept_name;
	var admin_name = req.body.admin_name;
	var usedYNCode = req.body.usedYNCode;

    var encrytedPassword = await bcrypt.hash(admin_password, 12)

	// 양방향 암호화
	// AES.encrypt(평문, 암호화키)
	var encryptedEmail = AES.encrypt(email, process.env.MYSQL_AES_KEY);
	var encryptedTelephone = AES.encrypt(telephone, process.env.MYSQL_AES_KEY);

	var admin = {
		company_code: companyCode,
		admin_id: adminid,
		admin_password: encrytedPassword,
		admin_name: admin_name,
		email: encryptedEmail,
		telephone: encryptedTelephone,
		dept_name,
		used_yn_code: usedYNCode,
		reg_date: Date.now(),
        reg_member_id : 1,
        edit_date : Date.now(),
        edit_member_id : 1
	};

	await db.Admin.create(admin);

	res.redirect("/admin/list");
});

router.get("/modify/:aid", isLoggedin, async (req, res) => {
	var aid = req.params.aid;
	var admin = await db.Admin.findOne({ where: { admin_member_id: aid } });
	admin.email = AES.decrypt(admin.email, process.env.MYSQL_AES_KEY);
	admin.telephone = AES.decrypt(admin.telephone, process.env.MYSQL_AES_KEY);
	res.render("admin/modify.ejs", { admin });
});

// 목록페이지 이동처리
router.post("/modify/:id", isLoggedin, async (req, res) => {
	var aid = req.params.id;

	// step1: 사용자가 입력한 게시글 등록 데이터 추출
	var companyCode = req.body.companyCode;
	var adminPassword = req.body.adminPassword;
	var email = req.body.email;
	var telephone = req.body.telephone;
	var deptName = req.body.deptName;
	var adminName = req.body.adminName;

	var admin = {
		company_code: companyCode,
		admin_name: adminName,
		admin_password: adminPassword,
		email,
		telephone,
		dept_name: deptName,
	};

	var updatedCount = await db.Admin.update(admin, { where: { admin_member_id: adminIdx } });
	res.redirect("/admin/list");
});

// 목록페이지 이동처리
router.get("/delete/:aid", isLoggedin, async (req, res) => {
	var adminIdx = req.query.aid;

	var deletedCnt = await db.Admin.destroy({ where: { admin_member_id: adminIdx } });

	res.redirect("/admin/list");7
});

module.exports = router;
