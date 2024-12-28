// src/validations/schemas.js
const Joi = require("joi");

// Schéma de validation pour les produits
const productSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Le nom du produit est requis",
    "string.min": "Le nom doit contenir au moins 2 caractères",
    "string.max": "Le nom ne peut pas dépasser 100 caractères",
  }),

  description: Joi.string().min(10).max(1000).required().messages({
    "string.empty": "La description est requise",
    "string.min": "La description doit contenir au moins 10 caractères",
    "string.max": "La description ne peut pas dépasser 1000 caractères",
  }),

  price: Joi.number().positive().required().messages({
    "number.base": "Le prix doit être un nombre",
    "number.positive": "Le prix doit être positif",
  }),

  stock: Joi.number().integer().min(0).required().messages({
    "number.base": "Le stock doit être un nombre",
    "number.integer": "Le stock doit être un nombre entier",
    "number.min": "Le stock ne peut pas être négatif",
  }),

  category: Joi.string()
    .valid("Médicaments", "Parapharmacie", "Matériel médical", "Autres")
    .required()
    .messages({
      "any.only":
        "La catégorie doit être une des suivantes : Médicaments, Parapharmacie, Matériel médical, Autres",
    }),

  expirationDate: Joi.date().greater("now").required().messages({
    "date.base": "La date d'expiration doit être une date valide",
    "date.greater": "La date d'expiration doit être dans le futur",
  }),

  supplier: Joi.string().required().messages({
    "string.empty": "Le fournisseur est requis",
  }),

  reference: Joi.string()
    .pattern(/^[A-Z0-9]{6,}$/)
    .required()
    .messages({
      "string.pattern.base":
        "La référence doit contenir au moins 6 caractères alphanumériques en majuscules",
      "string.empty": "La référence est requise",
    }),
});

// Schéma de validation pour l'inscription des utilisateurs
const userRegistrationSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "string.empty": "Le nom d'utilisateur est requis",
    "string.min": "Le nom d'utilisateur doit contenir au moins 2 caractères",
    "string.max": "Le nom d'utilisateur ne peut pas dépasser 50 caractères",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Veuillez fournir un email valide",
    "string.empty": "L'email est requis",
  }),

  password: Joi.string()
    .min(6)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Le mot de passe doit contenir au moins une lettre et un chiffre",
      "string.min": "Le mot de passe doit contenir au moins 6 caractères",
    }),

  role: Joi.string()
    .valid("admin", "pharmacien", "vendeur")
    .default("vendeur")
    .messages({
      "any.only": "Le rôle doit être : admin, pharmacien ou vendeur",
    }),
});

// Schéma de validation pour la connexion
const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Veuillez fournir un email valide",
    "string.empty": "L'email est requis",
  }),

  password: Joi.string().required().messages({
    "string.empty": "Le mot de passe est requis",
  }),
});

// Schéma de validation pour les ventes
const saleSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        product: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            "string.pattern.base": "ID de produit invalide",
          }),
        quantity: Joi.number().integer().positive().required().messages({
          "number.base": "La quantité doit être un nombre",
          "number.integer": "La quantité doit être un nombre entier",
          "number.positive": "La quantité doit être positive",
        }),
      })
    )
    .min(1)
    .required()
    .messages({
      "array.min": "La vente doit contenir au moins un produit",
      "array.base": "Les items sont requis",
    }),

  paymentMethod: Joi.string()
    .valid("Espèces", "Carte", "Assurance")
    .required()
    .messages({
      "any.only": "Le mode de paiement doit être : Espèces, Carte ou Assurance",
    }),
});

module.exports = {
  productSchema,
  userRegistrationSchema,
  loginSchema,
  saleSchema,
};
