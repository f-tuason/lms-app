const mongoose = require("mongoose");

const OutlineSchema = mongoose.Schema({
  course: { type: mongoose.SchemaTypes.ObjectId, ref: "Course" },
  idx: { type: Number },
  main: { type: String },
  secondary: { type: String },
  description: { type: String },
  videourl: { type: String },
  isvisible: { type: Number },
});

module.exports = mongoose.model("Outline", OutlineSchema);
