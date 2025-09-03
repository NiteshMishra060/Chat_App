// import React, { useEffect, useState } from "react";
// import socket from "./socket";
// import axios from "axios";

// const Dashboard = ({token}) => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [contacts, setContacts] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const commonURL=process.env.REACT_APP_COMMON_URL
//   const myUserId = "USER_ID_HERE"; // Replace with actual user ID (JWT/Session)
//  console.log("&&&&&&&&&&&&& token :- ",token)
//   useEffect(() => {
//     // Fetch contacts
//     axios.get(`${commonURL}/user/contacts/${myUserId}`).then((res) => {
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

//     const res = await axios.post(`${commonURL}/message/send`, payload);
//     setMessages((prev) => [...prev, res.data]);
//     socket.emit("sendMessage", res.data);
//     setMessage("");
//   };

//   const loadChat = async (contact) => {
//     setSelectedUser(contact);
//     const res = await axios.get(`${commonURL}/message/conversation/${myUserId}/${contact._id}`);
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
//           {/* <button onClick={handleSpeech}>Speak</button> */}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




// import React, { useEffect, useState } from "react";
// import socket from "./socket";
// import axios from "axios";

// const Dashboard = ({ token }) => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [contacts, setContacts] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const commonURL = process.env.REACT_APP_COMMON_URL;
//   const myUserId = "USER_ID_HERE"; // TODO: replace with user ID from token if available

//   useEffect(() => {
//     const fetchContacts = async () => {
//       try {
//         const res = await axios.get(`${commonURL}/user/contacts/${myUserId}`);
//         setContacts(res.data);
//       } catch (err) {
//         console.error("Error fetching contacts:", err);
//       }
//     };
//     fetchContacts();
//   }, []);

//   useEffect(() => {
//     const handleReceive = (msg) => {
//       if (msg.sender === selectedUser?._id) {
//         setMessages((prev) => [...prev, msg]);
//       }
//     };

//     socket.on("receiveMessage", handleReceive);
//     return () => socket.off("receiveMessage", handleReceive);
//   }, [selectedUser]);

//   // const handleSpeech = () => {
//   //   const SpeechRecognition =
//   //     window.SpeechRecognition || window.webkitSpeechRecognition;

//   //   if (!SpeechRecognition) {
//   //     alert("Speech recognition is not supported in your browser.");
//   //     return;
//   //   }

//   //   const recognition = new SpeechRecognition();
//   //   recognition.lang = "en-US";
//   //   recognition.interimResults = false;
//   //   recognition.maxAlternatives = 1;

//   //   recognition.onresult = (event) => {
//   //     const spokenText = event.results[0][0].transcript;
//   //     setMessage(spokenText);
//   //   };

//   //   recognition.onerror = (event) => {
//   //     console.error("Speech recognition error:", event.error);
//   //     alert("Speech recognition error: " + event.error);
//   //   };

//   //   recognition.onend = () => {
//   //     console.log("Speech recognition ended.");
//   //   };

//   //   recognition.start();
//   // };




//   const sendMessage = async () => {
//     if (!selectedUser || !message.trim()) return;

//     const payload = {
//       senderId: myUserId,
//       receiverId: selectedUser._id,
//       text: message.trim(),
//     };

//     try {
//       const res = await axios.post(`${commonURL}/message/send`, payload);
//       setMessages((prev) => [...prev, res.data]);
//       socket.emit("sendMessage", res.data);
//       setMessage("");
//     } catch (err) {
//       console.error("Error sending message:", err);
//       alert("Failed to send message.");
//     }
//   };

//   const loadChat = async (contact) => {
//     setSelectedUser(contact);
//     try {
//       const res = await axios.get(
//         `${commonURL}/message/conversation/${myUserId}/${contact._id}`
//       );
//       setMessages(res.data);
//     } catch (err) {
//       console.error("Error loading chat:", err);
//     }
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
//               borderRadius: "5px",
//             }}
//           >
//             {user.username}
//           </div>
//         ))}
//       </div>

//       {/* Chat Area */}
//       <div style={{ width: "75%", display: "flex", flexDirection: "column" }}>
//         <div
//           style={{
//             flex: 1,
//             overflowY: "auto",
//             padding: "10px",
//             backgroundColor: "#f0f0f0",
//           }}
//         >
//           {messages.map((msg, idx) => (
//             <div
//               key={idx}
//               style={{
//                 textAlign: msg.sender === myUserId ? "right" : "left",
//                 marginBottom: "10px",
//               }}
//             >
//               <span
//                 style={{
//                   display: "inline-block",
//                   backgroundColor: msg.sender === myUserId ? "#d1e7dd" : "#fff",
//                   padding: "8px 12px",
//                   borderRadius: "15px",
//                   maxWidth: "60%",
//                   wordWrap: "break-word",
//                 }}
//               >
//                 {msg.text}
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* Input area */}
//         <div
//           style={{
//             padding: "10px",
//             borderTop: "1px solid #ccc",
//             display: "flex",
//             gap: "10px",
//           }}
//         >
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Type your message..."
//             style={{
//               flex: 1,
//               padding: "10px",
//               borderRadius: "10px",
//               border: "1px solid #ccc",
//             }}
//           />
//           <button onClick={sendMessage} style={{ padding: "10px 20px" }}>
//             Send
//           </button>
//           <button onClick={handleSpeech} title="Speak" style={{ padding: "10px 15px" }}>
//             🎤
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




