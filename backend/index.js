const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const User = require("../backend/model/user");
const app = express();
require("dotenv").config()
mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

app.use(express.json());
app.use(cors());

app.post("/submit_registration", async (req, res) => {
  const { name, email, password } = req.body;

  if (password.length <= 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be longer than 8 characters",
    });
  }

  try {
    const data = await User.find({ email });
    if (data.length === 0) {
      const user = new User({ name, email, password });
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Registration successful",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Email ID is already registered",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

