const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  magnetLink: {
    type: String,
    required: true,
  },
  description: String,
  genre: [String],
  releaseYear: Number,
  thumbnail: String,
  // Add more fields as needed
});

module.exports = mongoose.model("Content", ContentSchema);
