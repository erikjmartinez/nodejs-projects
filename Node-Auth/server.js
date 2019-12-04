const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Import Routes
const authRoute = require("./routes/auth");

dotenv.config();

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DB")
);

// Middleware
app.use(bodyParser.json());

// Route Middleware
app.use("/api/user", authRoute);

app.listen(3000, () => console.log("Server is up and running on port 3000"));
