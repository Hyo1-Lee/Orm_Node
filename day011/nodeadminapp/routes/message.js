// 사용자 계정 정보 관리 라우팅 기능

// 라우터의 기본주소는
// http://localhost:3001/message/~

var express = require('express');
var router = express.Router();

router.get('/list', async(req, res, next)=>{
  res.render('message/list');
});

router.get('/create', async(req, res)=>{
  res.render('message/create')
})

// 목록페이지 이동처리
router.post('/create', async(req, res)=>{
  res.redirect('/message/list')
})

router.get('/modify/:msgid', async(req, res)=>{
  var message_idx = req.params.msgid;

  res.render('message/modify', {message_idx})
})

// 목록페이지 이동처리
router.post('/modify/:msgid', async(req, res)=>{
  var message_idx = req.params.msgid;

  res.redirect('/message/list')
})

// 목록페이지 이동처리
router.get('/delete', async(req, res)=>{
  res.redirect('/message/list')
})

module.exports = router;
