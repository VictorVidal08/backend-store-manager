const connection = require('./connection');

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
  create,
};