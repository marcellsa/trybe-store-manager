const salesModel = require('../models/salesModel');

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

// const createSale = async (sale) => {
//   const saleId = await salesModel.createSale(sale);
//   return saleId;
// };

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
  if (!sale) {
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
  updateSale,
};