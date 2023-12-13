var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/login', async(req, res)=>{
  res.render('login');
});

router.post('/login', async(req, res)=>{
  var id = req.body.id; 
  var password = req.body.password;
  isValidUser = true; 
  console.log(isValidUser);
  if (isValidUser) { 
    res.redirect('/chat');
  } else {
    res.render('login', { error: 'Invalid credentials' });
  }
});

router.get('/entry', (req, res) => {
  res.render('entry');
});

router.post('/entry', (req, res) => {
  res.redirect('/login'); 
});

router.get('/find', (req, res) => {
  res.render('find');
});

router.post('/find', (req, res) => {
  res.redirect('/login');
});

module.exports = router;
