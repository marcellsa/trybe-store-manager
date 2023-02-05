const Joi = require('joi');
const productsModel = require('../models/productsModel');

const productSchema = Joi.object({
  name: Joi.string().min(5).max(30).required(),
});

const validateName = (name) => {
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
};

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
  validateName(name);
  const id = await productsModel.createProduct({ name });
  return { id, name };
};

const updateProduct = async (name, id) => {
  validateName(name);
  const product = await productsModel.getProductsById(id);
  if (!product) {
    const e = { status: 404, message: 'Product not found' };
    throw e;    
  }
  await productsModel.updateProduct(name, id);
  return ({ id, name });
};

const deleteProduct = async (id) => {
  const product = await productsModel.getProductsById(id);
  if (!product) {
    return false;
  }
  await productsModel.deleteProduct(id);
  return true;
};

const getProductsByName = async (name) => {
  const productByName = await productsModel.getProductsByName(name);
  console.log(productByName);
  // if (productByName.length !== 0) {
  //   return productByName;
  // }
  return productByName;
};

module.exports = {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByName,
};