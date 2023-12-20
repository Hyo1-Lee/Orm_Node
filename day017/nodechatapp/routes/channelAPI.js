const express = require("express");
const fs = require("fs").promises;
const router = express.Router();
const path = require("path");

const CHANNELS_FILE = path.join(__dirname, "../DB/channels.json");

async function getChannelsData() {
  const data = await fs.readFile(CHANNELS_FILE, "utf8");
  return JSON.parse(data);
}

router.get("/all", async (req, res) => {
  try {
    const channels = await getChannelsData();
    res.json(channels);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving channels", error: error });
  }
});

// /api/channel/create
router.post("/create", async (req, res) => {
  var channel_id = req.body.channel_id;
  var name = req.body.name;
  var img_path = req.body.img_path;
  var state_code = req.body.state_code;
  var reg_date = req.body.reg_date;
  var edit_date = req.body.edit_date;

  var channel = {
    channel_id,
    name,
    img_path,
    state_code,
    reg_date,
    edit_date,
  };
  try {
    const channels = await getChannelsData();
    channels.push(channel);
    await fs.writeFile(
      CHANNELS_FILE,
      JSON.stringify(channels, null, 2),
      "utf8"
    );
    res.json({ message: "Channel created successfully", channel: channel });
  } catch (error) {
    res.status(500).json({ message: "Error saving the member", error: error });
  }
});

router.post("/modify", async (req, res) => {
  var channel_id = req.body.channel_id;
  var name = req.body.name;
  var img_path = req.body.img_path;
  var state_code = req.body.state_code;
  var reg_date = req.body.reg_date;
  var edit_date = req.body.edit_date;

  try {
    let channels = await getChannelsData();
    let channel = channels.find((c) => c.channel_id === channel_id);

    if (channel) {
      channel.name = name;
      channel.img_path = img_path;
      channel.state_code = state_code;
      channel.reg_date = reg_date;
      channel.edit_date = edit_date;

      await fs.writeFile(
        CHANNELS_FILE,
        JSON.stringify(channels, null, 2),
        "utf8"
      );
      res.json({ message: "Channel modified successfully", channel: channel });
    } else {
      res.status(404).json({ message: "Channel not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error saving the channel", error: error });
  }
});

router.post("/delete", async (req, res) => {
  var channel_id = req.body.channel_id;

  try {
      let channels = await getChannelsData();

      const index = channels.findIndex(c => c.channel_id === channel_id);

      if (index !== -1) {
          channels.splice(index, 1);
          await fs.writeFile(CHANNELS_FILE, JSON.stringify(channels, null, 2), 'utf8');

          res.json({ message: "Channel deleted successfully" });
      } else {
          res.status(404).json({ message: "Channel not found" });
      }
  } catch (error) {
      res.status(500).json({ message: "Error deleting the channel", error: error });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const channelId = parseInt(req.params.cid, 10);
    const channels = await getChannelsData();
    const channel = channels.find((c) => c.channel_id === channelId);

    if (channel) {
      res.json(channel);
    } else {
      res.status(404).json({ message: "Channel not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving the channel", error: error });
  }
});

module.exports = router;
