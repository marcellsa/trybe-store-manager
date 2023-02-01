const Joi = require('joi');
const productsModel = require('../models/productsModel');

const productSchema = Joi.object({
  name: Joi.string().min(5).max(30).required(),
});

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

const createProduct = async ({ name }) => {
  const { error } = productSchema.validate({ name });
  if (error) {
    if (error.message === '"name" is required') {
      const e = { status: 400, message: error.message };
      throw e;
    } else {
      const e = { status: 422, message: error.message };
      throw e;
    }
  }
  const id = await productsModel.createProduct({ name });
  return { id, name };
};

const updateProduct = async (produto, id) => {
  await productsModel.updateProduct(produto, id);
  return ({ id, name: produto.name });
};

module.exports = {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
};