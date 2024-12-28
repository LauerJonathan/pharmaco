// src/routes/index.js
const express = require("express");
const router = express.Router();

// Importer toutes les routes
router.use("/api/products", require("./productRoutes"));
router.use("/api/users", require("./userRoutes"));
router.use("/api/sales", require("./saleRoutes"));

// Route de base pour vérifier que l'API fonctionne
router.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur l'API de gestion de pharmacie" });
});

module.exports = router;