// import React, { useEffect, useState } from "react";
// import socket from "./socket";
// import axios from "axios";

// const Dashboard = ({ userId }) => {
//   const [contacts, setContacts] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     axios.get(`http://localhost:5000/api/user/contacts/${userId}`)
//       .then(res => setContacts(res.data));
//   }, [userId]);

//   useEffect(() => {
//     socket.on("receiveMessage", (msg) => {
//       if (msg.senderId === selectedUser?._id) {
//         setMessages(prev => [...prev, msg]);
//       }
//     });
//     return () => socket.off("receiveMessage");
//   }, [selectedUser]);

//   const handleSpeech = () => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) return alert("Speech Recognition not supported");

//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-US";
//     recognition.start();

//     recognition.onresult = (e) => {
//       setMessage(e.results[0][0].transcript);
//     };

//     recognition.onerror = (e) => {
//       console.error("Speech recognition error:", e.error);
//     };
//   };

//   const sendMessage = async () => {
//     if (!selectedUser) return;
//     const msg = { senderId: userId, receiverId: selectedUser._id, text: message };
//     const res = await axios.post("http://localhost:5000/api/message/send", msg);
//     setMessages((prev) => [...prev, res.data]);
//     socket.emit("sendMessage", res.data);
//     setMessage("");
//   };

//   const loadConversation = async (user) => {
//     setSelectedUser(user);
//     const res = await axios.get(`http://localhost:5000/api/message/conversation/${userId}/${user._id}`);
//     setMessages(res.data);
//   };

//   return (
//     <div style={{ display: "flex", height: "100vh" }}>
//       <div style={{ width: "25%", borderRight: "1px solid gray", padding: "1rem" }}>
//         <h3>Contacts</h3>
//         {contacts.map((c) => (
//           <div key={c._id} onClick={() => loadConversation(c)} style={{ cursor: "pointer" }}>
//             {c.username}
//           </div>
//         ))}
//       </div>
//       <div style={{ width: "75%", padding: "1rem", display: "flex", flexDirection: "column" }}>
//         <div style={{ flex: 1, overflowY: "auto" }}>
//           {messages.map((m, i) => (
//             <div key={i} style={{ textAlign: m.senderId === userId ? "right" : "left" }}>
//               <p style={{ display: "inline-block", background: "#e0e0e0", padding: "10px", borderRadius: "10px" }}>
//                 {m.text}
//               </p>
//             </div>
//           ))}
//         </div>
//         <div style={{ display: "flex", marginTop: "10px" }}>
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             style={{ flex: 1, padding: "10px" }}
//           />
//           <button onClick={sendMessage}>Send</button>
//           <button onClick={handleSpeech}>🎤</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;





// designed by using css =


// import React, { useEffect, useState } from "react";
// import socket from "./socket";
// import axios from "axios";

// const Dashboard = ({ userId }) => {
//   const [contacts, setContacts] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     axios.get(`http://localhost:5000/api/user/contacts/${userId}`)
//       .then(res => setContacts(res.data));
//   }, [userId]);

//   useEffect(() => {
//     socket.on("receiveMessage", (msg) => {
//       if (msg.senderId === selectedUser?._id) {
//         setMessages(prev => [...prev, msg]);
//       }
//     });
//     return () => socket.off("receiveMessage");
//   }, [selectedUser]);

//   const handleSpeech = () => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) return alert("Speech Recognition not supported");

//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-US";
//     recognition.start();

//     recognition.onresult = (e) => {
//       setMessage(e.results[0][0].transcript);
//     };

//     recognition.onerror = (e) => {
//       console.error("Speech recognition error:", e.error);
//     };
//   };

//   const sendMessage = async () => {
//     if (!selectedUser || !message.trim()) return;
//     const msg = { senderId: userId, receiverId: selectedUser._id, text: message };
//     const res = await axios.post("http://localhost:5000/api/message/send", msg);
//     setMessages((prev) => [...prev, res.data]);
//     socket.emit("sendMessage", res.data);
//     setMessage("");
//   };

//   const loadConversation = async (user) => {
//     setSelectedUser(user);
//     const res = await axios.get(`http://localhost:5000/api/message/conversation/${userId}/${user._id}`);
//     setMessages(res.data);
//   };

