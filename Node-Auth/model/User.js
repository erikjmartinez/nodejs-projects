const moongoose = require("mongoose");

const userSchema = new moongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 1,
    max: 255
  },
  email: {
    type: String,
    required: true,
    min: 1,
    max: 255
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = moongoose.model("User", userSchema);
