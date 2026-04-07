const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

let comments = [];

app.get("/", (req, res) => {
  res.json({ message: "Servicio de comentarios en funcionamiento" });
});

app.get("/comments", (req, res) => {
  res.json(comments);
});

app.get("/comments/:country", (req, res) => {
  const country = req.params.country.toLowerCase();
  const filtered = comments.filter(item => item.country.toLowerCase() === country);
  res.json(filtered);
});

app.post("/comments", (req, res) => {
  const { country, comment } = req.body;

  if (!country || !comment) {
    return res.status(400).json({ error: "País y comentario son obligatorios" });
  }

  const newComment = { country, comment };
  comments.push(newComment);

  res.status(201).json(newComment);
});

app.listen(PORT, () => {
  console.log(`Comments service ejecutándose en puerto ${PORT}`);
});