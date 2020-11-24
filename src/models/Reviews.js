import { Schema, model } from "mongoose";

const reviewSchema = Schema({
  comment: {
    type: String,
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  business: { type: Schema.Types.ObjectId, ref: "Business", required: true },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Review", reviewSchema);
