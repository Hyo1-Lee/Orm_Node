var express = require('express');
var router = express.Router();

// 상품 목록 : 웹페이지 요청과 응답 메소드
// http://localhost:3000/products/list
router.get('/list',async(req,res)=>{
    res.render('product/list');
});

// 단일 상품 상세정보 보기 : 웹페이지 요청과 응답 메소드
// http://localhost:3000/products/detail?pid=1&pname=lg노트북
router.get('/detail',async(req,res)=>{
    // URL에 쿼리 스트링 방식으로 전달된 값 추출하기
    // URL에 쿼리 스트링 방식으로 파마리터가 전달되면 req.query.키명 으로 키값을 추출 할 수 있다.
    var productID = req.query.pid;
    var productName = req.query.pname;

    res.render('product/detail', {productID, productName});
});

// 와일드 카드 이용시 주의사항: 동일한 URL 호출주소와 호출방식(GET)의 라우팅 메소드가 존재하는 경우
// 와일드 카드 방식이먼저 호출되고 다른 라우틍 메소드 주소는 호출이 무시된다.
// 호출주소: http://localhost:3000/product/detail/sample
// 호출방식: GET
router.get('/detail/sample',async(req,res)=>{
    res.render('product/detail', {productID:100, productName:"노트북"});
});

// res.send(); 만능 메소드
// 호출주소: http://localhost:3000/product/detail/sendall
router.get('/detail/sendall',async(req,res)=>{
    // res.send("안녕하세요");
    // res.send({uid:"Lee",username:"이효원"});
    // var htmlTag = 
    // `
    //     <html>
    //         <body>
    //             <h1>샘플 웹페이지</h1>
    //         <body>
    //     <html>
    // `;
    // res.send(htmlTag);

    console.log("__dirname 물리적 경로 확인: ",__dirname+"/segoviva.png");
    res.sendFile(__dirname+"/segoviva.png");
});


// 파라미터 방식으로 전달된 상품정보를 추출해 단일 상품정보를 보여주자
// 호출주소: http://localhost:3000/products/detail/1
// 호출방식: GET
// 반환값 : 단일 상품정보 웹페이지

// 와일드 카드 방식으로 주소체계가 정의된 라우팅 메소드는 해당 라우터 파일의 맨 하단에 배치시켜야 한다.
router.get('/detail/:pid',async(req,res)=>{
    // URL을 통해 파라미터 방식으로 값이 전달되면
    // 주소 체계 내에 와일드 카드 키를 설정하고 해당 키명으로 URL을 통해 전달된
    // 파라미터 값을 추출 (req.params.와일드카드키명) 할 수 있다.
    var productID = req.params.pid;

    res.render('product/detail', {productID, productName:"노트북"});
});

// 호출주소: http://localhost:3000/products/detail/1/LG노트북/6000
// 호출방식: GET
// 여러개의 파라미터를 여러 개의 와일드카드 키명으로 정의해서 값 추출
router.get('/detail/:pid/:pname/:price',async(req,res)=>{
    var productID = req.params.pid;
    var productName = req.params.pname;
    var price = req.params.price;

    res.render('product/detail', {productID, productName, price});
});

module.exports = router;

