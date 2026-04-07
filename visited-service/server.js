const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

let visited = [];

app.get("/", (req, res) => {
  res.json({ message: "Servicio de visitados en funcionamiento" });
});

app.get("/visited", (req, res) => {
  res.json(visited);
});

app.post("/visited", (req, res) => {
  const { country, date } = req.body;

  if (!country) {
    return res.status(400).json({ error: "El país es obligatorio" });
  }

  const exists = visited.find(item => item.country.toLowerCase() === country.toLowerCase());

  if (exists) {
    return res.status(409).json({ error: "El país ya está marcado como visitado" });
  }

  const newVisited = {
    country,
    date: date || new Date().toISOString()
  };

  visited.push(newVisited);

  res.status(201).json(newVisited);
});

app.delete("/visited/:country", (req, res) => {
  const country = req.params.country.toLowerCase();
  visited = visited.filter(item => item.country.toLowerCase() !== country);

  res.json({ message: "País eliminado de visitados" });
});

app.listen(PORT, () => {
  console.log(`Visited service ejecutándose en puerto ${PORT}`);
});