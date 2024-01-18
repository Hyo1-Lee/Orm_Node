// 채널/채팅 정보관리 RESTful API 전용 라우팅
// http://localhost:3001/api/channel

var express = require("express");
var router = express.Router();

var db = require("../models/channel");

// Get all channel
router.get("/all", async (req, res) => {
	try {
		const channels = await db.Channel.findAll();
		res.json(channels);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

// Create a new channel
router.post("/create", async (req, res) => {
	try {
		var categoryCode = req.body.categoryCode;
		var channelName = req.body.channelName;
		var channelDesc = req.body.channelDesc;
		var channelState = req.body.channelState;
		var regMemberId = req.body.regMemberId;

		var channel = {
			category_code: categoryCode,
			channel_name: channelName,
			channel_desc: channelDesc,
			channel_state: channelState,
			reg_member_id: regMemberId,
		};

		var channel = await db.Channel.create(channel);
		res.json(channel);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

// Modify an existing channel
router.post("/modify/:id", async (req, res) => {
	try {
		var channelId = req.params.id;

		var categoryCode = req.body.categoryCode;
		var channelName = req.body.channelName;
		var channelDesc = req.body.channelDesc;
		var channelState = req.body.channelState;
		var regMemberId = req.body.regMemberId;

		// 특정 필드를 업데이트 하도록 $set
		// 특정 필드를 업데이트하거나 새로운 필드 추가할 때 사용
		var updateFields = {
			$set: {
				category_code: categoryCode,
				channel_name: channelName,
				channel_desc: channelDesc,
				channel_state: channelState,
				reg_member_id: regMemberId,
			},
		};

		var updatedChannel = await db.Channel.updateOne({ channel_id: channelId }, updateFields);

		res.json({ updatedChannel });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

// Delete a channel
router.delete("/delete/:id", async (req, res) => {
	try {
		var channelId = req.params.id;

		// deleteOne을 사용하여 채널을 삭제
		var deletedChannel = await db.Channel.deleteOne({ channel_id: channelId });

		res.json({ deletedChannel });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

// Get a single channel by ID
router.get("/:cid", async (req, res) => {
	try {
		var channelId = parseInt(req.params.cid, 10); // 10진수 정수로 변환

		var channel = await db.Channel.findOne({ where: { channel_id: channelId } });
		res.json({ channel });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

module.exports = router;
