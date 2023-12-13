const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();

const MEMBERS_FILE = path.join(__dirname, '../DB/members.json'); // Correct path

async function getMembersData() {
  const data = await fs.readFile(MEMBERS_FILE, 'utf8');
  return JSON.parse(data);
}

router.get('/all', async (req, res) => {
    try {
        const members = await getMembersData();
        res.json(members);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving members", error: error });
    }
});

router.post('/create', function(req, res) {
    res.json({ message: "Member created" });
});

router.post('/modify', function(req, res) {
    res.json({ message: "Member modified" });
});

router.post('/delete', function(req, res) {
    res.json({ message: "Member deleted" });
});

router.get('/:mid', async (req, res) => {
    try {
        const memberId = parseInt(req.params.mid, 10);
        const members = await getMembersData();
        const member = members.find(m => m.member_id === memberId); 

        if (member) {
            res.json(member);
        } else {
            res.status(404).json({ message: "Member not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving the member", error: error });
    }
});

module.exports = router;
