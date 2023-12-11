
// 사용자가 요청한 URL에서 특정 파라미터가 존재하는지 사전체크하는 미들웨어 함수
// http://localhost:3000/test/lee
exports.checkParams = (req, res, next)=>{
    if(req.params.id == undefined){
        console.log("id 파라미터가 존재하지 않습니다.");
    }
    else{
        console.log("id 파라미터가 존재합니다.", req.params.id);
    }
    next();
}

// 사용자 요청 URL 주소에서 queryString 방식으로 category라는 키 값이 전달되는 미들웨어 함수
exports.checkQueryKey = (req, res, next)=>{
    if(req.query.category == undefined){
        console.log("category key가 전달되지 않았습니다.");
    }
    next();
}
