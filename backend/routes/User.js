const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRETKEY = "abcdefg";

router.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const user = await User.findOne({ username: username });
    if (user) {
      return res.status(400).json("Username Exists");
    }
    const EC = await User.findOne({ email: email });
    if (EC) {
      return res.status(400).json("Email Exists");
    }
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin && role === "admin") {
      return res
        .status(400)
        .json({ message: "An admin already exists in the system" });
    }
    if (!user && !EC && !existingAdmin) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role,
      });
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    }
  } catch (e) {
    res.status(400).json("Error is " + e);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const EC = await User.findOne({ email: email });
    if (!EC) {
      return res.status(400).json("Email not Found");
    }
    const isPasswordCorrect = await bcrypt.compare(password, EC.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (EC && isPasswordCorrect) {
      const authToken = jwt.sign({ id: EC.id }, SECRETKEY, {
        expiresIn: "30m",
      });
      res
      .status(200)
      .json({
        success: true,
        authToken: authToken,
        id: EC.id,
        name: EC.username,
        email: EC.email,
        role: EC.role,
      });
    }
  } catch (e) {
    res.status(400).json("Error is " + e);
  }
});




module.exports = router;