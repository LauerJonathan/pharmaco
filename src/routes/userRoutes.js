const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");

const {
  register,
  login,
  getProfile,
  updateProfile,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// Routes publiques
router.post("/register", register);
router.post("/login", login);

// Routes protégées
router.use(protect);

// Routes pour tous les utilisateurs authentifiés
router.get("/profile", getProfile);
router.put("/profile", updateProfile);

// Routes admin uniquement
router.use(authorize("admin"));
router.get("/users", getUsers);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
