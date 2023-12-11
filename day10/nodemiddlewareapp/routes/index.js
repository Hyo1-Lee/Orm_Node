var express = require('express');
var router = express.Router();

const {checkParams, checkQueryKey} = require('./middleware.js');

// 라우터 미들웨어 함수 샘플3
// index.js 라우터가 실행될 때 마다 실행되는 미들웨어 함수
router.use(function(req, res, next){
  console.log("Index.js 라우터 미들웨어 함수 샘플1: ",Date.now());
  next();
});

// 해당 라우터에서 해당 호출 주소체계와 일치하는 경우 매번 실행되는 미들웨어 함수
// http://localhost:3000/sample/computer
router.use('/sample/:id',function(req, res, next){
  console.log("Index 라우터 미들웨어 함수 2-Request.URL= ",req.originalUrl);
  next();
}, function(req, res, next){
  console.log("Index 라우터 미들웨어 함수3 - Requst Type: ",req.method);
  res.send(req.originalUrl);
  
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 파라미터 id 값이 존재하는지 체크하는 미들웨어 함수 적용
// http://localhost:3000/test/lee
router.get('/test/:id', checkParams, function(req, res){
  res.render('index', { title: 'Express' });
})

// 쿼리스트링 category key 값이 존재하는지 체크하는 미들웨어 함수 적용
// http://localhost:3000/product?category=computer&stock=100
router.get('/product', checkQueryKey, function(req, res){
  res.render('index', { title: 'Express' });
})

module.exports = router;
