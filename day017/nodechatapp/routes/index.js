var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/', async(req, res)=>{
  var id = req.body.id; 
  var password = req.body.password;
  isValidUser = true; 
  console.log(isValidUser);
  if (isValidUser) { 
    res.redirect('/channel');
  } else {
    res.render('/', { error: 'Invalid credentials' });
  }
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', (req, res) => {
  res.redirect('/login'); 
});

router.get('/forgot-password', (req, res) => {
  res.render('forgot-password');
});

router.post('/forgot-password', (req, res) => {
  res.redirect('/login');
});

module.exports = router;
