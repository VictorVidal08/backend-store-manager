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

const deleteId = async (id) => {
  const query = `
    DELETE FROM products WHERE id = ?;
  `;
  const [result] = await connection.execute(query, [id]);
  // console.log('model', result);
  return result.affectedRows;
};

const create = async (name) => {
  const query = `
    INSERT INTO products (name) VALUES (?);
  `;

  const [result] = await connection.execute(query, [name]);
  // console.log('result', result);
  return { id: result.insertId, name };
};

const update = async (id, name) => {
  const query = `
    UPDATE products
    SET name = ?
    WHERE id = ?;
  `;
  // console.log(typeof id, name);
  const [result] = await connection.execute(query, [name, id]);
  // console.log('model', result.affectedRows);
  return result.affectedRows;
};

module.exports = {
  getAll,
  findById,
  create,
  deleteId,
  update,
};