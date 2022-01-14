const express = require("express");
const mongoose = require("mongoose");
const PostModel = require("./modal/posts.js");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.get("/", async (req, res) => {
  const data = await PostModel.find();
  res.status(200).json(data);
});

app.post("/", async (req, res) => {
  try {
    await PostModel.create(req.body);
    console.log(req.body);
    res.status(200).json({ message: "Post added Succesffuly" });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/:id", async (req, res) => {
  try {
    await PostModel.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: "Post Deleted Successfuly" });
  } catch (e) {
    console.log(e);
  }
});

mongoose
  .connect(process.env.CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server is running at Port: 5000");
    });
  })
  .catch((e) => console.log(e));
