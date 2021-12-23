const mongoose = require("mongoose");

const PaymentSchema = mongoose.Schema({
  course: { type: mongoose.SchemaTypes.ObjectId, ref: "Course" },
  student: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  discount: { type: mongoose.SchemaTypes.ObjectId, ref: "Discount" },
  total: Number,
});

module.exports = mongoose.model("Payment", PaymentSchema);
