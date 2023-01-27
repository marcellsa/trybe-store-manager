const productsModel = require('../models/productsModel');

const getProducts = async () => {
  const products = await productsModel.getProducts();
  return products;
};

const getProductsById = async (productId) => {
  const product = await productsModel.getProductsById(productId);
  if (!product) {
    return ({
      status: 404,
      message: { message: 'Product not found' },
    });
  }
  return ({
    status: 200,
    message: product,
  });
};

module.exports = {
  getProducts,
  getProductsById,
};