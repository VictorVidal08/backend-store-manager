const salesService = require('../services/salesService');

const create = async (req, res) => {
  try {
    const products = req.body;
    // console.log('products', products);
    const insert = await salesService.create(products);
    // console.log('insert sales', insert);
    if (insert.message) {
      return res.status(404).json({ message: insert.message });
    }
    return res.status(201).json(insert);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Houve um problema (ver arquivo salesController)' });
  }
};

module.exports = {
  create,
};