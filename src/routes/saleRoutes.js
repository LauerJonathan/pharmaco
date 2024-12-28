const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

const {
  createSale,
  getSales,
  getSale,
  updateSale,
  cancelSale,
  getDailySales,
  getMonthlySales
} = require('../controllers/saleController');

// Toutes les routes de ventes nécessitent une authentification
router.use(protect);

// Routes pour les ventes
router.post('/sales', createSale);
router.get('/sales', getSales);
router.get('/sales/:id', getSale);
router.put('/sales/:id', authorize('admin', 'pharmacien'), updateSale);
router.put('/sales/:id/cancel', authorize('admin', 'pharmacien'), cancelSale);

// Routes pour les rapports
router.get('/sales/reports/daily', authorize('admin', 'pharmacien'), getDailySales);
router.get('/sales/reports/monthly', authorize('admin', 'pharmacien'), getMonthlySales);

module.exports = router;