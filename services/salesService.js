const salesModel = require('../models/salesModel');
const productModel = require('../models/productsModel');

const getAll = async () => salesModel.getAll();

const findById = async (id) => {
  const sale = await salesModel.findById(id);

  if (!sale) return null;

  return sale;
};

const create = async (products) => {
  const checkId = await Promise.all(products
    .map(({ productId }) => productModel.findById(productId)));
  // console.log(checkId);
  if (checkId.includes(null)) {
    return { message: 'Product not found' };
  }

  const result = await salesModel.create(products);
  // console.log('serviceresult', result);
  return result;
};

const deleteId = async (id) => {
  const result = await salesModel.deleteId(id);
  // console.log('service', result);
  return result;
};

module.exports = {
  getAll,
  findById,
  create,
  deleteId,
};