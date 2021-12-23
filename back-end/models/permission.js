const mongoose = require("mongoose");

const PermissionSchema = mongoose.Schema({
  name: { type: String },
  rank: { type: Number },
});

module.exports = mongoose.model("Permission", PermissionSchema);
