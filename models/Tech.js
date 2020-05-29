const mongoose = require("mongoose");

const TechSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please add a first name"],
    minlength: 2,
    maxlength: 20,
  },
  lastName: {
    type: String,
    required: [true, "Please add a last name"],
    minlength: 2,
    maxlength: 50,
  },
});

TechSchema.set("collection", "techs");

TechSchema.index({firstName: 1, lastName: 1}, {unique: true})

module.exports = mongoose.model("Tech", TechSchema);
