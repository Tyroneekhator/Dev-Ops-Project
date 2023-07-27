const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,

    required: "This file is mandatory.",
  },
  image: {
    type: String,

    required: "This file is mandatory.",
  },
});

module.exports = mongoose.model("category", categorySchema);
