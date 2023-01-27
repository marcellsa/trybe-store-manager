const productsService = require('../services/productsService');

const getProducts = async (_req, res) => {
  const products = await productsService.getProducts();
  res.status(200).json(products);
};

const getProductsById = async (req, res) => {
  const { status, message } = await productsService.getProductsById(req.params.id);
  res.status(status).json(message);
};

module.exports = {
  getProducts,
  getProductsById,
};