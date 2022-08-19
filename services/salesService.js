const salesModel = require('../models/salesModel');
const productModel = require('../models/productsModel');
const productsService = require('./productsService');

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

const update = async (saleId, products) => {
  // console.log('products', products, 'saleId', saleId);
  const verifySaleId = await salesModel.findById(saleId);
  if (!verifySaleId) throw new Error('Sale not found');
  await Promise.all(products.map(async (product) => {
    const verifyId = await productsService.findById(product.productId);
    if (!verifyId) throw new Error('Product not found'); 
  }));
  await Promise.all(products.map(async (product) => {
    const result = await salesModel.update(saleId, product.productId, product.quantity);
    return result;
  }));
  return true;
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  deleteId,
};