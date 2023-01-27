const productsService = require('../services/productsService');

const getProducts = async (_req, res) => {
  const products = await productsService.getProducts();
  res.status(200).json(products);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await productsService.getProductsById(id);
  res.status(status).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const newProduct = await productsService.createProduct({ name });
  res.status(201).json(newProduct);
};

module.exports = {
  getProducts,
  getProductsById,
  createProduct,
};