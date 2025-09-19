// File: backend/models/Message.js
// const mongoose = require("mongoose");
// const MessageSchema = new mongoose.Schema({
//   sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   text: String,
//   createdAt: { type: Date, default: Date.now }
// });
// module.exports = mongoose.model("Message", MessageSchema);


const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId: String,
  receiverId: String,
  text: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", messageSchema);
