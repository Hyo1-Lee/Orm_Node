var express = require('express');
var router = express.Router();
const fs = require("fs").promises;
const path = require("path");
const MEMBER_FILE = path.join(__dirname, '../DB/members.json');

async function getMembersData() {
  const data = await fs.readFile(MEMBER_FILE, "utf8");
  return JSON.parse(data);
}

router.get('/', (req, res) => {
  res.render('index', { error: NaN });
});

router.post('/', async(req, res)=>{
  var email = req.body.id; 
  var password = req.body.password;

  try {
    let members = await getMembersData();
    let member = members.find((m) => m.email == email);

    if (member){
      if (member.password == password){
        res.redirect('/chat');
      }
      else{
        res.render('index', { error: 'Invalid credentials' });
      }
    }
    else{
      res.render('index', { error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: "Error", error: error });
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
