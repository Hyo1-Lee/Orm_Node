// 사용자 계정 정보 관리 라우팅 기능

// 라우터의 기본주소는
// http://localhost:3001/member/~

var express = require('express');
const path = require('path');
const fs = require('fs').promises;
var router = express.Router();

const DB_path = path.join(__dirname, '../DB/memberDB.json');


router.get('/list', async(req, res, next) => {
    try {
        const data = await fs.readFile(DB_path, 'utf8');
        const members = JSON.parse(data).users;
        res.render('member/list', { members });
    } catch (err) {
        console.error("Error reading the file:", err);
        res.status(500).send("Error reading the user data.");
    }
});

router.get('/create', async(req, res)=>{
    res.render('member/create')
})

router.post('/create', async (req, res) => {
    const { username, email } = req.body;
    try {
        const data = await fs.readFile(DB_path, 'utf8');
        const db = JSON.parse(data);

        const userExists = db.users.some(user => user.username === username || user.email === email);
        if (userExists) {
            return res.render('member/create', { error: "Username or Email already exists." });
        }
        password = "0000"
        const newMember = { id: whatIsNextId(db.users), password, username, email };
        db.users.push(newMember);

        await fs.writeFile(DB_path, JSON.stringify(db, null, 2), 'utf8');
        res.redirect('/member/list');
    } catch (err) {
        res.status(500).send("Error processing the request.");
    }
});


function whatIsNextId(users) {
    if (users.length === 0) {
        return 1;
    }
    return Math.max(...users.map(user => user.id)) + 1;
}

router.get('/modify/:mid', async (req, res) => {
    var memberIdx = req.params.mid;
    try {
        const data = await fs.readFile(DB_path, 'utf8');
        const members = JSON.parse(data).users;
        const member = members.find(m => m.id == memberIdx);

        if (member) {
            res.render('member/modify', { member });
        } else {
            res.status(404).send("Member not found");
        }
    } catch (err) {
        console.error("Error reading the file:", err);
        res.status(500).send("Error reading the user data.");
    }
});

router.post('/modify', async (req, res) => {
    const { id, username, email } = req.body;
    try {
        const data = await fs.readFile(DB_path, 'utf8');
        const db = JSON.parse(data);
        const memberIndex = db.users.findIndex(m => m.id == id);
        if (memberIndex !== -1) {
            db.users[memberIndex].username = username;
            db.users[memberIndex].email = email;
            await fs.writeFile(DB_path, JSON.stringify(db, null, 2), 'utf8');
            res.redirect('/member/list');
        } else {
            res.status(404).send("Member not found");
        }
    } catch (err) {
        res.status(500).send("Error processing the update.");
    }
});

router.post('/delete/:mid', async (req, res) => {
    const memberId = req.params.mid;

    try {
        const data = await fs.readFile(DB_path, 'utf8');
        const db = JSON.parse(data);
        db.users = db.users.filter(user => user.id != memberId);
        await fs.writeFile(DB_path, JSON.stringify(db, null, 2), 'utf8');
        res.redirect('/member/list');
    } catch (err) {
        console.error("Error processing the request:", err);
        res.status(500).send("Error processing the delete.");
    }
});

module.exports = router;
