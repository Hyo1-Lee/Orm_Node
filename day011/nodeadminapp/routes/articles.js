// 라우터 기본 주소
// http://localhost:3000/articles
var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs').promises;
const DB_path = path.join(__dirname, '../DB/articleDB.json');

router.get('/list', async(req, res)=>{
    try {
        const data = await fs.readFile(DB_path, 'utf8');
        const articles = JSON.parse(data).articles;
        res.render('articles/list',{articles});
    } catch (err) {
        console.error("Error reading the file:", err);
        res.status(500).send("Error reading the user data.");
    }
    
});

router.get('/create',async(req,res)=>{
    res.render('articles/create');
});

router.post('/create',async(req,res)=>{
    res.redirect("/articles/list");
});

router.get('/modify/:aid',async(req,res)=>{
    var articleIdx = req.params.aid;

    var article = {
        articleIDX:articleIdx,
        title:"첫 번째 게시글입니다.",
        contents:"첫 번째 게시글 내용입니다.",
        view_cnt:100,
        display:"Y",
        ipAddress:"111.111.111.111",
        registDate:Date.now(),
        registMemberID:"Lee"
    }

    res.render('articles/modify', {article});
});

router.post('/modify/:aid',async(req,res)=>{
    res.redirect("/articles/list");
});

router.get('/delete/:aid',async(req, res)=>{
    var articleIDX = req.query.aidx;

    res.redirect("/articles/list");
});

module.exports = router;