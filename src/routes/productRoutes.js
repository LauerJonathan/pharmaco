const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");

// Note: Les contrôleurs seront implémentés dans la prochaine étape
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getExpiringSoon,
  getLowStock,
} = require("../controllers/productController");

// Routes publiques
router.get("/products", getProducts);
router.get("/products/:id", getProduct);

// Routes protégées
router.use(protect); // Middleware d'authentification pour toutes les routes suivantes

// Routes pour admin et pharmacien
router.use(authorize("admin", "pharmacien"));
router.post("/products", createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

// Routes spéciales
router.get("/products/expiring-soon", getExpiringSoon);
router.get("/products/low-stock", getLowStock);

module.exports = router;
