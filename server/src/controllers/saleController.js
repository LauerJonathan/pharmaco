const Sale = require("../models/Sale");
const Product = require("../models/Product");

exports.createSale = async (req, res) => {
  try {
    const { items } = req.body;
    let totalAmount = 0;

    // Vérifier le stock et calculer le montant total
    for (let item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Produit ${item.product} non trouvé`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Stock insuffisant pour ${product.name}`,
        });
      }

      // Mettre à jour le stock
      product.stock -= item.quantity;
      await product.save();

      // Calculer le montant
      item.price = product.price;
      totalAmount += item.price * item.quantity;
    }

    const sale = await Sale.create({
      user: req.user._id,
      items,
      totalAmount,
      ...req.body,
    });

    res.status(201).json({
      success: true,
      data: sale,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSales = async (req, res) => {
  try {
    const { startDate, endDate, limit = 10, page = 1 } = req.query;
    const query = {};

    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const total = await Sale.countDocuments(query);
    const sales = await Sale.find(query)
      .populate("user", "name")
      .populate("items.product", "name price")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    res.json({
      success: true,
      data: sales,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getDailySales = async (req, res) => {
  try {
    const sales = await Sale.aggregate([
      {
        $match: {
          status: "Terminée",
          createdAt: {
            $gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalSales: { $sum: 1 },
          totalAmount: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: -1 } },
    ]);

    res.json({
      success: true,
      data: sales,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMonthlySales = async (req, res) => {
  try {
    const sales = await Sale.aggregate([
      {
        $match: {
          status: "Terminée",
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalSales: { $sum: 1 },
          totalAmount: { $sum: "$totalAmount" },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
    ]);

    res.json({
      success: true,
      data: sales,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
