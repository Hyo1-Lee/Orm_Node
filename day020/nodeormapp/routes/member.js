//사용자 정보처리를 위한 웹페이지 요청과 응답처리 전용 라우터 파일 

var express = require('express');
var router = express.Router();
var db = require('../models/index');

//회원가입 웹페이지요청 및 응답처리 
//http://localhost:3000/member/entry
router.get('/entry', async(req, res, next)=> {
    res.render('member/entry.ejs');
});

//회원가입 웹페이지 응답처리 
//http://localhost:3000/member/entry
router.post('/entry', async(req, res, next)=> {
    // step 1: 회원가입 정보 추출
    var email = req.body.email;
    var password = req.body.password;

    // step 2: 데이터 베이스에 members 테이블 데이터를 저장
    // DB에 전달되는 json 데이터의 속성명은 반드시 해당 데이터 모델 (models/member.js)의 속성명과 일치해야 한다.
    var member={
        email:email,
        password:password
    }

    // step 3: db에 저장하고 저장된 값을 반환받는다.
    // db.member.create(member)은 ORM 프레임워크에 의해서 백엔드에서
    // insert into members(email, password) values('email', 'password', now()) 쿼리가 만들어져
    // MySQL DB 서버로 전달되어 데이터가 입력되고 그 데이터를 mysql 서버에서 반환해준다.
    var savedMember = await db.Member.create(member);

    res.redirect('/');
});


//회원 로그인 웹페이지요청 및 응답처리 
//http://localhost:3000/member/login
router.get('/login', async(req, res, next)=> {
    res.render('member/login.ejs', {resultMsg:"", email:"", password:""});
});


//회원 로그인 웹페이지 응답처리 
//http://localhost:3000/member/login
router.post('/login', async(req, res, next)=> {

    // step 1: 로그인 정보 추출
    var email = req.body.email;
    var password = req.body.password;
    console.log(email);
    // step 2: DB 테이블에서 동일한 메일주소의 단일 사용자 정보를 조회
    // db.Member.findOne (해당 컬럼과 동일한 조건 설정) ORM 메소드는 
    // select * from members where email='사용자 입력 메일값' and password='password' 쿼리를 만들어서
    // MySQL DB 서버로 전달하고 그 결과를 반환받는다.
    var member = await db.Member.findOne({
        where:{
            email:email,
        }
    });

    var resultMsg = "";
    if (member == null) {
        resultMsg = "회원정보가 없습니다.";
    } else {
        if(member.password == password){
            // 세션에 로그인 정보 저장
            res.redirect('/');
        }else{
            resultMsg = "비밀번호가 일치하지 않습니다.";
        }
    }
    if(resultMsg != ""){
        res.render('member/login.ejs', {resultMsg, email, password});
    }
});

module.exports = router;