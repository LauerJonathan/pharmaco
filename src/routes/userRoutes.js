const express = require("express");
const userRouter = express.Router();
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
userRouter.post("/register", register);
userRouter.post("/login", login);

// Routes protégées
userRouter.use(protect);

// Routes pour tous les utilisateurs authentifiés
userRouter.get("/profile", getProfile);
userRouter.put("/profile", updateProfile);

// Routes admin uniquement
userRouter.use(authorize("admin"));
userRouter.get("/users", getUsers);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

module.exports = userRouter;
