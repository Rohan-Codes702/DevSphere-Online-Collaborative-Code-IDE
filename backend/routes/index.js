const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel"); 

router.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "API is running" });
});

router.post("/signup", async (req, res) => {
  try {
    let { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    let emailCon = await userModel.findOne({ email: normalizedEmail });

    if (emailCon) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const usernameCon = await userModel.findOne({ username: username.trim() });

    if (usernameCon) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await userModel.create({
      name: name.trim(),
      username: username.trim(),
      email: normalizedEmail,
      password: hash,
    });

    res.status(201).json({ success: true, message: "User created successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});


router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    let user = await userModel.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      return res
        .status(200)
        .json({ success: true, message: "User logged in successfully" });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
