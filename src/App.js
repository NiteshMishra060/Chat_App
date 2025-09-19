// import React, { useEffect, useState } from "react";
// import socket from "./socket";

// const App = () => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);

//   // Voice Recognition
//   const handleSpeech = () => {
//     const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//     recognition.lang = "en-US";
//     recognition.start();

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       setMessage(transcript);
//     };
//   };

//   const sendMessage = () => {
//     socket.emit("sendMessage", message);
//     setMessages((prev) => [...prev, { text: message, sender: "me" }]);
//     setMessage("");
//   };

//   useEffect(() => {
//     socket.on("receiveMessage", (msg) => {
//       setMessages((prev) => [...prev, { text: msg, sender: "other" }]);
//     });
//     return () => socket.off("receiveMessage");
//   }, []);

//   return (
//     <div>
//       <h2>Chat App (MERN + Voice)</h2>
//       <div style={{ height: "300px", overflowY: "scroll", border: "1px solid #ccc" }}>
//         {messages.map((msg, idx) => (
//           <p key={idx}><b>{msg.sender}:</b> {msg.text}</p>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         style={{ width: "70%" }}
//       />
//       <button onClick={sendMessage}>Send</button>
//       <button onClick={handleSpeech}>🎤 Speak</button>
//     </div>
//   );
// };

// export default App;



// import React, { useEffect, useState } from "react";
// import socket from "./socket";
// import axios from "axios";

// const App = () => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [contacts, setContacts] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);

//   const myUserId = "USER_ID_HERE"; // Replace with actual user ID (JWT/Session)

//   useEffect(() => {
//     // Fetch contacts
//     axios.get(`/api/user/contacts/${myUserId}`).then((res) => {
//       setContacts(res.data);
//     });
//   }, []);

//   useEffect(() => {
//     socket.on("receiveMessage", (msg) => {
//       if (msg.sender === selectedUser?._id) {
//         setMessages((prev) => [...prev, msg]);
//       }
//     });

//     return () => socket.off("receiveMessage");
//   }, [selectedUser]);

//   const handleSpeech = () => {
//     const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//     recognition.lang = "en-US";
//     recognition.start();
//     recognition.onresult = (event) => setMessage(event.results[0][0].transcript);
//   };

//   const sendMessage = async () => {
//     if (!selectedUser) return;
//     const payload = {
//       senderId: myUserId,
//       receiverId: selectedUser._id,
//       text: message,
//     };

//     const res = await axios.post("/api/message/send", payload);
//     setMessages((prev) => [...prev, res.data]);
//     socket.emit("sendMessage", res.data);
//     setMessage("");
//   };

//   const loadChat = async (contact) => {
//     setSelectedUser(contact);
//     const res = await axios.get(`/api/message/conversation/${myUserId}/${contact._id}`);
//     setMessages(res.data);
//   };

//   return (
//     <div style={{ display: "flex", height: "100vh", fontFamily: "Arial, sans-serif" }}>
//       {/* Sidebar */}
//       <div style={{ width: "25%", borderRight: "1px solid #ccc", padding: "10px" }}>
//         <h3>Contacts</h3>
//         {contacts.map((user) => (
//           <div
//             key={user._id}
//             onClick={() => loadChat(user)}
//             style={{
//               padding: "10px",
//               marginBottom: "5px",
//               backgroundColor: selectedUser?._id === user._id ? "#eef" : "#f9f9f9",
//               cursor: "pointer",
//               borderRadius: "5px"
//             }}
//           >
//             {user.username}
//           </div>
//         ))}
//       </div>

//       {/* Chat Area */}
//       <div style={{ width: "75%", display: "flex", flexDirection: "column" }}>
//         <div style={{ flex: 1, overflowY: "auto", padding: "10px", backgroundColor: "#f0f0f0" }}>
//           {messages.map((msg, idx) => (
//             <div
//               key={idx}
//               style={{
//                 textAlign: msg.sender === myUserId ? "right" : "left",
//                 marginBottom: "10px"
//               }}
//             >
//               <span
//                 style={{
//                   display: "inline-block",
//                   backgroundColor: msg.sender === myUserId ? "#d1e7dd" : "#fff",
//                   padding: "8px 12px",
//                   borderRadius: "15px",
//                   maxWidth: "60%"
//                 }}
//               >
//                 {msg.text}
//               </span>
//             </div>
//           ))}
//         </div>
//         <div style={{ padding: "10px", borderTop: "1px solid #ccc", display: "flex", gap: "10px" }}>
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             style={{ flex: 1, padding: "10px", borderRadius: "10px", border: "1px solid #ccc" }}
//           />
//           <button onClick={sendMessage} style={{ padding: "10px 20px" }}>Send</button>
//           <button onClick={handleSpeech}>🎤</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;




import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";
import HomePage from "./components/homePage";
import UserRegistration from "./components/registration";
const App = () => {
  return (
   // <AuthProvider>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<UserRegistration />} />

        </Routes>
      </div>
    </Router>
    // </AuthProvider>
  );
};

export default App;


// import React from "react";
// import Dashboard from "./components/dashboard";

// function App() {
//   return <Dashboard userId={"688a724f70c48d26338d1ed2"} />;
// }

// export default App;
