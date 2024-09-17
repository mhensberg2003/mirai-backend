const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Content = require("../models/Content");

// Get All Content
router.get("/", async (req, res) => {
  try {
    const contentList = await Content.find();
    res.json(contentList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get Content by ID
router.get("/:id", async (req, res) => {
  try {
    const contentItem = await Content.findById(req.params.id);
    if (!contentItem) {
      return res.status(404).json({ msg: "Content not found" });
    }
    res.json(contentItem);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Content not found" });
    }
    res.status(500).send("Server error");
  }
});

// Add New Content (Protected Route)
router.post("/", auth, async (req, res) => {
  const { title, magnetLink, description, genre, releaseYear, thumbnail } =
    req.body;
  try {
    const newContent = new Content({
      title,
      magnetLink,
      description,
      genre,
      releaseYear,
      thumbnail,
    });
    const content = await newContent.save();
    res.json(content);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
