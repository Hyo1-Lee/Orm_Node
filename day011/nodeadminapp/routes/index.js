var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  const isLoggedIn = req.session && req.session.isLoggedIn;
  res.render('index', { 
    isLoggedIn: isLoggedIn 
  });
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
    res.redirect('/'); 
  } else {
    res.render('login', { error: 'Invalid credentials' });
  }
});

router.get('/logout', (req, res) => {
  req.session.isLoggedIn = false; 
  res.redirect('/login');
});


module.exports = router;