//   return (
//     <div style={{ display: "flex", height: "100vh", fontFamily: "Segoe UI, sans-serif" }}>
//       {/* Sidebar */}
//       <div style={{ width: "25%", borderRight: "1px solid #ccc", backgroundColor: "#f9f9f9", padding: "1rem" }}>
//         <h2 style={{ marginBottom: "1rem", color: "#444" }}>Contacts</h2>
//         {contacts.map((c) => (
//           <div
//             key={c._id}
//             onClick={() => loadConversation(c)}
//             style={{
//               padding: "12px",
//               marginBottom: "8px",
//               borderRadius: "8px",
//               backgroundColor: selectedUser?._id === c._id ? "#dbeafe" : "#fff",
//               cursor: "pointer",
//               boxShadow: "0 0 4px rgba(0,0,0,0.05)",
//               transition: "background-color 0.2s ease"
//             }}
//           >
//             <strong>{c.username}</strong>
//           </div>
//         ))}
//       </div>

//       {/* Chat Area */}
//       <div style={{ width: "75%", display: "flex", flexDirection: "column", backgroundColor: "#eef2f5" }}>
//         {/* Messages */}
//         <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
//           {messages.map((m, i) => (
//             <div
//               key={i}
//               style={{
//                 display: "flex",
//                 justifyContent: m.senderId === userId ? "flex-end" : "flex-start",
//                 marginBottom: "10px"
//               }}
//             >
//               <div
//                 style={{
//                   backgroundColor: m.senderId === userId ? "#dcfce7" : "#ffffff",
//                   padding: "10px 15px",
//                   borderRadius: "20px",
//                   maxWidth: "70%",
//                   boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
//                 }}
//               >
//                 {m.text}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Message Input */}
//         <div style={{
//           padding: "12px 20px",
//           borderTop: "1px solid #ccc",
//           display: "flex",
//           gap: "10px",
//           backgroundColor: "#fff"
//         }}>
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Type your message..."
//             style={{
//               flex: 1,
//               padding: "12px",
//               borderRadius: "25px",
//               border: "1px solid #ccc",
//               fontSize: "16px",
//               outline: "none",
//               backgroundColor: "#f3f4f6"
//             }}
//           />
//           <button
//             onClick={sendMessage}
//             style={{
//               backgroundColor: "#2563eb",
//               color: "white",
//               border: "none",
//               padding: "12px 18px",
//               borderRadius: "25px",
//               cursor: "pointer",
//               fontWeight: "bold"
//             }}
//           >
//             Send
//           </button>
//           <button
//             onClick={handleSpeech}
//             style={{
//               backgroundColor: "#10b981",
//               color: "white",
//               border: "none",
//               padding: "12px 15px",
//               borderRadius: "50%",
//               fontSize: "18px",
//               cursor: "pointer"
//             }}
//             title="Speak"
//           >
//             🎤
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;







// tailwind css use

import React, { useEffect, useState } from "react";
import socket from "./socket";
import axios from "axios";

const Dashboard = ({ userId }) => {
  const [contacts, setContacts] = useState([]);
  const [user, setUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/user/contacts/${userId}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Failed to fetch contacts", err));
  }, [userId]);


 useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users`)
      .then((res) => setContacts(res.data))
      .catch((err) => console.error("Failed to fetch contacts", err));
  }, []);

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      if (msg.senderId === selectedUser?._id || msg.receiverId === selectedUser?._id) {
        setMessages((prev) => [...prev, msg]);
      }
    });
    return () => socket.off("receiveMessage");
  }, [selectedUser]);

  const handleSpeech = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Speech Recognition not supported");

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.start();

    recognition.onresult = (e) => {
      setMessage((prev) => prev + " " + e.results[0][0].transcript);
    };

    recognition.onerror = (e) => {
      console.error("Speech recognition error:", e.error);
    };
  };

  const sendMessage = async () => {
    if (!selectedUser || message.trim() === "") return;
    try {
      const msg = {
        senderId: userId,
        receiverId: selectedUser._id,
        text: message,
      };
      const res = await axios.post("http://localhost:5000/api/message/send", msg);
      setMessages((prev) => [...prev, res.data]);
      socket.emit("sendMessage", res.data);
      setMessage("");
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  const loadConversation = async (user) => {
    setSelectedUser(user);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/message/conversation/${userId}/${user._id}`
      );
      setMessages(res.data);
    } catch (error) {
      console.error("Failed to load conversation", error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 border-r border-gray-300 p-4 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Contacts</h3>
        {contacts.length > 0 ? (
          contacts.map((c) => (
            <div
              key={c._id}
              onClick={() => loadConversation(c)}
              className="cursor-pointer p-2 hover:bg-gray-200 rounded"
            >
              {c.username}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No contacts found.</p>
        )}
      </div>
      <div className="w-3/4 p-4 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-2">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.senderId === userId ? "justify-end" : "justify-start"}`}
            >
              <div className="bg-blue-100 text-gray-800 px-4 py-2 rounded-lg max-w-xs">
                {m.text}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
          <button
            onClick={handleSpeech}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg"
          >
            🎤
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
