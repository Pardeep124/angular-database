const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  name: String,
  title: String,
  description: String,
});

module.exports = mongoose.model("PostSchema", postSchema);
