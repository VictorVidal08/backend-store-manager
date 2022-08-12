const connection = require('./connection');

// ref: código baseado na monitoria do zambelli.

const getAll = async () => {
  const [result] = await connection.execute('SELECT * FROM products');
  return result;
};

const findById = async (id) => {
  const query = `
    SELECT id, name 
    FROM products 
    WHERE id = ?
  `;

  const [productsData] = await connection.execute(query, [id]);

  if (productsData.length === 0) return null;

  return productsData[0];
};

module.exports = {
  getAll,
  findById
};