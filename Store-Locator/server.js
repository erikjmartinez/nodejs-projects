const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load env var
dotenv.config({ path: "./config/config.env" });

// Connect to DB
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable cors
app.use(cors());

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/v1/stores", require("./routes/stores"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server running on port ${PORT} and is currently in ${process.env.NODE_ENV} mode.`
  )
);
