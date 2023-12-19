var express = require('express');
var router = express.Router();

// 기능: 관리자 웹사이트 메인 페이지
// 주소: 
router.get('/', async(req, res) => {
  res.render('index.ejs');
});

router.get('/login', async(req, res) => {
  res.render('login.ejs');
});

module.exports = router;
