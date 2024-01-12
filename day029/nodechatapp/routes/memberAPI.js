var express = require("express");
var router = express.Router();
var byctrpt = require("bcryptjs");
var AES = require("mysql-aes");
var db = require("../models/index.js");
var jwt = require("jsonwebtoken");

var {tokenAuthChecking} = require("./apiMiddleware.js");
/* 
  - 신규 회원 가입 처리 RESTful API 라우팅 메소드
  - http://localhost:3000/api/member/entry
  - POST
  - req.body.email
*/
router.post("/entry", async (req, res, next) => {
	var apiResult = {
		code: 400,
		data: null,
		msg: "",
	};

	var email = req.body.email;
	var password = req.body.password;
	var name = req.body.name;
	var telephone = req.body.telephone;

	try {
		// 회원가입 로직 추가: 메일주소 중복체크
		var existMember = await db.Member.findOne({ where: { email: email } });
		if (existMember != null) {
			apiResult.code = 500;
			apiResult.data = null;
			apiResult.msg = "ExistDuplicatedEmail";
		} else {
			var encrypedPassword = await byctrpt.hash(password, 12);
			var encryptMobileNo = AES.encrypt(telephone, process.env.MYSQL_AES_KEY);
			var member = {
				email: email,
				member_password: encrypedPassword,
				name: name,
				profile_img_path: "",
				telephone: encryptMobileNo,
				entry_type_code: 1,
				use_state_code: 1,
				reg_date: Date.now(),
				reg_member_id: 0,
			};
			var registeredMember = await db.Member.create(member);
			registeredMember.member_password = "";
			var decryptedMobileNo = AES.decrypt(encryptMobileNo, process.env.MYSQL_AES_KEY);
			registeredMember.telephone = decryptedMobileNo;

			apiResult.code = 200;
			apiResult.data = registeredMember;
			apiResult.msg = "ok";
		}
	} catch (err) {
		console.log("서버에러발생-/api/member/entry", err.meesage);
		apiResult.code = 500;
		apiResult.data = null;
		apiResult.msg = err.message;
	}
	res.json(apiResult);
});

/* 
  - 로그인 처리 RESTful API 라우팅 메소드
  - http://localhost:3000/api/member/login
  - POST
  - req.body.email
  - req.body.password
*/
router.post("/login", async (req, res, next) => {
	var apiResult = {
		code: 400,
		data: null,
		msg: "",
	};

	try {
		var email = req.body.email;
		var password = req.body.password;

		var member = await db.Member.findOne({
			where: {
				email: email,
			},
		});
		resultMsg = "";

		if (member == null) {
			resultMsg = "NotExistEmail";
			apiResult.code = 400;
			apiResult.data = null;
			apiResult.msg = resultMsg;
		} else {
			var isMatch = await byctrpt.compare(password, member.member_password);
			if (isMatch) {
				resultMsg = "Ok";
				member.member_password = "";
				member.telephone = AES.decrypt(member.telephone, process.env.MYSQL_AES_KEY);

				// JWT 토큰 생성
				var memberTokenData = {
					member_id: member.member_id,
					email: member.email,
					name: member.name,
					profile_img_path: member.profile_img_path,
					telephone: member.telephone,
					etc:"etc",
				}

				var token = await jwt.sign(memberTokenData, process.env.JWT_SECRET,{expiresIn:'2h', issuer:'lee'});

				apiResult.code = 200;
				apiResult.data = token;
				apiResult.msg = resultMsg;
			} else {
				resultMsg = "NotCorrectword";
				apiResult.code = 400;
				apiResult.data = null;
				apiResult.msg = resultMsg;
			}
		}
	} catch (err) {
		console.log("서버에러발생-/api/member/entry", err.meesage);
		apiResult.code = 500;
		apiResult.data = null;
		apiResult.msg = err.message;
	}
	res.json(apiResult);
});

/*
- 로그인한 현재 사용자의 회원 기본 정보 조회 처리 RESTful API 라우팅 메소드
- http://localhost:3000/api/member/profile
- 로그인시 발급한 JWT는 http
*/
router.get("/profile", tokenAuthChecking, async(req, res, next) =>{
	var apiResult = {
		code: 400,
		data: null,
		msg: "",
	};
	try{
		// 웹브라우저에서 전달된 JWT Bearer 토큰 문자열 추출
		var token = req.headers.authorization.split("Bearer ")[1];
		var tokenJsonData = await jwt.verify(token, process.env.JWT_SECRET);
		
		// 웹브라우저에서 전달된 JWT 토큰 문자열에서 필요한 로그인 사용자 정보 추출
		var loginMemberId = tokenJsonData.member_id;
		var loginMemberEmail = tokenJsonData.email;

		var dbMember = await db.Member.findOne({
			where:{
				member_id:loginMemberId,
			},
			attributes:['email','name','profile_img_path','telephone']
		});
		dbMember.telephone = AES.decrypt(dbMember.telephone, process.env.MYSQL_AES_KEY);

		apiResult.code = 200;
		apiResult.data = dbMember;
		apiResult.msg = "ok";
	}catch(err){
		apiResult.code = 500;
		apiResult.data = null;
		apiResult.msg = "Failed";
	}
	res.json(apiResult);
})
module.exports = router;
