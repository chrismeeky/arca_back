import { Schema, model } from "mongoose";

const userSchema = Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("User", userSchema);
