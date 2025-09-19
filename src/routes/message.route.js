
// // File: backend/routes/message.route.js
// const express = require("express");
// const router = express.Router();
// const Message = require("../models/message");

// router.post("/send", async (req, res) => {
//   try {
//     const { senderId, receiverId, text } = req.body;
//     const newMessage = new Message({ sender: senderId, receiver: receiverId, text });
//     await newMessage.save();
//     res.status(201).json(newMessage);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.get("/conversation/:userId/:contactId", async (req, res) => {
//   try {
//     const { userId, contactId } = req.params;
//     const messages = await Message.find({
//       $or: [
//         { sender: userId, receiver: contactId },
//         { sender: contactId, receiver: userId }
//       ]
//     }).sort("createdAt");
//     res.json(messages);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;



const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

router.post("/send", async (req, res) => {
  const message = await Message.create(req.body);
  res.json(message);
});

router.get("/conversation/:senderId/:receiverId", async (req, res) => {
  const { senderId, receiverId } = req.params;
  const messages = await Message.find({
    $or: [
      { senderId, receiverId },
      { senderId: receiverId, receiverId: senderId },
    ],
  }).sort({ timestamp: 1 });
  res.json(messages);
});

module.exports = router;
