const mongoose = require("mongoose");
const path = require("path");
const conn = require(path.join("..", "server"));
const AutoIncrement = require("mongoose-sequence")(mongoose);

const LogSchema = new mongoose.Schema({
  message: {
    type: String,
    required: [true, "Please describe the issue"],
    trim: true,
  },
  attention: { type: Boolean, required: true },
  tech: { type: String, required: true },
  date: { type: Date, default: Date.now },
  _tech: {
    type: mongoose.Schema.ObjectId,
    ref: "Tech",
  },
});

LogSchema.plugin(AutoIncrement, { inc_field: "id" });

module.exports = mongoose.model("Log", LogSchema);
