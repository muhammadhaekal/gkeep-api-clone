const express = require("express");
const router = express.Router();
const Notes = require("./model");

router.get("/", (req, res) => {
  Notes.find({}).exec((error, notes) => {
    if (error) return res.status(400).json(error);
    res.send(notes);
  });
});

router.get("/search", (req, res) => {
  req.query.title = new RegExp(req.query.title, "i");
  req.query.description = new RegExp(req.query.description, "i");

  Notes.find(req.query).exec((error, recipes) => {
    if (error) return res.status(400).json(error);
    res.send(recipes);
  });
});

router.get("/:id", (req, res) => {
  Notes.findOne({ _id: req.params.id }).exec((error, note) => {
    if (error) return res.status(400).json(error);
    res.send({ data: note });
  });
});

router.post("/", (req, res) => {
  let note = req.body;

  Notes.create(note, (error, note) => {
    if (error) return res.status(400).json(error);
    res.send({ message: "Data has been saved", data: note });
  });
});

router.put("/:id", (req, res) => {
  const updated_note = req.body;

  Notes.findByIdAndUpdate({ _id: req.params.id }, updated_note, {
    new: true
  }).exec((error, updated_note) => {
    if (error) return res.send(error);
    res.send({
      message: "Data has been updated successfully",
      data: updated_note
    });
  });
});

router.delete("/:id", (req, res) => {
  Notes.findByIdAndRemove({ _id: req.params.id }, (error, note) => {
    if (error) {
      return res.send(error);
    } else if (note === null) {
      return res.send("Data not found");
    }
    res.send({
      message: "Data has been deleted successfully",
      data: note
    });
  });
});

module.exports = router;
