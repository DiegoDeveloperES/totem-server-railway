require("dotenv").config();

const express = require("express");
const path = require("path");

const playlistRoute = require("./api/playlist");

const app = express();
const PORT = process.env.PORT || 3000;

// ====== STATIC FILES ======
app.use("/media", express.static(path.join(__dirname, "media")));

// ====== API ROUTES ======
app.use("/api/playlist", playlistRoute);

// ====== HEALTH CHECK ======
app.get("/", (req, res) => {
  res.json({
    status: "Totem server running",
    env: process.env.NODE_ENV,
  });
});

// ====== START SERVER ======
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Totem server running on port ${PORT}`);
});
