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

module.exports = {
  getSales,
  getSalesById,
  deleteSale,
};