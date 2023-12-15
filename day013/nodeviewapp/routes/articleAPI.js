
// 게시글 데이터 관리 전용 RESTful API 라우터 파일
// 기본 라우터 호출주소: http://localhost:3000/api/article/

var express = require('express');
var router = express.Router();

// 전체 게시글 목록 데이터 조회 반환 API 라우팅 메소드
// http://localhost:3000/api/article/all
router.get('/all', async(req, res)=>{
    
    // API 라우팅 메소드 반환 형식 정의
    var apiResult = {
        code:200,
        data:[],
        result:"ok"
    };

    // 예외처리 구문
    try{
        // try 블록 안에 에러가 발생할 수 있는 각종 개발자 코드 구현

        // step1: DB에서 전체 게시글 목록 데이터를 조회(했다고 가정)
        const articles = [
            {
                article_id:1,
                board_type_code:1,
                title:'공지게시글',
                contents:'공지게시글 1번 내용입니다.',
                view_count:10,
                ip_address:'111.111.112.44',
                is_display_code:1,
                reg_date:'2023-12-12',
                reg_member_id:'eunbi'
            },
            {
                article_id:2,
                board_type_code:2,
                title:'기술블로깅 휴휴',
                contents:'기술 블로깅 게시글 입니다.',
                view_count:10,
                ip_address:'111.111.112.44',
                is_display_code:0,
                reg_date:'2023-12-12',
                reg_member_id:'eunbi'
            },
            {
                article_id:3,
                board_type_code:1,
                title:'공지게시글 다들 집중',
                contents:'공지게시글 2번 내용입니다.',
                view_count:10,
                ip_address:'111.111.112.44',
                is_display_code:1,
                reg_date:'2023-12-12',
                reg_member_id:'eunbi'
            }
        ];

        // 프론트엔드로 반환할 실제 데이터 바인딩
        apiResult.code = 200;
        apiResult.data = articles;
        apiResult.result = 'Failed';

    }catch(err){
        // console.log(err.message);
        // 서버측 에러코드는 프론트엔드나 사용자에게 직접 정보를 제공하지 않고 대표 메시지를 안내한다
        // 서버측 에러코드는 추후 별도 로깅시스템 구현을 통해 서버에 특정 폴더내에 로그파일로 기록하거나
        // 백엔드 에러발생 알림 시스템(sms, email 등)을 통해 실시간 에러 정보를 노티한다
        apiResult.code = 500;
        apiResult.data = null;
        apiResult.result = null;
    };

    res.json(apiResult);
});

router.post('/create', async(req, res)=>{

    // API 라우팅 메소드 반환 형식 정의
    var apiResult = {
        code:200,
        data:[],
        result:"ok"
    };

    try{
        var boardTypeCode = req.body.boardTypeCode;
        var title = req.body.title;
        console.log(title);
        var contents = req.body.contents;
        var articleTypeCode = req.body.articleTypeCode;
        var isDisplayCode = req.body.isDisplayCode;
        var register = req.body.register;

        var savedArticle = 
            {
                article_id:10,
                board_type_code:boardTypeCode,
                title:'공지게시글',
                contents:'공지게시글 1번 내용입니다.',
                view_count:10,
                ip_address:'111.111.112.44',
                is_display_code:1,
                reg_date:'2023-12-12',
                reg_member_id:'eunbi'
            };
        
        apiResult.code = 200;
        apiResult.data = savedArticle;
        apiResult.result = 'ok'; 
        res.json(savedArticle);

    }catch(err){
        apiResult.code = 500;
        apiResult.data = null;
        apiResult.result = 'Failed';
    }
});


router.post('/update', async(req, res)=>{

    var apiResult = {
        code:200,
        data:[],
        result:"ok"
    };

    try{
        // step1: 사용자가 입력한 게시글 등록 데이터 추출
        var boardTypeCode = req.body.boardTypeCode;
        var title = req.body.title;
        var contents = req.body.contents;
        var articleTypeCode = req.body.articleTypeCode;
        var isDisplayCode = req.body.isDisplayCode;
        var register = req.body.register;

        // step2: 추출된 사용자 입력 데이터를 단일 게시글 json 데이터로 구성해서
        // DB article 테이블에 영구적으로 저장처리한다
        // 저장처리 후 article 테이블에 저장된 데이터 반환된다

        // 등록할 게시글 데이터
        var article = {
            boardTypeCode, 
            title,
            contents,
            articleTypeCode,
            isDisplayCode,
            register,
            registDate:Date.now()
        };
    }
    catch{

    }
});

// 단일 게시글 데이터 조회 반환 API 라우팅 메소드
// http://localhost:3000/api/article/1
router.get('/:aidx', async(req, res)=>{

    // API 라우팅 메소드 반환 형식 정의
    var apiResult = {
        code:200,
        data:[],
        result:"ok"
    };
});

// 단일 게시글 삭제처리 API 라우팅 메소드
// http://localhost:3000/api/article/1
router.delete('/:aidx', async(req, res)=>{

    // API 라우팅 메소드 반환 형식 정의
    var apiResult = {
        code:200,
        data:[],
        result:"ok"
    };

    res.json(apiResult);
});

module.exports = router;
