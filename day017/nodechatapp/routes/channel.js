// routes/channel.js
const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const CHANNELS_FILE = path.join(__dirname, '../DB/channels.json');
const MESSAGE_FILE = path.join(__dirname, '../DB/messages.json');

async function getChannelsData() {
  const data = await fs.readFile(CHANNELS_FILE, 'utf8');
  return JSON.parse(data);
}

async function getMessagesData() {
  const data = await fs.readFile(MESSAGE_FILE, 'utf8');
  return JSON.parse(data);
}

router.get('/', async (req, res) => {
  const channels = await getChannelsData();
  res.render('channel', { channels: channels, layout:"channel" });
});

router.get('/:cid', async (req, res) => {
  try {
    const channelId = parseInt(req.params.cid, 10); 
    const messages = await getMessagesData();
    const msg = messages.find(m => m.message_id === channelId); 

    if (msg) {
        res.json(msg);
    } else {
        res.status(404).json({ message: "message not found" });
    }
  } catch (error) {
      res.status(500).json({ message: "Error retrieving the message", error: error });
  }
});
module.exports = router;
