const { connection } = require('./connection');

const getProducts = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [products] = await connection.execute(query);
  return products;
};

const getProductsById = async (productId) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [[product]] = await connection.execute(query, [productId]);
  return product;
};

const createProduct = async ({ name }) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [newProduct] = await connection.execute(query, [name]);
  return newProduct.insertId;
};

const updateProduct = async (name, id) => {
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
  await connection.execute(query, [name, id]);  
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
  await connection.execute(query, [id]);
};

const getProductsByName = async (productName) => {
  const query = `SELECT * FROM StoreManager.products WHERE name LIKE ('%${productName}%')`;
  const [result] = await connection.execute(query);
  // console.log(result);
  return result;
};

module.exports = {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByName,
};