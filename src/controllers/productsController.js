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
  try {
    const { name } = req.body;
    const newProduct = await productsService.createProduct({ name });
    res.status(201).json(newProduct);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedProduct = await productsService.updateProduct(name, id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const deleted = await productsService.deleteProduct(id);
  if (!deleted) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(204).end();
};

const searchProduct = async (req, res) => {
  const name = req.query.q;
  if (name) {
    const product = await productsService.getProductsByName(name);
    res.status(200).json([product]);
  }
  const allproducts = await productsService.getProducts();
  res.status(200).json(allproducts);
};

module.exports = {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};