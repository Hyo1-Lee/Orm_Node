var express = require('express');
var router = express.Router();

// 메인 웹 페이지 요청 및 응답처리 라우팅 메소드
// http://localhost:3000
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '이효원MynameisJuan' });
});

module.exports = router;
