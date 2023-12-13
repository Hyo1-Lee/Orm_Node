// routes/channel.js
const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const CHANNELS_FILE = path.join(__dirname, '../DB/channels.json');

async function getChannelsData() {
  const data = await fs.readFile(CHANNELS_FILE, 'utf8');
  return JSON.parse(data);
}

router.get('/', async (req, res) => {
  const channels = await getChannelsData();
  res.render('chat/index', { channels: channels });
});

module.exports = router;
