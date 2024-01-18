var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async(req, res, next)=> {
  res.render('index', { title: 'Express' });
});

/*
  - 서버 소캣과 연결된 모든 사용자간 채팅 웹페이지 요청과 응답
  - http://localhost:3000/chat
*/
router.get('/chat', async (req, res) =>{
  res.render('chat');
})

/*
  - 특정 채팅방(채널) 사용자간 채팅 웹페이지 요청과 응답
  - http://localhost:3000/groupchat
*/
router.get('/groupchat', async (req, res) =>{
  res.render('groupchat');
})

module.exports = router;
