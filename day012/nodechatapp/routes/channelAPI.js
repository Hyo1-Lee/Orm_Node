const express = require('express');
const fs = require('fs').promises;
const router = express.Router();
const path = require('path');

const CHANNELS_FILE = path.join(__dirname, '../DB/channels.json');

async function getChannelsData() {
  const data = await fs.readFile(CHANNELS_FILE, 'utf8');
  return JSON.parse(data);
}

router.get('/all', async (req, res) => {
  try {
    const channels = await getChannelsData();
    res.json(channels);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving channels", error: error });
  }
});

router.post('/create', function(req, res) {
    res.json({ message: "Channel created" });
});

router.post('/modify', function(req, res) {
    res.json({ message: "Channel modified" });
});

router.post('/delete', function(req, res) {
    res.json({ message: "Channel deleted" });
});

router.get('/:cid', async (req, res) => {
  try {
      const channelId = parseInt(req.params.cid, 10); // Convert the parameter to an integer
      const channels = await getChannelsData();
      const channel = channels.find(c => c.channel_id === channelId);

      if (channel) {
          res.json(channel);
      } else {
          res.status(404).json({ message: "Channel not found" });
      }
  } catch (error) {
      res.status(500).json({ message: "Error retrieving the channel", error: error });
  }
});


module.exports = router;
