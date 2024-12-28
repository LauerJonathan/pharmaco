const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log de l'erreur pour le développement
  console.error(err);

  // Erreur Mongoose - ID invalide
  if (err.name === "CastError") {
    const message = "Ressource non trouvée";
    error = new Error(message);
    return res.status(404).json({
      success: false,
      message,
    });
  }

  // Erreur Mongoose - Validation
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new Error(message);
    return res.status(400).json({
      success: false,
      message,
    });
  }

  // Erreur Mongoose - Doublon
  if (err.code === 11000) {
    const message = "Valeur en doublon entrée";
    error = new Error(message);
    return res.status(400).json({
      success: false,
      message,
    });
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Erreur serveur",
  });
};

module.exports = errorHandler;
