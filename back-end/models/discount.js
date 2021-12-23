const mongoose = require("mongoose");

const DiscountSchema = mongoose.Schema({
  name: { type: String },
  code: { type: String },
  description: { type: String },
  discount: { type: Number },
});

module.exports = mongoose.model("Discount", DiscountSchema);
