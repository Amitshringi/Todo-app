// require liberary
const mongoose = require("mongoose");

// schema for our data
const listSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  due_date: {
    type: Date,
  },
});

module.exports = mongoose.model("List", listSchema);
