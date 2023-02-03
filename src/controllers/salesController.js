const salesService = require('../services/salesService');

const getSales = async (_req, res) => {
  const sales = await salesService.getSales();
  res.status(200).json(sales);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await salesService.getSalesById(id);
  res.status(status).json(message);
};

const createSale = async (req, res) => {
  try {
    const sale = req.body;
    const saleId = await salesService.createSale(sale);
    res.status(201).json({ id: saleId, itemsSold: sale });
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const deleted = await salesService.deleteSale(id);
  if (!deleted) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  return res.status(204).end();
};

module.exports = {
  getSales,
  getSalesById,
  createSale,
  deleteSale,
};