const productsModel = require('../models/productsModel');

const getAll = async () => productsModel.getAll();

const findById = async (id) => {
  const product = await productsModel.findById(id);

  if (!product) return null;

  return product;
}

module.exports = {
  getAll,
  findById
};
