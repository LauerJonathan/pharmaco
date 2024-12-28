// src/routes/productRoutes.js
const express = require('express');
const productRouter = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getExpiringSoon,
  getLowStock
} = require('../controllers/productController');

// Routes publiques
productRouter.get('/', getProducts);
productRouter.get('/:id', getProduct);

// Routes protégées
productRouter.use(protect);

// Routes pour admin et pharmacien
productRouter.use(authorize('admin', 'pharmacien'));
productRouter.post('/', createProduct);
productRouter.put('/:id', updateProduct);
productRouter.delete('/:id', deleteProduct);

// Routes spéciales
productRouter.get('/reports/expiring-soon', getExpiringSoon);
productRouter.get('/reports/low-stock', getLowStock);

module.exports = productRouter;

// src/routes/userRoutes.js
const express = require('express');
const userRouter = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

const {
  register,
  login,
  getProfile,
  updateProfile,
  getUsers,
  updateUser,
  deleteUser
} = require('../controllers/userController');

// Routes publiques
userRouter.post('/register', register);
userRouter.post('/login', login);

// Routes protégées
userRouter.use(protect);

// Routes pour tous les utilisateurs authentifiés
userRouter.get('/profile', getProfile);
userRouter.put('/profile', updateProfile);

// Routes admin uniquement
userRouter.use(authorize('admin'));
userRouter.get('/', getUsers);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

module.exports = userRouter;

// src/routes/saleRoutes.js
const express = require('express');
const saleRouter = express.Router();
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
saleRouter.use(protect);

// Routes pour les ventes
saleRouter.post('/', createSale);
saleRouter.get('/', getSales);
saleRouter.get('/:id', getSale);
saleRouter.put('/:id', authorize('admin', 'pharmacien'), updateSale);
saleRouter.put('/:id/cancel', authorize('admin', 'pharmacien'), cancelSale);

// Routes pour les rapports
saleRouter.get('/reports/daily', authorize('admin', 'pharmacien'), getDailySales);
saleRouter.get('/reports/monthly', authorize('admin', 'pharmacien'), getMonthlySales);

module.exports = saleRouter;