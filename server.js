const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/keranjang", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "cart.html"));
});

app.get("/tentang", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

app.listen(PORT, () => {
  console.log(`KulinerKu berjalan di http://localhost:${PORT}`);
});
