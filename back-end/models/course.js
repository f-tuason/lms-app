const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema({
  name: { type: String },
  category: { type: mongoose.SchemaTypes.ObjectId, ref: "Category" },
  description: { type: String },
  image: { type: String },
  price: { type: Number },
  teacher: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  student: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
  outline: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Outline" }],
  rating: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Rating" }],
});

module.exports = mongoose.model("Course", CourseSchema);
