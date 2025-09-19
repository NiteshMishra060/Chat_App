// require("dotenv").config();
// const express = require("express");
// const connectDB = require("./src/config/db");
// const cors = require("cors");
// const routes=require("./src/routes/routes")
// const app = express();


// // File: backend/index.js
// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const http = require("http");
// const { Server } = require("socket.io");
// const userRoutes = require("./src/routes/user.route");
// const messageRoutes = require("./src/routes/message.route");

// // WebSocket with Socket.IO
// const { Server } = require("socket.io");

// // connectDB();
// app.use(cors());
// app.use(express.json());

// app.use("/api", routes);

// const server = app.listen(5000, () => console.log("Server running on port 5000"));

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });

// io.on("connection", (socket) => {
//   console.log("A user connected");

//   socket.on("sendMessage", (message) => {
//     socket.broadcast.emit("receiveMessage", message);
//   });

//   socket.on("disconnect", () => console.log("User disconnected"));
// });





// File: backend/index.js
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const userRoutes = require("./src/routes/user.route");

const app = express();
const server = http.createServer(app);

// ✅ Setup Socket.IO with CORS
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // frontend origin
    methods: ["GET", "POST","PATCH","PUT","DELETE"],
    credentials: true,
  }
});

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.CHAT_APP_DB_NAME
})
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ Setup Express middlewares
app.use(cors({
  origin: "http://localhost:3000", // frontend origin
   methods: ["GET", "POST","PATCH","PUT","DELETE"],
  credentials: true
}));

app.use(express.json());
app.use("/api", userRoutes);

// ✅ Socket.IO events
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("sendMessage", (data) => {
    socket.broadcast.emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
