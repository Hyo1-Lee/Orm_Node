// 게시글 정보 관리 각종 웹페이지 요청과 응답처리 라우터 
// localhost:3000/article/~

var express = require('express');
var router = express.Router();
var db = require('../models/index.js');
var Op = db.Sequelize.Op;

// 게시글 목록 조회 웹페이지 요청 및 응답 라우팅메소드
router.get('/list', async(req, res)=>{

    var searchOption = {
        board_type_code:"0", 
        title:"",
        is_display_code:"9"
    };

    // step1: DB에서 모든 게시글 데이터 목록 조회
    // db.Article.findAll() 모든 게시글 데이터 목록 조회
    // SELECT article_id,,, FROM article where is_display_code and view_count!=0; sql 쿼리로 변환되어 DB에 전달
    var articles = await db.article.findAll(
        {
            attributes:['article_id', 'title', 'view_count', 'reg_date'],
            where:{
                is_display_code:1,
                view_count:{[op.not]:0}
            },
            order:[['article_id', 'DESC']] // DESC 내림차순, ASC 오름차순
        }
    );

    var articleCount = await db.article.count(
        {
            where:{
                is_display_code:1,
                view_count:{[op.not]:0}
            }
        }
    );

    // step2: 게시글 전체 목록을 list.ejs 뷰에 전달
    res.render('article/list.ejs', {articles, searchOption, articleCount});
});

// 게시글 목록에서 조회 옵션 데이터를 전달받아 게시글 목록 조회 후
// 게시글 목록 페이지에 대한 요청과 응답처리
router.post('/list', async(req, res)=>{

    // step1: 사용자가 선택/입력한 조회옵션 데이터 추출
    var board_type_code = req.body.board_type_code;
    var title = req.body.title;
    var is_display_code = req.body.is_display_code;

    var searchOption = {
        board_type_code, 
        title,
        is_display_code
    };

    // step2: 사용자가 입력/선택한 조회옵션 데이터를 기반으로 DB에서
    // 게시글 목록을 재조회해온다
    // SELECT * FROM article WHERE board_type_code=1 AND title LIKE '%공지%';
    var articles = await db.article.findAll({where:searchOption})

    // step3: 게시글 목록 페이지 list.ejs
    res.render('article/list.ejs', {articles, searchOption});

});

// 신규 게시글 등록 웹페이지 요청 및 응답 라우팅메소드
router.get('/create', async(req, res)=>{
    res.render('article/create.ejs');
});

// 신규 게시글 사용자 등록정보 처리 요청 및 라우팅메소드
router.post('/create', async(req, res)=>{

    // step1: 사용자가 입력한 게시글 등록 데이터 추출
    var board_type_code = req.body.board_type_code;
    var title = req.body.title;
    var contents = req.body.contents;
    var view_count = req.body.view_count;
    var article_type_code = req.body.article_type_code;
    var is_display_code = req.body.is_display_code;
    var reg_member_id = req.body.reg_member_id;

    // article_type_codestep2: 추출된 사용자 입력 데이터를 단일 게시글 json 데이터로 구성해서
    // DB article 테이블에 영구적으로 저장처리한다
    // 저장처리 후 article 테이블에 저장된 데이터 반환된다

    // 등록할 게시글 데이터
    // ** 중요: 테이블에 저장/수정할 데이터 소스는 반드시 데이터 모델의 속성명을 이용해야 한다.
    // ** 조심: articles 모델 컬럼에 값이 반드시 들어와야 하는 값들
    var article = {
        board_type_code, 
        title,
        contents,
        view_count:1,
        ip_address:"111.11.11.11",
        article_type_code,
        is_display_code,
        reg_member_id,
        reg_data:Date.now()
    };

    await db.article.create(article);

    // step3: 등록처리 후 게시글 목록 웹페이지로 이동처리
    res.redirect('/article/list');
});

// 기존 게시물 삭제 처리 요청 및 응답 라우팅메소드 
// localhost:3000/article/delete?aid=1
router.get('/delete', async(req, res)=>{
    // step1: 삭제하려는 게시글 고유번호를 추출한다.
    var articleIdx = req.query.aid;

    var deletedCnt = await db.Article.destroy({where:{article_id:articleIdx}})
    // step3: 게시글 목록 페이지로 이동시킨다.
    res.redirect('/article/list');
});

// 기존 게시글 정보 확인 및 수정 웹페이지 요청과 응답 라우팅메소드
// localhost:3000/article/modify/1
// GET
router.get('/modify/:aid', async(req, res)=>{

    // step 1: 선택한 게시글 고유번호를 파라미터 방식으로 url을 통해 전달받음
    var articleIdx = req.params.aid;

    // step 2: 해당 게시글 번호에 해당하는 단일 게시글 정보를 DB article 테이블에서 조회해온다.
    var article = {
        article_id:1,
        board_type_code:1,
        title:'공지게시글',
        contents:'공지게시글 1번 내용입니다.',
        view_count:10,
        ip_address:'111.111.112.44',
        is_display_code:1,
        article_type_code:1,
        reg_date:'2023-12-12',
        reg_member_id:'eunbi'
    }

    // step 3: 단일 게시글 정보로 뷰에 전달한다.
    res.render('article/modify.ejs', {article});
});

// 기존 게시글 사용자 수정 정보 처리 및 요청과 응답 라우팅메소드
// localhost:3000/article/modify/1
// POST
router.post('/modify/:aid', async(req, res)=>{
    var articleIdx = req.params.aid;
    // step1: 사용자가 입력한 게시글 등록 데이터 추출
    var board_type_code = req.body.board_type_code;
    var title = req.body.title;
    var contents = req.body.contents;
    var article_type_code = req.body.article_type_code;
    var is_display_code = req.body.is_display_code;
    var reg_member_id = req.body.reg_member_id;

    // step2: 추출된 사용자 입력 데이터를 단일 게시글 json 데이터로 구성해서
    // DB article 테이블에 수정 처리
    // 수정 처리 후 처리 건수 값이 반환

    // 등록할 게시글 데이터
    var article = {
        article_id:articleIdx, 
        title,
        contents,
        article_type_code,
        is_display_code,
        reg_member_id,
        reg_data:Date.now()
    };

    // step3: 수정 처리 후 게시글 목록 웹페이지로 이동처리
    res.redirect('/article/list');
});

module.exports = router;
