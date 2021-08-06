const mongoose = require("mongoose");

// Only the properties that set in the schema can be passed into the database
// But there is no validation in terms of the schema, which is to say that we can pass empty value into the database
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
    maxLength: [20, "name cannot be more than 20 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("task", taskSchema);
