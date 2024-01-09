var express = require('express');
var router = express.Router();
var bycrpt = require('bcryptjs');
var db = require('../models/index.js');

/* 
기능: 관리자 웹사이트 메인페이지 요청과 응답처리 라우팅 메소드 
호출주소: http://localhost:3000/
 */
router.get('/', async(req, res, next)=> {
  res.render('index.ejs');
});

router.get('/login', async(req, res, next)=> {
  res.render('login.ejs', {layout: false, resultMsg: ''});
});

router.post('/login', async(req, res, next)=> {
  var adminId = req.body.id;
  var adminPassword = req.body.password;

  var member = await db.Admin.findOne({
    where: {admin_id: adminId}
  });

  var resultMsg = '';
  if(member == null){
    resultMsg = '존재하지 않는 아이디입니다.';
    res.render('login', {layout:false, resultMsg})
  }else{
    var passwordResult = await bycrpt.compare(adminPassword, member.admin_password);
    if(passwordResult){
      res.redirect('/');
    }else{
      resultMsg = '비밀번호가 일치하지 않습니다.';
      res.render('login', {layout:false, resultMsg})
    }
  }
});

module.exports = router;
