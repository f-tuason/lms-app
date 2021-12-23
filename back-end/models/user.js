const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, require: true },
  password: { type: String, require: true, min: 3 },
  permission: { type: mongoose.SchemaTypes.ObjectId, ref: "Permission" },
  course: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Course" }],
  payment: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Payment" }],
  rating: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Rating" }],
});

module.exports = mongoose.model("User", UserSchema);
