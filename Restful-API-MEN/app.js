const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv/config");
app.use(bodyParser.json());

// Import routes
const postsRoute = require("./routes/posts");
app.use("/posts", postsRoute);

// Page to load
app.get("/", (req, res) => {
  res.send("We are currently home.");
});

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB!");
  }
);

// LISTEN
app.listen(3000);
