// 사용자 계정 정보 관리 라우팅 기능

// 라우터의 기본주소는
// http://localhost:3001/admin/~

var express = require('express');
var router = express.Router();

router.get('/list', async(req, res, next)=>{
  res.render('admin/list');
});

router.get('/create', async(req, res)=>{
  res.render('admin/create')
})

// 목록페이지 이동처리
router.post('/create', async(req, res)=>{
  res.redirect('/admin/list')
})

router.get('/modify/:cid', async(req, res)=>{
  var chennel_idx = req.params.cid;

  res.render('admin/modify', {chennel_idx})
})

// 목록페이지 이동처리
router.post('/modify/:cid', async(req, res)=>{
  var chennel_idx = req.params.cid;

  res.redirect('/admin/list')
})

// 목록페이지 이동처리
router.get('/delete', async(req, res)=>{
  res.redirect('/admin/list')
})

module.exports = router;
