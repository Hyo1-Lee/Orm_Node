var express = require("express");
var router = express.Router();
var bycrpt = require("bcryptjs");

const {isLoggedin, isNotLoggedin} = require("./sessionMiddleware")
var db = require("../models/index.js");

/* 
기능: 관리자 웹사이트 메인페이지 요청과 응답처리 라우팅 메소드 
호출주소: http://localhost:3000/
 */
// 로그인 한 상태에서만 접근 가능
router.get("/", isLoggedin, async (req, res, next) => {
	// 현재 로그인한 사용자 정보 추출
	// var admin_id = req.session.loginUser.admin_member_id;

	res.render("index.ejs");
});

router.get("/login", async (req, res, next) => {
	res.render("login.ejs", { layout: false, resultMsg: "" });
});

router.post("/login", async (req, res, next) => {
	var adminId = req.body.email;
	var adminPassword = req.body.password;

	var member = await db.Admin.findOne({
		where: { email: adminId },
	});

	var resultMsg = "";
	if (member == null) {
		resultMsg = "존재하지 않는 아이디입니다.";
		res.render("login", { layout: false, resultMsg });
	} else {
		// var passwordResult = await bycrpt.compare(adminPassword, member.admin_password);
    var passwordResult = (adminPassword == member.admin_password)
		if (passwordResult) {
			// 해당 사용자의 주요 정보를 세션에 저장

			// 서버의 메모리 공간에 저장되는 로그인한 현재 사용자의 세션정보 구조 및 데이터 바인딩
			var sessionLoginData = {
				admin_member_id: member.admin_member_id,
				comapny_id: member.company_id,
				admin_id: member.admin_id,
				admin_name: member.admin_name,
			};
			// req.session 속성에 동적으로 loginUser 속성을 추가하고, 그 속성에 sessionLoginData 변수값을 할당
			req.session.loginUser = sessionLoginData;

      // 관리자 로그인 여부 세션 속성 추가
      req.session.isLogined = true;

			// 반드시 req.session.save() 메소드를 호출해야 세션에 반영된다.
			// save() 호출과 동시에 쿠키파일이 서버에서 생성되고 생성된 쿠키파일이 현재 사용자 웹 브라우저에 전송된다.
			// 저장된 쿠키파일은 이후 해당 사이트로 요칭이 있을 때마다 무조건 전달된다.
			req.session.save(function () {
				res.redirect("/");
			});
		} else {
			resultMsg = "비밀번호가 일치하지 않습니다.";
			res.render("login", { layout: false, resultMsg });
		}
	}
});

router.get("/logout", isLoggedin, async (req, res, next) => {
  // req.session.destroy() 메소드를 호출하면 현재 세션을 삭제한다.
  // 삭제된 세션은 복구가 불가능하다.
  req.session.destroy(function(){
    res.redirect("/login");
  });
});

router.get("/find", async (req, res, next) => {
	res.render("find.ejs", { layout: false });
});

router.post("/find", async (req, res, next) => {
	res.redirect("/find");
});

module.exports = router;
