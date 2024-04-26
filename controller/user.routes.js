const express = require("express");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/userModel");
require("dotenv").config();

const userController = express.Router();

userController.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    return res.json({ message: "Please enter your name , email and password" });
  }

  // If a user is already registered
  console.log(name, email, password);

  const user = await UserModel.findOne({ email });
  if (user) {
    return res
      .status("200")
      .json({ status: "User Already Exist Please login " });
  }

  // Otherwise create a new user
  try {
    bcrypt.hash(password, 8, async function (err, hash) {
      // Store hash in your password DB.
      const user = await UserModel.create({ name, email, password: hash });
      console.log(user);
      res
        .status(201)
        .json({ status: `A user named ${name} registered successfully` });
    });
  } catch (err) {
    console.log(err);
  }
});

// loggin in

userController.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ message: "Please enter your email and password" });
  }
  const user = await UserModel.findOne({ email: email });

  if (!user) {
    return res
      .status(200)
      .json({
        status: "Log in failed",
        message: `User with email:- ${email} do not exist please register first `,
      });
  }

  const hashed_Pass = user.password;

  try {
    bcrypt.compare(password, hashed_Pass, function (err, result) {
      // result == true
      if (err || !result) {
        return res.status("404").json({ status: "Invalid credential" });
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.status(200).json({ status: "Login Successful", token: token });
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = { userController };
