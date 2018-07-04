const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doccument_schema = Schema({
  title: String,
  description: String,
  list: [
    {
      name: String
    }
  ],
  type: {
    type: String,
    enum: ["simple", "checklist"]
  },
  status: {
    type: String,
    enum: ["archived", "deleted", "available"]
  }
});

module.exports = mongoose.model("notes", doccument_schema);
