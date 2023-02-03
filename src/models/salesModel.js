const { connection } = require('./connection');

const getSales = async () => {
  const query = `SELECT s.id AS saleId, s.date, sp.product_id AS productId, sp.quantity 
  FROM StoreManager.sales AS s 
  INNER JOIN StoreManager.sales_products AS sp 
  WHERE s.id = sp.sale_id
  ORDER BY saleId ASC, productId ASC`;
  const [sales] = await connection.execute(query);
  return sales;
};

const getSalesById = async (saleId) => {
  const query = `SELECT s.date, sp.product_id AS productId, sp.quantity 
  FROM StoreManager.sales AS s 
  INNER JOIN StoreManager.sales_products AS sp 
  WHERE id = ?
  AND s.id = sp.sale_id`;
  const [sale] = await connection.execute(query, [saleId]);
  return sale;
};

// const createSale = async 

const deleteSale = async (id) => {
  const query = 'DELETE FROM StoreManager.sales WHERE id = ?';
  await connection.execute(query, [id]);
};

module.exports = {
  getSales,
  getSalesById,
  deleteSale,
};