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

const createSale = async (sale) => {
  const query1 = 'INSERT INTO StoreManager.sales (date) VALUES (now())';
  const [{ insertId: saleId }] = await connection.execute(query1);
  const values = sale.map((item) => `(${saleId}, ${item.productId}, ${item.quantity})`);
  const valeusjoin = values.join(', ');
  const query2 = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) 
  VALUES ${valeusjoin}`;
  await connection.execute(query2);
  return ({ id: saleId, itemsSold: sale });
};

const deleteSale = async (id) => {
  const query = 'DELETE FROM StoreManager.sales WHERE id = ?';
  await connection.execute(query, [id]);
};

const updateSale = async (saleId, productId, quantity) => {
  const query = `UPDATE StoreManager.sales_products 
  SET quantity = ?
  WHERE sale_id = ? AND product_id = ?`;
  await connection.execute(query, [quantity, saleId, productId]);  
};

module.exports = {
  getSales,
  getSalesById,
  deleteSale,
  createSale,
  updateSale,
};