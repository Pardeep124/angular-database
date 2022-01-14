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

app.patch("/:id", async (req, res) => {
  try {
    const { name, title, description } = req.body;
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(404).send(`No post with id: ${req.params.id}`);
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        title,
        description,
        _id: req.params.id,
      },
      { new: true }
    );
    res.status(200).json({ message: "Post Updated Successfully" });
  } catch (error) {
    console.log(error);
  }
});

mongoose
  .connect(process.env.CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server is running at Port:", process.env.PORT);
    });
  })
  .catch((e) => console.log(e));
