const Joi = require('joi');
const salesModel = require('../models/salesModel');

const productIdSchema = Joi.object({
  productId: Joi.number().required(),
  // quantity: Joi.number().positive().required(),
});

const validateProductId = (productId) => {
  const productIdArray = Joi.array().items(productIdSchema);
  const { error } = productIdArray.validate(productId);
  if (error) {
    const e = { status: 400, message: '"productId" is required' };
    throw e;
  }
};

// const validateQuantity = (quantity) => {
//   const { error } = productIdSchema.validate(quantity);
//   if (error) {
//     if (error.status === 400) {
//       const e = { status: 400, message: '"quantity" is required' };
//       throw e;
//     } else {
//       const e = { status: 422, message: '"quantity" must be greater than or equal to 1' };
//       throw e;
//     }
//   }
// };

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
  const saleId = await salesModel.createSale(sale);
  await Promise.all(sales.map(async (sale) => {
    const { productId, quantity } = sale;
  }));
  await salesModel.createSale(saleId, productId, quantity);
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
  validateProductId(productId);
  // validateQuantity(quantity);
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