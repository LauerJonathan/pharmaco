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
