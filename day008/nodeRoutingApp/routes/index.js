var express = require('express');
var router = express.Router();

/* Main page 요청과 응답처리 라우팅 메소드 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 콜백 함수를 router.get()메소드의 파라미터로 호출주소와 콜백함수를 전달해서
  // router.get() 메소드가 요청과 응답을 처리하게 한다.
// 기본 콜백함수를 전달해서 진행됨
router.get('/main',(req,res)=>{
  res.render('index.ejs', {title: '메인 페이지'});
});

// async 함수
// 비동기 프로그래밍의 절차중심 기능 개발시, promise 또는 async/wait이란 방식을 이용하면
  // 비동기 프로그래밍 환경에서 순차적 프로그래밍이 가능하다.
router.get('/index',async(req,res) =>{
  res.render('index.ejs', {title: '인덱스 페이지'});
});

/*
  - 기능 : 상품 목록 데이터에 요청과 응답처리 라우팅 메소드
  - 요청방식 : GET
  - 요청주소 : http://localhost:3000/api/product
  - 응답결과 : 상품목록 json 데이터
*/
router.get('/product',async(req,res)=>{
  var products = [
    {
      pid:1,
      pname:"LG 노트북",
      price:5000,
      stock:4
    },
    {
      pid:2,
      pname:"삼성 노트북",
      price:6000,
      stock:2
    }
  ];

  // res.json('json_path') 메소드, 지정한 json data를 브라우저로 전송
  res.json(products)
})

module.exports = router;
