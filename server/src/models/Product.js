// src/models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Le nom du produit est requis"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "La description est requise"],
    },
    price: {
      type: Number,
      required: [true, "Le prix est requis"],
      min: 0,
    },
    stock: {
      type: Number,
      required: [true, "Le stock est requis"],
      min: 0,
    },
    category: {
      type: String,
      required: [true, "La catégorie est requise"],
      enum: ["Médicaments", "Parapharmacie", "Matériel médical", "Autres"],
    },
    expirationDate: {
      type: Date,
      required: [true, "La date d'expiration est requise"],
    },
    supplier: {
      type: String,
      required: [true, "Le fournisseur est requis"],
    },
    reference: {
      type: String,
      unique: true,
      required: [true, "La référence est requise"],
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

// src/models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Le nom de l'utilisateur est requis"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "L'email est requis"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Le mot de passe est requis"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["admin", "pharmacien", "vendeur"],
      default: "vendeur",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hash du mot de passe avant sauvegarde
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Méthode pour comparer les mots de passe
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;

// src/models/Sale.js
const mongoose = require("mongoose");

const saleItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

const saleSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [saleItemSchema],
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["Espèces", "Carte", "Assurance"],
    },
    status: {
      type: String,
      enum: ["En cours", "Terminée", "Annulée"],
      default: "En cours",
    },
  },
  {
    timestamps: true,
  }
);

const Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;
