const express = require("express");
const mongoose = require("mongoose");
const Rec = mongoose.model("Rec");
const scrapeMetadata = require("../utils/scraper");
const requireLogin = require("../middlewares/requireLogin");

const router = express.Router();

// Get all Recs (Chronological)
router.get("/", async (req, res) => {
  try {
    const recs = await Rec.find()
      .populate("author", "username avatar profileColor")
      .populate("originalAuthor", "username")
      .sort({ createdAt: -1 });
    res.send(recs);
  } catch (err) {
    res.status(500).send(err);
  }
});

const parser = require("../config/cloudinary");

// Create a new Rec
router.post("/", requireLogin, parser.single("image"), async (req, res) => {
  const { title, why, link, tags } = req.body;

  if (!link && !req.file) {
    return res
      .status(422)
      .send({ error: "Must provide either a Link or an Image" });
  }

  // Scrape metadata only if link is provided
  let linkMetadata = {};
  if (link) {
    linkMetadata = await scrapeMetadata(link);
  }

  const rec = new Rec({
    title,
    why,
    link,
    linkMetadata,
    image: req.file ? req.file.path : linkMetadata.image, // Use uploaded image or fallback to scraped
    author: req.user.id,
    tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
    createdAt: Date.now(),
  });

  try {
    await rec.save();
    res.send(rec);
  } catch (err) {
    res.status(422).send(err);
  }
});

// Re-Rec (Steal)
router.post("/rerec/:id", requireLogin, async (req, res) => {
  try {
    const originalRec = await Rec.findById(req.params.id);
    if (!originalRec) return res.status(404).send("Rec not found");

    const newRec = new Rec({
      title: originalRec.title,
      why: originalRec.why, // Or allow user to add their own twist? Keeping simple for now.
      link: originalRec.link,
      linkMetadata: originalRec.linkMetadata,
      image: originalRec.image,
      author: req.user.id,
      originalRec: originalRec._id,
      originalAuthor: originalRec.author,
      tags: originalRec.tags,
      createdAt: Date.now(),
    });

    await newRec.save();
    res.send(newRec);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update Rec
router.put("/:id", requireLogin, async (req, res) => {
  try {
    const rec = await Rec.findById(req.params.id);
    if (!rec) return res.status(404).send({ error: "Rec not found" });

    // Check ownership
    if (rec.author.toString() !== req.user.id) {
      return res.status(401).send({ error: "Unauthorized" });
    }

    const { title, why, link, tags } = req.body;
    // Note: For MVP, not handling Image updates in Edit yet to keep complexity low,
    // unless user specifically asked. We'll update text fields.

    rec.title = title || rec.title;
    rec.why = why || rec.why;
    rec.link = link || rec.link;
    if (tags) {
      rec.tags = tags.split(",").map((tag) => tag.trim());
    }

    await rec.save();
    res.send(rec);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete Rec
router.delete("/:id", requireLogin, async (req, res) => {
  try {
    const rec = await Rec.findById(req.params.id);
    if (!rec) return res.status(404).send({ error: "Rec not found" });

    if (rec.author.toString() !== req.user.id) {
      return res.status(401).send({ error: "Unauthorized" });
    }

    await rec.deleteOne();
    res.send({ message: "Rec deleted" });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
