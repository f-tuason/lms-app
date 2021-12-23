const mongoose = require("mongoose");

const RatingSchema = mongoose.Schema({
  course: { type: mongoose.SchemaTypes.ObjectId, ref: "Course" },
  student: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  comment: { type: String },
  grade: { type: Number },
});

module.exports = mongoose.model("Rating", RatingSchema);
