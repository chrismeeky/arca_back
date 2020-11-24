import { Schema, model } from "mongoose";

const businessSchema = Schema({
  businessName: {
    type: String,
    required: true,
  },
  businessDescription: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Business", businessSchema);
