// const express = require("express");
// const router = express.Router();
// const User = require("../models/user");
// const Message=require("../models/message")

// router.post("/user", async (req, res) => {
//   const { username } = req.body;
//   const user = new User({ username });
//   await user.save();
//   res.status(201).json(user);
// });


// // @desc    Send a message
// // @route   POST /api/messages
// // @access  Public (you can later secure this)
// router.post("/message", async (req, res) => {
//   try {
//     const { senderId, content } = req.body;

//     const message = new Message({
//       sender: senderId,
//       content,
//     });

//     const savedMessage = await message.save();
//     res.status(201).json(savedMessage);
//   } catch (error) {
//     console.error("Error saving message:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // @desc    Get all messages
// // @route   GET /api/messages
// // @access  Public (can be restricted)
// router.get("/find-message", async (req, res) => {
//   try {
//     const messages = await Message.find().populate("sender", "username");
//     res.json(messages);
//   } catch (error) {
//     console.error("Error fetching messages:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// module.exports = router;



const express = require("express");
const Message = require("../models/message");
const router = express.Router();

router.post("/send", async (req, res) => {
  try {
    const { senderId, receiverId, text } = req.body;
    const newMessage = new Message({ sender: senderId, receiver: receiverId, text });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/conversation/:userId/:contactId", async (req, res) => {
  const { userId, contactId } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: contactId },
        { sender: contactId, receiver: userId }
      ]
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
