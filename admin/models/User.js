const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  registerDate: {
    type: Date,
    required: true,
    default: new Date()
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;