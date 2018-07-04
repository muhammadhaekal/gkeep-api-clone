//App Config
const PORT = 3001;
const MONGODB_URL = "mongodb://localhost:27017/g-keep";

//Load package dependency
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const notes = require("./api/notes");

mongoose.connect(MONGODB_URL);

//Initialize express app
const app = express();
app.use(cors());
app.use(express.json({}));


app.use("/notes", notes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Run app and console log notif
app.listen(PORT, () => console.log(`Application Running on  port ${PORT}`));
