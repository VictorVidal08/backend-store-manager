const salesModel = require('../models/salesModel');
const productModel = require('../models/productsModel');

const create = async (products) => {
  /* if (products.length === 1) {
    const [{ productId }] = products;
    // console.log(productId);
    const checkLength = await productModel.findById(productId);
    if (!checkLength.length) {
      return { message: 'Product not found' };
    }
  } */

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

module.exports = {
  create,
};