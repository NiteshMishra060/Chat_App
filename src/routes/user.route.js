// File: backend/routes/user.route.js
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// router.get("/:userId/contacts", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId).populate("contacts");
//     res.json(user.contacts);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });



// Fetch all contacts except current user
router.get("/contacts/:userId", async (req, res) => {
  const users = await User.find({ _id: { $ne: req.params.userId } });
  res.json(users);
});



// Get all users (no filters)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find(); // Fetches all users
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Server error while fetching users." });
  }
});

// // POST /api/register
// router.post('/register', async (req, res) => {
//   try {
//     console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&")
//     const { email, password } = req.body;
//     console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&",email, password)

//     const exists = await User.findOne({ email });
//     if (exists) return res.status(400).json({ message: 'Email already exists' });
//     console.log("&&&&&&&&&&&&&&&&&&&&&&&&&& exists : -",email, password)

//     const hashed = await bcrypt.hash(password, 10);
//     const user = new User({ email, password: hashed });
//     await user.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Registration failed', error: err.message });
//   }
// });



// router.post('/register', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password are required" });
//     }

//     console.log("Email received:", email);

//     const exists = await User.findOne({ email });
//     if (exists) return res.status(400).json({ message: 'Email already exists' });

//     const hashed = await bcrypt.hash(password, 10);
//     const user = new User({ email, password: hashed });
//     await user.save();

//     res.status(201).json({ message: 'User registered successfully' ,success:true});
//   } catch (err) {
//     console.error("Registration Error:", err); // Show full error in terminal
//     res.status(500).json({ message: 'Registration failed', error: err.message });
//   }
// });




// routes/auth.js or user.js (example)
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: "Username already exists." });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ error: "Internal Server Error." });
  }
});


// POST /api/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // const match = await bcrypt.compare(password, user.password);
    const match =password === user.password;

    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});


// router.post("/register", async (req, res) => {
//   const { username, email } = req.body;
//   try {
//     const newUser = new User({ username, email });
//     await newUser.save();
//     res.status(201).json(newUser);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

module.exports = router;
