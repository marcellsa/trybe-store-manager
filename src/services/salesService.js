const Joi = require('joi');
const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const productIdSchema = Joi.object({
  productId: Joi.number().required().label('productId'),
  quantity: Joi.number().min(1).required().label('quantity'),
});

const validateProductId = (sales) => {
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
  console.log(sales);
  validateProductId(sales);  
  const products = await productsModel.getProducts();
  const productsId = products.map((product) => product.id);
  console.log(productsId);
  const result = sales
  .every((item) => productsId.includes(+item.productId));
  if (!result) {
    const e = { status: 404, message: 'Product not found' };
    throw e;
  }
  const saleId = await salesModel.createSale(sales);
  console.log(result);
  return saleId;
};

const deleteSale = async (id) => {
  const sale = await salesModel.getSalesById(id);
  if (sale.length === 0) {
    return false;
  }
  await salesModel.deleteSale(id);
  return true;
};

const updateSale = async (saleId, productId, quantity) => {
  const sale = await salesModel.getSalesById(saleId);
  if (sale.length === 0) {
    const e = { status: 404, message: 'Sale not found' };
    throw e;    
  }
  
  await salesModel.updateSale(saleId, productId, quantity);
  return ({ saleId, productId, quantity });
};

module.exports = {
  getSales,
  getSalesById,
  deleteSale,
  createSale,
  updateSale,
};