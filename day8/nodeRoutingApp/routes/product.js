var express = require('express');
var router = express.Router();

// 상품 목록 : 웹페이지 요청과 응답 메소드
// http://localhost:3000/products/list
router.get('/list',async(req,res)=>{
    res.render('product/list');
});

//단일 상품 상세정보 보기 : 웹페이지 요청과 응답 메소드
// http://localhost:3000/products/detail?pid=1&pname=lg노트북
router.get('/detail',async(req,res)=>{
    // URL에 쿼리 스트링 방식으로 전달된 값 추출하기
    var productID = req.query.pid;
    var productName = req.query.pname;

    res.render('product/detail', {productID, productName});
});

module.exports = router;

