const mongoose = require("mongoose");

const Device = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  device: {
    type: String,
    required: true
  },
  browser: {
    type: String,
    required: true
  },
  rgb: {
    red: {type: Number, default: 0},
    green: {type: Number, default: 0},
    blue: {type: Number, default: 0}
  }
})

module.exports = mongoose.model("Device", Device);