import { Schema, model } from "mongoose";

const businessSchema = Schema({
  business: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Business", businessSchema);
