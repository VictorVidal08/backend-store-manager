const connection = require('./connection');

const getAll = async () => {
  const query = `SELECT p.sale_id AS saleId, p.product_id AS productId,
  p.quantity, s.date FROM StoreManager.sales_products AS p
  INNER JOIN StoreManager.sales AS s
  ON s.id = p.sale_id`;
  const [result] = await connection.execute(query);
  return result;
};

const findById = async (id) => {
  const query = `
    SELECT s.date, p.product_id AS productId, p.quantity
  FROM StoreManager.sales AS s
  INNER JOIN StoreManager.sales_products AS p
  ON s.id = p.sale_id
  WHERE id = ?
  ORDER BY p.sale_id ASC;
  `;

  const [salesData] = await connection.execute(query, [id]);

  if (salesData.length === 0) return null;

  return salesData;
};

const create = async (products) => {
  const querysales = `
    INSERT INTO StoreManager.sales () VALUES();
  `;

  const [saleResult] = await connection.execute(querysales);
  const saleId = saleResult.insertId;
  // console.log('saleresult', saleId);
  // CHAMAR O ID DA SALES, E DEPOIS USAR NO PRODUCTID DA SALES_PRODUCTS

  const query = `
    INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);
  `;

  await Promise.all(products
    .map(({ productId, quantity }) => connection.execute(query, [saleId, productId, quantity])));

  return { id: saleId, itemsSold: products };
};

module.exports = {
  getAll,
  findById,
  create,
};