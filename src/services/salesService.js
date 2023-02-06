const Joi = require('joi');
const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const productIdSchema = Joi.object({
  productId: Joi.number().required().label('productId'),
  quantity: Joi.number().min(1).required().label('quantity'),
});

const validateSale = (sales) => {
  const productIdArray = Joi.array().items(productIdSchema);
  const { error } = productIdArray.validate(sales);
  if (error) {
    if (error.message.includes('required')) {
      const e = { status: 400, message: error.message };
      throw e;
    }
    if (error.message.includes('greater')) {
      const e = { status: 422, message: error.message };
      throw e;
    }
  }
};

const getSales = async () => {
  const sales = await salesModel.getSales();
  return sales;
};

const getSalesById = async (saleId) => {
  const sale = await salesModel.getSalesById(saleId);
  if (sale.length === 0) {
    return ({
      status: 404,
      message: { message: 'Sale not found' },
    });
  }
  return ({
    status: 200,
    message: sale,
  });
};

const createSale = async (sales) => {
  validateSale(sales);  
  const products = await productsModel.getProducts();
  const productsId = products.map((product) => product.id);
  const result = sales
  .every((item) => productsId.includes(+item.productId));
  if (!result) {
    const e = { status: 404, message: 'Product not found' };
    throw e;
  }
  const sale = await salesModel.createSale(sales);
  return sale;
};

const deleteSale = async (id) => {
  const sale = await salesModel.getSalesById(id);
  if (sale.length === 0) {
    return false;
  }
  await salesModel.deleteSale(id);
  return true;
};

const updateSale = async (saleId, sales) => {
  validateSale(sales);
  const products = await productsModel.getProducts();
  const productsId = products.map((product) => product.id);
  const result = sales
  .every((item) => productsId.includes(+item.productId));
  if (!result) {
    const e = { status: 404, message: 'Product not found' };
    throw e;
  }
  const isThereSale = await salesModel.getSalesById(saleId);
  if (isThereSale.length === 0) {
    const e = { status: 404, message: 'Sale not found' };
    throw e;    
  }
  await Promise.all(sales
    .map((sale) => salesModel.updateSale(saleId, sale.productId, sale.quantity)));
};

module.exports = {
  getSales,
  getSalesById,
  deleteSale,
  createSale,
  updateSale,
};