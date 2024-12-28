const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware de vérification du token JWT
const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        // Récupérer le token du header
        token = req.headers.authorization.split(' ')[1];

        // Vérifier le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Ajouter l'utilisateur à la requête
        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user) {
          throw new Error('Utilisateur non trouvé');
        }

        if (!req.user.isActive) {
          throw new Error('Compte utilisateur désactivé');
        }

        next();
      } catch (error) {
        res.status(401).json({
          success: false,
          message: 'Session invalide ou expirée'
        });
      }
    }

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Non autorisé, token manquant'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};

// Middleware de vérification des rôles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Le rôle ${req.user.role} n'est pas autorisé à accéder à cette ressource`
      });
    }
    next();
  };
};

module.exports = { protect, authorize };