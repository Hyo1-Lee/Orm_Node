// 각종 노트 패키지 참조
var createError = require('http-errors');

// node express 웹 개발 프레임워크 참조
var express = require('express');

// path라는 노드 프레임워크의 파일/폴더 경로 정보를 추출하는 패키지를 참조
var path = require('path');

// 웹서버에서 발급해주는 쿠키파일에 대한 정보를 추출하는 cookie-parser 패키지를 참조
var cookieParser = require('cookie-parser');

// morgan이라는 node package를 통해 사용자 이벤트 (요청과 응답) 정보를 로깅이력활동정보 저장 하는 패키지 참조
var logger = require('morgan');

// express 기본 라우팅 파일 참조
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// express 객체를 이용해 노드 애플리케이션 객체를 생성
// app은 backend node application 그 자체
var app = express();

// 개발자 정의 미들웨어 함수 기능 구현
// app(노드 어플리케이션)이 만들어지고 모든 사용자 요청 발생시
// 하기 미들웨어 함수가 실행됨
app.use(function(req, res, next){
  console.log("어플리케이션 미들웨어 함수 호출", Date.now());
  next();
})


// app 노드 애플리케이션 환경설정을 진행
// app.set(); 노드 애플리케이션 최초 실행시 서비스 환경 세팅 처리
// MVC 패턴 기반 각종 view 파일이 존재하는 물리적 views 폴더의 위치를 설정
app.set('views', path.join(__dirname, 'views'));

// MVC에서 사용하는 viewEngine 기술로 ejs를 사용한다고 설정
app.set('view engine', 'ejs');

// app.use()는 미들웨어로 사용잗ㄹ이 매번 어떠한 요청과 응답을 해오더라도
// 매번 요청이 발생할 때마다 실행되는 어플리케이션 미들웨어 함수 기능 정의하기
// 모든 app.use() 메소드들은 특정 사용자의 요청과 응답이 발생할 때마다 실행되는 기능
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// localhost:3000/user/lee
app.use('/user/:id', function(req, res, next){
  const uid = req.params.id;
  console.log("어플리케이션 미들웨어 호출2: ", req.method);
  res.send("사용자 아이디: "+uid);
})


// 라우터 파일에 대한 기본 경로 설정
app.use('/', indexRouter);
app.use('/users', usersRouter);


// 사용자 요청에 대해 리소스를 못찾으면 404에러를 웹 브라우저에 전달해주는 미들웨어 함수
// 대부분 사용자 요청과 응답은 상기 기본 또는 개발자 정의 라우터 파일에서 처리가 돼고
// 처리되지 못한 사용자 요청은 여기 404 미들웨어에서 처리
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// MVC 패턴 노드 백엔드 환경에서의 서버에러 발생시 처리해주는 전역 예외처리기 기능 제공
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
