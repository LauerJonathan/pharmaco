// src/routes/index.js
const express = require('express');
const mainRouter = express.Router();

// Importer toutes les routes
const productRoutes = require('./productRoutes');
const userRoutes = require('./userRoutes');
const saleRoutes = require('./saleRoutes');

// Monter les routes sur leurs chemins respectifs
mainRouter.use('/products', productRoutes);
mainRouter.use('/users', userRoutes);
mainRouter.use('/sales', saleRoutes);

// Route de base pour vérifier que l'API fonctionne
mainRouter.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API de gestion de pharmacie' });
});

module.exports = mainRouter;