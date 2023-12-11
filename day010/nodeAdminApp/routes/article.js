// 라우터 기본 주소
// http://localhost:3000/articles
var express = require('express');
var router = express.Router();

/*
    - 게시글 목록 웹페이지 요청과 응답 처리 라우팅 메소드
    - http://localhost:3000/articles
    - 요청 유형: GET
    - 응답 결과: 게시글 목록 웹페이지
*/
router.get('/', async(req, res)=>{
    // 게시글 목록 데이터
    // DB에서 가져오기
    var articles=[
        {
            articleIDX:1,
            title:"첫 번째 게시글입니다.",
            contents:"첫 번째 게시글 내용입니다.",
            view_cnt:100,
            display:"Y",
            ipAddress:"111.111.111.111",
            registDate:Date.now(),
            registMemberID:"Lee"
        },
        {
            articleIDX:2,
            title:"두 번째 게시글입니다.",
            contents:"두 번째 게시글 내용입니다.",
            view_cnt:200,
            display:"Y",
            ipAddress:"222.111.111.111",
            registDate:Date.now(),
            registMemberID:"Lee2"
        },
        {
            articleIDX:3,
            title:"세 번째 게시글입니다.",
            contents:"세 번째 게시글 내용입니다.",
            view_cnt:300,
            display:"Y",
            ipAddress:"123.111.111.111",
            registDate:Date.now(),
            registMemberID:"Lee3"
        }
    ]
    res.render('articles/list.ejs',{articles});
});

/*
    - 신규 게시글 목록 웹페이지 요청과 응답 처리 라우팅 메소드
    - http://localhost:3000/articles/create
    - 요청 유형: GET
    - 응답 결과: 게시글 등록 웹페이지
*/
router.get('/create',async(req,res)=>{
    res.render('articles/create');
});

/*
    - 신규 게시글 목록 사용자 입력정보 등록 요청과 응답 처리 라우팅 메소드
    - http://localhost:3000/articles/create
    - 요청 유형: post
    - 응답 결과: 게시글 목록 웹페이지로 이동처리
*/
router.post('/create',async(req,res)=>{
    var title = req.body.title;
    var contents = req.body.contents;
    var register = req.body.register;

    // DB입력 단일 데이터 생성 및 DB 등록 처리
    var article = {
        articleIDX:0,
        title,
        contents,
        view_cnt:0,
        display:"Y",
        ipAddress:"111.111.111.111",
        registDate:Date.now(),
        registMemberID:register
    }

    // 게시글 목록 페이지로 이동
    res.redirect("/articles");
});

/*
    - 선택 게시글 목록 정보 확인 요청과 응답 처리 라우팅 메소드
    - http://localhost:3000/articles/modify/1
    - 요청 유형: GET
    - 응답 결과: 게시글 목록 웹페이지
*/
router.get('/modify/:aid',async(req,res)=>{
    // url을 통해 전달된 게시글 고유 번호 추출
    var articleIdx = req.params.aid;

    // step2: 게시글 고유 번호를 이용해 DB에서 게시글 정보를 조회해온다.

    // step3: 조회해온 단일 게시글 정보 (DB에서 가져왔다고 가정)
    var article = {
        articleIDX:articleIdx,
        title:"첫 번째 게시글입니다.",
        contents:"첫 번째 게시글 내용입니다.",
        view_cnt:100,
        display:"Y",
        ipAddress:"111.111.111.111",
        registDate:Date.now(),
        registMemberID:"Lee"
    }

    res.render('articles/modify', {article});
});

/*
    - 게시글 수정 페이지에서 사용자가 수정한 게시글 정보 처리 요청과 응답 처리 라우팅 메소드
    - http://localhost:3000/articles/modify/1
    - 요청 유형: GET
    - 응답 결과: 게시글 목록 웹페이지
*/
router.post('/modify/:aid',async(req,res)=>{
    var articleIDX = req.params.aid
    var title = req.body.title;
    var contents = req.body.contents;
    var register = req.body.register;

    // DB 수정 단일 데이터 생성 및 DB 등록 처리
    var article = {
        articleIDX,
        title,
        contents,
        view_cnt:0,
        display:"Y",
        ipAddress:"111.111.111.111",
        registDate:Date.now(),
        registMemberID:register
    }

    // 게시글 목록 페이지로 이동
    res.redirect("/articles");
});

/*
    - 게시글 삭제 웹페이지 요청과 응답 처리 라우팅 메소드
    - http://localhost:3000/articles/delete?aidx=1
    - 요청 유형: GET
    - 응답 결과: 게시글 목록 웹페이지
*/
router.get('/delete',async(req, res)=>{
    var articleIDX = req.query.aidx;

    //해당 게시글 번호를 이용해 DB에서 해당 게시글 삭제

    // 삭제 완료 후 게시글 목록 페이지로 이동

    res.redirect('/articles');
});

module.exports = router;