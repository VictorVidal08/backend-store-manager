const productsModel = require('../models/productsModel');

const getAll = async () => productsModel.getAll();

const findById = async (id) => {
  const product = await productsModel.findById(id);

  if (!product) return null;

  return product;
};

const deleteId = async (id) => {
  const result = await productsModel.deleteId(id);
  // console.log('service', result);
  return result;
};

const create = async (name) => {
  const result = await productsModel.create(name);
  return result;
};

const update = async (id, name) => {
  const result = await productsModel.update(id, name);
  return result;
};

module.exports = {
  getAll,
  findById,
  create,
  deleteId,
  update,
};
