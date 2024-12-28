const validate = (schema) => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req.body);

      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details.map((detail) => detail.message).join(", "),
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = validate;
