const salesService = require('../services/salesService');

const getSales = async (_req, res) => {
  const sales = await salesService.getSales();
  res.status(200).json(sales);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await salesService.getSalesById(id);
  console.log('controller em ação');
  res.status(status).json(message);
};

module.exports = {
  getSales,
  getSalesById,
};