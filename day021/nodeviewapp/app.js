var createError = require('http-errors'); //http 에러처리 모듈
var express = require('express'); //express 웹서버 모듈
var path = require('path'); //경로관련 모듈
var cookieParser = require('cookie-parser'); //쿠키처리 모듈
var logger = require('morgan'); //로깅처리 모듈
var expressLayouts = require('express-ejs-layouts');  //레이아웃처리 모듈 

var sequelize = require('./models/index.js').sequelize;
var indexRouter = require('./routes/index');
var articleRouter = require('./routes/article');
var articleAPIRouter = require('./routes/articleAPI');

var app = express();
sequelize.sync();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//레이아웃 설정
app.set('layout', 'layout'); // 해당 노드 앱의 모든 (콘텐츠) 뷰 파일의 기본 레이아웃 ejs 파일 설정하기
app.set("layout extractScripts", true); // 콘텐츠 페이지 내 script 태그를 레이아웃에 통과할지 여부
app.set("layout extractStyles", true); // 콘텐츠 페이지 내 style 태그를 레이아웃에 통과할지 여부
app.set("layout extractMetas", true); // 콘텐츠 페이지 내 meta 태그를 레이아웃에 통과할지 여부
app.use(expressLayouts); 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/article', articleRouter);
app.use('/api/article', articleAPIRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
